class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    register = async (req, res) => {
        const { nickname, email, password } = req.body;

        try{

        if (!nickname || !email || !password) {
            return res.status(400).json({message:"Uzupełnij pola pls"});
        }

        const dalej = await this.userService.register({nickname, email, password});

        return res.status(201).json(dalej.userId);
        }catch(err){
            return res.status(500).json({message: "Błąd: " + err});
        }
    }

    login = async (req, res) => {
        const { email, password } = req.body;

        try {
            if (!email || !password) {
                return res.status(400).json({ message: "Uzupełnij pola pls" });
            }

            const dalej = await this.userService.login({ email, password });

            return res.status(200).json({
                token: dalej.token
            });

        } catch (err) {
            return res.status(500).json({ message: "Błąd: " + err.message });
        }
    };

    premium = async (req, res) => {
        const user = req.user.userId;

        try {
            if (!user) {
                return res.status(400).json({message:'Najpierw się zaloguj!'})
            }
            const dalej = await this.userService.premium(user);

            return res.status(201).json(dalej.message);
        }catch(err){
            return res.status(500).json({message: "Błąd: " + err});
        }
    }

    userData = async (req, res) => {
        const user = req.user.userId;

        try {
            if (!user) {
                return res.status(400).json({message:'Najpierw się zaloguj!'})
            }
            const dalej = await this.userService.userData(user);
            return res.status(201).json(dalej);
        }catch(err) {
            return res.status(500).json({message: "Błąd: " + err});
        }
    }

    addBalance = async (req, res) => {
        const { value } = req.body;
        const user = req.user.userId;

        try {
            if (!user) {
                return res.status(400).json({message:'Najpierw się zaloguj!'})
            }
            const dalej = await this.userService.addBalance({value, user});
            return res.status(201).json(dalej.message);

        }catch(err) {
            return res.status(500).json({message: "Błąd: " + err});
        }
    }
}

module.exports = UserController;