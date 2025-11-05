require('dotenv').config();

import express from "express";
import { log } from "node:console";
import twilio from "twilio";

const app = express();
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

app.get('/sos',async (req,res) => {
    try{
        const to = "+918927951351";
        const from = "+12513094209";
        const messageText = "SOS alert! Please check location sent to u in message";
        const twimlUrl = `https://twimlets.com/message?Message%5B0%5D=${encodeURIComponent(messageText)}`;
        const call = await client.calls.create({
      to,
      from,
      url: twimlUrl,
    });

    console.log("Call triggered: ", call.sid);
    res.json({ success: true , sid: call.sid});
    
    }catch(error){
        console.log("Error", error.message);
        res.status(500).json({success:false,error:error.message});        
    }
});

app.get('/',(req,res) => res.send("SOS Cal APi is live!"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
