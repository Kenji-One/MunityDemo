/* eslint-disable import/no-anonymous-default-export */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Banner from "@/components/community/communityBG/Banner";
import Profile from "@/components/Profile/Profile";
import Loader from "@/utils/Loader";
import { useWeb3Context } from "@/utils";
export default function ProfilePage() {
  const { addressCommunitiesData, addressCommunitiesDataLoading } =
    useWeb3Context();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [communities, setCommunities] = useState([]);
  const router = useRouter();
  const { id } = router.query; // Retrieve the user ID from the URL
  console.log(
    "addressCommunitiesDataaaaaaaaaaaaaaaaaaaa:",
    addressCommunitiesData
  );
  useEffect(() => {
    // console.log("user id from router:", id);
    // const fetchUserData = async () => {
    //   try {
    //     const response = await fetch(`/api/users/${id}`);
    //     const data = await response.json();
    //     if (!data.success) router.push("/main");
    //     console.log("user was Found");
    //     setUserData(data.data);
    //   } catch (error) {
    //     console.error("Failed to fetch user data:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // const getCommunityByUserAddress = async (userId) => {
    //   try {
    //     const response = await fetch(`/api/communities?userId=${userId}`);
    //     if (!response.ok) {
    //       console.log("user does not have any community");
    //       // return "user does not have any community";
    //     }
    //     const data = await response.json();
    //     if (data.success && data.data) {
    //       console.log("current user's community was found:", data);
    //       setCommunities([data.data]);
    //     } else {
    //       console.error("Error fetching community:", data.error);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // // if (!id) {
    // //   console.log("You can't access this page without id");
    // //   // If the id is not declared, redirect to the main page
    // //   router.push("/main");
    // // } else {
    // //   fetchUserData();
    // //   getCommunityByUserAddress(id);
    // //   console.log("this is single page of:", id);
    // // }
    // if (id) {
    //   fetchUserData();
    //   getCommunityByUserAddress(id);
    //   // console.log("this is single page of:", id);
    // }
    setCommunities(addressCommunitiesData);
    setLoading(addressCommunitiesDataLoading);
  }, [addressCommunitiesData, addressCommunitiesDataLoading]);
  return (
    <Box className="relative overflow-hidden">
      <Loader open={loading} />
      <Banner
        bannerIMG={userData.user_banner || "/images/defaultBanner.jpg"}
        height="320px"
      />
      <Profile userData={userData} userCommunities={communities} />
    </Box>
  );
}
