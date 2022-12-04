var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var celebrate = require("celebrate")
var bcrypt = require("bcrypt")
var passport = require("passport")


const app = express()
const ejs = require('ejs')

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://Darrell:UvdKFneFYQ0TJ2Nc@utsv2.qeoc2ik.mongodb.net/daftar?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up", async (req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = hashedPassword;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }

    db.collection('kerja').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('suksesDaftar')

})

app.post("/login", async (req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    var email = req.body.email;
    var password = hashedPassword;

    var data = {
        "email" : email,
        "password" : password
    }

    db.collection('login').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('suksesLogin')

})

app.post("/suksesa", async(req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    var email = req.body.email;
    var username = req.body.username;
    var password = hashedPassword;

    var data = {
        "email" : email,
        "username": username,
        "password" : password,
    }

    

    db.collection('register').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('suksesAkun')

})

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    res.render('pages/index');  

})

app.get('/daftar',(req,res)=>{
    res.render('pages/Daftar');  



})

app.get('/suksesdaftar',(req,res)=>{
    res.render('pages/suksesDaftar');  



})

app.get('/index',(req,res)=>{
    res.render('pages/index');  



})

app.get('/about',(req,res)=>{
    res.render('pages/About');  



})

app.get('/akuntansi',(req,res)=>{
    res.render('pages/akuntansi');  



})

app.get('/arsitek',(req,res)=>{
    res.render('pages/arsitek');  



})

app.get('/contact',(req,res)=>{
    res.render('pages/Contact');  



})

app.get('/hukum',(req,res)=>{
    res.render('pages/hukum');  



})

app.get('/komputer',(req,res)=>{
    res.render('pages/komputer');  



})

app.get('/login',(req,res)=>{
    res.render('pages/login');  



})

app.get('/manajemen',(req,res)=>{
    res.render('pages/manajemen');  



})

app.get('/signup',(req,res)=>{
    res.render('pages/signup');  



})

app.get('/suksesakun',(req,res)=>{
    res.render('pages/suksesAkun');  



})

app.get('/sukseslogin',(req,res)=>{
    res.render('pages/suksesLogin');  



})






app.listen(3800);



console.log("Listening on PORT 3800");