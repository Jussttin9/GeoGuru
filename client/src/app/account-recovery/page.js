'use client';

import styles from './../page.module.css';
import { motion as m } from 'framer-motion';
import { animate } from 'framer-motion';
import { useState, useEffect } from 'react';

// This will be our page for the Register page.

export default function Recovery() {
    const [useEmail, setEmail] = useState("");
    const changeEmail = event => {
        setEmail(event.target.value)
    }


    const submitbutton = document.getElementById("sendemail");
    const submissionmsg = document.getElementById("submsg");
    const submitrequest = () => {
      if ((submitbutton != null)) {
        animate(submitbutton, { backgroundColor: "#86EF98" }, {duration: 0.5})
        animate(submissionmsg, { opacity: 1, y: "675%" }, {duration: 0.5} )
        setTimeout(fademessage, 7500);
      }
    }

    function fademessage() {
      animate(submissionmsg, { opacity: 0, y: "700%" }, {duration: 2.5} )
    }

    return (
      <>
        <m.div className={styles.recoveryregister}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          exit={{ opacity: 1 }}
        >
          <m.div className={styles.rrContainer}
            initial={{y: "95%"}}
            animate={{y: "135%"}}
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
          </m.div>
        </m.div>
        <m.div id="submsg" className={styles.emailsubmission}
          initial={{opacity: 0, y: "700%"}}
        >
          <div>
          <h3>
            Sent to {useEmail}!
          </h3>
          <h5>
            Check your inbox to recover your Geoguru account.
          </h5>
          </div>
        </m.div>
      </>
    );
}