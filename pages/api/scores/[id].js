// Save & Retrieve Record for a particular user

import { connectMongoDB } from "@/src/db/mongoose";
import Score from "@/src/models/score";
import User from "@/src/models/user";

export default async function handler(req, res) {
    if(req.method === "GET"){           // retrieve all records for a user     GET /api/scores/:_id
        const { id } = req.query;
        const users = await User.findOne({_id: id});
        res.status(200).send(users.scoreboard);
    }
    else if(req.method === "POST"){     // create new record for a user         POST /api/scores/:_id
        const {language, difficulty, quantity, yourScore, totalScore, rating} = req.body;
        const {id} = req.query;
        try{
            await connectMongoDB();
            const authUser = await User.findOne({_id: id});
            if(!authUser){
                return res.status(400).send({error: "Unauthorized: Please authenticate yourself"});
            }

            const newScore = {language, difficulty, quantity, yourScore, totalScore, rating};
            
            authUser.scoreboard = authUser.scoreboard.concat(newScore);
            const savedUser = await authUser.save();
            const createdScore = new Score({
                language, difficulty, quantity, user: authUser.email.split("@")[0].replace(/[.+-]/g, "_"), yourScore, totalScore 
            });
            await createdScore.save();
            return res.status(200).send(savedUser);
        }
        catch(err){
            console.log(err);
            res.status(400).send({msg: err});
        }
    }
}  