class UserLogin{
    constructor(email, password){
        this.email = email,
        this.password = password
    }
};

const loginForm = document.getElementById('loginForm');
const divError = document.getElementById('divError')

loginForm.addEventListener('submit', e => {
    e.preventDefault()

    const dataForm = new FormData(e.target)
    let userLogin = new UserLogin(dataForm.get('loginEmail'), dataForm.get('loginPassword'))

    fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(userLogin),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(result => {
        
        if(result.status === 201){
            loginForm.reset()
            window.location.replace('/web/')
        }
    })
});