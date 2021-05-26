const nodemailer = require('nodemailer');
const { google } = require('googleapis');

async function mailReq(to, subject, text, html) {
    try {
        //anu-architects
    const clientId = '725522746985-0lgpaf0mngerqvmnsidqjpgauu3jl488.apps.googleusercontent.com'
    const clientSecret = 'rs7GydModiwZ0JotYOql-Fkp'
    const redirectUri = 'https://developers.google.com/oauthplayground'
    const refreshToken ='1//04Z8hihUJ5Vh0CgYIARAAGAQSNwF-L9IriapetACJoS91zdv2ze10TfrJFVwwMy-XYO35VuCh0FONzMK4VHz6t13I7qV2gnnEhUQ'

    const auth = new google.auth.OAuth2(clientId, clientSecret, redirectUri)
    auth.setCredentials({ refresh_token: refreshToken })
    const accessToken = await auth.getAccessToken(()=>auth)

    // stap 1 transporter
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'anu.arch.rl@gmail.com',
            clientId,
            clientSecret,
            refreshToken,
            accessToken 
        }
    })

    // stap 2 mail options
    const mailOptions = { to, subject, text, html}
        
    // stap 3 sendMail
        transport.sendMail(mailOptions, function (err, res) {
            if(err) return res.status(404).send('An error occurred: ' + err.message);
            return res.send('Email sent!!!');
        })
    } catch (err){
         return console.log('An error occurred: ' + err.message);
    }
}

exports.mailReq = mailReq;
