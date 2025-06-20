
import transporter from "@/lib/nodemailer";
import { render } from "@react-email/render";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const emailHtml = await render(VerificationEmail({ username, otp: verifyCode }));

    await transporter.sendMail({
      from: `"CipherChat" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "CipherChat Verification Code",
      html: emailHtml,
    });

    return { success: true, message: "Verification email sent successfully." };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
}
