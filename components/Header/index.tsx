import { useUser } from "@auth0/nextjs-auth0";

import Switch from "react-switch";

import styles from "./index.module.css";

interface Props {
  isBootyMode: boolean;
  setIsBootyMode: (isBootyMode: boolean) => void;
  userName?: string | null;
}

const Header = ({ isBootyMode, setIsBootyMode, userName }: Props) => (
  <header className={styles.header}>
    <h1>{isBootyMode ? "BOOTYDEX" : "COUNTRYDEX"}</h1>
    {userName ? (
      <div className={styles.loggedIn}>
        <Switch
          aria-label="Booty Mode Toggle"
          onChange={setIsBootyMode}
          checked={isBootyMode}
          onColor="#dcba82"
          offColor="#a88e63"
          onHandleColor="#e1d8c8"
          offHandleColor="#e1d8c8"
          checkedIcon={<span className={styles.bootyIcon}>💖</span>}
          uncheckedIcon={<span className={styles.sfwIcon}>☀️</span>}
        />
        <div className={styles.authBox}>
          <p className={styles.userGreeting}>Welcome, {userName}.</p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/api/auth/logout">Logout</a>
        </div>
      </div>
    ) : (
      <div className={styles.authBox}>
        <p className={styles.userGreeting}>Hello, stranger.</p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/auth/login">Login</a>{" "}
      </div>
    )}
  </header>
);

export default Header;
