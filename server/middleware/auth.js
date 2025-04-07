const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized access!" });
        }

        const decodedData = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY);
        req.userId = decodedData.id; // Attach user ID to request
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token!" });
    }
};

module.exports = auth;
