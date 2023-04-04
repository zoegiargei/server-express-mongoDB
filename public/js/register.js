class Register{
    constructor(firstName, lastName, email, age, password){
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.age = age,
        this.password = password
    }
}

const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', e => {
    e.preventDefault()

    const dataForm = new FormData(e.target)
    let newRegister = new Register(dataForm.get('firstName', dataForm.get('lastName'), dataForm.get('regEmail'),  dataForm.get('age'),  dataForm.get('regPassword')))
    fetch('/api/session/register/', {
        method: 'POST',
        body: JSON.stringify(newRegister),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json().then(json => console.log(json)))
})