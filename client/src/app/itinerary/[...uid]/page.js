'use client';

import { useState, useEffect } from 'react';
import styles from '../../page.module.css';
import axios from 'axios';
import { motion as m } from 'framer-motion';
import ItineraryPage from '../../COMPONENTS/itinerary-page';

// This will be our page for the Itinerary page. Change it as you'd like!

// USER SCHEMA:
// _id: String,
// username: String,
// email: String,
// trips: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Trip'
// }]

// TRIP SCHEMA:
// startDate: String,
// endDate: String,
// adults: Number,
// children: Number,
// destination: [String],
// itinerary: [{
//     title: String,
// }]

export default function Itinerary({ params }) {
  const [trips, setTrips] = useState([]);
  const [tripIndex, setTripIndex] = useState(-1);
  const [update, setUpdate] = useState(false);

  const uid = params.uid[0]

  const loadTrips = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/get-info/${uid}`);
    const user = response.data;
    if (user.trips.length == 0) {
      setTripIndex(-1);
    } else {
      setTripIndex(0);
    }
    setTrips(user.trips);
  }

  const reloadTrip = () => {
    setUpdate(!update);
  }

  const renderTrips = () => {
    if (trips.length == 0) {
      return (
        <div>
          No trips made. 
          <br/>
          Click the 'TRIPS' tab to create a trip.
        </div>
      );
    }
    
    return (
      <>
        {trips.map((trip, index) => (
          <button key={trip._id} className={`${tripIndex === index ? styles.tripCardSelected : styles.tripCard}`} onClick={() => setTripIndex(index)}>
            <div>Trip {index+1}</div>
            <div>&rsaquo;</div>
          </button>
        ))}
      </>
    );
  }

  const renderItinerary = (index) => {
    if (index == -1) {
      return (
        <div className={styles.noTrip}>
          No Trip Selected
        </div>
      )
    }
    const trip = trips[index]
    const itinerary = trip.itinerary.map((item) => item.title);
    return (
      <ItineraryPage
        start={trip.startDate}
        end={trip.endDate}
        adults={trip.adults}
        child={trip.children}
        destination={trip.destination}
        selectedEvents={itinerary}
        uid={uid}
        tripID={trip._id}
        load={reloadTrip}
      />
    )
  }

  useEffect(() => {
    loadTrips();
  }, []);

  useEffect(() => {
    loadTrips();
  }, [update])

  return (
    <m.div className={styles.itinerary}
      initial={{opacity: 0, height: 0}}
      animate={{opacity: 1, height: "fit-content"}}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      exit={{ opacity: 1 }}
    >
      <div className={styles.itineraryList}>
        <strong>Itinerary</strong>
        {renderTrips()}
      </div>
      {renderItinerary(tripIndex)}
    </m.div>
  );
}