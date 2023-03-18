const express = require('express');
const db = require('./db');
const cors = require('cors');
const cron = require('node-cron');
const {default:axios} = require('axios');

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

app.post('/addPayment',(req,res)=>{
    console.log(req.body);
    db.query("INSERT INTO payment (startupId,investorId,transactionId,status,amount) VALUES (?,?,?,?,?)",[req.body.startupId,req.body.investorId,req.body.transactionId,req.body.status,req.body.amount],(err,result)=>{
        if(err)
            console.log(err);
        else
            console.log(result);
    })
})

app.post('/getPayment',(err,res)=>{
    db.query('SELECT * FROM payment',(err,result)=>{
        if(err)
            console.log(err);
        else   
            res.json(result);
    })
})

app.post('/getInvestorPayment',(req,res)=>{
    db.query("SELECT * FROM payment WHERE investorId = (?)",[req.body.investorId],(err,result)=>{
        if(err)
            console.log(err);
        else
            res.json(result);
    })
})

app.post('/getStartupPayment',(req,res)=>{
    db.query("SELECT * FROM payment WHERE startupId = (?)",[req.body.startupId],(err,result)=>{
        if(err)
            console.log(err)
        else
            res.json(result)
    })
})

app.post('/addMeeting',(req,res)=>{
    console.log(req.body);
    db.query("INSERT INTO meeting (investorId,startupId,investorName,status,url,date,time) VALUES (?,?,?,?,?,?,?)",[req.body.investorId, req.body.startupId, req.body.investorName, null, req.body.url, req.body.date, req.body.time],(err,result)=>{
        if(err)
            console.log(err);
        else
            console.log(result);
    })
})

app.post('/getInvestorPayment',(req,res)=>{
    db.query("SELECT * FROM payment WHERE investorID = (?)",[req.body.investorId],(err,result)=>{
        if(err)
            console.log(err)
        else
            res.json(result)
    })
})

app.post('/addBlog',(req,res)=>{
    console.log("I am here");
    db.query("INSERT INTO blog (blogid,title,description) VALUES (?,?,?)",[req.body.blogid,req.body.title,req.body.description],(err,result)=>{
        if(err)
            console.log(err);
        else
            console.log(result);
    })
})

app.post('/getBlog',(req,res)=>{
    db.query("SELECT * FROM blog",(err,result)=>{
        console.log(result);
        if(err)
            console.log(err);
        else
            res.json(result);
    })
})

app.post('/startupMeeting',(req,res)=>{
    db.query("SELECT * FROM meeting WHERE startupId = (?)",[req.body.startupId],(err,result)=>{
        if(err)
            console.log(err);
        else
            res.json(result);
    })
})



app.post('/updateMeeting',(req,res)=>{
    db.query("UPDATE meeting SET status = (?) WHERE id=(?)",[req.body.status,req.body.id],(err,result)=>{
        if(err)
            console.log(err);
        else
            res.json(result);
    })
})

app.listen(PORT,()=>{console.log("Server is listening")})