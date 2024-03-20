// Navbar.js

import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <a href="#" className={styles.navbarBrand}>Agriguard</a>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>Log In</a>
          <a href="#" className={styles.navLink}>Sign Up</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
