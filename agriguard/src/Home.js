import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import "./Home.css";
// Assuming you have an image in your assets folder
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [faqItems, setFaqItems] = useState([
    {
      question: "What do I need to file a claim?",
      answer:
        "You need your documnetation regarding crops sown,month in which crops were sown and a few other details.",
    },
    {
      question: "How long does it take to file a claim?",
      answer: "You can file a claim in less than 5 minutes.",
    },
    {
      question: "Can I track my claim status?",
      answer: "Yes, you can check your claim status any time.",
    },
  ]);

  const handleToggleAnswer = (index) => {
    const updatedFaqItems = [...faqItems];
    updatedFaqItems[index].open = !updatedFaqItems[index].open;
    setFaqItems(updatedFaqItems);
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${"https://www.newsclick.in/sites/default/files/styles/responsive_885/public/2023-03/agri239.jpg?itok=SgXAKdMr"})`,
      }}
    >
      <Navbar />
      <div className="hero-section">
        <div className="container">
          <h2 className="alpha">Welcome to Agriguard</h2>
          <p className=" text-red-50">
            Filing a claim can be stressful. At Agriguard, our goal is to bring
            you peace of mind throughout your claim experience.
          </p>
          <div className="button-container">
            <button className="claim-btn">Submit Claim</button>
            <button className="claim-btn">View Claim Progress</button>
          </div>
        </div>
      </div>

      <div className="faq-section">
        <h1 className="h">
          We provides easy online tools to help you file and manage your claims
        </h1>
        <div class="container">
          <div class="row">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Quick & easy</h5>
                  <p class="card-text">
                    File your claim in less than 5 minutes. All you need is your
                    policy number and a few other details to get the claim
                    process started.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">24/7 access</h5>
                  <p class="card-text">
                    Check claim status, documents and payments and upload
                    receipts or documents any time
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Self-service options</h5>
                  <p class="card-text">
                    Take matters into your own hands. You can set up or change
                    repairs to your home or auto, or schedule emergency
                    services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <h3>Frequently Asked Questions</h3>
          {faqItems.map((item, index) => (
            <div className="faq-item" key={index}>
              <div
                className="faq-question"
                onClick={() => handleToggleAnswer(index)}
              >
                <h4>{item.question}</h4>
                <i
                  className={`fas fa-chevron-${item.open ? "up" : "down"}`}
                ></i>
              </div>
              {item.open && <p className="faq-answer">{item.answer}</p>}
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <p>Copyright:AgriGuard 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
