import React from "react";
import "./Form.css";
export default function Form() {
  return (
    <>
      <div className="container">
        <div className="hero">
          <div className="logo-container">
            <div className="logo">
              <img src="../Components/istockphoto-503646746-612x612.jpg" />
            </div>
          </div>
        </div>
        <div className="form-container">
          <form action="#" className="form">
            <div className="form-heading">
              This is not a real online service! You know you need something
              like this in your life to help you realize your deepest dreams.
              <br />
              Sign up
              <span className="italics">now</span> to get started.
              <br />
              <br />
              You <span className="italics">know</span> you want to.
            </div>
            <div className="form-inputs">
              <div className="form-inputs-left">
                <div className="form-inputs-heading">Let's do this!</div>
                <div className="row">
                  <div className="row-left">
                    <label htmlFor="fname">FIRST NAME</label>
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      title="Only alphabets allowed"
                      pattern="[A-Za-z]+"
                      required=""
                    />
                  </div>
                  <div className="row-right">
                    <label htmlFor="lname">LAST NAME</label>
                    <input
                      type="text"
                      id="lname"
                      name="lname"
                      title="Only alphabets allowed"
                      pattern="[A-Za-z]+"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="row-left">
                    <label htmlFor="email">EMAIL</label>
                    <input type="email" id="email" name="email" required="" />
                  </div>
                  <div className="row-right">
                    <label htmlFor="phone">PHONE NUMBER</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      title="should be 10 digits for eg: 9876543210"
                      pattern="\d{10}"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="row-left">
                    <label htmlFor="password">PASSWORD</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      maxLength={64}
                      required=""
                    />
                  </div>
                  <div className="row-right">
                    <label htmlFor="passwordConf">CONFIRM PASSWORD</label>
                    <input
                      type="password"
                      id="passwordConf"
                      name="passwordConf"
                      maxLength={64}
                      required=""
                    />
                  </div>
                </div>
              </div>
              <div className="form-requirements hidden">
                <div className="form-requirements-inner">
                  Password requirements:
                  <div className="row req-fail" id="reqLen">
                    &nbsp;Minimum 8 characters long
                  </div>
                  <div className="row req-fail" id="reqLetter">
                    &nbsp;Contains at least one character
                  </div>
                  <div className="row req-fail" id="reqNum">
                    &nbsp;Contains at least one number
                  </div>
                  <div className="row req-fail" id="reqSym">
                    &nbsp;Contains at least one symbol
                    <br />
                    (!@#$%^&amp;*()\-_+.)
                  </div>
                  <div className="row req-fail" id="reqMatch">
                    &nbsp;Both passwords should match
                  </div>
                </div>
              </div>
            </div>
            <div className="form-submit">
              <input type="submit" defaultValue="Create Account" />
              Already have an account?
              <a href="#">
                <span className="login">Log in</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
