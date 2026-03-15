import nodemailer from "nodemailer";

export const sendEmailOTP = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your ChitChat Account Verification Code",
            text: `Your verification code is: ${otp}. It will expire in 10 minutes.`,
            html: `<p>Your verification code is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`
        };

        await transporter.sendMail(mailOptions);
        console.log("OTP Email sent successfully to:", email);
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw new Error("Could not send email OTP");
    }
};
