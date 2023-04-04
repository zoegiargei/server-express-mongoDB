class UserLogin{
    constructor(email, password){
        this.email = email,
        this.password = password
    }
};

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', e => {
    e.preventDefault()

    const dataForm = new FormData(e.target)
    let userLogin = new UserLogin(dataForm.get('loginEmail'), dataForm.get('loginPassword'))
    fetch('/api/session/login/', {
        method: 'POST',
        body: JSON.stringify(userLogin),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if(result.status === 200){
            loginForm.reset()
            window.location.replace('/web/')
        }
    })
});