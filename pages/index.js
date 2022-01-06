import { ethers, providers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3Modal";

import { nftAddress, nftMarketAddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

// componenets
import WelcomeBanner from "../components/welcome-banner";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNfts();
  }, []);

  async function loadNfts() {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://ropsten.infura.io/v3/c41b490b41d94038be111f8ba4221a08"
    );
    const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftMarketAddress,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (item) => {
        const tokenUri = await tokenContract.tokenURI(item.tokenId);

        const meta = await axios.get(tokenUri);

        let price = ethers.utils.formatUnits(item.price.toString(), "ether");

        let itemToDisplay = {
          price,
          tokenId: item.tokenId.toNumber(),
          seller: item.seller,
          owner: item.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };

        return itemToDisplay;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }

  async function buyNft(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftMarketAddress, Market.abi, signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      nftAddress,
      nft.tokenId,
      { value: price }
    );

    await transaction.wait();
    loadNfts();
  }

  if (loadingState === "loaded" && !nfts.length)
    return <h1>No items in the market place </h1>;

  return (
    <div>
      <WelcomeBanner />
      <div className="mt-100">
        <div className="container">
          <div className="section__head">
            <div
              className="d-md-flex
							sm:space-y-20
							space-x-20
							justify-content-between
							align-items-center"
            >
              <h2 className="section__title text-center">Explore</h2>
              <ul className="menu_categories space-x-20">
                <li>
                  <a href="#" className="color_brand">
                    <span> All </span>
                  </a>
                </li>
                <li>
                  {" "}
                  <a href="#">
                    <i className="ri-gamepad-line" /> <span> Games </span>
                  </a>
                </li>
                <li>
                  {" "}
                  <a href="#">
                    <i className="ri-brush-line" /> <span> Art </span>
                  </a>
                </li>
                <li>
                  {" "}
                  <a href="#">
                    <i className="ri-stock-line" /> <span> Trading Cards </span>
                  </a>
                </li>
                <li>
                  {" "}
                  <a href="#">
                    <i className="ri-music-line" /> <span> Music </span>
                  </a>
                </li>
                <li>
                  {" "}
                  <a href="#">
                    <i className="ri-global-line" /> <span> Domain Names </span>
                  </a>
                </li>
                <li>
                  {" "}
                  <a href="#">
                    <i className="ri-emotion-laugh-line" /> <span> Memes </span>
                  </a>
                </li>
                <li>
                  {" "}
                  <a href="#">
                    <i className="ri-layout-4-line" />{" "}
                    <span> Collectibles </span>
                  </a>
                </li>
              </ul>{" "}
              <div className="dropdown text-center">
                <button
                  className="btn btn-white btn-sm dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Recent Active
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {nfts.map((nft, i) => (
              <div
                key={nft.tokenId}
                className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
              >
                <div className="card__item four">
                  <div className="card_body space-y-10">
                    {/* =============== */}
                    <div className="creators space-x-10">
                      <div className="avatars space-x-3">
                        <a href="Profile.html">
                          <img
                            src={nft.image}
                            alt="Avatar"
                            className="avatar avatar-sm"
                          />
                        </a>
                        <a href="Profile.html">
                          <p className="avatars_name txt_xs">@mickel_fenn</p>
                        </a>
                      </div>
                      <div className="avatars space-x-3">
                        <a href="Profile.html">
                          <img
                            src="assets/img/avatars/avatar_2.png"
                            alt="Avatar"
                            className="avatar avatar-sm"
                          />
                        </a>
                        <a href="Profile.html">
                          <p className="avatars_name txt_xs">@danil_pannini</p>
                        </a>
                      </div>
                    </div>
                    <div className="card_head">
                      <a href="Item-details.html">
                        <img
                          src={nft.image}
                          alt="item
                     img"
                        />
                      </a>
                      <a href="#" className="likes space-x-3">
                        <i className="ri-heart-3-fill" />
                        <span className="txt_sm">1.2k</span>
                      </a>
                    </div>
                    {/* =============== */}
                    <h6 className="card_title">
                      <a className="color_black" href="Item-details.html">
                        {nft.name}
                      </a>
                    </h6>
                    <div className="card_footer d-block space-y-10">
                      <div className="card_footer justify-content-between">
                        <div className="creators">
                          <p className="txt_sm">{nft.description}</p>
                        </div>
                        <a href="#" className>
                          <p className="txt_sm">
                            Price:{" "}
                            <span className="color_green txt_sm">
                              {nft.price} ETH
                            </span>
                          </p>
                        </a>
                      </div>
                      <div className="hr" />
                      <div
                        className="d-flex
                   align-items-center
                   space-x-10
                   justify-content-between"
                      >
                        <div
                          className="d-flex align-items-center
                     space-x-5"
                        >
                          <i className="ri-history-line" />
                          <a
                            href="#"
                            data-toggle="modal"
                            data-target="#popup_history"
                          >
                            <p
                              className="color_text txt_sm
                         view_history"
                              style={{ width: "auto" }}
                            >
                              View History
                            </p>
                          </a>
                        </div>
                        <a
                          className="btn btn-sm btn-primary"
                          onClick={() => buyNft(nft)}
                          data-toggle="modal"
                          data-target="#popup_bid"
                        >
                          Buy NFT
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
