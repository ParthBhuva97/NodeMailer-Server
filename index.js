import express from "express"
import cors from "cors"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(cors())

//Node Mailer Config

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:process.env.email,
      pass: process.env.password
    }
  });


app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.post("/sendMail",(req,res)=>{
    const {name,email,msg} = req.body
    var mailOptions = {
        from: email,
        to: process.env.email,
        subject: 'Sending Email For Inquiry',
        text:msg
      }
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(304).send(error)
        } else {
          console.log('Email sent: ' + info.response);
        res.status(200).send("Mail Sent")
        }
      });
})

app.listen(PORT,()=>{
    console.log(`Server Listening on PORT ${PORT}`);
})

