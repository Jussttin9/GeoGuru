import styles from '@/app/page.module.css';

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