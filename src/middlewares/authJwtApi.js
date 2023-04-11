export const authJwtApi = async (req, res, next ) => {
    passport.authenticate('jwt', (error, user, info) => {

        if (error || !user) {
            return next(new AuthentiationFailed())
        }

        req.user = user
        next()

    })(req, res, next)
};