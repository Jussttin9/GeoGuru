import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

// Navbar() is the navbar of our page. Because of how it is returned in
// layout.js, it will always remain at the top of our page before { children }.

// In Navbar, we first return a <div> that uses the className={styles.navbar}
// to get the desired class style from page.module.css, where all our CSS is.

// Inside of that div, we use <Link>, which is part of the page routing feature
// from Next.js. We give it a className for styles as usual, and also an
// href={} tag, which when given a /folder in this current directory, will
// change { children } to its respective page.js.

// Inside of <Link> we can place text to represent to the user what page it'll
// send them to, or an Image. In the first link I placed the geoguru Logo image
// to represent the homepage.
export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <Link className={styles.logo} href={"/"}>
                <Image
                    src="/geogurulogo.svg"
                    alt="Geoguru Logo"
                    className={styles.logoimg}
                    width={25}
                    height={36}
                    priority
                />
            </Link>
            <Link className={styles.navbuttons} href={"/about"}>ABOUT</Link>
            <Link className={styles.navbuttons} href={"/resources"}>TRIPS</Link>
            <Link className={styles.navbuttons} href={"/itinerary"}>ITINERARY</Link>
        </div>
    )
}
