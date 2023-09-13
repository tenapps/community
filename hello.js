const express = require('express')

const stripe = require('stripe')('sk_test_51NpnabEd5VL8XJuBq3xlfnu0dWK28YrqWe63o6hi4Yn5YqyPPRMSew0I8O6FuuxqLkPivXxvr53TAVOlPOnXH1Wc00MI6wOY9Y')

const side = require('cookies')

const idgen = require('idgen')

const multer = require('multer')

const storage1 = multer.diskStorage({
    destination: 'source/assets/',
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage: storage1,
    limits: {
        fileSize: 1000000
    }
})

const storage = require('nedb')

const users = new storage({
    filename: 'storage/users',
    autoload: true
})

const challenges = new storage({
    filename: 'storage/challenges',
    autoload: true
})

const application = express()

application.set('view engine', 'hbs')

application.use(express.static('source'))
application.use(express.urlencoded(
    {
        extended: true
    }
))

application.use(function(request, response, afterawards) {

    global.cookies = new side(request, response, {
        keys: ['zdRqPdoOjl4fPLrzYbfXY1Gu6uO6VtBSU38Ku8ApJg9KXE6w2U']
    })
    
    global.authorization = cookies.get('_host-myapps.csrf')

    global.key = idgen('64')

    switch (authorization ?? 'Authorization not successful, try again') {

        case 'Authorization not successful, try again': {
            
            cookies.set('_host-myapps.csrf', key, {
                'maxAge': '86400000',
                'signed': false
            })

                break

        }
    }
    
    afterawards()

})
    
application.get('/', function(_, response) {

    users.findOne({
        authorization: authorization
    }, async function(_, user) {

        switch (user ? 'yes' : 'no') {

            case 'yes': {

                response.redirect('/challenges')

                    break
            
            }
            case 'no': {

                response.render('myapps', {
                    'layout': 'layouts/myapps'
                })

                    break

            }
        }
    })
})
 
application.get('/continue-as-guest', function(_, response) {

    users.findOne({
        authorization: authorization
    }, async function(_, user) {

        switch (user ? 'yes' : 'no') {

            case 'yes': {

                response.redirect('/challenges')

                    break
            
            }
            case 'no': {

                challenges.find({

                }, function(_, challenges) {
            
                    response.render('continue-as-guest', {
                        'layout': 'layouts/continue-as-guest',
            
                        challenges: challenges
                    })
                })

                    break

            }
        }
    })
})

application.get('/challenges', function(_, response) {

    users.findOne({
        authorization: authorization
    }, async function(_, user) {

        switch (user ? 'yes' : 'no') {

            case 'yes': {

                const customer = await stripe.customers.retrieve(
                    user.customer
                )

                switch (customer ? 'yes' : 'no') {

                    case 'yes': {
                        
                        challenges.find({
                            type: 'in-progress'
                        }, function(_, challenges) {

                            response.render('challenges', {
                                'layout': 'layouts/challenges',

                                challenges: challenges,
                                user: user,
                                balance: user.balance / 100
                            })
                        })
        
                            break
                    
                    }
                    case 'no': {
        
                        response.redirect('/')
        
                            break
        
                    }
                }

                    break
            
            }
            case 'no': {

                response.redirect('/continue-as-guest')

                    break

            }
        }
    })
})

application.get('/verification', async function(request, response) {

    const session = await stripe.checkout.sessions.retrieve(
        request.query.recharge
    )
    
    if (session.payment_status == 'paid') {

        users.findOne({
            customer: session.customer
        }, function(_, user) {
    
            console.log(user)
    
            switch (user ?? 'Failed to sign in, try again') {
    
                case 'Failed to sign in, try again': {
    
                    response.send('Failed to sign in, try again')
    
                        break
    
                }
                default: {
    
                    const newBalance = user.balance + session.amount_total
    
                    users.update({
                        customer: session.customer
                    }, {
                        $set: { balance: newBalance }
                    }, function() {

                        response.redirect('/')

                    })
                }
            }
        })
    } else {

        response.send('Coś poszło nie tak')

    }
})

application.get('/terms-of-service', function(_, response) {

    response.render('terms-of-service', {
        'layout': 'layouts/myapps'
    })
})

//API access
application.post('/api/authorization', function(request, response) {

    switch (request.body.name ?? 'Full name is incorrect, try again') {

        case 'Full name is incorrect, try again': {
            
            response.send('Full name is incorrect, try again')

                break

        }
        case '': {
            
            response.send('Full name is required, try again')

                break

        }
        default: {

            switch (request.body.email_address ?? 'Email address is incorrect, try again') {

                case 'Email address is incorrect, try again': {
                    
                    response.send('Email address is incorrect, try again')
        
                        break
        
                }
                case '': {
                    
                    response.send('Email address is required, try again')
        
                        break
        
                }
                default: {
        
                    switch (request.body.password ?? 'Password is incorrect, try again') {

                        case 'Password is incorrect, try again': {
                            
                            response.send('Password is incorrect, try again')
                
                                break
                
                        }
                        case '': {
                            
                            response.send('Password is required, try again')
                
                                break
                
                        }
                        default: {
                
                            users.findOne({
                                email_address: request.body.email_address
                            }, async function(_, user) {

                                switch (user ?? 'User not found, congratulations') {

                                    case 'User not found, congratulations': {

                                        const customer = await stripe.customers.create({
                                            name: request.body.name,
                                            email: request.body.email_address
                                        })

                                        users.insert({
                                            authorization: authorization,
                                            name: request.body.name,
                                            email_address: request.body.email_address,
                                            password: request.body.password,
                                            customer: customer.id,
                                            balance: 0
                                        }, function() {
                                            
                                            response.send({
                                                message: 'User has been listed, congratulations',

                                                location: '/challenges'
                                            })
                                        })

                                            break

                                    }
                                    default: {

                                        response.send('Email address has already been used, try again')

                                    }
                                }
                            })
                        }
                    }
                }
            }
        }
    }
})

application.post('/api/sign-in', function(request, response) {

    switch (request.body.email_address ?? 'Email address is incorrect, try again') {

        case 'Email address is incorrect, try again': {
            
            response.send('Email address is incorrect, try again')

                break

        }
        case '': {
            
            response.send('Email address is required, try again')

                break

        }
        default: {

            switch (request.body.password ?? 'Password is incorrect, try again') {

                case 'Password is incorrect, try again': {
                    
                    response.send('Password is incorrect, try again')
        
                        break
        
                }
                case '': {
                    
                    response.send('Password is required, try again')
        
                        break
        
                }
                default: {
                    
                    users.update({
                        email_address: request.body.email_address,
                        password: request.body.password
                    }, {
                        $set: { authorization: authorization }
                    }, {
                        returnUpdatedDocs: true
                    }, function(_, user) {

                        switch (user ?? 'Failed to sign in, try again') {

                            case 'Failed to sign in, try again': {

                                response.send('Failed to sign in, try again')

                                    break

                            }
                            default: {

                                response.send({
                                    location: '/challenges'
                                })
                            }
                        }
                    })
                }
            }
        }
    }
})

application.get('/recharge', function(_, response) {

    users.findOne({
        authorization: authorization
    }, async function(_, user) {

        switch (user ? 'yes' : 'no') {

            case 'yes': {

                const customer = await stripe.customers.retrieve(
                    user.customer
                )

                switch (customer ? 'yes' : 'no') {

                    case 'yes': {

                        const session = await stripe.checkout.sessions.create({
                            success_url: 'http://qos.co.uk/verification?recharge={CHECKOUT_SESSION_ID}',
                            line_items: [{
                                price: 'price_1NpoBZEd5VL8XJuBoBIch2Jc', 
                                quantity: 1
                            }],
                            customer: user.customer,
                            mode: 'payment'
                        })

                        response.redirect(session.url)
        
                            break
                        
                    }
                    case 'no': {
        
                        response.send('/')
        
                            break
        
                    }
                }

                    break
            
            }
            case 'no': {

                response.send('/')

                    break

            }
        }
    })
})

//Sort
application.post('/api/sort', function(request, response) {

    challenges.find({
        type: request.body.sort
    }, function(_, challenges) {

        switch (request.body.referer) {

            case 'continue-as-guest': {

                response.send({
                    challenges: challenges,
                    referer: request.body.referer
                })

                    break

            }
            case 'challenges': {

                response.send({
                    challenges: challenges,
                    referer: request.body.referer
                })

                    break

            }
        }
    })
})

//Challenges
application.post('/api/upload', upload.single('picture'), function(request, response) {

    response.send('/assets/' + request.file.filename)

})

application.post('/api/upload-material', function(request, response) {

    console.log(request.body)

    if (request.body.picture && request.body.name && request.body.describe && request.body.cash && request.body.step1) {

        const newCash = request.body.cash * 100

        users.findOne({
            authorization: authorization
        }, function(_, user) {

            switch (user ? 'yes' : 'no') {

                case 'yes': {

                    if (user.balance >= newCash) {

                        const newBalance = user.balance - newCash

                        challenges.insert({
                            type: 'in-progress',
                            picture: request.body.picture,
                            name: request.body.name,
                            describe: request.body.describe,
                            cash: request.body.cash,
                            step1: request.body.step1,
                            step2: request.body.step2,
                            step3: request.body.step3
                        })

                        users.update({
                            authorization: authorization
                        }, {
                            $set: { balance: newBalance }
                        }, function() {

                            response.send('Challenge has been created')

                        })

                    } else {

                        response.send('Challenge has not been created')

                    }

                        break
                
                }
                case 'no': {

                    response.send("You're not logged in")

                        break

                }
            }
        })
        
    } else {

        response.send('Challenge has not been created')

    }
})

application.post('/api/do-challenge', function(request, response) {

    console.log(request.body)

    users.findOne({
        authorization: authorization
    }, function(_, user) {

        console.log(user)

        switch (user ? 'yes' : 'no') {

            case 'yes': {

                challenges.update({
                    _id: request.body._id
                }, {
                    $set: { 
                        type: 'during',
                        user: user._id,
                        watch: request.body.just_picture
                    }
                }, {
                    returnUpdatedDocs: true
                }, function(_, challenge) {

                    switch (challenge ?? 'Challenge has not been sent for review') {

                        case 'Challenge has not been sent for review': {

                            response.send('Challenge has not been sent for review')

                                break

                        }
                        default: {

                            response.send('Challenge has been sent for review')

                        }
                    }
                })

                    break
            
            }
            case 'no': {

                response.send("You're not logged in")

                    break

            }
        }
    })
})

application.get('/api/during-challenge', function(request, response) {
    
    if (request.body.command == 'accept') {

        challenges.findOne({
            _id: 'hmXfEjnQhXCgn5Nx'
        }, function(_, challenge) {
    
            console.log(challenge)
    
            switch (challenge ? 'yes' : 'no') {
    
                case 'yes': {
    
                    const user = challenge.user
    
                    const newCash = challenge.cash * 100
                    
                    challenges.update({
                        _id: 'hmXfEjnQhXCgn5Nx'
                    }, {
                        $set: { 
                            type: 'completed'
                        }
                    }, {
                        returnUpdatedDocs: true
                    }, function(_, challenge) {
    
                        switch (challenge ?? 'Something went wrong') {
    
                            case 'Something went wrong': {
    
                                response.send('Something went wrong')
    
                                    break
    
                            }
                            default: {
    
                                users.findOne({
                                    _id: user
                                }, function(_, user) {
                
                                    switch (user ?? 'Something went wrong') {
                
                                        case 'Something went wrong': {
                
                                            response.send('Something went wrong')
                
                                                break
                
                                        }
                                        default: {
    
                                            const newBalance = user.balance + newCash
                
                                            users.update({
                                                _id: user._id
                                            }, {
                                                $set: { 
                                                    balance: newBalance
                                                }
                                            }, {
                                                returnUpdatedDocs: true
                                            }, function(_, user) {
                            
                                                switch (user ?? 'Something went wrong') {
                            
                                                    case 'Something went wrong': {
                            
                                                        response.send('Something went wrong')
                            
                                                            break
                            
                                                    }
                                                    default: {
                            
                                                        response.send('It worked')
                            
                                                    }
                                                }
                                            })
                
                                        }
                                    }
                                })
                            }
                        }
                    })
    
                        break
                
                }
                case 'no': {
    
                    response.send("You're not logged in")
    
                        break
    
                }
            }
        })
    }
})

application.listen('3000')