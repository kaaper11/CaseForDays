const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers[`authorization`]?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({message: "Brak tokenu!"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       // console.log("Decoded user:", decoded);
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({message: "Nieprawidłowy token!"});
    }
}
module.exports = authMiddleware;