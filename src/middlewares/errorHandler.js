export function errorHandler(error, req, res, next) {
    switch(error.type){
        case 'AUTH_FAILED':
            res.status(401)
            break
        case 'PERMISSIONS_FAILED':
            res.status(403)
            break
        default:
            res.status(500)
    }
    console.log(error)
    res.json({ errorMsg: error.message })
}