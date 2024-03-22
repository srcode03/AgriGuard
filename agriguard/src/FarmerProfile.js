import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import Navbar from "./Navbar";

export default function FarmerProfile() {
  return (
    <>
      <Navbar />
      <section class="section about-section gray-bg" id="about">
        <div class="container">
          <div class="row align-items-center flex-row-reverse">
            <div class="col-lg-6">
              <div class="about-text go-to">
                <h3 class="dark-color">BALAJI BABURAO LOKHANDE</h3>
                <h6 class="theme-color lead">
                  <p>
                    Hello,I am Balaji Baburao Lokhande who sows the fields with
                    rice, wheat, and barley. With every seed carefully planted
                    and every crop tenderly nurtured, I strive to sustain our
                    communities and uphold the legacy of agriculture.My passion
                    for farming runs deep, and my dedication to cultivating
                    these essential crops embodies the spirit of resilience and
                    agricultural heritage.
                  </p>
                </h6>
                <div class="row about-list">
                  <div class="col-md-6">
                    <div class="media">
                      <label>Birthday:</label>
                      <p>4th April 1998</p>
                    </div>
                    <div class="media">
                      <label>Age:</label>
                      <p>26 Yr</p>
                    </div>
                    <div class="media">
                      <label>Residence:</label>
                      <p>Haryana,India</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="media">
                      <label>E-mail:</label>
                      <p>balaji@gmail.com</p>
                    </div>
                    <div class="media">
                      <label>Phone:</label>
                      <p>9004078346</p>
                    </div>
                    <div class="media">
                      <label>Crop types:</label>
                      <p>Rice,Wheat,Barley</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="about-avatar">
                <img
                  src="https://thumbs.dreamstime.com/b/indian-farmer-holding-barley-showing-his-strong-healthy-crop-wheat-174019332.jpg"
                  alt="Farmer"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>
            </div>
          </div>
          <div class="counter">
            <div class="row">
              <div class="col-6 col-lg-3">
                <div class="count-data text-center">
                  <h6 class="count h2" data-to="500" data-speed="500">
                    10
                  </h6>
                  <p class="m-0px font-w-600">Total no of claims</p>
                </div>
              </div>
              <div class="col-6 col-lg-3">
                <div class="count-data text-center">
                  <h6 class="count h2" data-to="150" data-speed="150">
                    8
                  </h6>
                  <p class="m-0px font-w-600">Right Claims</p>
                </div>
              </div>
              <div class="col-6 col-lg-3">
                <div class="count-data text-center">
                  <h6 class="count h2" data-to="850" data-speed="850">
                    2
                  </h6>
                  <p class="m-0px font-w-600">Wrong claims</p>
                </div>
              </div>
              <div class="col-6 col-lg-3">
                <div class="count-data text-center">
                  <h6 class="count h2" data-to="190" data-speed="190">
                    Rating(out of 10)
                  </h6>
                  <p class="m-0px font-w-600">8</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center mb-5">
        <button className="btn btn-primary" onClick={() => alert("Open Cryptocurrency Wallet")}>
          Open Your Cryptocurrency Wallet
        </button>
      </div>
    </>
  );
}
