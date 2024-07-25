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
            <div>date card 2</div>
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
    /*

    // CREATE A NEW Event OBJECT FOR EACH RETRIEVED FROM USER'S TRIP
    // PLACE ALL OF THESE EVENTS IN THIS ARRAY:
    var events = [];

    // REPLACE THESE ASSIGNMENTS WITH THE RESPECTIVE DATES IN USER's TRIP
    var first_date = new Date();
    var final_date = new Date();

    var dates = [];

    dates.push(first_date);
    if ((first_date != null) && (final_date != null)) {
      while (first_date != final_date) {
        first_date.setDate(first_date.getDate() + 1);
        dates.push(first_date);
      }
      if (first_date != final_date) {
        dates.push(final_date);
      }
    }

    [useSelectedDate, setSelectedDate] = useState(new Date());

    var selectedEvents = [];

    function changeSelectedDate(date) {
      setSelectedDate(date);

      selectedEvents = [];

      for (var i = 0 ; i < events.length ; i++) {
        if (events[i].date == useSelectedDate) {
          selectedEvents.push(events[i]);
        }
      }
    } 

    function pushNewEvent(event) {
      selectedEvents.push(event);
    }
  
    return (
      <m.div className={styles.itinerary}
        initial={{opacity: 0, height: 0}}
        animate={{opacity: 1, height: "75vh"}}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        exit={{ opacity: 1 }}
      >
        <div className={styles.itCol1}>
          <div className={styles.itCol1Head}>
            <h1>
              Itinerary
            </h1>
          </div>

          {dates.map((value, index) => (
            <div className={styles.itCol1Body}
              onClick={changeSelectedDate(value)}
            >
              <div className={styles.itDaySelect}>
                {value.toString()}
              </div>
            </div>
          ))}

          <div className={styles.itCol1Foot}>
            <h3>
              {"< "} other trips
            </h3>
          </div>
        </div>
        <div className={styles.itCol2}>
          <h1>
            Destination
          </h1>
          <div className={styles.selectedDayContainer}>
            <div className={styles.selectedDayHead}>
              {useSelectedDate.toString()}
            </div>

            {selectedEvents.map((value, index) => (
              <div className={styles.selectedDayBody}>
                <div className={styles.itEvent}>
                  <h3>
                    {value.title}
                  </h3>
                  <p>
                    {value.location}
                  </p>
                  <p>
                    {value.cost}
                  </p>
                </div>
              </div>
            ))}


            <div className={styles.addEvent}>
              <div className={styles.addPlusButton}>
                +
              </div>
              <div className={styles.addMoreText}>
                add more events, dining, shopping, etc.
              </div>
            </div>
          </div>
        </div>
      </m.div>
    );

    */
}