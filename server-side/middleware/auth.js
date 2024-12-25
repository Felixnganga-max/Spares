const jwt = require('jsonwebtoken');

const authMiddle = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    // More robust token extraction
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Authentication token required"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // Optional: Check token expiration
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({
                success: false,
                message: "Token has expired. Please login again."
            });
        }

        // Attach user information to the request
        req.user = {
            id: decoded.id,
            email: decoded.userEmail,
            role: decoded.userRole
        };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token. Please login again."
        });
    }
};

module.exports = authMiddle;