module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next()
    }

    try {
        let _id = req.headers.id_user
        req.user = _id
        next()
    } catch (error) {
        return res.status(401).json({ message: error.message})
    }
}