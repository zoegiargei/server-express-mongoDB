import { createHash } from "../main.js"

class User{
    constructor({username=null, first_name, last_name, email, age=null, password=null, role='User'}){

        if(!first_name){ throw new Error('Sent an invalidate first name') }
        if(!last_name){ throw new Error('Sent an invalidate last name') }
        if(!email){ throw new Error('Sent an invalidate email') }
        if(age){ 
            if(age <= 0){
                throw new Error('Sent an invalidate age')
            }
        }
        if(password){ 
            if(password===''){
                throw new Error('Sent an invalidate password')
            }
        }

        this.username = username || (`${first_name}${last_name}`).toLowerCase()
        this.first_name = first_name,
        this.last_name = last_name,
        this.email = email,
        this.age = age || 0,
        this.password = createHash(password) || 'xxx'
        this.role = role
    }
}

export default User;