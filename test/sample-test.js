const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", async function () {
  it("Should create market sales", async function () {
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftContractAddress = nft.address;

    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();
    const auctionPrice = ethers.utils.parseUnits("1", "ether");

    await nft.createToken("https://i.guim.co.uk/img/media/3c90fbf9666d4e73be1122eb33afed235db41b1f/0_0_5000_3000/master/5000.jpg?width=1200&quality=85&auto=format&fit=max&s=0c4de651644de5fe939d8dbd6b14ba66");
    await nft.createToken("https://cdn3.f-cdn.com/contestentries/1954354/17253458/60ccd8ba53dc6_thumb900.jpg");

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice,
    });
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice,
    });

    const [_, buyerAddress] = await ethers.getSigners();

    await market
      .connect(buyerAddress)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice });

    items = await market.fetchMarketItems();

    console.log("Thos are the items : ", items);
  });
});
