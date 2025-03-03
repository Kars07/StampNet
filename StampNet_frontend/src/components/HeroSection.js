import React, { useEffect, useRef } from 'react';
import "../styles/styles.css"; // Import CSS file
import Typed from 'typed.js';
import { motion } from "framer-motion";

const HeroSection = () => {
    const typedElement = useRef(null);

    useEffect(() => {
        const typed = new Typed(typedElement.current, {
            strings: ['data', 'docs', 'files', 'media'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });

        return () => {
            typed.destroy(); // Cleanup to prevent memory leaks
        };
    }, []);

    return (
        <section>
            <div className="container">
                {/* Left Side - Text Section */}
                <motion.div 
                 initial={{opacity:0 ,translateX:"-100%"}}
                 whileInView={{opacity:1, translateX:0}}
                 transition={{duration:1}}
                 className="text-section">
                    <div className="text-header">
                        <h4 >Built for Users</h4>
                        <div className="label-line"></div>
                    </div>
                    <h1>Securing <span ref={typedElement}></span></h1>
                    <h1>with Arbitrum technology</h1>
                    <p>
                        <span className="highlight">StampNet</span> securely timestamps your documents on the blockchain,
                        creating<span className="highlight"> immutable</span> and verifiable records without storing sensitive data. Start your journey 
                        towards secure and verifiable <span className="highlight">data management</span> 🚀.
                    </p>
                    <a href='/register'><button className="demo-btn">Get Started</button></a>
                </motion.div>
                <div className='container-img'>
                   <motion.div
                   initial={{opacity:0 ,translateX:"100%"}}
                   whileInView={{opacity:1, translateX:0}}
                   transition={{duration:1}}
                     className='Image'>
                    <motion.img 
                    
                    whileHover={{ rotateX: 10, rotateY: 10, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}


                    src="/images/user_photo-removebg-preview.png"  />

                   </motion.div>
                </div>

            </div>

            {/* User Container */}
            <motion.div 
              initial={{opacity:0 ,translateY:"-100%"}}
              whileInView={{opacity:1, translateY:0}}
              transition={{duration:1}}
             className="user-container">
                <div className="text-header">
                    <h4>User Authenticity</h4>
                    <div className="label-line"></div>
                </div>
                <h3>Storing Media Made Simple</h3>
                <p>
                    When Users create accounts with our flexible sign-in options, it gives
                    access to the blockchain-based timestamping where users can upload
                    their files.
                </p>
            </motion.div>
        </section>
    );
};

export default HeroSection;
