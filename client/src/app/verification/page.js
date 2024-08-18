'use client';

import styles from './../page.module.css';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { motion as m } from 'framer-motion';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from '../firebase';

export default function Verification() {
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
            <h2>Your email has been verified. Please return to the home page and log in.</h2>
          </div>
        </m.div>
        </div>
      </m.div>
    </>
  );
}