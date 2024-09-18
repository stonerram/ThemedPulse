const User = require('./Model/UserModel');
const config = require('./Config/config');
const nodemailer = require('nodemailer');
const cron = require('node-cron');



const sendMailToAllUser = async (emailObj) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: config.GMAIL_USER,
            pass: config.GMAIL_PASS
        }
    });
    const mailOptions = {
        from: 'Pulse project',
        to: emailObj,
        subject: 'Cron Test Mail',
        html: '<p style="color: green;">Hello <br>This is Cron Testing Mail<br> The Cron features have been implemented successfully! <br>Thanks & Regards</p>'
    }
    transporter.sendMail(mailOptions, function (error, info) {
        console.log(mailOptions);
        if (error) {
            console.log(error);
        }
        else {
            console.log('Mail has been sent:-', info.response);
        }
    });

}


const sendMailAllUser = () => {
    try {
        cron.schedule('0 0 0 * * *', async function () {
            var userData = await User.find({});
            console.log(userData);
            if (userData.length > 0) {
                const currentDate = new Date();
                const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
                console.log(formattedDate);

                const todayBirthDay = userData.filter(key => {
                    const dob = new Date(key.dateOfBirth); // Convert dateOfBirth string to Date object
                    const formattedDOB = `${dob.getDate().toString().padStart(2, '0')}-${(dob.getMonth() + 1).toString().padStart(2, '0')}-${dob.getFullYear()}`;
                    return formattedDOB === formattedDate;
                });
                const emails = todayBirthDay.map(key => key.email);

                if (emails.length > 0) {
                    // Send emails only if there are users with today's birthday
                    await sendMailToAllUser(emails);
                }

                console.log('Emails sent to:', emails);

                //  const emails = userData.map(key => key.email);
                //  await sendMailToAllUser(emails);
            }
        });
    }
    catch (error) {
        console.log('Error Message');
    }
}
module.exports = { sendMailAllUser }
