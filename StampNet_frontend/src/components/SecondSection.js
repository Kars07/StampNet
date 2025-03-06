import React, { useEffect, useRef } from 'react';
import "../styles/styles.css";
import { motion } from "framer-motion";

const SecondSection = () => {
    return (
        <section>
            {/* How It Works Section */}
            <motion.div 
                 initial={{opacity:0 ,translateY:"100%"}}
                  whileInView={{opacity:1, translateY:0}}
                  transition={{duration:1}}
                 className="first-containers">
                  <div className="first-contents">
                    <h1>
                      How does it <span className="first-highlight">Work?</span>
                    </h1>
                    <p>
                        Blockchain-based timestamping is a highly secure method for tracking the 
                        creation time and any document changes. In fact, even the document 
                        owner cannot alter any data once it has been recorded. The process is completed 
                        on the Arbitrum blockchain through an integration with StampNet.
                    </p>
                  </div>
                </motion.div>
        </section>
    );
};

export default SecondSection;
