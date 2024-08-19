'use client'

import EventCard from "@/app/COMPONENTS/event";
import styles from '@/app/page.module.css';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Events({ params }) {
    const [selectedEvents, setSelectedEvents] = useState(new Map())
    const [eventValues, setEventValues] = useState([])
    const [loading, setLoading] = useState(false)
    const [itinerary, setItinerary] = useState([])

    const locationArr = JSON.stringify(params.location);
    const locations = JSON.parse(decodeURI(locationArr));
    
    const uid = params.uid;
    const tripID = params.tripid;

    const loadItinerary = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/trip/${tripID}/itineraries`);
        const tripsArr = response.data;
        setItinerary(tripsArr);
    }

    const handleClick = async () => {
        setLoading(true);
        try {
            const promises = eventValues.map((eventList) => eventList.map((item) => placeEvents(item)));
            await Promise.all(promises);
            setTimeout(() => {
                window.location.href = `/itinerary/${uid}`;
            }, 2000);
        } catch (error) {
            console.error("Error placing events:", error);
        } finally {
            setLoading(false);
        }
    };

    const placeEvents = async (name) => {
        try {
            const inItinerary = itinerary.some(eventItem => eventItem.title === name);
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
        const eventList = []
        for (const arr of eventValues) {
            if(arr.length !== 0) {
                eventList.push(arr.join(', '))
            }
        }
        return (
          <div className={styles.selectedEvents}><h2>Selected Events: </h2>{eventList.join(', ')}</div>
        );
    };

    useEffect(() => {
        loadItinerary();
    }, []);

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
            <div className={styles.listEvents}>
                {locations.map(locate => (
                    <EventCard key={locate} location={locate} setSelectedEvents={setEvents}/>
                ))}
            </div>
            {displaySelectedEvents()}
            <button className={styles.chooseEvent} onClick={handleClick}>{loading ? 'Processing...' : 'Select Events'}</button>
        </div>
    );
}