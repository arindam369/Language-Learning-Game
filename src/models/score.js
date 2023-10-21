import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
    {
        language: String,
        difficulty: String,
        quantity: String,
        user: String,
        yourScore: String,
        totalScore: String
    }
);

const Score = mongoose.models.Score || mongoose.model("Score", scoreSchema);
export default Score;