const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    // secure: false,
    // port: 25,
    // tls: {
    //     rejectUnauthorized: false
    // },
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
        user: 'itjob210@gmail.com', // generated ethereal user
        pass: 'ideapad333', // generated ethereal password
    }
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.post('/sendMessage', async function (req, res) {
    let {name, contacts, message} = req.body
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'My profile page', // sender address
        to: "itjob210@gmail.com", // list of receivers
        subject: "My profile page", // Subject line
        // text: "Привет! Это твое первое письмо", // plain text body
        html: `<b>Сообщение с Вашего portfolio page</b>    
            <div>
                name:${name}
            </div>
            <div>
               contacts: ${contacts}
            </div>
            <div>
             message: ${message}
            </div>`
    });
    res.send('YO!');
});

app.listen(3010, function () {
    console.log('Example app listening on port 3000!');
});


