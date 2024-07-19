'use client';

import styles from './../page.module.css';
import { motion as m } from 'framer-motion';

// This will be our page for the Resources page.
// Idk if we'll still make this a page, but it's here for now ig lol

export default function Resources() {
    return (
      <m.div className={styles.itinerary}
        initial={{opacity: 0, height: 0}}
        animate={{opacity: 1, height: "100vh"}}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        exit={{ opacity: 1 }}
      >
          <h1>
            placeholder for resources
          </h1>
      </m.div>
    );
}