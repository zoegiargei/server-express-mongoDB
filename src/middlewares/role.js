const role = (req, res, next) => {

    const { email ,password } = req.body
    req.role = "User"
    
    if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
        req.role = "Admin"
    }
    next()
};

export default role;