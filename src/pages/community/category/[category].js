import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import styles from "../community.module.scss";
import Loader from "@/utils/Loader";
import Popular from "@/components/main/Popular";
const CategoryPage = () => {
  const [loading, setLoading] = useState(true);

  const [communityData, setCommunityData] = useState([]);
  const router = useRouter();
  const { category } = router.query;

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
      } finally {
        setLoading(false);
      }
    };

    // Call the function
    if (category) fetchCommunityData();
  }, [category]); // Empty dependency array means this effect will only run once, similar to componentDidMount

  return (
    <Box className="container mx-auto px-4 my-[120px]">
      <Loader open={loading} />
      <Box className={styles["container"]}>
        <Popular
          sectionTitle={`CATEGORY: ${category}`}
          // sectionNum={"05."}
          popularsData={communityData}
        />
      </Box>
    </Box>
  );
};

export default CategoryPage;
