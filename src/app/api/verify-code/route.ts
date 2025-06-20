import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse request body
    const { username, code } = await request.json();

    // Validate input
    if (!username || !code) {
      return Response.json(
        { success: false, message: "Username and code are required" },
        { status: 400 }
      );
    }

    const decodedUsername = decodeURIComponent(username);

    // Debug: Check what users exist
    const allUsers = await UserModel.find({}).limit(5);
    console.log(
      "Users in database:",
      allUsers.map((u) => ({ username: u.username, email: u.email }))
    );

    // Find user in database
    const user = await UserModel.findOne({ username: decodedUsername });
    console.log("Looking for:", decodedUsername);
    console.log("Found user:", user ? "YES" : "NO");

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if user is already verified
    if (user.isVerified) {
      return Response.json(
        { success: false, message: "User is already verified" },
        { status: 400 }
      );
    }

    // Check if the code is correct and not expired
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      // Update the user's verification status
      user.isVerified = true;
      await user.save();

      return Response.json(
        { success: true, message: "Account verified successfully" },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      // Code has expired
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired. Please sign up again to get a new code.",
        },
        { status: 400 }
      );
    } else {
      // Code is incorrect
      return Response.json(
        { success: false, message: "Incorrect verification code" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    return Response.json(
      { success: false, message: "Error verifying user" },
      { status: 500 }
    );
  }
}

// Optional: Add GET method for testing
export async function GET() {
  return Response.json({ message: "Verify code API is working" });
}
