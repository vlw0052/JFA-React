const router = require('express').Router()
const handleError = require('../index').handleError
const UserModel = require('../models/users.js').model	
	/* /api/users
	* GET: get users without email and password
    * POST: add an user to the database
    * /api/users/login/ verify and return jwt token 
    * PUT: update an user in the database
	* DELETE: delete an user from the database
	* /api/events/:id delete user with id
	*/

	router.get('/', (req, res)=>{
        UserModel.find({}).then((docs)=>{
            res.status(200).json({ users:docs })
        })
	})

	router.post('/', (req, res)=>{
        const { user } = req.body
        if(user){

            const newUser = {
                name:user.name.trim(),
                email:user.email.trim(),
                position:user.position.trim(),
                password:user.password.trim()
            }
            new UserModel(newUser).save((err)=>{
                if(err){
                    handleError(res, "Email already exist.", err.errors.email.message)
                }else{
                    res.status(200).json({ message:"User Added" })
                }
            })
        }else{
            handleError(res, "No user in body.", "That doesn't quite work that way", 400)
        }
    })

    router.post('/login', (req, res)=>{
        res.status(200).json({ path:req.originalUrl })
    })

	router.put('/', (req, res)=>{
        res.status(200).json({path:req.originalUrl})
    })

	router.delete('/:id', (req, res)=>{
		const { id } = req.params
		
		UserModel.remove({_id:id}, (err, result)=>{
				if(err){
					handleError(res, err, "Something went wrong deleting that.")
				}else{
					res.status(200).json({result})
				}
			})
	})
module.exports = router

