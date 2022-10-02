import validator from "validator";

export default class Login{
    constructor(formClass){
        this.form = document.querySelector(formClass)
    }

    init(){
        this.events()
    }
    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', e=>{
            e.preventDefault();
            this.valid(e);
        })
    }

    valid(e){
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passInput = el.querySelector('input[name="password"]');

        let error = false;

        if(!validator.isEmail(emailInput.value)){
            const textEmail = document.querySelector('.text-email');
            textEmail.innerHTML = 'E-mail inválido';
            textEmail.style.color = 'red' 
            error = true
        }
        if(passInput.value.length < 3 || passInput.value.length > 12){
            const textPass = document.querySelector('.text-pass');
            textPass.innerHTML = 'Senha precisa ter de 3 a 12 caracteres';
            textPass.style.color = 'red' 
            error = true
        }

        if(!error) el.submit()
    }
}