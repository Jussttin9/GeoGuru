'use client';

import styles from './../page.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion as m } from 'framer-motion';

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

  const clickLogin = async () => {
    console.log("Email: ", useEmail, " Password: ", usePass);

    if ((useEmail.length > 0) && (usePass.length > 0) && (username.length > 0)) {
      try {
        const response = await fetch('http://localhost:4000/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: useEmail, password: usePass, username }),
        });
          if (response.ok) {
            routeToStart();
          } else {
              const data = await response.json();
              console.error("Registration error: ", data.message);
          }
        } catch (err) {
          console.error("Couldn't login: ", err);
        }
      }
    }

  const router = useRouter();
  function routeToStart() {
    router.replace("/start");
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        exit={{ opacity: 1 }}
      >
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
          </div>
        </m.div>
      </m.div>
    </>
  );
}