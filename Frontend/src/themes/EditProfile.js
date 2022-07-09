import React, { useState, useEffect } from "react";
import AuthorProfile from "../components/AuthorProfile/AuthorProfile";
import Web3 from "web3";
import { contractAbi } from "../abi";
import axios from "axios";
import ReactDOM from "react-dom";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { storage, db } from "../firebase";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Modal from "react-modal";
import AvatarEditor from "react-avatar-editor";

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

export default function EditProfile() {
  const [onSale, setOnSale] = useState(false);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const history = useHistory();
  const [profileImage, setProfileImage] = useState("");
  const [image, setImage] = useState();
  const [progress, setProgress] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [profileName, setProfileName] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [telegram, setTelegram] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [scale, setScale] = useState(1);

  useEffect(() => {
    axios({
      method: "POST",
      url: "https://loud-backend.herokuapp.com/get_user_details",
      data: {
        user: localStorage.getItem("wallet"),
        instagram: instagram,
        facebook: facebook,
        telegram: telegram,
        email: email,
        twitter: twitter,
        profileImage: profileImage,
        bio: bio,
        profileName: profileName,
      },
    })
      .then((res) => {
        setData(res.data);
        if (res.data.facebook) {
          console.log("inside fb");
          setFacebook(res.data.facebook);
        } else {
          setFacebook("");
        }
        if (res.data.instagram) {
          console.log("insta");
          setInstagram(res.data.instagram);
        } else {
          setInstagram("");
        }
        if (res.data.twitter) {
          setTwitter(res.data.twitter);
        } else {
          setTwitter("");
        }
        if (res.data.telegram) {
          setTelegram(res.data.telegram);
        } else {
          setTelegram("");
        }
        if (res.data.profile_image) {
          setProfileImage(res.data.profile_image);
        }
        if (res.data.profile_name) {
          console.log("we are here");
          setProfileName(res.data.profile_name);
        }
        if (res.data.bio) {
          setBio(res.data.bio);
        }
        if (res.data.email) {
          setEmail(res.data.email);
        }

        setLoading(false);
      })
      .catch((err) => alert("error occurred!"));
  }, []);
  //   const []

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   subtitle.style.color = "#f00";
  // }

  function closeModal() {
    setIsOpen(false);
    document.getElementById("inputGroupFile01").value = "";
    setImage("");
  }

  let editor = "";
  const setEditorRef = (ed) => {
    editor = ed;
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
            setProfileImage(url);
            console.log(url, "this is url");
            setImageLoading(false);
          });
      }
    );
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

  const updateProfile = async () => {
    setLoading(true);
    if (profileImage === "" || profileName === "" || email === "") {
      alert("Fields cant be empty");
      return;
    }
    if (window.ethereum) {
      await window.ethereum.send("eth_requestAccounts");
      window.web3 = new Web3(window.ethereum);

      const accounts = await window.web3.eth.getAccounts();

      axios({
        method: "POST",
        url: "https://loud-backend.herokuapp.com/update_user_info",
        data: {
          user: localStorage.getItem("wallet"),
          profileName: profileName,
          profileImage: profileImage,
          twitter: twitter,
          instagram: instagram,
          facebook: facebook,
          email: email,
          telegram: telegram,
          bio: bio,
        },
      }).then((res) => {
        console.log(res.data[0], "this is res");
        localStorage.setItem("wallet", res.data[0].wallet_address);
        localStorage.setItem("profile_image", res.data[0].profile_image);
        alert("profile updated successfully!");
        history.push(`/artist/${res.data[0].wallet_address}`);
      });
    }
  };

  return (
    <section className="author-area">
      {loading ? (
        <div style={{ height: "60vh" }}>
          <center>
            <div class="fa-3x mt-5 pt-5">
              <i class="fas fa-spinner fa-spin"></i>
            </div>
          </center>
        </div>
      ) : (
        <>
          <Header />
          <div className="container">
            <div className="row justify-content-center">
              {/* <div className="col-12 col-md-4">
              Author Profile
              <AuthorProfile />
            </div> */}
              <div className="col-12 col-md-7">
                {/* Intro */}
                <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                  <div className="intro-content">
                    {/* <span>Get Started</span> */}
                    <h3 className="mt-3 mb-0">Edit Profile</h3>
                  </div>
                </div>
                {/* Item Form */}

                <form className="item-form card no-hover">
                  <center>
                    {firstLoading ? (
                      <div class="fa-3x mt-5 pt-5">
                        <i class="fas fa-spinner fa-spin"></i>
                      </div>
                    ) : (
                      ""
                    )}
                    <img
                      src={
                        profileImage
                          ? profileImage
                          : "data:image/jpeg;base64,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"
                      }
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "200px",
                      }}
                      onLoad={() => setFirstLoading(false)}
                      alt="no"
                      className="mb-4"
                    />
                  </center>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <div className="custom-file" style={{ zIndex: 0 }}>
                          <input
                            type="file"
                            name="myImage"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            onChange={(e) => handelFile(e.target.files[0])}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile01"
                          >
                            {image ? image.name : "Profile Image"}
                          </label>
                        </div>
                      </div>
                    </div>
                    {imageLoading ? (
                      <div
                        className=""
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "auto",
                        }}
                      >
                        Image Uploading Please Wait..
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <label className="pb-1">Profile Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Profile Name"
                          required="required"
                          onChange={(e) => setProfileName(e.target.value)}
                          defaultValue={profileName}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label className="pb-1 pt-2">Bio:</label>
                        <textarea
                          className="form-control"
                          name="textarea"
                          placeholder="Bio-Description"
                          cols={30}
                          rows={3}
                          defaultValue={bio}
                          onChange={(e) => setBio(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <label className="pb-1">Email:</label>
                        <input
                          type="email"
                          className="form-control"
                          name="price"
                          placeholder="Email"
                          required="required"
                          onChange={(e) => setEmail(e.target.value)}
                          defaultValue={email}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <label
                          className="   text-white "
                          htmlFor="inlineRadio1"
                        >
                          Social Profiles:
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group mt-3">
                        <label className="pb-1">Instagram:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Instragram"
                          placeholder="Instragram"
                          required="required"
                          onChange={(e) => setInstagram(e.target.value)}
                          defaultValue={instagram}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <label className="pb-1">facebook:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Facebook"
                          placeholder="Facebook"
                          required="required"
                          onChange={(e) => setFacebook(e.target.value)}
                          defaultValue={facebook}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <label className="pb-1">Telegram</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Telegram"
                          placeholder="Telegram"
                          required="required"
                          onChange={(e) => setTelegram(e.target.value)}
                          defaultValue={telegram}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group mt-3">
                        <label className="pb-1">Twitter</label>
                        <input
                          type="text"
                          className="form-control"
                          name="twitter"
                          placeholder="twitter"
                          required="required"
                          onChange={(e) => setTwitter(e.target.value)}
                          defaultValue={twitter}
                        />
                      </div>
                    </div>
                    <div className="col-12"></div>

                    <div className="col-12">
                      <div className="form-group mt-3">
                        {/* <div className="form-check form-check-inline">
                          <input
                            type="checkbox"
                            style={{ marginRight: "10px" }}
                            onChange={(e) => StereoPannerNode(!onSale)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            accept (terms and conditions) - privacy-terms
                          </label>
                        </div> */}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group mt-3">
                        <div className="form-check form-check-inline">
                          {/* <input
                            type="checkbox"
                            style={{ marginRight: "10px" }}
                            onChange={(e) => setOnSale(!onSale)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            submit for verfification
                          </label> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div onClick={() => updateProfile()}>
                        <button className="btn w-100 mt-3 mt-sm-4">
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
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
    </section>
  );
}
