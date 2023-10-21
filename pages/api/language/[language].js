// Retrieve leaderboard for a particular language

import Score from "@/src/models/score";

export default async function handler(req, res) {
    if(req.method === "GET"){    // retrieve leaderboard for a language   GET /api/language/:language
        const { language } = req.query;
        const scores = await Score.find({language: language});
        res.status(200).send(scores);
    }
}  