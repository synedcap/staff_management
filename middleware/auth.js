const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports =  async (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).send({ message: "Authorization token missing" });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // Check if the token belongs to a valid user
        const user = await db.User.findByPk(decoded.userId);
        
        if (!user) {
         return res.status(401).send({ message: 'Invalid token' });
        }

        // Check if the token has been revoked or deleted
        if (!user.token) {
         return res.status(401).send({ message: 'Token has been revoked or deleted' });
       }

        req.userData = decoded;
        next();

    } catch (err) {

        return res.status(401).json("Authentication failed");
    }
};
