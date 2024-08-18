'use client';

import styles from './../page.module.css';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { motion as m } from 'framer-motion';
import { applyActionCode } from "firebase/auth";
import { auth } from '../firebase';
import { useEffect, useState } from 'react';



export default function Verification({ params }) {
  const mode = params.mode;
  const oob = params.oobCode;
  const [message, setMessage] = useState('Your email has been verified. Please return to the home page and log in.')
  
  useEffect(() => {
    if (mode === 'verifyEmail' && oob) {
      verifyEmail(oob);
    }
  }, []);

  const verifyEmail = async (code) => {
    try {
      await applyActionCode(auth, code);
    } catch (error) {
      setMessage('Your email has not been verified please try again later.');
    }
  }

  return (
    <>
      <m.div className={styles.registerPanel}
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
        <m.div className={styles.verifyText}
          initial={{ y: 145 }}
          animate={{ y: 95 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          exit={{ opacity: 1 }}
        >
          <Image
            src="/geogurulogo.svg"
            alt="Geoguru Logo"
            className={styles.logoimg}
            width={38}
            height={54}
            priority
          />
          <div className={styles.registerOvertext}>
            <h2>{message}</h2>
          </div>
        </m.div>
        </div>
      </m.div>
    </>
  );
}