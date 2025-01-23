"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized: Token not provided' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const secretKey = process.env.JWT_SECRET || 'defaultsecret';
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        if (typeof decoded === 'object' && decoded.id && decoded.email) {
            req.user = { id: decoded.id, email: decoded.email };
            next();
        }
        else {
            res.status(401).json({ message: 'Unauthorized: Invalid token' });
            return;
        }
    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
        return;
    }
};
exports.authenticate = authenticate;
