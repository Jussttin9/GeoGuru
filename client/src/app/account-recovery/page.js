'use client';

import styles from './../page.module.css';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { motion as m } from 'framer-motion';
import { animate } from 'framer-motion';
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

// This will be our page for the Register page.

export default function Recovery() {
    const [useEmail, setEmail] = useState("");
    const changeEmail = event => {
        setEmail(event.target.value)
    }

    const [header, setHeader] = useState(`Sent to ${useEmail}!`);
    const [subheader, setSubheader] = useState('Check your inbox to recover your Geoguru account.');

    let submitbutton = undefined;
    let submissionmsg = "";

    useEffect(() => {
      submitbutton = document.getElementById("sendemail");
      submissionmsg = document.getElementById("submsg");
    })

    // should send a reset password email to the given email
    const submitrequest = async () => {
      try {
        console.log(useEmail);
        await sendPasswordResetEmail(auth, useEmail);
        setHeader(`Sent to ${useEmail}!`);
        setSubheader('Check your inbox to recover your Geoguru account.');
      } catch (error) {
        console.log(error);
        setHeader('Error!');
        setSubheader('The provided email is not linked to an account.');
      } finally {
        if ((submitbutton != null)) {
          animate(submitbutton, { backgroundColor: "#86EF98" }, {duration: 0.5})
          animate(submissionmsg, { opacity: 1, y: "300%" }, {duration: 0.5} )
          setTimeout(fademessage, 7500);
        }
      }
    }

    function fademessage() {
      animate(submissionmsg, { opacity: 0, y: "700%" }, {duration: 2.5} )
    }

    return (
      <>
        <m.div className={styles.registerFront}
          initial={{opacity: 0, height: "0%" }}
          animate={{opacity: 1, height: "100vh" }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          exit={{ opacity: 1 }}
        >
          <div className={styles.bannercontainer}>
            <div className={styles.banner}>
              <Marquee>
                <Image
                    src="/TEMPgeogurubanner.svg"
                    alt="Geoguru Full Banner [TEMPORARY]"
                    className={styles.logoimg}
                    width={1054}
                    height={725}
                    priority
                />
              </Marquee>
            </div>
          </div>
          <m.div className={styles.rrContainer}
            initial={{y: "95%"}}
            animate={{y: "-170%"}}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            exit={{ opacity: 1 }}          
            >
            <h3>Forgot your password?</h3>
            <p>Submit your email below to receive an account recovery link!</p>
            <br/>
            <div className={styles.recoveryInputs}>
              <div className={styles.logininfoboxes}>
                <div className={styles.passwordbox}>
                  <div className={styles.passwordinput}
                    id="typeemail"
                    initial={{width: "400px"}}
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                    exit={{opacity: 1}}
                  >
                    <input 
                    onChange={changeEmail}
                    value={useEmail}>
                    </input>
                  </div>
                </div>
              </div>
              <m.button id="sendemail"
                transition={{duration: 0.75, ease: 'easeOut'}}
                exit={{opacity: 1}}
                onClick={submitrequest}
              >
                <img
                  src="/sendemail.png"
                  alt="Geoguru Logo"
                  id="passwordHideImg"
                  className={styles.passwordhide}
                  width={33}
                  height={25}
                />                
              </m.button>
            </div>
            <m.div id="submsg" className={styles.emailsubmission}
              initial={{opacity: 0, y: "700%"}}
            >
              <div>
              <h3>
                {header}
              </h3>
              <h5>
                {subheader}
              </h5>
              </div>
            </m.div>
          </m.div>
        </m.div>
      </>
    );
}