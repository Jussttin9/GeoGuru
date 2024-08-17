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

  const [start, setStart] = useState('None');
  const [end, setEnd] = useState('None');
  const [adults, setAdults] = useState('0');
  const [child, setChild] = useState('0');
  const [destination, setDestination] = useState('None');
  const [events, setEvents] = useState([]);

  const [trips, setTrips] = useState([]);
  const [tripIndex, setTripIndex] = useState(-1);

  const uid = params.uid[0]

  // DELETE TESTS ------------------------------------------------------------
  const testLocations = ['South Korea', 'Japan', 'Vietnam', 'United States'];
  const serializedLocations = testLocations.join('/');

  const testJSON = {"start":"August 9, 2024","end":"August 22, 2024","adults":"2","children":"0"};
  const testTravel = JSON.stringify(testJSON);
  // DELETE TESTS ------------------------------------------------------------

  const loadTrips = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/get-info/${uid}`);
    const user = response.data;
    setTrips(user.trips);
  }

  const renderTrips = () => {
    return (
      <>
        {trips.map((trip, index) => (
          <button key={trip._id} className={styles.dateCard} onClick={() => setTripIndex(index)}>
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
        <div>No Trip Selected</div>
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
        tripID={trip._id}   // might have to remove
      />
    )
  }

  useEffect(() => {
    const travelInfo = JSON.parse(window.sessionStorage.getItem('travelInfo'));
    const destinationInfo = JSON.parse(window.sessionStorage.getItem('destination'));
    const selectedEvents = JSON.parse(window.sessionStorage.getItem('events'));

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

    loadTrips();
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
        {renderTrips()}
      </div>
      {renderItinerary(tripIndex)}
    </m.div>
  );
}