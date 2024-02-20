/* eslint-disable import/no-anonymous-default-export */
// import { useState } from "react";
import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import LoadmoreShowLess from "../../LoadmoreShowLess";
import CustomCard from "../../CustomCard";
const fetchProducts = async () => {
  const query = `
{
  products(first: 10) {
    edges {
      node {
        id
        title
        descriptionHtml
        images(first: 1) {
          edges {
            node {
              src
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
}`;

  try {
    const response = await fetch(
      "https://grace-v1-incubella.myshopify.com/api/2024-01/graphql.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/graphql",
          "X-Shopify-Storefront-Access-Token":
            "0e1ba01e4cb96bb77e13655eeb55355a",
        },
        body: query,
      }
    );
    const { data } = await response.json();
    console.log("Data:", data);
    // return data.products.edges.map(({ node }) => ({
    //   node: {
    //     ...node,
    //     price: node.variants.edges[0]?.node.priceV2.amount,
    //     currencyCode: node.variants.edges[0]?.node.priceV2.currencyCode,
    //     image: node.images.edges[0]?.node.src,
    //     url: `${shopBaseUrl}/products/${node.handle}`, // Construct the product URL
    //   },
    // }));
    return data.products.edges;
  } catch (error) {
    console.error("Error fetching user:", error);
  }

  // return data.products.edges.map(({ node }) => ({
  //   label: node.title,
  //   price: node.variants.edges[0]?.node.price,
  //   image: node.images.edges[0]?.node.src,
  // }));
};
export default function Merch(props) {
  const { merchContentFirstPart, mainMerchContent, areNFTs } = props;
  const shopBaseUrl = "grace-v1-incubella.myshopify.com";
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);
  return (
    <Box className={`${!areNFTs ? "blur-[10px] pb-4" : ""} `}>
      <Stack
        className="mb-8 tab:gap-6 mob:gap-y-[16px]"
        direction={{ mob: "column", tab: "row" }}
        // justifyContent="end"
        alignItems={"center"}
        flexWrap="wrap"
      >
        {products.slice(0, 3).map((product, index) => (
          <Box key={product.node.id} className="h-[519px] w-full max-w-[376px]">
            <CustomCard
              merchCardClasses={"!justify-end"}
              title={product.node.title}
              backgroundImg={true}
              titleColor="#fff"
              showIcon={false}
              cardImg={product.node.images.edges[0].node.src}
              buttonVariant="button"
              buttonText="CHECK SIZES"
              titleFontSize="24px"
              link={true}
              url={`${shopBaseUrl}/products/${product.node.title
                .toLowerCase()
                .replace(/ /g, "-")}`}
              buttonStyle={{
                backgroundColor: "#34A4E0",
                padding: "16px 24px",
                textDecoration: "none",
                color: "#10111B",
              }}
              cardClassNames="h-full w-full mob:px-4 mob:pb-6 tab:pl-6 tab:pb-8 justify-end !bg-center"
            />
          </Box>
        ))}
      </Stack>

      <LoadmoreShowLess
        classNames={`grid gap-6 `}
        nav={"merch"}
        areNFTs={areNFTs}
        data={products}
        initialItems={4}
        step={4}
        renderItem={(item) => (
          <CustomCard
            link={true}
            title={item.node.title}
            price={item.node.variants.edges[0]?.node.priceV2.amount}
            cardImg={item.node.images.edges[0].node.src}
            buttonText="Buy Now"
            titleFontSize="18px"
            url={`${shopBaseUrl}/products/${item.node.title
              .toLowerCase()
              .replace(/ /g, "-")}`}
          />
        )}
        addSX={{
          gridTemplateColumns: {
            // lap: "repeat(auto-fit, minmax(260px, 1fr))",
            "mob-xs": "repeat(auto-fit, minmax(260px, 1fr))",
            mob: "1fr",
          },
        }}
      />
    </Box>
  );
}
