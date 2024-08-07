'use client';

import { useState, useEffect } from 'react';
import styles from '../page.module.css';
import { motion as m } from 'framer-motion';
import Link from 'next/link';
import ItineraryPage from '../COMPONENTS/itinerary-page';

// This will be our page for the Itinerary page. Change it as you'd like!

class Event {
  constructor(title, location, cost, description, date) {
    this.title = title;
    this.location = location;
    this.cost = cost;
    this.description = description
    this.date = date;
  }
}

export default function Itinerary() {

  const [start, setStart] = useState('None');
  const [end, setEnd] = useState('None');
  const [adults, setAdults] = useState('0');
  const [child, setChild] = useState('0');
  const [destination, setDestination] = useState('None');
  const [events, setEvents] = useState([]);
  const [travel, setTravelInfo] = useState('');


  // DELETE TESTS ------------------------------------------------------------
  const testLocations = ['South Korea', 'Japan', 'Vietnam', 'United States'];
  const serializedLocations = testLocations.join('/');

  const testJSON = {"start":"August 9, 2024","end":"August 22, 2024","adults":"2","children":"0"};
  const testTravel = JSON.stringify(testJSON);
  // DELETE TESTS ------------------------------------------------------------


  useEffect(() => {
    const travelInfo = JSON.parse(window.sessionStorage.getItem('travelInfo'));
    const destinationInfo = JSON.parse(window.sessionStorage.getItem('destination'));
    const selectedEvents = JSON.parse(window.sessionStorage.getItem('events'));

    setTravelInfo(JSON.stringify(travelInfo));

    if (travelInfo) {
      setStart(travelInfo.start || 'None');
      setEnd(travelInfo.end || 'None');
      setAdults(travelInfo.adults || '0');
      setChild(travelInfo.children || '0');
    }

    if (destinationInfo) {
      setDestination(destinationInfo || 'None');
    }

    if (selectedEvents) {
      setEvents(selectedEvents || ['No events selected']);
    }
  }, []);

  return (
    <m.div className={styles.itinerary}
      initial={{opacity: 0, height: 0}}
      animate={{opacity: 1, height: "fit-content"}}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      exit={{ opacity: 1 }}
    >
      <div className={styles.itineraryList}>
        <strong>Itinerary</strong>
        {/* replace with date itinerary components later */}
        <div className={styles.dateCard}>
            <div>date card 1</div>
            <div>&rsaquo;</div>
        </div>
        <div className={styles.dateCard}>
            <div>blank</div>
            <div>blank</div>
            <div>&rsaquo;</div>
        </div>
        <div className={styles.dateCard}>
            <div>blank</div>
            <div>&rsaquo;</div>
        </div>
        <div className={styles.dateCard}>
            <div>blank</div>
            <div>&rsaquo;</div>
        </div>
      </div>
      <ItineraryPage
        start={start}
        end={end}
        adults={adults}
        child={child}
        destination={destination}
        selectedEvents={events}
      />
    </m.div>
  );
}