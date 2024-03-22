import React, { useState } from "react";
import Navbar from "./Navbar";

const Home = () => {
  const [faqItems, setFaqItems] = useState([
    {
      question: "What do I need to file a claim?",
      answer:
        "You need your documentation regarding crops sown, month in which crops were sown and a few other details.",
      open: false,
    },
    {
      question: "How long does it take to file a claim?",
      answer: "You can file a claim in less than 5 minutes.",
      open: false,
    },
    {
      question: "Can I track my claim status?",
      answer: "Yes, you can check your claim status any time.",
      open: false,
    },
  ]);

  const handleToggleAnswer = (index) => {
    const updatedFaqItems = [...faqItems];
    updatedFaqItems[index].open = !updatedFaqItems[index].open;
    setFaqItems(updatedFaqItems);
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className=" py-20 border text-black bg-blue-200">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-4">
              Welcome to Agriguard
            </h2>
            <p className="text-lg  mb-8">
              Filing a claim can be stressful. At Agriguard, our goal is to
              bring you peace of mind throughout your claim experience.
            </p>
            <div className="flex justify-center gap-4">
              <button className="claim-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit Claim
              </button>
              <button className="claim-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Claim Progress
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="faq-section mt-3   bg-gray-150">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            We provide easy online tools to help you file and manage your claims
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-md shadow-md p-6 cursor-pointer transform transition-transform hover:scale-105">
              <h5 className="text-xl font-semibold mb-2">Quick & easy</h5>
              <p className="text-gray-700">
                File your claim in less than 5 minutes. All you need is your
                policy number and a few other details to get the claim process
                started.
              </p>
            </div>
            <div className="bg-white rounded-md shadow-md p-6 cursor-pointer transform transition-transform hover:scale-105">
              <h5 className="text-xl font-semibold mb-2">24/7 access</h5>
              <p className="text-gray-700">
                Check claim status, documents and payments and upload receipts
                or documents any time.
              </p>
            </div>
            <div className="bg-white rounded-md shadow-md p-6 cursor-pointer transform transition-transform hover:scale-105">
              <h5 className="text-xl font-semibold mb-2">
                Self-service options
              </h5>
              <p className="text-gray-700">
                Take matters into your own hands. You can set up or change
                repairs to your home or auto, or schedule emergency services.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4">
              Frequently Asked Questions
            </h3>
            {faqItems.map((item, index) => (
              <div className="faq-item border-b pb-4" key={index}>
                <div
                  className="faq-question flex justify-between items-center cursor-pointer"
                  onClick={() => handleToggleAnswer(index)}
                >
                  <h4 className="text-lg">{item.question}</h4>
                  <i
                    className={`fas fa-chevron-${
                      item.open ? "up" : "down"
                    } text-xl text-black`}
                  ></i>
                </div>
                {item.open && <p className="faq-answer mt-4">{item.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="footer py-3 bg-gray-800">
        <div className="container mx-auto text-center text-white">
          <p>Copyright: AgriGuard 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
