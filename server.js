import 'dotenv/config';
import express from 'express';
import twilio from 'twilio';

const app = express();
const port = process.env.PORT || 10000;

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.get('/call', async (req, res) => {
  try {
    const call = await client.calls.create({
      from: process.env.TWILIO_FROM,
      to: process.env.TWILIO_TO,
      url: 'This is an SOS Call. Check the location sent to u via message';
    });
    res.send(`✅ Call initiated: ${call.sid}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Error: ' + err.message);
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
