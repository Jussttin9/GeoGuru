import styles from '@/app/page.module.css';
import { useEffect } from 'react';

export default function SelectedEvent({ name, removeEvent }) {

    function handleClick() {
        removeEvent(name);
    }

    return (
        <div className={styles.selectedContainer}>
            <p>{name}</p>
            <button onClick={handleClick} className={styles.removeEventButton}>X</button>
        </div>
    );
}