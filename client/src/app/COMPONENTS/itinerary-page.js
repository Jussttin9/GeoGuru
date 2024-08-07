import React, { useEffect, useState } from 'react';
import styles from '@/app/page.module.css';
import Link from 'next/link';
import SelectedEvent from './selectedEvent';

export default function ItineraryPage({ start, end, adults, child, destination, selectedEvents }) {
    const testLocations = ['South Korea', 'Japan', 'Vietnam', 'United States'];
    const serializedLocations = testLocations.join('/');
    const [selectedList, updateSelectedList] = useState([]);

    const removeItem = (name) => {
        updateSelectedList(selectedList.map(item => item && item != name));
    }

    useEffect(() => {
        updateSelectedList(selectedEvents);
    })

    return (
        <div className={styles.info}>
            {/* <div className={styles.tripName}>Trip to {destination}</div> */}
            <div className={styles.tripName}>Trip to {testLocations.join(', ')}</div>
            <div className={styles.tripInfo}>
                <p>Start Date: {start}</p>
                <p>End Date: {end}</p>
                <p>Adults: {adults} Children: {child}</p>
            </div>
            <div className={styles.tripEvents}>List of selected events</div>
            {selectedList.map(item => (
                <SelectedEvent key={item} name={item} />
            ))}
            <SelectedEvent name="Event 1"/>
            <SelectedEvent name="Event 2"/>
            <SelectedEvent name="Event 3"/>
            <div className={styles.listEvents}>
                <Link href={`/events/${serializedLocations}`}>
                    <button className={styles.chooseEvent}>Choose Events</button>
                </Link>
            </div>
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