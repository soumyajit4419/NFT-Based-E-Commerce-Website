import React, { Component } from "react";
import axios from "axios";
import api from "../../utils/api/index";

const initData = {
  pre_heading: "Contact",
  heading: "Get In Touch",
  content:
    "",
};

class Contact extends Component {
  state = {
    initData: {},
    name: "",
    email: "",
    subject: "",
    message: "",
    loading: false,
  };
  componentDidMount() {
    this.setState({
      initData: initData,
    });
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  sendMessageHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: !this.state.loading });
    const data = {
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      message: this.state.message,
    };

    // console.log(data);
    api.sendEmailApi(data).then((res) => {
      console.log(res);
      alert("Mail Sent SuccessFully!");
      this.setState({ loading: !this.state.loading });
      window.location.reload();
    });
  };

  render() {
    // console.log("name", this.state.name);
    if (this.state.loading) {
      return (
        <div style={{ height: "80vh" }}>
          <center>
            <div class="fa-3x mt-5 pt-5">
              <i class="fas fa-spinner fa-spin"></i>
            </div>
          </center>
        </div>
      );
    } else {
      return (
        <section className="author-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-7">
                {/* Intro */}
                <div className="intro text-center">
                  <span>{this.state.initData.pre_heading}</span>
                  <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                  <p>
                    If you would like to apply to become a Verified LOUD Artist
                    or would like to submit any enquiries - Please complete the
                    form below.
                  </p>
                </div>
                {/* Item Form */}
                <form
                  id="contact-form"
                  className="item-form card no-hover"
                  // method="POST"
                  // action="/public/assets/php/mail.php"
                >
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Name"
                          required="required"
                          onChange={this.onChangeHandler}
                          value={this.state.name}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Email"
                          required="required"
                          onChange={this.onChangeHandler}
                          value={this.state.email}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          placeholder="Subject"
                          required="required"
                          onChange={this.onChangeHandler}
                          value={this.state.subject}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <textarea
                          className="form-control"
                          name="message"
                          placeholder="Message"
                          cols={30}
                          rows={3}
                          defaultValue={""}
                          onChange={this.onChangeHandler}
                          value={this.state.message}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn w-100 mt-3 mt-sm-4"
                        type="button"
                        onClick={this.sendMessageHandler}
                      >
                        <i className="icon-paper-plane mr-2" />
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
                <p className="form-message" />
                <div className="text-center" style={{ marginTop: "40px" }}>
                  <p>
                    Support Enquiries:{" "}
                    <a href="mailto:support@loudnft.co">support@loudnft.co</a>
                  </p>
                </div>
                <div className="text-center">
                  <p>
                    Partnership Enquiries:{" "}
                    <a href="mailto:partnerships@loudnft.co">
                      partnerships@loudnft.co
                    </a>
                  </p>
                </div>
                <div className="text-center mt-4">
                  <a className={"telegram mr-4"} href="https://t.me/LoudMarket">
                    <i className={"fab fa-telegram fa-2x"} />
                    {/* <i className={"fab fa-telegram"} /> */}
                  </a>
                  <a
                    className={"twitter"}
                    href=" https://twitter.com/LoudMarketNFTs "
                    target="_blank"
                  >
                    <i className={"fab fa-twitter fa-2x"} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }
}

export default Contact;
