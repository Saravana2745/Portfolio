const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error('MongoDB connection error:', err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/portfolio', { useNewUrlParser: true, useUnifiedTopology: true });
const ContactSchema = new mongoose.Schema({ name: String, email: String, message: String });
const Contact = mongoose.model('Contact', ContactSchema);

// Nodemailer setup (use your Gmail credentials and enable "less secure apps" or use App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Saravana2745@gmail.com',
    pass: 'xvpu brxu upxs bunu'
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    // Save to MongoDB
    await Contact.create({ name, email, message });

    // Send email
    await transporter.sendMail({
      from: req.body.email,
      to: 'Saravana2745@gmail.com',
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));