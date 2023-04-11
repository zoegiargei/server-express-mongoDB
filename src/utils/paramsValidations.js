//r => regex

const r_alphanumerics = /^[0-9a-zA-Z]+$/

const r_letters_notBlanck = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
const r_letters_withBlancks = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
const r_onlyNumbers = /^[0-9]+$/;
const r_numInteger = /^-?\d*(\.\d+)?$/;
const r_price = /^[0-9]+[.,]{1,1}\[0]{2,2}$/;

const r_nameAndLastName = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
const r_date = /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;

const r_hour24Hrs = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

//strong password, ejemplo: "wMH432595@" ,implementar con match: if( userPassword.match(r_strongPass)!=null )
const r_strongPass = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
//Email
const r_email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;



export const formatAlphanumeric = (p) => {
    if( (r_alphanumerics).test(p) ){
        next()
    } else {
        next(new Error(`Invalid format of ${ p }`))
    }
};

export const formatTxt = (p) => {
    if( (r_letters_notBlanck).test(p) ){
        next()
    } else {
        next(new Error(`Invalid format of ${ p }`))
    }
};

export const formatNum = (p) => {
    if((/^[0-9]+$/).test(p)){
        next()
    } else {
        next(new Error(`Invalid format of ${ p }`))
    }
};

export const formatInteger = (p) => {
    if((/^-?\d*(\.\d+)?$/).test(p)){
        next()
    } else {
        next(new Error(`Invalid format of ${ p }`))
    }
};

export const formatPrice = (p) => {
    if((/^[0-9]+[.,]{1,1}\[0]{2,2}$/).test(p)){
        next()
    } else {
        next(new Error(`Invalid format of ${ p }`))
    }
};