import React, { useEffect, useRef } from 'react';
import "../styles/styles.css"; // Import CSS file
import Typed from 'typed.js';

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
                <div className="text-section">
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
                </div>
                <div className='container-img'>
                   <div className='Image'>
                    <img src="/images/user_photo-removebg-preview.png" width={500} />

                   </div>
                </div>

            </div>

            {/* User Container */}
            <div className="user-container">
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
            </div>
        </section>
    );
};

export default HeroSection;
