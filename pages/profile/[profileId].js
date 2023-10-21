import Navbar from "@/components/Navbar";
import PublicProfile from "@/components/PublicProfile";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import PublicLeaderboard from "@/components/PublicLeaderboard";

export default function profilePage(){
    const [userData, setUserData] = useState(null);
    const router = useRouter();
    const { profileId } = router.query;

    useEffect(()=>{
        const findProfile = async ()=>{
            if(profileId){
                const response = await axios.get(`/api/users/${profileId}`);
                setUserData(response.data);
            }
        }

        findProfile();
    }, [profileId])

    return (
        <>
            <Navbar />
            <div className={styles.dashboardContainer}>
                {userData && <PublicProfile userData={userData}/>}
                {userData && userData.scoreboard && <PublicLeaderboard scoreboard={userData.scoreboard}/>}
            </div>
        </>
    )
}