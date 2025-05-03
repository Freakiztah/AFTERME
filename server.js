const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// 💌 Use your Gmail + App Password (Make sure 'user' and 'from' match!)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aol.mikez30@gmail.com',
    pass: 'cxmj jhap qncl dcha' // App password from your Google account
  }
});

app.post('/send-email', (req, res) => {
  const { link } = req.body;

  if (!link) {
    return res.status(400).json({ message: 'Missing link in request body.' });
  }

  const mailOptions = {
    from: 'aol.mikez30@gmail.com',
    to: 'aol.mikez30@gmail.com',
    subject: 'Your Link is Ready',
    text: `Hi there!\n\nMichael is sending you this link: ${link}\n\nHe really loves you all!`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.status(500).json({ message: 'Error sending email', error: error.toString() });
    }
    console.log('Email sent:', info.response);
    res.json({ message: 'Email sent successfully!' });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
