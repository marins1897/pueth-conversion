import { ethers } from "ethers";
import { ConversionRate } from "../types/index";
import dotenv from "dotenv";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.INFURA_RPC_URL);

const vaultAbi = [
  "function totalAssets() view returns (uint256)",
  "function totalSupply() view returns (uint256)",
];

const VAULT_ADDRESS = process.env.VAULT_ADDRESS || "0x";

const contract = new ethers.Contract(VAULT_ADDRESS, vaultAbi, provider);

export async function fetchConversionRate(): Promise<ConversionRate | null> {
  try {
    const [assets, supply] = await Promise.all([
      contract.totalAssets(),
      contract.totalSupply(),
    ]);

    const totalAssets = assets.toString();
    const totalSupply = supply.toString();

    const rate =
      parseFloat(ethers.formatUnits(totalAssets)) /
      parseFloat(ethers.formatUnits(totalSupply));

    return {
      timestamp: new Date(),
      totalAssets,
      totalSupply,
      rate,
    };
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    return null;
  }
}
