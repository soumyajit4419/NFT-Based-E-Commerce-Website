import React, { useState, useEffect } from "react";
import AuthorProfile from "../UserProfile/UserProfile";
import { multipleAbi } from "../../multipleAbi";
import Web3 from "web3";
import axios from "axios";
import { useHistory } from "react-router";
import { storage, db } from "../../firebase";
import Modal from "react-modal";
import AvatarEditor from "react-avatar-editor";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    border: "none",
    background: "rgb(255 255 255 / 0%)",
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "#2a2a2ac9",
  },
};

export default function CreateMultiple() {
  const [nftName, setNftName] = useState("");
  const [file, setFile] = useState("");
  const [royalty, setRoyalty] = useState("");
  const [onSale, setOnSale] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [initialPrice, setIntialPrice] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [txHash, setTxHash] = useState("");
  const [nftMessage, setNftMessage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [data, setData] = useState();
  const [imageLoading, setImageLoading] = useState();
  const [progress, setProgress] = useState();
  const [image, setImage] = useState();
  const [scale, setScale] = useState(1);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  let subtitle;
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
    document.getElementById("inputGroupFile01").value = "";
    setImage("");
  }

  useEffect(() => {
    if (!localStorage.getItem("wallet")) {
      alert("connect wallet to continue!");
      history.push("/wallet-connect");
    }
    axios({
      method: "POST",
      url: "https://loud-backend.herokuapp.com/get_user_details",
      data: {
        user: localStorage.getItem("wallet"),
      },
    })
      .then((res) => {
        console.log(res.data, "data");
        setData(res.data);
        if (!res.data.is_verified) {
          alert("You are not authorized to mint NFTS!! Contact Admin.");
          history.push("/create");
        }
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const history = useHistory();

  const createNewNft = async (assetHash, metaDataURI, contract_address) => {
    if (window.ethereum) {
      await window.ethereum.send("eth_requestAccounts");
      window.web3 = new Web3(window.ethereum);

      const accounts = await window.web3.eth.getAccounts();

      window.contract = await new window.web3.eth.Contract(
        multipleAbi,
        "0x0F72D59D536Fa3D8A8856fc392bBFDc7474A4c5A"
      );

      let result;

      console.log(metaDataURI, "this is metaDatauri");

      console.log(royalty, "this is royalty");

      const mynewNumber = await window.contract.methods
        .mint(metaDataURI, quantity, 10)
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {
          console.log(hash, "this is awardItem hash");
        })
        .on("receipt", function (receipt) {
          result = receipt;
          console.log(receipt, "this is award Item receipt");
        });

      console.log(mynewNumber, "this is my new number");

      return result;
    }
    alert("not enabled");
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    let creator;
    let token_created_id;

    // console.log(file, name, description);
    console.log(onSale, "this is on Sale");
    if (
      file === "" ||
      nftName === "" ||
      description === "" ||
      coverImage === "" ||
      initialPrice === "" ||
      royalty === "" ||
      quantity === ""
    ) {
      toast.error("Set all the values!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (initialPrice <= 0 || royalty <= 0 || quantity <= 0) {
      toast.error("Enter valid numbers!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (window.ethereum) {
      await window.ethereum.send("eth_requestAccounts");
      window.web3 = new Web3(window.ethereum);
      const accounts = await window.web3.eth.getAccounts();
      creator = accounts[0];
    }

    setLoading(true);
    setNftMessage("Creating Nft Please wait..!!");

    const formData = new FormData();
    formData.append("myImage", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("https://loud-backend.herokuapp.com/upload", formData, config)
      .then((res) => {
        console.log(res, "this the first response!");
        const myData = {
          name: nftName,
          creator: creator,
          description: description,
          imagePath: res.data,
          cover: coverImage,
          type: "Music",
          royalty: royalty,
          initialPrice: initialPrice,
        };
        axios({
          method: "POST",
          url: "https://loud-backend.herokuapp.com/create_meta_data",
          data: myData,
        })
          .then(async (res) => {
            const nft = await createNewNft(
              res.data.imageHash,
              res.data.metaDataURI,
              "0x0F72D59D536Fa3D8A8856fc392bBFDc7474A4c5A"
            );

            setTokenId(nft.events.TransferSingle.returnValues.id);
            token_created_id = nft.events.TransferSingle.returnValues.id;
            setTxHash(nft.transactionHash);
            let myNftMusic = `https://ipfs.io/ipfs/${res.data.imageHash}`;

            const myData = {
              owner: nft.from,
              tokenId: nft.events.TransferSingle.returnValues.id,
              txHash: nft.transactionHash,
              itemPrice: initialPrice,
              music: myNftMusic,
              onSale: onSale,
              coverImage: coverImage,
              name: nftName,
              ownerImage: localStorage.getItem("profile_image"),
              creatorImage: localStorage.getItem("profile_image"),
              description: description,
              royalty: royalty,
              quantity: quantity,
            };
            console.log(nft.from);
            console.log(myData, "myData");
            axios({
              method: "POST",
              url: "https://loud-backend.herokuapp.com/add_token_info_multiple",
              data: myData,
            })
              .then(async (res) => {
                if (res.data) {
                  if (onSale && !data.multiple_transfer) {
                    console.log("putting on sale");
                    if (window.ethereum) {
                      console.log("inisde here haha");
                      await window.ethereum.send("eth_requestAccounts");
                      window.web3 = new Web3(window.ethereum);
                      // const accounts = await window.ethereum.request({
                      //   method: "eth_requestAccounts",
                      // });
                      const accounts = await window.web3.eth.getAccounts();

                      window.contract = await new window.web3.eth.Contract(
                        multipleAbi,
                        "0x0F72D59D536Fa3D8A8856fc392bBFDc7474A4c5A"
                      );
                      console.log(token_created_id, "this is token Id");

                      // axios({
                      //   url:"http://localhost:5000/get"
                      // })

                      const theOwner = await window.contract.methods
                        .setApprovalForAll(
                          "0x4E600a198Ed78A019E868b3A5a1cF149545bcEd5",
                          "True"
                        )
                        .send({ from: accounts[0] })
                        .on("transactionHash", function (hash) {
                          console.log(hash, "this is approve hash");
                          // setCurrentHeading("Done");
                          setNftMessage(
                            `Nft Created Successfully.. Your tokenId: ${token_created_id}`
                          );
                          history.push(`/collectibles/${res.data.tokenId}`);
                          // setLoading(false);
                        });
                    }
                  } else {
                    console.log("inisde here after add token info", res);
                    setNftMessage(
                      `Nft Created Successfully.. Your tokenId: ${token_created_id}`
                    );
                    history.push(`/collectibles/${res.data.tokenId}`);
                    setLoading(false);
                  }
                } else {
                  console.log("inisde here after add token info", res);
                  alert("NFT Successfully created");
                  history.push(`/collectibles/${res.data.tokenId}`);
                  setLoading(false);
                }
              })
              .catch((e) => {
                console.log(e, "this is error");
                toast.error("some error occurred!!", {
                  position: toast.POSITION.TOP_CENTER,
                });
                setLoading(false);
              });
          })
          .catch((e) => {
            console.log(e);
            setDescription("");
            setNftName("");
            setFile("");
            setCoverImage("");
            setRoyalty(0);
            setIntialPrice(0);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadImage = (val, blob) => {
    setImageLoading(true);
    const uploadTask = storage.ref(`images/${val.name}`).put(blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(val.name)
          .getDownloadURL()
          .then((url) => {
            setCoverImage(url);
            console.log(url, "this is url");
            setImageLoading(false);
          });
      }
    );
  };

  let editor = "";
  const setEditorRef = (ed) => {
    editor = ed;
  };

  const handelImage = (image) => {
    if (setEditorRef) {
      const canvasScaled = editor.getImage();
      // const croppedImg = canvasScaled.toDataURL();
      canvasScaled.toBlob(function (blob) {
        uploadImage(image, blob);
      }, "image/png");
      setIsOpen(false);
    }
  };

  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
  };

  const handelFile = (value) => {
    if (value) {
      setImage(value);
      openModal();
    }
  };

  return (
    <div>
      {loading ? (
        <div style={{ height: "60vh" }}>
          <center>
            <div style={{ paddingTop: "150px" }}>{nftMessage}</div>
          </center>
        </div>
      ) : (
        <section className="author-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-7">
                {/* Intro */}
                <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                  <div className="intro-content">
                    <span>Get Started</span>
                    <h3 className="mt-3 mb-0">Create Multiple Nft</h3>
                  </div>
                </div>
                {/* Item Form */}
                <form className="item-form card no-hover">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <div className="custom-file">
                          <div className="pb-2">Upload Song (MP3, WAV)</div>
                          <input
                            type="file"
                            name="myImage"
                            accept=".mp3,.wav"
                            className=""
                            style={{ marginBottom: "20px" }}
                            id="inputGroupFile02"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                          {/* <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile01"
                          >
                            Choose file
                          </label> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Item Name"
                          required="required"
                          onChange={(e) => setNftName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          name="textarea"
                          placeholder="Description"
                          cols={30}
                          rows={3}
                          defaultValue={""}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          placeholder="Item Price In LOUD"
                          required="required"
                          min="0"
                          onChange={(e) => setIntialPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control"
                          name="royality"
                          placeholder="Royality(%)"
                          required="required"
                          min="0"
                          onChange={(e) => setRoyalty(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Size"
                      required="required"
                      onChange={() => set}
                    />
                  </div>
                </div> */}
                    <div className="col-12 ">
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control"
                          name="copies"
                          placeholder="No of Copies"
                          required="required"
                          min="0"
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12 ">
                      <div className="form-group">
                        <div className="pb-2 pt-2 d-flex align-items-center">
                          <div>Upload Cover Image</div>
                          {imageLoading ? (
                            <div className="fa-2x pl-2">
                              <i className="fas fa-spinner fa-spin"></i>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <input
                          type="file"
                          name="myImage"
                          className=""
                          id="inputGroupFile01"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) => handelFile(e.target.files[0])}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <div className="form-check form-check-inline">
                          <input
                            type="checkbox"
                            style={{ marginRight: "10px" }}
                            onChange={(e) => {
                              console.log(!onSale);
                              setOnSale(!onSale);
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            Put on Sale
                          </label>
                        </div>
                        {/* <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        defaultValue="option2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        Instant Sale Price
                      </label>
                    </div> */}
                        {/* <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio3"
                        defaultValue="option3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio3"
                      >
                        Unlock Purchased
                      </label>
                    </div> */}
                      </div>
                    </div>
                    <div className="col-12" style={{ zIndex: 0 }}>
                      <button
                        className="btn w-100 mt-3 mt-sm-4"
                        type="submit"
                        onClick={(e) => onFormSubmit(e)}
                      >
                        Create Item
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div class="modal-dialog modal-dialog-centered" id="profilePic">
          <div class="modal-content">
            {/* <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Modal title
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                style={{ color: "white" }}
                onClick={closeModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div> */}
            <div class="modal-body justify-content-center flex-column ">
              <AvatarEditor
                ref={setEditorRef}
                image={image}
                width={250}
                height={250}
                border={0}
                scale={parseFloat(scale)}
                rotate={0}
              />
              <input
                name="scale"
                type="range"
                onChange={handleScale}
                min="1"
                max="2"
                step="0.01"
                defaultValue="1"
                style={{ maxWidth: "250px" }}
              />
            </div>
            <div class="modal-footer justify-content-center ">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={(e) => handelImage(image)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
