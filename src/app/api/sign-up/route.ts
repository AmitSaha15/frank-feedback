import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs'

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request){
    await dbConnect();

    try {
        const { username, email, password } = await request.json();

        const existingVerifiedUserByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        });

        if (existingVerifiedUserByUsername) { //checking if username given by the user is already taken or not
            return Response.json(
                {
                    success: false,
                    message: 'Username is already taken',
                },
                { status: 400 }
            );
        }

        const existingUserByEmail = await UserModel.findOne({ email });
        let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) { //checking if email given by the user is already taken or not
            if(existingUserByEmail.isVerified){// email exists and also verified
                return Response.json(
                    {
                      success: false,
                      message: 'This email is already taken',
                    },
                    { status: 400 }
                );
            } else{//email exists but not verified in this case we will allow the new user to use the email
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        } else { //above checks passed the user is a new user
            const hashedPassword = await bcrypt.hash(password, 10); //password encryption
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            // save the details of new user
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMsg: true,
                messages: [],
            });
            await newUser.save();
        }

        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )

        // send verification email
        if(!emailResponse.success){
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message
                },
                {status: 500}
            );
        }

        return Response.json(
            {
                success: true,
                message: "Registered successfully. Please verify your account"
            },
            {status: 201}
        );

    } catch (error) {
        console.error('Error registering user:', error);
        return Response.json(
            {
                success: false,
                message: 'Error registering user',
            },
            { status: 500 }
        );
    }
}