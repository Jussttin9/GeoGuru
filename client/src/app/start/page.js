'use client';

import styles from './../page.module.css';
import { motion as m } from 'framer-motion';
import { animate } from 'framer-motion';

import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';

import { Calendar } from 'react-calendar';

import './../Calendar.css';

// This is the Start page. Our goal is to make this a page that you get
// redirected to after clicking on the start button on the homepage *if*
// the user is logged in.


export default function Start() {
    // USE THE FOLLOWING FOR DESTINATION(S) IN POSTS!
    const [valuesArray, setValuesArray] = useState([]);

    const addDestination = () => {
      setValuesArray([...valuesArray, '']);
    };

    const handleInputChange = (index, value) => {
      const newValuesArray = [...valuesArray];
      newValuesArray[index] = value;
      setValuesArray(newValuesArray);
    }

    // USE THE FOLLOWING FOR BUDGET IN POSTS!
    const [useBudget, setBudget] = useState("1");

    const changeBudget = event => {
      setBudget(event.target.value);
    }

    useEffect(() => {
      var input = document.getElementById('budgetInput');
      if (useBudget.length == 0) {
        setBudget("1");
      }
      input.style.width = useBudget.length + "ch";
    }, [useBudget]);

    // picker date on suer calendar, NOT chosen trip dates
    const [useDate, setDate] = useState(new Date());

    var initialDateButton;
    var finalDateButton;

    useEffect(() => {
      initialDateButton = document.getElementById("initialDateBox");
      finalDateButton = document.getElementById("finalDateBox");
    }, [useDate]);


    // USE THE FOLLOWING AS INITIAL AND FINAL DATES IN POSTS!
    const [useInitialDate, setInitialDate] = useState(new Date());
    const [useFinalDate, setFinalDate] = useState(new Date());

    const setInitialDateAction = () => {
      setInitialDate(useDate);
      animate(initialDateButton, { color: "#82D9E5" }, {duration: 0.01});
      setTimeout(finishInitialDateClickAnim, 1);
    };

    function finishInitialDateClickAnim () {
      animate(initialDateButton, { color: "#000000" }, {duration: 10});
    };

    const setFinalDateAction = () => {
      setFinalDate(useDate);
      animate(finalDateButton, { color: "#82D9E5" }, {duration: 0.01});
      setTimeout(finishFinalDateClickAnim, 1);
    };   

    function finishFinalDateClickAnim() {
      animate(finalDateButton, { color: "#000000" }, {duration: 10});
    };


    // THE FOLLOWING FUNCTION SHOULD SUBMIT THE TRIP DATA TO THE USER ID
    // ON THE SERVER SIDE, THEN TAKE THEM TO ITINERARY WITH THE TRIP ID TO EDIT IT
    const router = useRouter();

    const submitTrip = async () => {
      router.replace("/itinerary");
    };

    // html return:

    return (
      <div className={styles.startContainer}>
        <m.div className={styles.startbg}
          initial={{opacity: 0 }}
          animate={{opacity: 1 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          exit={{ opacity: 1 }}
        >
          <m.div className={styles.col1}
            initial={{x:"-1000px"}}
            animate={{x:"0px"}}
            transition={{ duration: 0.75, type: 'spring' }}
            exit={{ opacity: 1 }}
          >
            <div className={styles.headerWrapper}>
              Build Your Trip
            </div>

            <div className={styles.col1Container}>
              <div className={styles.destinationHeader}>
                <h1>
                  Destination
                </h1>
                <div className={styles.destinationContainer}>
                  <div className={styles.destination}>
                    <div className={styles.destinationCol1}>
                      From...
                    </div>
                    <div className={styles.destinationCol2}>
                      <input>
                      </input>
                    </div>
                  </div>

                  {/* the following is a rendering of an array of all possible destinations.
                  since the schema seems to be built for just one destination, we can remove 
                  the .map() and keep the div structure in case we dont have time to implement it 
                  (we really dont lol)*/}
                  {valuesArray.map((value, index) => (
                    <div className={styles.destination}>
                      <div className={styles.destinationCol1}>
                        To...
                      </div>
                      <div className={styles.destinationCol2} key={index}>
                        <input type="text" value={value}
                          onChange={(e) => handleInputChange(index, e.target.value)}>
                        </input>
                      </div>
                    </div>
                  ))}

                  <div className={styles.destination}>
                    <div className={styles.destinationCol1}>
                    </div>
                    <div className={styles.destinationCol2}>
                      <button onClick={addDestination}>
                        + destination
                      </button>
                    </div>
                  </div>                
                </div>
              </div>
              <div className={styles.destinationHeader}>
                <h1>
                  Budget
                </h1>
                <div className={styles.budgetContainer}>
                  <h3>
                    <input id="budgetInput" onChange={changeBudget}
                      value={useBudget}>
                    </input>
                    USD
                  </h3>
                </div>
              </div>
            </div>
          </m.div>
          <m.div className={styles.col2}
            initial={{x:"1000px"}}
            animate={{x:"0px"}}
            transition={{ duration: 0.75, type: 'spring' }}
            exit={{ opacity: 1 }}
          >
            <div className={styles.destinationHeader}>
              <h1>
                Dates
              </h1>
              <div className={styles.datesContainer}>
                <div className={styles.calendarContainer}>
                  <Calendar onChange={setDate} value={useDate}/>
                </div>
                <div className={styles.datePickers}>
                  <div className={styles.initDatePick}>
                    <button onClick={setInitialDateAction}>
                      SET FIRST DAY
                    </button>
                    <m.h4 id='initialDateBox'
                      initial={{color:"#000000"}}
                      transition={{duration: 0.75, ease: 'easeOut'}}
                      exit={{opacity: 1}}
                    >
                      {useInitialDate.getMonth() + ' / ' + useInitialDate.getDate() + ' / ' + useInitialDate.getFullYear()}
                    </m.h4>
                  </div>
                  <div className={styles.finalDatePick}>
                    <button onClick={setFinalDateAction}>
                      SET FINAL DAY
                    </button>
                    <m.h4 id='finalDateBox'
                      initial={{color:"#000000"}}
                      transition={{duration: 0.75, ease: 'easeOut'}}
                      exit={{opacity: 1}}
                    >
                      {useFinalDate.getMonth() + ' / ' + useFinalDate.getDate() + ' / ' + useFinalDate.getFullYear()}
                    </m.h4>
                  </div>
                </div>
              </div>
            </div>
            <h2 onClick={submitTrip}>
              {'Generate!'}
            </h2>
          </m.div>
        </m.div>
      </div>
    );
}