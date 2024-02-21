import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import Loader from "@/utils/Loader";
import SettingsNav from "../../components/settings/Navigation";
import { useWeb3Context } from "@/utils";
export default function Settings() {
  const { theme, userAddress } = useSelector((state) => state.app);
  const router = useRouter();
  //======================== CONTRACT FUNCTIONS start =========================

  const {
    address,
    connected,
    registerCommunity,
    registerCommunityLoading,
    buyCommunityNft,
    addressCommunitiesData,
    getUserTotalCommunitiesRegistered,
    chainId,
  } = useWeb3Context();
  //================================================================

  const [communityDataContract, setCommunityDataContract] = useState(null);
  useEffect(() => {
    // If the user is not connected, redirect to the main page
    if (connected === false) {
      console.log("User is not connected", connected);
      // router.push("/main");
    } else {
      console.log("User is connected", connected);
    }
  }, [connected, router]);

  const refetchData = async () => {
    if (chainId != "" && address != "") {
      getUserTotalCommunitiesRegistered(address);
    }
  };

  useEffect(() => {
    console.log("addressCommunitiesData", addressCommunitiesData);
    if (addressCommunitiesData.length > 0) {
      setCommunityDataContract(addressCommunitiesData[0]);
    }
  }, [addressCommunitiesData]);

  const [hasCommunity, setHasCommunity] = useState(true);
  const [creatorCommunityData, setCreatorCommunityData] = useState([]);

  //======================== CONTRACT FUNCTIONS end =========================

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleCommunitySubmit = async (communityData, id, hasFiles) => {
    setLoading(true);
    const method = id ? "PUT" : "POST";
    const endpoint = id ? `/api/communities/${id}` : "/api/communities";
    // Prepare headers based on whether FormData is being sent
    const headers = { "Content-Type": "application/json" };
    // console.log("headers:", headers, "endpoint", endpoint, "method", method);
    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: headers,
        body: communityData,
      });
      const data = await response.json();
      if (data.success) {
        console.log("Community action successful");
        setCreatorCommunityData(data.data);
        setHasCommunity(true);
        setLoading(false);
        setSnackbar({
          open: true,
          message: `Community ${
            method === "PUT" ? "updated" : "created"
          } successfully`,
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: `Something is wrong with the content you provided, ERROR:${data.error}.`,
          severity: "error",
        });
        setLoading(false);
        // console.error("Error with community action:", data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleFeatureChange = async (featureKey, isActive, url) => {
    setLoading(true);

    try {
      // console.log(featureKey, url, creatorCommunityData._id);
      const response = await fetch(
        `/api/communities/${creatorCommunityData._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            featureKey: featureKey,
            is_active: isActive,
            url: url,
          }), // send only the fields that need to be updated
        }
      );

      const data = await response.json();
      if (data.success) {
        setSnackbar({
          open: true,
          message: `Updated successfully`,
          severity: "success",
        });
        // console.log(
        //   `${featureKey} active state updated successfully: ${data.data.is_active}`
        // );
        setLoading(false);
      } else {
        setSnackbar({
          open: true,
          message: `Something is wrong with the content you provided, ERROR:${data.error}.`,
          severity: "error",
        });
        setLoading(false);
        // console.error(`Error updating ${featureKey} active state:`, data.error);
      }
    } catch (error) {
      console.error(`Error updating ${featureKey} active state:`, error);
    }
  };

  const addOrUpdateRoadmap = async (roadmapData) => {
    setLoading(true);

    try {
      const response = await fetch(
        `/api/communities/${creatorCommunityData._id}/roadmaps`,
        {
          method: "POST", // Assume POST handles both adding and updating based on the presence of _id in roadmapData
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(roadmapData),
        }
      );
      const data = await response.json();
      if (data.success) {
        // setSnackbar({
        //   open: true,
        //   message: `Roadmap added/updated successfully`,
        //   severity: "success",
        // });
        setLoading(false);
        // Update the entire community data state with the new roadmaps list
        setCreatorCommunityData({
          ...creatorCommunityData,
          roadmaps: data.data,
        });
        return data.data.data;
      } else {
        setSnackbar({
          open: true,
          message: `Something is wrong with the content you provided, ERROR:${data.error}.`,
          severity: "error",
        });
        setLoading(false);
        return [...creatorCommunityData.roadmaps.data, roadmapData];
        // console.error("Error adding/updating roadmap:", data.error);
      }
    } catch (error) {
      console.error("Error adding/updating roadmap:", error);
    }
  };

  const deleteRoadmap = async (roadmapId) => {
    setLoading(true);

    try {
      const response = await fetch(
        `/api/communities/${creatorCommunityData._id}/roadmaps/${roadmapId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({}),
        }
      );
      if (
        response.status === 204 ||
        response === "OK" ||
        response === "No Content"
      ) {
        setLoading(false);
        // Update the creatorCommunityData state to reflect the deletion
        setCreatorCommunityData((prevState) => {
          const updatedRoadmapData = prevState.roadmaps.data.filter(
            (roadmap) => roadmap._id !== roadmapId
          );

          return {
            ...prevState,
            roadmaps: {
              ...prevState.roadmaps,
              data: updatedRoadmapData,
            },
          };
        });

        console.log("Roadmap deleted successfully");
        // Optionally, refresh the community data to reflect the deletion
      } else {
        // If the response is not 204, attempt to parse and log the error
        const data = await response.json();
        console.error("Error deleting roadmap:", data.error);
      }
    } catch (error) {
      console.error("Error deleting roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCurrentUserByAddress = async () => {
      try {
        const API_URL = `/api/users?address=${address}`; // Adjust based on your API endpoint
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        console.log("user was found:", data.data);
        setUserData(data.data);
        return data.data._id; // Assuming the response includes user data under a 'user' key
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    const getCommunityByUserAddress = async () => {
      setLoading(true);
      let userId;
      if (address) {
        userId = await getCurrentUserByAddress();
      }
      try {
        const response = await fetch(`/api/communities?userId=${userId}`);
        if (!response.ok) {
          throw new Error("user does not have any community");
        }
        const data = await response.json();
        if (data.success && data.data) {
          console.log("Community was found", data.data);
          setCreatorCommunityData(data.data);
          setHasCommunity(true); // Set to true if community is found
        } else {
          setHasCommunity(false); // Set to false if no community is found
          console.error("Error fetching community:", data.error);
        }
      } catch (error) {
        console.error(error);
        setHasCommunity(false); // Set to false in case of error
      } finally {
        setLoading(false);
      }
    };
    if (address) getCommunityByUserAddress();
  }, [address, userAddress]);

  // if (!creatorCommunityData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Box>
      <Box>
        <Box className=" relative overflow-hidden">
          <Loader open={loading || !connected} />
          <SettingsNav
            hasCommunity={addressCommunitiesData.length > 0}
            setCreatorCommunityData={setCreatorCommunityData}
            creatorCommunityData={creatorCommunityData}
            theme={theme}
            communityDataContract={communityDataContract}
            refetchData={refetchData}
            handleSubmit={handleCommunitySubmit}
            handleToggleChange={handleFeatureChange}
            deleteRoadmap={deleteRoadmap}
            addOrUpdateRoadmap={addOrUpdateRoadmap}
            setLoading={setLoading}
            setSnackbar={setSnackbar}
            userAddress={address}
            userData={userData}
          />
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{
            borderRadius: "0",
            backgroundColor: "#eaeaea",
          }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{
              width: "100%",
              borderRadius: "0",
              "&.MuiAlert-standardSuccess": { color: "rgb(30, 70, 32)" },
              color: "#ff3333",
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
