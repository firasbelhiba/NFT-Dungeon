import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3Modal";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { nftAddress, nftMarketAddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });

  const router = useRouter();
  const file = e.target.files[0];
  try {
    const added = await client.add(file, {
      progress: (p) => console.log(`Received: ${prog}`),
    });
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    setFileUrl(url);
  } catch (error) {
    console.log(error);
  }
}
