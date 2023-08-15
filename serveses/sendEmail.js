import nodemailer from  "nodemailer" ;
import dotenv from "dotenv" 
dotenv.config() ;

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_SERVICE_MAIL, // Replace with your Outlook email address
        pass: process.env.EMAIL_SERVICE_PASSWORD+'#', // Replace with your Outlook email password
    },
    tls: {
        ciphers: 'SSLv3',
    },
});

export default async function sendEmail(eamil , html){
    const mailOptions = {
        from: process.env.EMAIL_SERVICE_MAIL,
        to: eamil, 
        subject: 'confirmation email',
        html,
    };
    await transporter.sendMail(mailOptions) ;
}