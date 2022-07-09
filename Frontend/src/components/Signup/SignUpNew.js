import React, { useState, useRef } from "react";
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import Web3 from "web3";
import { contractAbi } from "../../abi";
import axios from "axios";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
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

const SignupNew = () => {
  const [privaryCheck, setPrivaryBox] = useState(false);
  const [ageCheck, setAgeBox] = useState(false);

  const [loading, setLoading] = useState("");

  const history = useHistory();
  const [profileImage, setProfileImage] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [telegram, setTelegram] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [scale, setScale] = useState(1);

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [privacyModalIsOpen, setPrivacyModalIsOpen] = React.useState(false);

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

  const createNewAccount = async () => {
    setLoading(true);

    if (!privaryCheck) {
      toast.error("Please accept terms and conditions", {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
      return;
    }

    if (!ageCheck) {
      toast.error("Please verify your age", {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
      return;
    }

    if (profileImage === "" || profileName === "" || email === "") {
      toast.error("Fields cannot be empty", {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
      return;
    }

    if (window.ethereum) {
      await window.ethereum.send("eth_requestAccounts");
      window.web3 = new Web3(window.ethereum);

      const accounts = await window.web3.eth.getAccounts();

      axios({
        method: "POST",
        url: "https://loud-backend.herokuapp.com/create",
        data: {
          user: accounts[0],
          profileName: profileName,
          profileImage: profileImage,
          twitter: twitter,
          instagram: instagram,
          facebook: facebook,
          email: email,
          telegram: telegram,
          bio: bio,
          country: country,
        },
      }).then((res) => {
        localStorage.setItem("wallet", res.data.user);
        localStorage.setItem("profile_image", res.data.profile_image);
        toast.success("profile created successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
        history.push("/");
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
                    <span>Get Started</span>
                    <h3 className="mt-3 mb-0">Create Profile</h3>
                  </div>
                </div>
                {/* Item Form */}

                <form className="item-form card no-hover">
                  <div className="row">
                    <div className="col-12">
                      <div className=" form-group">
                        <div className="custom-file" style={{ zIndex: 0 }}>
                          <input
                            type="file"
                            name="myImage"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            required
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
                        className="fa-3x"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "auto",
                        }}
                      >
                        <i className="fas fa-spinner fa-spin"></i>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Profile Name"
                          required
                          onChange={(e) => setProfileName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <textarea
                          className="form-control"
                          name="textarea"
                          placeholder="Bio-Description"
                          cols={30}
                          rows={3}
                          defaultValue={""}
                          onChange={(e) => setBio(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="email"
                          className="form-control"
                          name="price"
                          placeholder="Email"
                          required
                          onChange={(e) => setEmail(e.target.value)}
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
                        <input
                          type="text"
                          className="form-control"
                          name="Instragram"
                          placeholder="Instragram"
                          onChange={(e) => setInstagram(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="Facebook"
                          placeholder="Facebook"
                          onChange={(e) => setFacebook(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="Telegram"
                          placeholder="Telegram"
                          onChange={(e) => setTelegram(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="twitter"
                          placeholder="twitter"
                          onChange={(e) => setTwitter(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          required="required"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div> */}
                    {/* <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="copies"
                      placeholder="No of Copies"
                      required="required"
                    />
                  </div>
                </div> */}
                    <div className="col-12 text-center">
                      <div className="form-group mt-3">
                        <div className="form-check form-check-inline">
                          <input
                            type="checkbox"
                            style={{ marginRight: "10px" }}
                            onChange={(e) => setAgeBox(!ageCheck)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            18 years of age or older
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-12">
                      <div className="form-group mt-3">
                        <div className="form-check form-check-inline">
                          <input
                            type="checkbox"
                            style={{ marginRight: "10px" }}
                            onChange={(e) => setOnSale(!onSale)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            submit for verfification
                          </label>
                        </div>
                      </div>
                    </div> */}

                    <div
                      className="col-12 text-center "
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="checkbox"
                        style={{ marginRight: "10px" }}
                        onChange={(e) => setPrivaryBox(!privaryCheck)}
                      />
                      <div className="form-group">
                        <div
                          className="w-100"
                          onClick={(e) => setPrivacyModalIsOpen(true)}
                          style={{ zIndex: 0 }}
                        >
                          Accept Terms and Conditions
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div>
                        <button
                          className="btn w-100 mt-3 mt-sm-4"
                          style={{ zIndex: 0 }}
                          onClick={() => createNewAccount()}
                        >
                          Create Account
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

      <Modal isOpen={privacyModalIsOpen} style={customStyles}>
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-body justify-content-center flex-column ">
              <p>
                LOUD MARKET PLATFORM TERMS AND CONDITIONS :
                <br/>GENERAL IMPORTANT NOTICE
                These terms and conditions (Terms) explain how you may use our marketplace, website and any of its content (Platform). These Terms apply between Loud Market Ltd (we, us or our) and you, the person accessing or using the Platform (you or your).
                You must read these Terms carefully before using the Platform. By registering for an account, using the Platform or otherwise indicating your consent, you agree that you have read and accept that you are bound by these Terms. If you do not agree with any of these Terms, you should stop using the Platform immediately.
                <br/>
                <br/>
                <a href={'https://docs.google.com/document/d/1dNm0iquCPhWeEsBDT6bSKy9Q58lRuKODW05HWf6ZWOg/edit?usp=sharing'} target="_blank"> Terms and Conditions </a>

              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={(e) => {
                  setPrivacyModalIsOpen(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default SignupNew;
