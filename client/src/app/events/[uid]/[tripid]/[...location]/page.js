'use client'

import EventCard from "@/app/COMPONENTS/event";
import styles from '@/app/page.module.css';
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Events({ params }) {
    const [selectedEvents, setSelectedEvents] = useState(new Map())
    const [eventValues, setEventValues] = useState([])

    const locationArr = JSON.stringify(params.location);
    const locations = JSON.parse(decodeURI(locationArr));
    
    const uid = params.uid;
    const tripID = params.tripid;

    const router = useRouter();

    const handleClick = async () => {
        // put in all selected events into the trip's itinerary array
        try {
            const promises = eventValues.map((item) => placeEvents(item));
            await Promise.all(promises);
            router.push(`/itinerary/${uid}`);
        } catch (error) {
            console.error("Error placing events:", error);
        }
    };

    const placeEvents = async (name) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/trip/${tripID}/itineraries`);
            const tripsArr = response.data;
            const inItinerary = tripsArr.some(eventItem => eventItem.title === name);

            if (!inItinerary) {
                await axios.post(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/trip/${tripID}/itinerary`, {
                    title: name
                });
            }
        } catch (error) {
            console.error("Error storing events to trip:", error);
        }
    };

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
            <button className={styles.chooseEvent} onClick={handleClick}>Select Events</button>
        </div>
    );
}