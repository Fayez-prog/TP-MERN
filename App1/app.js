const express = require('express');
const app = express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Hello World");
});
app.get("/contact",(req,res)=>{
    res.send("C'est la page de contact");
});
app.get("/help",(req,res)=>{
    res.send("C'est la page de help");
});
app.get('/profile/:nom',(req,res)=>{
    res.send("Vous etes "+ req.params.nom);
});
app.get('/profile/:nom/:prenom',(req,res)=>{
    res.send("Votre nom "+ req.params.nom + " Votre prénom est " + req.params.prenom);
});
var nom=""
app.post("/ajout", (req, res) =>{
    nom = req.body.firstName + ' ' + req.body.lastName;
    res.send(nom + ' est connecté sur le site!');
});
app.get("/info", (req, res) =>{
    res.send(nom);
});
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
