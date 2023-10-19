import { connectMongoDB } from "@/src/db/mongoose";
import User from "@/src/models/user";
import { NextResponse } from "next/server";

export default async function handler(req, res){
    if(req.method === "POST"){
        const {email, password} = req.body;
        try{
            await connectMongoDB();
            const foundUser = await User.findOne({email});
            if(!foundUser){
                return res.status(400).send({error: "User doesn't exist"});
            }

            const authenticatedUser = await User.checkLoginCredentials(email, password);
            const token = await authenticatedUser.generateAuthTokens();

            const response = NextResponse.json({
                message: "Logged in successfully",
                success: true
            })
    
            response.cookies.set("language-game", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),  // expires in 1 day
                httpOnly: true
            })
            
            return res.status(200).send("Logged in successfully");
        }
        catch(err){
            console.log(err);
            res.status(400).send({msg: err});
        }
    }
}