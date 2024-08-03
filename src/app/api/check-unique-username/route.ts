import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod";
import { validUserName } from "@/schemas/signUpSchema";


const usernameQuerySchema = z.object({
    username: validUserName,
})

export async function GET(request: Request){
    await dbConnect();

    try { //url se check karenge hum username
        const {searchParams} = new URL(request.url);
        const queryParam = {
            username: searchParams.get('username')
        }

        // username validation using zod
        const result = usernameQuerySchema.safeParse(queryParam);
        // console.log(result)

        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json(
                {
                    success: false,
                    message: usernameErrors?.length > 0 ? usernameErrors.join(', '):'Invalid query parameters',
                },
                { status: 400 }
            );
        }

        const {username} = result.data;
        const existingVerifiedUsername = await UserModel.findOne({username, isVerified: true});

        if(existingVerifiedUsername){
            return Response.json(
                {
                    success: false,
                    message: 'Username is already taken',
                },
                { status: 400 }
            );
        }

        return Response.json(
            {
                success: true,
                message: 'Username is available',
            },
            { status: 400 }
        );

    } catch (error) {
        console.error("Error checking username", error)
        return Response.json(
            {
                success: false,
                message: 'Error checking username',
            },
            { status: 500 }
        );
    }
}