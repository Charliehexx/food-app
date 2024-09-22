import jwt from 'jsonwebtoken'

export const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "user not authenticated" })
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return res.status(404).json({ success: false, message: "Invalid Token" })
        }
        req.id = decode.userId
        next()
    }
    catch (err) { return res.status(500).json({ message: "Internal server error" }) }

}