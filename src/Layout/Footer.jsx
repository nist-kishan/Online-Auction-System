import React from 'react'
import { Link } from 'react-router-dom'
import styles from './css/footer.module.css'


export default function Footer() {
  return (
    <div>
      <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© {new Date().getFullYear()} Online Auction System. All Rights Reserved.</p>
        <div className={styles.links}>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </div>
    </footer>
    </div>
  )
}
