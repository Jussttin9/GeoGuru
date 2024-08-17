import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from './navbar.js';

const inter = Inter({ subsets: ['latin'] })

// the following is Metadata, the minor info displayed in a Tab on your browser
export const metadata = {
  title: 'Geoguru',
  description: 'For your travel itinerary needs',
}

// RootLayout() is where we return all the HTML & React components.

// It takes the input { children }, which represents all subpages that the
// website has, like home.js, itinerary/page.js, about/page.js, etc.

// In the return (  ) section, we see that we return <html> with a body,
// and nested inside of that is the <Navbar /> component (navbar.js), and
// { children }, as explained earlier. 

// Because we use Next.js, which has built-in page routing, 
// we never have to worry about handling subpages.

// Check out navbar.js, home.js, or one of the other page.js' to see more.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
