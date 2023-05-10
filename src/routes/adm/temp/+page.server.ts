import nodemailer from 'nodemailer';
import { EMAIL, EMAIL_PASSWORD } from '$lib/server/secrets';

export const load = async () => {
	
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: EMAIL, // generated ethereal user
                pass: EMAIL_PASSWORD // generated ethereal password
            }
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Jovany Vélez" jovany.velez@zohomail.com', // sender address
            to: 'jovany.velez@gmail.com, spvergara@gmail.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        });
        return {enviado:true}
    } catch (error) {
        return {enviado:false}
    }

};
