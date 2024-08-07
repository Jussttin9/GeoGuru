import styles from '@/app/page.module.css';

export default function SelectedEvent({ name, removeEvent }) {
    return (
        <div className={styles.selectedContainer}>
            <p>{name}</p>
            <button>X</button>
        </div>
    );
}