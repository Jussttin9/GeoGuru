'use client'

import EventCard from "@/app/COMPONENTS/event";
import styles from '../../../page.module.css';
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Events({ params }) {
    const [selectedEvents, setSelectedEvents] = useState(new Map())
    const [eventValues, setEventValues] = useState([])

    const locationArr = JSON.stringify(params.location);
    const locations = JSON.parse(decodeURI(locationArr));
    
    const uid = params.uid;

    const setEvents = (key, eventsArr) => {
        setSelectedEvents(eventMap => new Map(eventMap).set(key, eventsArr));
    };

    const displaySelectedEvents = () => {
        return (
          <div>{eventValues.join(', ')}</div>
        );
    };

    useEffect(() => {
        if(!window.sessionStorage.getItem("events")) {
            window.sessionStorage.setItem("events", JSON.stringify([]));
        }
        window.sessionStorage.setItem("events", JSON.stringify([...selectedEvents.values()].flat()));
        setEventValues([...selectedEvents.values()]);
    }, [selectedEvents]);
    

    return (
        <div className={styles.getEvent}>
            <h1 className={styles.eventsTitle}>Select Your Events:</h1>
            My Locations: {locations.join(', ')}
            <div className={styles.listEvents}>
                {locations.map(locate => (
                    <EventCard key={locate} location={locate} setSelectedEvents={setEvents}/>
                ))}
            </div>
            {displaySelectedEvents()}
            <Link href={`/itinerary/${uid}`}><button className={styles.chooseEvent}>Select Events</button></Link>
        </div>
    );
}