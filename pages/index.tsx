import type { Countries, Country, UserCountries } from "types/Countries";

import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";

import Header from "@/components/Header";
import Map from "@/components/Map";
import CountryDrawer from "@/components/CountryDrawer";

import styled from "styled-components";

const GEO_URL = process.env.NEXT_PUBLIC_GEO_URL || "";

const StyledContainer = styled.div`
  margin-top: 4rem;
  max-height: calc(100vh - 4rem);
  overflow-y: hidden;
  padding: 0 3rem;
`;

const StyledLoginPrompt = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors["very-light"]};
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Home = () => {
  const [countryList, setCountryList] = useState<Countries>({});
  const [userCountries, setUserCountries] = useState<UserCountries>({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const { user } = useUser();

  useEffect(() => {
    const getCountryData = async () => {
      const response = await axios(GEO_URL);

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
    <StyledContainer>
      <main>
        <Header userName={user?.name || user?.nickname} />
        <Map
          countryList={countryList}
          geoUrl={GEO_URL}
          onCountryClick={handleCountryClick}
          selectedCountry={selectedCountry}
          userCountries={userCountries}
        />
        {!user && (
          <StyledLoginPrompt>
            <h2>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/api/auth/login">Login</a> to save your achievements!
            </h2>
          </StyledLoginPrompt>
        )}
      </main>
      <CountryDrawer
        country={selectedCountryWithAchievements}
        onAchievementChange={handleAchievementChange}
      />
    </StyledContainer>
  );
};

export default Home;
