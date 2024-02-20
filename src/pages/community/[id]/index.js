import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import SideBarContent from "../../../components/LiveChat/SideBarContent";
import SideBar from "../../../components/sidebar";
import styles from "../community.module.scss";
import Userprofile from "../../../components/community/userprofile";
import Banner from "../../../components/community/communityBG/Banner";
import { useWeb3Context } from "@/utils";
import { useParams } from "next/navigation";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import ReusableModal from "@/components/modal/ReusableModal";
import SellItemForm from "@/components/settings/NotMinted/SellItemForm";
import Loader from "@/utils/Loader";
import { formatDate } from "@/utils/helpers";

const dummyData = {
  name: "Iman Gadzhi",
  chain: "Ethereum",
  category: "Finances",
  joinedDate: "OCT 22",
  communityIMG: "/images/CommunityImage.png",
  users: "12k+",
  by: "ImanGadzhi",
  slotsLeft: "2,102",
  isVerified: true,
  about: [
    "Lorem ipsum dolor sit amet consectetur. Hendrerit elit mauris morbi nunc. Felis hendrerit a purus leo erat eget lectus laoreet. In amet dolor duis mauris cursus tincidunt pellentesque lectus. Aliquam velit rhoncus eget dignissim integer. Semper lectus mattis penatibus libero feugiat felis volutpat et id. Leo tellus ut velit vehicula purus vitae turpis dignissim aliquam. Eu ut rhoncus non augue. Vitae metus mattis nulla velit leo sed at condimentum. Sodales ipsum donec sed vulputate erat enim maecenas mi. Viverra pharetra consectetur erat odio lectus commodo sagittis amet sit. Dui metus egestas libero fames congue morbi semper. Accumsan cursus in at massa. ",
    " Sagittis maecenas arcu at vitae et egestas ut. Mauris venenatis fusce sed enim magna bibendum dignissim. Quam in sagittis ipsum sit in elementum. Turpis lorem nisl nec habitasse purus. Vitae sed et lacus sollicitudin magna interdum hendrerit facilisi enim. Feugiat hac odio accumsan libero. Non habitant egestas vulputate phasellus non urna. Mauris sed vulputate dolor commodo dolor dolor. Consectetur pellentesque feugiat urna odio nulla blandit. Morbi orci nunc leo risus. Pellentesque at feugiat pulvinar id ullamcorper sed. Nisl purus placerat est in turpis tortor morbi. Imperdiet nisl enim metus eu. Etiam orci ut a lacus mollis.",
  ],
};

const SingleCommunityPage = () => {
  const {
    getCommunityDetailsById,
    getCommunityJoinedMembers,
    getUserCommunityBalance,
    address,
    chainId,
  } = useWeb3Context();

  const [backendcommunityData, setBackendCommunityData] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [communityDataContract, setCommunityDataContract] = useState(null);
  const [userCommunityBalance, setUserCommunityBalance] = useState({
    id: null,
    balance: "0",
  });

  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = router.query; // Retrieve the community ID from the URL
  const { theme } = useSelector((state) => state.app);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    // If the id is declared, redirect to the main page
    if (!id) {
      console.log("You can't access this page without id");
      // router.push("/main");
    } else {
      // setLoading(false);
      console.log("this is single page of:", id);
    }
  }, [id, router]);

  const params = useParams();
  console.log("SingleCommunityPage", params);
  useEffect(() => {
    setCurrentId(params ? params.id : null);
  }, [params]);

  useEffect(() => {
    // Define the function inside useEffect
    const fetchCommunityDataFromBackend = async (currentId) => {
      try {
        const response = await fetch(`/api/communities/contract/${currentId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBackendCommunityData(data.data);
        console.log("backend community data:", data);
        return data.data;
      } catch (error) {
        console.error("Failed to fetch community data:", error);
      }
    };
    const fetchCommunityData = async (currentId) => {
      try {
        setLoading(true);
        const data2 = await getCommunityDetailsById(currentId);
        const dataBackend = await fetchCommunityDataFromBackend(currentId);
        console.log("ddsdsdsdsdsd currentId", currentId, data2);
        const joinedDate = dataBackend.createdAt
          ? formatDate(dataBackend.createdAt)
          : formatDate(new Date());
        if (data2 !== null) {
          const joinedUsers = await getCommunityJoinedMembers(
            currentId,
            data2.chainId
          );

          const communityData = {
            communityId: currentId,
            name: data2
              ? data2.communityData?.name
              : dataBackend
              ? dataBackend.name
              : "",
            chain: data2.chainId,
            category: dataBackend.category
              ? dataBackend.category
              : "D.Finances",
            joinedDate: joinedDate,
            community_avatar: data2.communityData?.avatarImage,
            communityIMG: data2.communityData?.image,
            communityIMGBanner: data2.communityData?.bannerImage,
            users: joinedUsers,
            by: data2 ? data2.creator : "ImanGadzhi",
            slotsLeft: data2 ? data2.supply : null,
            isVerified: dataBackend.is_verified,
            about: [
              data2
                ? data2.communityData?.description
                : dataBackend?.description,
            ],
          };

          setCommunityDataContract(communityData);
          // setLoading(false);
        }
      } catch (error) {
        // setLoading(false);

        console.error("Failed to fetch community data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function
    if (currentId != null && chainId != "") {
      fetchCommunityData(currentId);
    }
  }, [currentId, chainId]);

  useEffect(() => {
    if (communityDataContract != null && address != "") {
      (async () => {
        const balance = await getUserCommunityBalance(address, currentId);
        setUserCommunityBalance({ id: currentId, balance });
      })();
    }
    // console.log(communityDataContract&&communityDataContract)
  }, [communityDataContract, address]);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  // useEffect(() => {
  //   // Define the function inside useEffect
  //   if (currentId) {
  //     console.log(currentId);
  //     const fetchCommunityData = async () => {
  //       try {
  //         const response = await fetch(`/api/communities/contract/${currentId}`);
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         const data = await response.json();
  //         console.log("data:", data);
  //         setCommunityData(data.data);
  //       } catch (error) {
  //         console.error("Failed to fetch community data:", error);
  //       }
  //     };

  //     // Call the function
  //     fetchCommunityData();
  //   }
  // }, [currentId]);

  const channels = [
    { title: "Articles", badge: 2 },
    { title: "Upcoming Events", badge: 150 },
    { title: "Great news", badge: 200 },
    { title: "DAO Proposals", badge: 0 },
  ];
  const communityBackground = "/images/profileBanner.png";
  return (
    <Box>
      <Loader open={loading} />

      <Box className={styles["container"]}>
        {communityDataContract !== null ? (
          <>
            <Box className={styles["main"] + " relative overflow-hidden"}>
              <Banner bannerIMG={communityDataContract?.communityIMGBanner} />
              <Userprofile
                communityDatabase={backendcommunityData}
                communityDataContract={communityDataContract}
                userCommunityBalance={userCommunityBalance}
                handleOpenBuyForm={handleOpen}
              />
            </Box>

            <SideBar>
              <SideBarContent title={"General"} chats={channels} />
            </SideBar>
            <ReusableModal
              isOpen={modalOpen}
              handleClose={handleClose}
              title="MINT NFT"
            >
              <SellItemForm
                theme={theme}
                type="buy"
                tokenId={currentId}
                setLoading={setLoading}
              />
            </ReusableModal>
          </>
        ) : (
          <Box className="w-full">
            <Typography
              variant="h3"
              sx={{
                color: "primary.main",
                fontSize: {
                  mob: "20px",
                  lap: "30px",
                  desk: "44px",
                },
              }}
              className="lap:!mb-[52px] mob:!mb-6 lap:!mt-[152px] tab:!mt-[52px] mob:!mt-6 text-center"
            >
              Community Not Found
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SingleCommunityPage;
