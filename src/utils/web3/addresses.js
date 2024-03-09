import { munityABI } from "../abis/erc1155Munity";
import { ChainIds } from "./chains";
export const IS_TEST_MODE = true;

export const addresses = {
  [ChainIds.Ethereum]: {
    name: "Ethereum Mainnet",
    addresses: {
      DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      WMATIC: "0x7c9f4c87d911613fe9ca58b579f737911aad2d43",
    },
  },
  [ChainIds.Polygon]: {
    name: "Polygon Mainnet",
    addresses: {
      DAI: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
      USDC: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      USDT: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      WETH: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      WMATIC: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    },
  },
};

export const MUNITY_CONFIG = {
  [ChainIds.Ethereum]: {
    rpcUrl: "https://sepolia.infura.io/v3/",
    // address:"0x16a26E0cB9b8423F806672bf584F8de8bbC9eB96", //old
    // address:"0x888A2f8A786994868A27D442Ea559020D19ACfB4", //25 jan 1 pm
    // address:"0x599B5677EDc0484469343534239a7EA675e9abd4", //25 jan 4 pm
    address: "0x2ca0c5AD64F6ad178798bC8Fcc33EA3ebf33eE28", //2 feb 6:30 pm //change uri
    abi: munityABI,
    name: "sepolia",
  },
  [ChainIds.Polygon]: {
    rpcUrl:
      "https://polygon-mumbai.g.alchemy.com/v2/SQJNaaxbCt0gWB9xXbeDxshDKj2NOqth",
    // address:"0xc65e05B01167F2458944ecEfF28528209E8d588E", //26 jan 4:30 pm
    address: "0x5224b9C833925fD6dc5f5Ec51CF6Ce347b39CB47", //2 feb 6:30 pm //change uri
    abi: munityABI,
    name: "mumbai",
  },
};

export const GET_MARKETPALCE_URL = (chainId, tokenId) => {
  return chainId
    ? `https://testnets.opensea.io/assets/${MUNITY_CONFIG[chainId].name}/${MUNITY_CONFIG[chainId].address}/${tokenId}`
    : "#";
};
