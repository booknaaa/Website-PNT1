const bcrypt = require('bcrypt')
var User = require('../../model/model');

module.exports = (req, res) => {
    const { email, password } = req.body 

    User.findOne({ email: email }).then((user) => {
        console.log(user)
        if (user) {
            let cmp = bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    console.log(user.role)
                    if (user.role === 'User') {
                    req.session.userId = user._id
                    res.redirect('/home')
                    }
                    else if (user.role === 'Admin') {
                        req.session.userId = user._id
                        res.redirect('/admin')
                        }
                    else{
                        res.redirect('/login')
                    }
                }
    
                else{
                    res.redirect('/login')
                }
            })
        } 
        else {
            res.redirect('/login')
        }
    })

  
    
}