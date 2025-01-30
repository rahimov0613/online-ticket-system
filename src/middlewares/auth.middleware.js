export const blacklistedTokens = new Set();
export const checkBlacklistedToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (blacklistedTokens.has(token)) {
        return res.status(403).json({ message: "Bu token yaroqsiz!" });
    }

    next();
};