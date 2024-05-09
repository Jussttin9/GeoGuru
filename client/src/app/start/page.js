'use client';

import styles from './../page.module.css';
import { motion as m } from 'framer-motion';

export default function Start() {
    return (
      <m.div className={styles.itinerary}
        initial={{opacity: 0, height: 0}}
        animate={{opacity: 1, height: "75vh"}}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        exit={{ opacity: 1 }}
      >
          <h1>
            example for start
          </h1>
      </m.div>
    );
}