const express = require('express');
const app=express();

// afficher la liste des categories.
app.get('/', (req, res, )=>{
    const cat =[
        {
            "code":100,
            "designation":"electronique"
        },
        {
            "code":200,
            "designation":"electroménager"
        },
        {
            "code":300,
            "designation":"Informatique"
        }
    ]
    res.status(200).json(cat);
})
app.listen(3000);
console.log('Serveur est au port 3000');