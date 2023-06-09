class Register{
    constructor(first_name, last_name, email, age, password){
        this.first_name = first_name,
        this.last_name = last_name,
        this.email = email,
        this.age = age,
        this.password = password
    }
}

const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', e => {
    e.preventDefault()

    const dataForm = new FormData(e.target)
    console.log(dataForm)

    const newRegister = new Register(dataForm.get('firstName'), dataForm.get('lastName'), dataForm.get('regEmail'),  dataForm.get('age'),  dataForm.get('regPassword'))
    console.log(newRegister)

    fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(newRegister),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(result => {

        if(result.status === 201){
            registerForm.reset()
            window.location.replace('/web/')
        }
        
        result.json()
    
    }).then(json => {
        console.log(json)
    })

})