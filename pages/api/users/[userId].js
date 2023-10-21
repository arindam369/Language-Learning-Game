import User from "@/src/models/user";

export default async function handler(req, res) {
    const {userId} = req.query;
    if(req.method === "GET"){           // retrieve particular user data
        const user = await User.findOne({_id: userId});
        res.status(200).send({_id: user._id, name: user.name, email: user.email, scoreboard: user.scoreboard});
    }
}  