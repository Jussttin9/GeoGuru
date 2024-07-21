'use client';

import styles from './../page.module.css';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { useEffect } from 'react';

export default function LoginInfo() {
    
    // here is the login modal, which serves as a popup after clicking on the
    // homepage's start button if you're not already logged in.

    // here, we use useState from React to get (useEmail) and
    // to set (setEmail) the user's email and password.
    
    // arrow functions are then used to set the email value to something
    // new whenever the function is called with a given event.

    const [useEmail, setEmail] = useState("");
    const changeEmail = event => {
        setEmail(event.target.value)
    }

    // same is done here with Paswords
    const [usePass, setPass] = useState("");
    
    const changePass = event => {
        setPass(event.target.value)
    }

    // useEffect to remedy toggleCheckbox bug
    // { checking on an empty password field will invert visibility }
    useEffect(() => {
      if (usePass.length == 0) {
        document.getElementById("passwordHideImg").src="/password_blank.png";
      }
      else {
        var x = document.getElementById("passwordBox");
        if (x.type == "password") {
          document.getElementById("passwordHideImg").src="/password_eyeclosed.png"
        }
        else if (x.type == "text") {
          document.getElementById("passwordHideImg").src="/password_eyeopen.png"
        }
      }
    }, [usePass])

    // this function when called will eventually request the given
    // email and password data from a matching userID in MongoDB.
    const clickLogin = () => {
      console.log("Email: ", useEmail, " Password: ", usePass);
      if ((useEmail.length > 0) && (usePass.length > 0)) {
        routeToStart();
      }
    }
  
    const router = useRouter();
    function routeToStart() {
      router.replace("/start");
    }

    function toggleCheckbox() {
        var x = document.getElementById("passwordBox");
        console.log("clicked");
        document.getElementById("passwordHideImg").src="/password_eyeclosed.png";
        if (x.type == "password") {
          x.type = "text";
          document.getElementById("passwordHideImg").src="/password_eyeopen.png";
        }
        else {
          x.type = "password";
          document.getElementById("passwordHideImg").src="/password_eyeclosed.png";
        }
        console.log(document.getElementById("passwordHideImg").src);
    }

    // here is the returned HTML, where we have an <input> box that holds the
    // get value for email and password, and that can also call its respective
    // arrow function, changeEmail or changePass, to set the value to something
    // different whenever the user types something.

    // then there is a <button> component, that when onClick, will call the
    // clickLogin arrow function to send a request to the database.
    return (
      <>
        <div className={styles.logininfo}>
          <h3>
            Email Address
          </h3>
          <div className={styles.logininfoboxes}>
            <div className={styles.passwordbox}>
              <div className={styles.passwordinput}>
                <input onChange={changeEmail}
                value = {useEmail}>
                </input>
              </div>
            </div>
          </div>
          <h2></h2>
          <h3>
            Password
          </h3>
          <div className={styles.logininfoboxes}>
            <div className={styles.passwordbox}>
              <div className={styles.passwordinput}>
                <input onChange={changePass}
                value={usePass} type="password" id="passwordBox">
                </input>
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
          <h3></h3>
          <br/>
          <div className={styles.signin}>
            <button onClick={clickLogin}>Sign in</button>
          </div>
        </div>
        <div className={styles.signup}>
          <h4>
            Don't have an account yet?  
          </h4>
          <h5>
            <Link href={"/register"}>Sign Up</Link>
          </h5>
        </div>
        <div className={styles.forgotpass}>
          <h5>
            <Link href={"/account-recovery"}>Forgot password?</Link>
          </h5>
        </div>
      </>
    );
}