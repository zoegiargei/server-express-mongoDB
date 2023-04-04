import UsersServices from "../services/usersServices.js";

export const usersServices = new UsersServices();


export const contrRegister = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body

        const exist = await usersServices.getUserByQuery({ email: email })

        exist.forEach(elem => {
            if(elem.email === email){
                throw new Error("User already exists")
            }
        })

        console.log(req.body)

        const result = await usersServices.saveUser({first_name, last_name, email, age, password})

        res.send({ status: "success", message: "User registered" })

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};


export const contrLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const userInDb = await usersServices.getUserByQuery({$and: [{ email: email }, { password: password }]}) //como no hashee el password aun puedo buscarlo directamente
        console.log('user in db')
        console.log(userInDb)

        userInDb.forEach(field => {
            if(!(field.email === email && field.password === password)){
                throw new Error("Incorrect credentials")
            }

            req.session.user = {
                name: `${field.first_name} ${field.last_name}`,
                email: field.email,
                age: field.age
            }
        })

        console.log(req.session.user)

        res.send({ status: "success", payload: req.session.user, message: "login done correctly" })

    } catch (error) {
        res.status(400).send({status: "error", error: error.message})
    }
};


export const contrLogout = async (req, res) => {
    req.session.destroy(err => {
        if(err){
            return res.status(500).send({status: "error", error: "Couldn't logout"})
        }
        res.redirect('/web/login/')
    })
};


/* export const contrAuth = async (req, res) => {
    try {
        
        const usernameInDb = await usersServices.getAField({username: req.session.user}, {username: 1})
        console.log(usernameInDb)
        
        if(usernameInDb && req.session.admin){
            return next()
        }

    } catch (error) {
        return res.status(401).send('Error of authentication')
    }

}; */


export const contrPrivate = async (req, res) => {
    console.log(req.session)
    res.send('Si ves esto es por que estas logeado.')
};