const showSession = (req) => {

    console.log('–––––––––req.signedCookies–––––––––')
    console.log(req.signedCookies)

    console.log('–––––––––req.sessionID–––––––––')
    console.log(req.sessionID)

    console.log('–––––––––req.session–––––––––')
    console.log(req.session)
    console.log(req.session.passport)

    console.log('–––––––––req.user–––––––––')
    console.log(req.user)
    
    console.log('–––––––––req.sessionStore–––––––––')
    console.log(req.sessionStore)

}

export default showSession;