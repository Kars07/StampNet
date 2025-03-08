import React from 'react';
import '../styles/styles.css';
import { motion } from "framer-motion";

const Features = () => {
    return (
        <section className="features">
            <h1 className="heading">StampNet <span className="first-highlight">Features</span></h1>

            <div className="features-container">
                <motion.div
                  initial={{opacity:0 ,translateX:"-100%"}}
                  whileInView={{opacity:1, translateX:0}}
                  transition={{duration:1}}
                 className="features-box">
                    <i className='bx bx-message-alt-add'></i>
                    <h3>About us</h3>
                    <p className='features-text'>
                        Take a little peek at the people responsible for the
                        creation of StampNet, built with Arbitrum using Stylus.
                    </p>
                    <a href="/about-us" className="features-button">View</a>
                </motion.div>

                <motion.div 
                  initial={{opacity:0 ,translateX:"100%"}}
                  whileInView={{opacity:1, translateX:0}}
                  transition={{duration:1}}
                 className="features-box">
                    <i className='bx bx-file'></i>
                    <h3>Documentation</h3>
                    <p className='features-text'>
                        Find all the necessary information about our platform,
                        including setup guides and requirements like downloading Metamask.
                    </p>
                    <a href="/docs" className="features-button">View</a>
                </motion.div>

                <motion.div
                  initial={{opacity:0 ,translateY:"-100%"}}
                  whileInView={{opacity:1, translateY:0}}
                  transition={{duration:1}}
                 className="features-box">
                    <i className='bx bx-upload'></i>
                    <h3>Dashboard</h3>
                    <p className='features-text'>
                        A fully interactive dashboard where you can upload files or drag-and-drop 
                        any form of media for timestamping.
                    </p>
                    <a href="/" className="features-button">View</a>
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
