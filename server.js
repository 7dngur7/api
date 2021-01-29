const express = require("express");
const bodyParser = require("body-parser");

const server = express();

server.use(bodyParser.json());


const users = [
    {
        "id": "dkfdjkfdkj",
        "name": "dndndn"
    },
    {
        "id": "erererer",
        "name": "kkhkhk"
    }
];

server.get("/api/user", (req, res)=>{
    res.json(users);
});//서버에서 정보 가져옴

server.get("/api/user/:id", (req,res) =>{
    const user = users.find((u) =>{
        return u.id === req.params.id;
    });
    if(user){
        res.json(user);
    }else{
        res.status(404).json({errorMessage : "user not found"});
    }
})

server.post("/api/user", (req, res)=>{
    users.push(req.body)
    res.json(users);
});//포스에서 올릴수 있음

server.put('/api/user/:id', (req, res) =>{
    let foundIndex = users.findIndex(u=>u.id===req.params.id);
    if (foundIndex===-1){
        res.status(404).json({errorMessage : "user not found"});
    }else{
        users[foundIndex] = {...users[foundIndex], ...req.body}
        res.json(users[foundIndex]);
    }
});//-1이면 없는거

server.delete('/api/user/:id', (req, res)=>{
    let foundIndex = users.findIndex(u=>u.id===req.params.id);
    if (foundIndex===-1){
        res.status(404).json({errorMessage : "user not found"});
    }else{
        let foundUser = users.splice(foundIndex,1);
        res.json(foundUser[0]);
    }
});


server.listen(3000, ()=>{
    console.log("running")
});