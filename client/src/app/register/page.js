'use client';

import styles from './../page.module.css';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion as m } from 'framer-motion';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from '../firebase';

export default function Register() {
  const [useEmail, setEmail] = useState("");
  const changeEmail = event => {
    setEmail(event.target.value);
  };

  const [usePass, setPass] = useState("");
  const changePass = event => {
    setPass(event.target.value);
  };

  const [username, setUsername] = useState("");
  const changeUsername = event => {
    setUsername(event.target.value);
  };

  const [userObj, setUser] = useState(null);

  const [error, setError] = useState(null);
  const [verifyPopup, setVerifyPopup] = useState(false);
  const [message, setMessage] = useState('');

  const clickLogin = async () => {
    setError(null);
    if ((useEmail.length > 0) && (usePass.length > 0) && (username.length > 0)) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, useEmail, usePass);
        setUser(userCredential);
        const userID = userCredential.user.uid;
        // send a POST request to create a new User to store in mongoDB
        await axios.post(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/register`, {
          email: useEmail,
          username: username,
          id: userID
        });
        if (userCredential.user != null) {
          await sendEmailVerification(userCredential.user);
        } 
        setVerifyPopup(true);
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          setError('Email already in use');
        } else {
          setError("Couldn't use credentials to register");
        }
      }
    } else {
      setError('Please fill out all fields.')
    }
  }

  const sendVerificationEmail = async () => {
    await sendEmailVerification(userObj.user);
    setMessage('Verification email sent!');
  }

  const router = useRouter();
  function routeToHome() {
    router.replace("/");
  }

  const exitPopup = () => {
    setVerifyPopup(!verifyPopup);
    setMessage('');
  }

  useEffect(() => {
    if (usePass.length === 0) {
      document.getElementById("passwordHideImg").src = "/password_blank.png";
    } else {
      const x = document.getElementById("passwordBox");
      if (x.type === "password") {
        document.getElementById("passwordHideImg").src = "/password_eyeclosed.png";
      } else if (x.type === "text") {
        document.getElementById("passwordHideImg").src = "/password_eyeopen.png";
      }
    }
  }, [usePass]);

  function toggleCheckbox() {
    const x = document.getElementById("passwordBox");
    console.log("clicked");
    document.getElementById("passwordHideImg").src = "/password_eyeclosed.png";
    if (x.type === "password") {
      x.type = "text";
      document.getElementById("passwordHideImg").src = "/password_eyeopen.png";
    } else {
      x.type = "password";
      document.getElementById("passwordHideImg").src = "/password_eyeclosed.png";
    }
    console.log(document.getElementById("passwordHideImg").src);
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
        <m.div className={styles.registerContainer}
          initial={{ y: 145 }}
          animate={{ y: 95 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          exit={{ opacity: 1 }}
        >
          <br />
          <Image
            src="/geogurulogo.svg"
            alt="Geoguru Logo"
            className={styles.logoimg}
            width={38}
            height={54}
            priority
          />
          <div className={styles.registerOvertext}>
            <h3>Create your account</h3>
            <p>Sign up with an email and password below to get started with Geoguru!</p>
            <br />
          </div>
          <div className={styles.logininfo}>
            <h3>Username</h3>
            <div className={styles.logininfoboxes}>
              <div className={styles.passwordbox}>
                <div className={styles.passwordinput}>
                  <input onChange={changeUsername} value={username} />
                </div>
              </div>
            </div>
            <h2></h2>
            <h3>Email Address</h3>
            <div className={styles.logininfoboxes}>
              <div className={styles.passwordbox}>
                <div className={styles.passwordinput}>
                  <input onChange={changeEmail} value={useEmail} />
                </div>
              </div>
            </div>
            <h2></h2>
            <h3>Password</h3>
            <div className={styles.logininfoboxes}>
              <div className={styles.passwordbox}>
                <div className={styles.passwordinput}>
                  <input onChange={changePass} value={usePass} type="password" id="passwordBox" />
                  <div className={styles.passwordbutton}>
                    <button onClick={toggleCheckbox}>
                      <img
                        src="/password_blank.png"
                        alt="Geoguru Logo"
                        id="passwordHideImg"
                        className={styles.passwordhide}
                        width={25}
                        height={25}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
          <div className={styles.signupButton}>
            <button onClick={clickLogin}>Sign up</button>
            {error && <p>{error}</p>}
          </div>
        </m.div>
        </div>
        {verifyPopup && (
                <div>
                    <m.div onClick={() => exitPopup()} className={styles.deleteShadow}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                    />
                    <m.div className={styles.deleteContent}
                    initial={{ top: "150%" }}
                    animate={{ top: "43%" }}
                    transition={{ duration: 0.75, type: "spring" }}
                    >
                        <br/>
                        <h2 className={styles.notice}>A verification email has been sent.</h2>
                        <br/>
                        <div className={styles.verifyMessage}>{message}</div>
                        <div>
                            <button className={styles.verifyButton} onClick={() => sendVerificationEmail()}>Resend Verification Email</button>
                            <button className={styles.deleteButton} onClick={() => routeToHome()}>Return</button>
                        </div>
                    </m.div>
                </div>
            )}
      </m.div>
    </>
  );
}