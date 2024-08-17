import React, { useEffect, useState } from 'react';
import styles from '@/app/page.module.css';
import Link from 'next/link';
import SelectedEvent from './selectedEvent';
import axios from 'axios';
import { motion as m } from "framer-motion";

export default function ItineraryPage({ start, end, adults, child, destination, selectedEvents, uid, tripID }) {
    const testLocations = ['South Korea', 'Japan', 'Vietnam', 'United States', 'United Kingdom'];
    const serializedLocations = destination == 'None' ? testLocations.join('/') : destination.join('/');
    const [selectedList, updateSelectedList] = useState([]);
    const [deletePopup, setDeletePopup] = useState(false);

    const deleteTrip = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/trip/delete-trip`, {
                data: {
                    userID: uid,
                    tripID: tripID
                }
            });
            setDeletePopup(!deletePopup);
        } catch (error) {
            console.error("Couldn't delete trip:", error);
        }
    }

    const removeItem = async (name) => {
        updateSelectedList(selectedList.filter(item => item !== name));
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/trip/${tripID}/itineraries`);
            const tripsArr = response.data;
            for (const trip of tripsArr) {
                if (trip.title === name) {
                    await axios.delete(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/trip/${tripID}/itinerary/${trip._id}`);
                    break;
                }
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    }

    const renderSelectedEvents = () => {
        return selectedList.map(item => (
            <SelectedEvent key={item} name={item} removeEvent={removeItem}/>
        ))
    }
        
    useEffect(() => {
        updateSelectedList(selectedEvents)
    }, [selectedEvents])

    return (
        <div className={styles.info}>
            <div className={styles.tripName}>Trip to {destination == 'None' ? testLocations.join(', ') : destination.join(', ')}</div>
            <div className={styles.tripInfo}>
                <p>Start Date: {start}</p>
                <p>End Date: {end}</p>
                <p>Adults: {adults} Children: {child}</p>
            </div>
            <div className={styles.tripEvents}>List of selected events</div>
            {renderSelectedEvents()}
            <div className={styles.listEvents}>
                <Link href={`/events/${uid}/${tripID}/${serializedLocations}`}>
                    <button className={styles.chooseEvent}>Choose Events</button>
                </Link>
                <button className={styles.deleteTrip} onClick={() => setDeletePopup(!deletePopup)}>Delete Trip</button>
            </div>
            {deletePopup && (
                <div>
                    <m.div onClick={() => setDeletePopup(!deletePopup)} className={styles.deleteShadow}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                    />
                    <m.div className={styles.deleteContent}
                    initial={{ top: "150%" }}
                    animate={{ top: "43%" }}
                    transition={{ duration: 0.75, type: "spring" }}
                    >
                        <br/>
                        <h2>Are you sure you want to delete this trip?</h2>
                        <br/>
                        <div>
                            <button className={styles.deleteButton} onClick={deleteTrip}>Yes</button>
                            <button className={styles.deleteButton} onClick={() => setDeletePopup(!deletePopup)}>No</button>
                        </div>
                    </m.div>
                </div>
            )}
        </div>
    );
}








// import React from 'react';
// import styles from '@/app/page.module.css';
// import Link from 'next/link';

// export default function ItineraryPage({ start, end, adults, child, destination, selectedEvents }) {
//     // Access the parameters using bracket notation
//     const travelInfo = JSON.parse(decodeURIComponent(params['travel-info'])) == null ? {start: 'start location', end: 'end location', adults: '0', child: '0'} : JSON.parse(decodeURIComponent(params['travel-info']));
//     const destinationInfo = decodeURIComponent(params['destination-info']).split(', ');
//     const selectedEvents = decodeURIComponent((params['selected-events'])).split(', ');

//     const testLocations = ['South Korea', 'Japan', 'Vietnam', 'United States'];
//     const serializedLocations = testLocations.join('/');

//     return (
//         <div className={styles.itinerary}>
//         <div className={styles.itineraryList}>
//           <strong>Itinerary</strong>
//           {/* replace with date itinerary components later */}
//           <div className={styles.dateCard}>
//             <div>date card 1</div>
//             <div>&rsaquo;</div>
//           </div>
//           <div className={styles.dateCard}>
//             <div>blank</div>
//             <div>blank</div>
//             <div>&rsaquo;</div>
//           </div>
//           <div className={styles.dateCard}>
//             <div>blank</div>
//             <div>&rsaquo;</div>
//           </div>
//           <div className={styles.dateCard}>
//             <div>blank</div>
//             <div>&rsaquo;</div>
//           </div>
//         </div>
//         <div className={styles.info}>
//           <div className={styles.tripName}>Trip to {destinationInfo}</div>
//           <div className={styles.tripInfo}>
//             <p>Start Date: {travelInfo.start}</p>
//             <p>End Date: {travelInfo.end}</p>
//             <p>Adults: {travelInfo.adults} Children: {travelInfo.child}</p>
//           </div>
//           <div className={styles.tripEvents}>List of selected events</div>
//           {selectedEvents}
//           <div className={styles.listEvents}>
//             <Link href={`/events/${serializedLocations}`}>
//               <button className={styles.chooseEvent}>Choose Events</button>
//             </Link>
//           </div>
//         </div>
//         </div>
//     );
// }