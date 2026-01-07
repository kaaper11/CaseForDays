const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Brak tokenu!" });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Zły format tokenu!" });
    }

    const token = authHeader.replace("Bearer ", "");

    if (!token || token === "null" || token === "undefined") {
        return res.status(401).json({ message: "Token pusty!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT ERROR:", err.message);
        return res.status(401).json({ message: "Nieprawidłowy token!" });
    }
};

module.exports = authMiddleware;
