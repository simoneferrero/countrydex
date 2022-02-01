import { useUser } from "@auth0/nextjs-auth0";

import Header from "@/components/Header";
import Map from "@/components/Map";

import styles from "./index.module.css";

const Home = () => {
  const { user } = useUser();

  return (
    <div className={styles.container}>
      <main>
        <Header />
        <Map />
        {!user && (
          <div className={styles.loginPrompt}>
            <h2>Login to save your achievements!</h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
