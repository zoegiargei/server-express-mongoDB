class User{
    constructor({ first_name, last_name, email, age, password }){

        if(!first_name){ throw new Error('Sent an invalidate first name') }
        if(!last_name){ throw new Error('Sent an invalidate last name') }
        if(!email){ throw new Error('Sent an invalidate email') }
        if(!age){ throw new Error('Sent an invalidate age') }
        if(!password){ throw new Error('Sent an invalidate password') }

        this.first_name = first_name,
        this.last_name = last_name,
        this.email = email,
        this.age = age,
        this.password = password
    }
}

export default User;