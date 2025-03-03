import { useState } from "react";
import "../styles/styles.css";
import { motion } from "framer-motion";

const faqData = [
  {
    question: "What is StampNet?",
    answer: "StampNet is a decentralized timestamping platform that allows users to prove document existence at a specific time using blockchain technology.",
  },
  {
    question: "How does blockchain-based timestamping work?",
    answer: "When you upload a document, StampNet generates a cryptographic hash and stores it on the blockchain, ensuring an immutable record of its existence.",
  },
  {
    question: "Is my document stored on the blockchain?",
    answer: "No, only the hash of your document is stored on the blockchain, ensuring privacy while proving authenticity.",
  },
  {
    question: "Can I verify a previously timestamped document?",
    answer: "Yes, you can upload your document to StampNet, and it will check the hash against the blockchain records.",
  },
  {
    question: "Is StampNet free to use?",
    answer: "StampNet may have gas fees associated with blockchain transactions, but basic verification features could be free.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions:
       </h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <motion.div
            initial={{opacity:0 ,translateX:"-100%"}}
            whileInView={{opacity:1, translateX:0}}
            transition={{duration:1}}
           key={index} className="faq-item">
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="faq-icon">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
