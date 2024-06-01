'use client';

import styles from './../page.module.css';
import { motion as m } from 'framer-motion';

// This will be our page for the Itinerary page. Change it as you'd like!

export default function Itinerary() {
    return (
      <m.div className={styles.itinerary}
        initial={{opacity: 0, height: 0}}
        animate={{opacity: 1, height: "75vh"}}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        exit={{ opacity: 1 }}
      >
          <h1>
          placeholder for itinerary
          </h1>
      </m.div>
    );
}