'use client';

import styles from './../page.module.css';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { useEffect } from 'react';

export default function AddEvent() {
    
    const [useEmail, setEmail] = useState("");
    const changeEmail = event => {
        setEmail(event.target.value)
    }

    const [usePass, setPass] = useState("");
    
    const changePass = event => {
        setPass(event.target.value)
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
        </div>
      </>
    );
}