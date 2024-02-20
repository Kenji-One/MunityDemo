import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SideBarContent from "../../components/LiveChat/SideBarContent";
import SideBar from "../../components/sidebar";
import styles from "./community.module.scss";
import Userprofile from "../../components/community/userprofile";
import Banner from "../../components/community/communityBG/Banner";
import Loader from "@/utils/Loader";
import Popular from "@/components/main/Popular";
const CommunityPage = () => {
  const [loading, setLoading] = useState(true);

  const [communityData, setCommunityData] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  console.log("loading:", loading);
  // useEffect(() => {
  //   // If the user is not connected, redirect to the main page
  //   if (!id) {
  //     console.log("You can't access this page without community id");
  //     router.push("/main");
  //   } else {
  //     setLoading(false);
  //     console.log("this is single page of:", id);
  //   }
  // }, [id, router]);
  useEffect(() => {
    // Define the function inside useEffect
    const fetchCommunityData = async () => {
      try {
        const response = await fetch("/api/communities");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("data:", data);
        setCommunityData(data.data);
      } catch (error) {
        console.error("Failed to fetch community data:", error);
      }
    };

    // Call the function
    fetchCommunityData();
  }, []); // Empty dependency array means this effect will only run once, similar to componentDidMount

  const channels = [
    { title: "Articles", badge: 2 },
    { title: "Upcoming Events", badge: 150 },
    { title: "Great news", badge: 200 },
    { title: "DAO Proposals", badge: 0 },
  ];
  const communityBackground = "/images/profileBanner.png";

  // if (!communityData) {
  //   return <div>Loading...</div>;
  // }
  return (
    <Box>
      <Loader open={loading} />

      <Box className={styles["container"]}>
        {/* <Box className={styles["main"] + " relative overflow-hidden"}>
          <Banner bannerIMG={communityBackground} />
          <Userprofile communityDatabase={communityData} />
        </Box> */}
        <Popular
          sectionTitle={"CATEGORY: GAMING"}
          sectionNum={"05."}
          popularsData={communityData}
        />
        {/* <SideBar>
          <SideBarContent title={"General"} chats={channels} />
        </SideBar> */}
      </Box>
    </Box>
  );
};

export default CommunityPage;
