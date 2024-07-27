'use client';

import styles from '../page.module.css';
import { motion as m } from 'framer-motion';

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

  const {start, end} = JSON.parse(window.sessionStorage.getItem('travelInfo'));
  const destination = JSON.parse(window.sessionStorage.getItem('destination'));

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
          body of events
        </div>
    </m.div>
  );
}