'use client';

import styles from '../../page.module.css';
import { motion as m } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DestinationComponent from '../../COMPONENTS/destination';
import axios from 'axios';

// returns true if date1 comes before date2
// otherwise returns false
// strings are in the form: "month day, year"
let monthDict = {"January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5, "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11};

function getNewDates(date1, date2) {
  const year1 = date1.substr(date1.length-4);
  const month1 = monthDict[date1.split(' ')[0]];
  const day1 = date1.split(' ')[1].substr(0,date1.length-1);

  const year2 = date2.substr(date2.length-4);
  const month2 = monthDict[date2.split(' ')[0]];
  const day2 = date2.split(' ')[1].substr(0,date2.length-1);

  let newDate1 = new Date(parseInt(year1), month1, parseInt(day1));
  let newDate2 = new Date(parseInt(year2), month2, parseInt(day2));

  return newDate1 < newDate2;
}

export default function TripPlanner({ params }) {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [combinedDays, setCombinedDays] = useState([]);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const uid = params.uid[0];

  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  async function handleClick() {
    setLoading(true);
    try {
      let travelInfo = {start: startDate, end: endDate, adults: numAdults, children: numChildren};
      window.sessionStorage.setItem('travelInfo', JSON.stringify(travelInfo));

      await axios.post(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/trip/add-trip`, {
        userID: uid,
        startDate: startDate,
        endDate: endDate,
        tripID: uid,
        adults: numAdults,
        children: numChildren,
        destination: JSON.parse(window.sessionStorage.getItem('destination')),
        itinerary: []
      });

      setTimeout(() => {
        window.location.href = `/itinerary/${uid}`;
      }, 1000);
    } catch (error) {
      console.error('Error generating trip:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleAdultNum = (e) => {
    setNumAdults(e.target.value);
  }

  const handleChildNum = (e) => {
    setNumChildren(e.target.value);
  }

  useEffect(() => {
    if (!window.sessionStorage.getItem("startDateString")) {
      window.sessionStorage.setItem("startDateString", "");
      window.sessionStorage.setItem("startDateStatus", "false");
      window.sessionStorage.setItem("endDateStatus", "false");
      window.sessionStorage.setItem('travelInfo', {});
      window.sessionStorage.setItem('travelInfo', JSON.stringify({}));
    }

    const newLastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const newPrevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    // gets values from window.sessionStorage
    let startDateStatus = window.sessionStorage.getItem("startDateStatus") === "true" ? true : false;
    let endDateStatus = window.sessionStorage.getItem("endDateStatus") === "true" ? true : false;
    let startDateString = window.sessionStorage.getItem("startDateString");

    // sets current days
    const curDays = [];
    const month = months[date.getMonth()].toString();
    const year = date.getFullYear().toString();
    for (let i = 1; i <= newLastDay; i++) {
      let dateString = month + " " + i + ", " + year;
      if (
        i === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
      ) {
        curDays.push(<div key={i} className={styles.today} onClick={() => setStartDate(dateString)}>{i}</div>);
      } else {
        curDays.push(<div key={i} onClick={() => {
          if (!startDateStatus) {
          setStartDate(dateString);
          window.sessionStorage.setItem("startDateStatus", "true");
          window.sessionStorage.setItem("startDateString", dateString);
          startDateString = dateString;
          startDateStatus = true;
        } else if (startDateStatus && !endDateStatus){
          if (getNewDates(startDateString, dateString)) {
            setEndDate(dateString);
          } else {
            setStartDate(dateString);
            setEndDate(startDateString);
            startDateString = dateString;
            window.sessionStorage.setItem("startDateString", dateString);
          }
          window.sessionStorage.setItem("endDateStatus", "true");
          endDateStatus = true;
        } else {
          setStartDate(dateString);
          setEndDate("");
          startDateString = dateString;
          endDateStatus = false;
          window.sessionStorage.setItem("startDateString", dateString);
          window.sessionStorage.setItem("endDateStatus", "false");
        }
        }}>{i}</div>);
      }
    }

    // sets previous days
    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const prevDay = [];

    const prevMonth = date.getMonth() === 0 ? months[11].toString() : months[date.getMonth()-1].toString();
    const prevYear = date.getMonth() === 0 ? (date.getFullYear()-1).toString() : date.getFullYear().toString();

    for (let i = firstDayIndex; i > 0; i--) {
      let dateString = prevMonth + " " + (newPrevLastDay - i + 1) + ", " + prevYear;
      prevDay.push(<div key={`prevDay${i}`} className={styles.prevDate} onClick={() => {
        if (!startDateStatus) {
          setStartDate(dateString);
          window.sessionStorage.setItem("startDateStatus", "true");
          window.sessionStorage.setItem("startDateString", dateString);
          startDateString = dateString;
          startDateStatus = true;
        } else if (startDateStatus && !endDateStatus){
          if (getNewDates(startDateString, dateString)) {
            setEndDate(dateString);
          } else {
            setStartDate(dateString);
            setEndDate(startDateString);
            startDateString = dateString;
            window.sessionStorage.setItem("startDateString", dateString);
          }
          window.sessionStorage.setItem("endDateStatus", "true");
          endDateStatus = true;
        } else {
          setStartDate(dateString);
          setEndDate("");
          startDateString = dateString;
          endDateStatus = false;
          window.sessionStorage.setItem("startDateString", dateString);
          window.sessionStorage.setItem("endDateStatus", "false");
        }
      }}>{newPrevLastDay - i + 1}</div>);
    }

    // sets future days
    const nextDay = [];
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDayIndex = 7 - lastDayIndex - 1;

    const nextMonth = date.getMonth() === 11 ? months[0].toString() : months[date.getMonth()+1].toString();
    const nextYear = date.getMonth() === 11 ? (date.getFullYear()+1).toString() : date.getFullYear().toString();

    for (let i = 1; i <= nextDayIndex; i++) {
      let dateString = nextMonth + " " + i + ", " + nextYear;
      nextDay.push(<div key={`nextDay${i}`} className={styles.nextDate} onClick={() => {
        if (!startDateStatus) {
          setStartDate(dateString);
          window.sessionStorage.setItem("startDateStatus", "true");
          window.sessionStorage.setItem("startDateString", dateString);
          startDateString = dateString;
          startDateStatus = true;
        } else if (startDateStatus && !endDateStatus){
          if (getNewDates(startDateString, dateString)) {
            setEndDate(dateString);
          } else {
            setStartDate(dateString);
            setEndDate(startDateString);
            startDateString = dateString;
            window.sessionStorage.setItem("startDateString", dateString);
          }
          window.sessionStorage.setItem("endDateStatus", "true");
          endDateStatus = true;
        } else {
          setStartDate(dateString);
          setEndDate("");
          startDateString = dateString;
          endDateStatus = false;
          window.sessionStorage.setItem("startDateString", dateString);
          window.sessionStorage.setItem("endDateStatus", "false");
        }
      }}>{i}</div>);
    }
    setCombinedDays([...prevDay, ...curDays, ...nextDay]);
  }, [date]);

  const changeMonth = (direction) => {
    setDate(new Date(date.getFullYear(), date.getMonth() + direction, 1));
  };
  
  return (
    <m.div className={styles.itinerary}
      initial={{opacity: 0, height: 0}}
      animate={{opacity: 1, height: "100vh"}}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      exit={{ opacity: 1 }}
    >
      <div className={styles.leftCol}>
        <div className={styles.title}>
          <h3><strong>Build Your Trip</strong></h3>
        </div>
        <div id="destinations" className={styles.destinations}>
          <label htmlFor="destinations" className={styles.label}>Destination</label>
          <DestinationComponent/>
        </div>
        <div className={styles.travelers}>
          <label htmlFor="destinations" className={styles.label}>Travelers</label>
          <div className={styles.adult}>
            Adults
            <input type="number" defaultValue={1} min={0} onChange={handleAdultNum}></input>
          </div>
          <div className={styles.child}>
            Children
            <input type="number" className={styles.centered} defaultValue={1} min={0} onChange={handleChildNum}></input>
          </div>
        </div>
      </div>
      <div className={styles.rightCol}>
        <div className={styles.container}>
          <div className={styles.calendar}>
            <div className={styles.month}>
              <div className={styles.monthChange} onClick={() => changeMonth(-1)}>&lsaquo;</div>
              <div className={styles.date}>
                <h1>{months[date.getMonth()]} {date.getFullYear()}</h1>
              </div>
              <div className={styles.monthChange} onClick={() => changeMonth(1)}>&rsaquo;</div>
            </div>
            <div className={styles.weekdays}>
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className={styles.week}>
              {combinedDays.slice(0,7)}
            </div>
            <div className={styles.week}>
              {combinedDays.slice(7,14)}
            </div>
            <div className={styles.week}>
              {combinedDays.slice(14,21)}
            </div>
            <div className={styles.week}>
              {combinedDays.slice(21,28)}
            </div>
            <div className={styles.week}>
              {combinedDays.slice(28,35)}
            </div>
            <div className={styles.week}>
              {combinedDays.slice(35)}
            </div>
          </div>
        </div>
        <div className={styles.generate}>
          <div className={styles.startDate}>
            <p className={styles.label}>Start Date: </p>
            <p className={styles.dateVal}>{startDate}</p>
          </div>
          <div className={styles.endDate}>
            <p className={styles.label}>End Date: </p>
            <p className={styles.dateVal}>{endDate}</p>
          </div>
          <button onClick={handleClick}>{loading ? 'generating trip...' : 'generate'} &rsaquo;&rsaquo;</button>
        </div>
      </div>
    </m.div>
  );
}