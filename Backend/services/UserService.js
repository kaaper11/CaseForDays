const NormalUser = require("../models/user/NormalUser");
const DbUser = require("../DbModels/Users");
const Inventory = require("../models/inventory/Inventory");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


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
            1000,
            new Inventory()
        )

        const saveUser = new DbUser({
            nickname: user.nickname,
            email: user.email,
            password: user.password,
            balance: 1000,
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

}

module.exports = UserService;