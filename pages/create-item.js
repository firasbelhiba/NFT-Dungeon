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
  const [fileUrl, setFileUrl] = useState("assets/img/icons/upload.svg");
  const [listingPrice, setListingPrice] = "";
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });

  const router = useRouter();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (p) => console.log(`Received: ${p}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log(error);
    }
  }

  async function createItem() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      createSale(url);
    } catch (error) {
      console.log("Error has been occured while uploading file ", error);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    // Create a reference to the nft contract
    let contract = new ethers.Contract(nftAddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();

    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(formInput.price, "ether");

    contract = new ethers.Contract(nftMarketAddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();
    setListingPrice(listingPrice);

    transaction = await contract.createMarketItem(nftAddress, tokenId, price, {
      value: listingPrice,
    });

    await transaction.wait();
    router.push("/");
  }

  return (
    <div>
      <div class="hero__upload">
        <div class="container">
          <div class="space-y-20">
            <h2 class="title">Create single collectible</h2>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="box in__upload mb-120">
          <div className="row">
            <div className="col-lg-6">
              <div className="left__part space-y-40 md:mb-20 upload_file">
                <div className="space-y-20">
                  {fileUrl && (
                    <img className="icon" width="350" src={fileUrl} />
                  )}
                  <h5>Drag and drop your file</h5>
                  <p className="color_text">
                    PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group space-y-10">
                <div className="space-y-20">
                  <div className="space-y-10">
                    <span className="nameInput">Title</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e. g. `raroin design art`"
                      onChange={(e) =>
                        updateFormInput({ ...formInput, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-10">
                    <span className="nameInput">
                      Description
                      <span className="color_text"> (optional) </span>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e. g. `raroin design art`"
                      onChange={(e) =>
                        updateFormInput({
                          ...formInput,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-10">
                    <span className="variationInput">Price</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e. g. `raroin design art`"
                      onChange={(e) =>
                        updateFormInput({ ...formInput, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-10">
                    <span className="variationInput">Choose collection</span>
                    <div className="d-flex flex-column flex-md-row">
                      <a
                        href="#"
                        className="choose_collection mb-10 mb-md-0 mr-0 mr-md-3"
                      >
                        <div className="icon">
                          <i className="ri-add-line" />
                        </div>
                        New collection
                      </a>
                      <a href="#" className="choose_collection is_brand">
                        <img src="assets/img/icons/raroin_icon.svg" alt="" />
                        Raroin Collection
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <p className="color_black">
                <span className="color_text text-bold"> Service fee : </span>
                2.5%
              </p>
              <p className="color_black">
                <span className="color_text text-bold">
                  {" "}
                  You will receive :{" "}
                </span>
                22.425 ETH $41,637.78
              </p>
              <p />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed_row bottom-0 left-0 right-0">
        <div className="container">
          <div className="row content justify-content-between mb-20_reset">
            <div className="col-md-auto col-12 mb-20">
              <div className="space-x-10">
                <a className="btn btn-white others_btn">Cancel</a>
                <a
                  className="btn btn-dark others_btn"
                  data-toggle="modal"
                  data-target="#popup_preview"
                >
                  Preview
                </a>
              </div>
            </div>
            <div className="col-md-auto col-12 mb-20">
              <a onClick={createItem} className="btn btn-grad btn_create">
                Create item
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
