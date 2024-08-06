'use client';

import { useState, useEffect } from 'react';
import styles from '../page.module.css';
import { motion as m } from 'framer-motion';
import axios from 'axios';
import EventCard from '../COMPONENTS/event';
import Link from 'next/link';

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

  const testLocations = ['South Korea', 'Japan', 'Vietnam', 'United States of America'];
  const serializedLocations = testLocations.join('/');

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/info/attractions?city=LaJolla&country=us&radius=10000');
      setEvents(response.data);
    } catch(error) {
      console.error('Failed to retrieve nearby events:', error);
    };
  }

  useEffect(() => {
    const travelInfo = JSON.parse(window.sessionStorage.getItem('travelInfo'));
    const destinationInfo = JSON.parse(window.sessionStorage.getItem('destination'));

    if (travelInfo) {
      setStart(travelInfo.start || 'None');
      setEnd(travelInfo.end || 'None');
      setAdults(travelInfo.adults || '0');
      setChild(travelInfo.children || '0');
    }

    if (destinationInfo) {
      setDestination(destinationInfo || 'None');
    }

    fetchEvents();
  }, []);

  return (
    <m.div className={styles.itinerary}
      initial={{opacity: 0, height: 0}}
      animate={{opacity: 1, height: "100vh"}}
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
            <div>{destination[0]}</div>
            <div>{destination[1]}</div>
            <div>&rsaquo;</div>
          </div>
          <div className={styles.dateCard}>
            <div>{start}</div>
            <div>&rsaquo;</div>
          </div>
          <div className={styles.dateCard}>
            <div>{end}</div>
            <div>&rsaquo;</div>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.tripName}>Trip to {destination}</div>
          <div className={styles.tripInfo}>
            <p>Start Date: {start}</p>
            <p>End Date: {end}</p>
            <p>Adults: {adults} Children: {child}</p>
          </div>
          <div className={styles.tripEvents}>List of selected events</div>
          <div className={styles.listEvents}>
            <EventCard locations='boo'/>
            <Link href={`events/${serializedLocations}`}>
              <button className={styles.chooseEvent}>Choose Events</button>
            </Link>
          </div>
        </div>
    </m.div>
  );
}