import { Countries, Country, UserCountries } from "types/Countries";

import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";

import Header from "@/components/Header";
import Map from "@/components/Map";
import CountryDrawer from "@/components/CountryDrawer";

import styles from "./index.module.css";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Home = () => {
  const [countryList, setCountryList] = useState<Countries>({});
  const [userCountries, setUserCountries] = useState<UserCountries>({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isBootyMode, setIsBootyMode] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const getCountryData = async () => {
      const response = await axios(geoUrl);

      setCountryList(
        response.data.objects.ne_110m_admin_0_countries.geometries.reduce(
          (countries: any, { properties }: { properties: Country }) => ({
            ...countries,
            [properties.ISO_A3]: properties,
          }),
          {}
        )
      );
    };

    getCountryData();
  }, []);
  useEffect(() => {
    if (user) {
      const getUserCountries = async () => {
        const response = await axios(`/api/users/${user.sub}/countries`);

        setUserCountries(response.data.data);
      };

      getUserCountries();
    }
  }, [user]);

  const handleCountryClick = (country: string) =>
    setSelectedCountry((prevCountry: string) =>
      prevCountry === country ? "" : country
    );
  const handleAchievementChange = async (
    countryId: string,
    achievementId: string
  ) => {
    // TODO: handle error and loading
    if (userCountries?.[countryId]?.[achievementId]) {
      await axios.delete(
        `/api/users/${user?.sub}/countries/${countryId}/achievements/${achievementId}`
      );
    } else {
      await axios.post(
        `/api/users/${user?.sub}/countries/${countryId}/achievements/${achievementId}`
      );
    }

    setUserCountries((prevUserCountries: UserCountries) => ({
      ...prevUserCountries,
      [countryId]: {
        ...prevUserCountries[countryId],
        [achievementId]: !prevUserCountries?.[countryId]?.[achievementId],
      },
    }));
  };

  const selectedCountryWithAchievements = selectedCountry
    ? {
        name: countryList[selectedCountry].NAME,
        id: countryList[selectedCountry].ISO_A3,
        achievements: userCountries[selectedCountry] || {},
      }
    : undefined;

  return (
    <div className={styles.container}>
      <main>
        <Header
          isBootyMode={isBootyMode}
          setIsBootyMode={setIsBootyMode}
          userName={user?.name || user?.nickname}
        />
        <Map
          countryList={countryList}
          geoUrl={geoUrl}
          isBootyMode={isBootyMode}
          onCountryClick={handleCountryClick}
          selectedCountry={selectedCountry}
          userCountries={userCountries}
        />
        {!user && (
          <div className={styles.loginPrompt}>
            <h2>Login to save your achievements!</h2>
          </div>
        )}
      </main>
      <CountryDrawer
        country={selectedCountryWithAchievements}
        onAchievementChange={handleAchievementChange}
        isBootyMode={isBootyMode}
      />
    </div>
  );
};

export default Home;
