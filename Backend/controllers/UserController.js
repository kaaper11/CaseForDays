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
                return res.status(400).json({message:"Uzupełnij pola pls"});
            }

            const dalej = await this.userService.login({email, password});

            return res.status(201).json(dalej.token);

        }catch(err){
            return res.status(500).json({message: "Błąd: " + err});
        }
    }
}

module.exports = UserController;