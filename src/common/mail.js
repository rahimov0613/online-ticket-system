import { createTransport } from 'nodemailer'

const transport = createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 456,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

function sendMail(userMail) {
    try {
        const mailOptions = {
            from: "rakhimov0613@gmail.com",
            to: userMail,
            subject: "Sending Email with nodemailer",
            text: "qachon cs go ga boramiz",
            name: "abdulhamid"
        };
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent", info.response);
            }
        });
    } catch (error) {
        console.log("ERROR:", error);

    }
};
sendMail("bexebot282@gmail.com")