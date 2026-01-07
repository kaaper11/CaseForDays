const NormalUser = require("../models/user/NormalUser");
const PremiumUser = require("../models/user/PremiumUser");
const DbUser = require("../DbModels/Users");
const Inventory = require("../models/inventory/Inventory");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const premiumUser = require("../models/Item/Item");


class UserService {

    async register(data){
        const {nickname, email, password} = data;

        const userHmm = await DbUser.findOne({email: email});
        if (userHmm){
            throw new Error('Uzytkownik juz istnieje')
        }

        const user = new NormalUser(
            null,
            nickname,
            email,
            password,
            100,
            new Inventory()
        )

        const saveUser = new DbUser({
            nickname: user.nickname,
            email: user.email,
            password: user.password,
            balance: 100,
            inventory: []
        });

        saveUser.save();

        user.id = saveUser._id.toString();

        return { userId: user.id };
    }

    async login(data){
        const {email, password} = data;

        const userHmm = await DbUser.findOne({email: email});
        if (!userHmm){
            throw new Error('Uzytkownik nie istnieje, zarejestruj się')
        }

        const valid = await bcryptjs.compare(password, userHmm.password);
        if (!valid){
            throw new Error("Błędne hasło!")
        }

        const token = jwt.sign({
                userId: userHmm._id, role: userHmm.role
            },
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        return {token: token}
    }

    async premium(user){
        const useros = await DbUser.findById(user);

        if(!useros){
            throw new Error('Uzytkownik nie istnieje')
        }

        if (useros.role === 'premium'){
            await DbUser.findByIdAndUpdate(useros._id, {
                role: 'normal'
            })
            return {message: 'Zrezygnowano z premium.'}
        }

        const premiumUser = new PremiumUser(
            useros._id,
            useros.nickname,
            useros.email,
            useros.password,
            useros.balance,
            useros.inventory,
        )

        await DbUser.findByIdAndUpdate(useros._id, {
            balance: premiumUser.balance - 10,
            role: 'premium'
        })
        return {message: 'Pomyślnie udało się zakupić premium gratulacje!'}
    }

    async userData(user){
        const useros = await DbUser.findById(user);

        if(!useros){
            throw new Error('Uzytkownik nie istnieje')
        }

        if(useros.role === "premium"){
            const premiumUser = new PremiumUser(
                useros._id,
                useros.nickname,
                useros.email,
                useros.password,
                useros.balance,
                useros.inventory,
            )
            return {id: premiumUser.id,
                nickname: premiumUser.nickname,
                email: premiumUser.email,
                password: premiumUser.password,
                balance: premiumUser.balance,
                inventory: premiumUser.inventory,
                role: 'premium',
                znizka : premiumUser.jakaZnizka()}
        }else {
            const normal = new NormalUser(
                useros._id,
                useros.nickname,
                useros.email,
                useros.password,
                useros.balance,
                useros.inventory,
            )
            return {
                id: normal.id,
                nickname: normal.nickname,
                email: normal.email,
                password: normal.password,
                balance: normal.balance,
                inventory: normal.inventory,
                role: 'normal',
                znizka : normal.jakaZnizka()
            }
        }
    }

    async addBalance(data){
        const { value, user } = data;

        const useros = await DbUser.findById(user);

        if(!useros){
            throw new Error('Uzytkownik nie istnieje')
        }

        if(useros.role === "premium"){
            const prem = new PremiumUser(
                useros._id,
                useros.nickname,
                useros.email,
                useros.password,
                useros.balance,
                useros.inventory,
            )
            prem.dodajBalans(value);
            await DbUser.findByIdAndUpdate(useros._id, {balance: prem.balance})
        }else{
            const nor = new NormalUser(
                useros._id,
                useros.nickname,
                useros.email,
                useros.password,
                useros.balance,
                useros.inventory,
            )
            nor.dodajBalans(value);

            await DbUser.findByIdAndUpdate(useros._id, {balance: nor.balance})
        }

        return {message: "Dodano środki do konta!"}
    }

}

module.exports = UserService;