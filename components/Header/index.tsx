import { useUser } from "@auth0/nextjs-auth0";

import styles from "./index.module.css";

const Header = () => {
  const { user } = useUser();
  return (
    <header className={styles.header}>
      <h1>COUNTRYDEX</h1>
      {user ? (
        <div className={styles.authBox}>
          <p className={styles.userGreeting}>
            Welcome, {user.given_name || user.nickname}.
          </p>
          <a href="/api/auth/logout">Logout</a>
        </div>
      ) : (
        <div className={styles.authBox}>
          <p className={styles.userGreeting}>Hello, stranger.</p>
          <a href="/api/auth/login">Login</a>{" "}
        </div>
      )}
    </header>
  );
};

export default Header;
4;
