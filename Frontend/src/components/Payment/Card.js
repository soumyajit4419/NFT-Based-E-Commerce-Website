import React from "react";
import Cards from 'elt-react-credit-cards';
import Typography from "@material-ui/core/Typography";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "./utils";
import styles from "./styles.css";
import "elt-react-credit-cards/es/styles-compiled.css";

export default class App extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    issuer: "",
    focused: "",
    username: "",
    phone: "",
    address1: "",
    address2: "",
    state: "",
    city: "",
    landmark: "",
    pinocode: "",
    formData: null
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    console.log(this.state.username);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      <div key="Payment" style={{ marginTop: "150px" }} className="container">
        <div className="row ">
          <div className="col-xs-12 col-md-6 col-lg-6">
            <Typography
              variant="h4"
              gutterBottom
              style={{ textAlign: "center", color: "black" }}
            >
              Enter Your Address Details
            </Typography>
            <form className="form-1" style={{ marginTop: "50px" }}>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Name"
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Phone Number"
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="address1"
                  className="form-control"
                  placeholder="Address Line-1"
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="address2"
                  className="form-control"
                  placeholder="Address Line-2"
                  onChange={this.handleChange}
                />
              </div>
              <div className="row">
                <div className="col-6">
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    placeholder="State"
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="City"
                    required
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col-6">
                  <input
                    type="text"
                    name="landmark"
                    className="form-control"
                    placeholder="Landmark"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="tel"
                    name="pincode"
                    className="form-control"
                    placeholder="Pincode"
                    required
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="col-xs-12 col-md-6 col-lg-6">
            <div className="App-payment">
              <Typography
                variant="h4"
                gutterBottom
                style={{ textAlign: "center", color: "black" }}
              >
                Enter Your Card Details
              </Typography>
              <br />
              <br />
              <Cards
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focused}
                callback={this.handleCallback}
              />
              <form
                ref={(c) => (this.form = c)}
                className="form-2"
                onSubmit={this.handleSubmit}
              >
                <div className="form-group">
                  <input
                    type="tel"
                    name="number"
                    className="form-control"
                    placeholder="Card Number"
                    pattern="[\d| ]{16}"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      type="tel"
                      name="expiry"
                      className="form-control"
                      placeholder="Valid Thru"
                      pattern="\d\d/\d\d"
                      required
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="tel"
                      name="cvc"
                      className="form-control"
                      placeholder="CVV"
                      pattern="\d{3,4}"
                      required
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                  </div>
                </div>
                <input type="hidden" name="issuer" value={issuer} />
                <br />
                <div className="form-actions">
                  <button className="btn btn-primary btn-block">PAY NOW</button>
                </div>
              </form>
              {formData && (
                <div className="App-highlight">
                  {formatFormData(formData).map((d, i) => (
                    <div key={i}>{d}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
