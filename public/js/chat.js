
const socketSideClient = io();

const inputName = document.getElementById('inputName');
const inputMess = document.getElementById('inputMessage');


inputName?.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        if(inputName.value.trim().length > 0){
            socketSideClient.emit('newMessage', { name: inputName.value, message: inputMess?.value })
            inputName.value = ''
        }
    }
}); 

Swal.fire({
    title: "Identifícate",
    input: "text",
    inputValidator: (value) => {
        return !value && "¡Necesitas escribir un nombre de usuario para comenzar a chatear!"
    },
    allowOutsideClick: false
}).then(result => {
    inputName.value = result.value;
    socketSideClient.emit('newUser', result.value)
})

const formChat = document.getElementById('formChat')
const btnSubmit = document.getElementById('btnSubmit')

btnSubmit.addEventListener('click', (e) => {

    if (inputName instanceof HTMLInputElement &&
        inputMess instanceof HTMLInputElement &&
        inputName.value && inputMess.value) {
    
        const mess = {
            name: inputName.value,
            menssage: inputMess.value,
        }
    
        socketSideClient.emit('newMessage', mess)
    }
})


const messagesTemplate = `
{{#if thIsMessages}}
    <ul>
        {{#each messages}}
        <li>{{this.name}}: {{this.menssage}}</li>
        {{/each}}
    </ul>
{{else}}
    There isn't messages
{{/if}}`

const makeTemplateMessages = Handlebars.compile(messagesTemplate);

socketSideClient.on('messages', mess => {

    const messagesDiv = document.getElementById('messagesDiv')
    if(messagesDiv){
        messagesDiv.innerHTML = makeTemplateMessages({
            thIsMessages: mess.length > 0,
            mess
        })
    }
})

socketSideClient.on('newUser', (name) => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${name} se ha unido al chat`,
        icon: "success"
    })
})

socketSideClient.emit('refreshMessages')