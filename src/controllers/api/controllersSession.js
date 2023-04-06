
export async function contrRegister (req, res, next){
    try {
        res.status(201).json(req.user)
    } catch (error) {
        return res.status(500).send({ status: "error", error: error.message })
    }
};


export async function contrLogin (req, res, next){

    try {
        if(!req.user){
            throw new Error("Couldn't login")
        }

        res.sendStatus(201)
        res.send({status:"success", payload: req.user})

    } catch (error) {
        return res.status(500).send({status: "error", error: error.message})
    }
};


export async function contrLogout (req, res) {

    //logout por passport
    req.logout(err => {
        res.redirect('/web/login')
        res.sendStatus(200)
    })
};


export const contrAuth = async (req, res) => {
    try {
        
        const usernameInDb = await usersServices.getAField({username: req.user.firs_name}, {username: 1})
        
        if(usernameInDb != [] && usernameInDb != {} && req.auth){
            return next()
        }

    } catch (error) {
        return res.status(401).send('Error of authentication')
    }

};


export const contrPrivate = async (req, res) => {
    console.log(req.user)
    res.send('Si ves esto es por que estas logeado.')
};