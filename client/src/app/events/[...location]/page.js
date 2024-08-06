import EventCard from "@/app/COMPONENTS/event";
import styles from '../../page.module.css';

export default function Events({ params }) {
    const locationArr = JSON.stringify(params.location);
    const locations = decodeURI(locationArr);

    return (
        <div className={styles.getEvent}
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: "100vh"}}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            exit={{ opacity: 1 }}
        >
            My Locations: {locations}
            <div className={styles.listEvents}>
                <EventCard locations='boo'/>
            </div>
        </div>
    );
}