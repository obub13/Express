//importing libraries + creating router object
const UserRouter = require('express').Router();

const users=[
    {key:1,id:1,name:'aaa'},
    {key:2,id:2,name:'bbb'},
    {key:3,id:3,name:'ccc'},
]

//creating routes
UserRouter.get('/', async (req,res)=>{
    res.status(200).json(users)
})


//sending a name parameter to the obj
UserRouter.get('/:id', async (req,res)=>{
    const {id} = req.params
    let u = users.find((u)=>u.id==id)
    if(u)
    res.status(200).json(u)
    else
    res.status(404).json({ mge: 'No user found' })
})

//posting / adding user with localhost..../api/users/add 
UserRouter.post('/add', async(req,res)=>{
    try {
        const {id, name} = req.body  //recieving data from body request
        let u = {id, name}
        users.push(u)
        res.status(201).json(users)
    } catch (error) {
        req.status(500).json({error})
    }
})

module.exports = UserRouter