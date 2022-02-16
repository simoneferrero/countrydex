import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";

import { useAppDispatch } from "app/hooks";
import { fetchCountries } from "features/countries/async";

import AchievementSummary from "features/achievementSummary/AchievementSummary";
import CountryDrawer from "@/components/CountryDrawer";
import CountryList from "@/components/CountryList";
import Error from "@/components/Error";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Map from "@/components/Map";

import styled from "styled-components";

const StyledContainer = styled.div`
  height: calc(100vh - 4rem);
  margin-top: 4rem;
  overflow-y: hidden;

  main {
    height: 100%;
  }
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
  text-align: center;
  top: 0;
  width: 100%;
`;

const Home = () => {
  const { user } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchCountries(user?.sub || ""));
    }
  }, [dispatch, user]);

  return (
    <StyledContainer>
      <Header />
      <main>
        <Map />
        {!user && (
          <StyledLoginPrompt>
            <h2>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/api/auth/login">Login</a> to save your achievements!
            </h2>
          </StyledLoginPrompt>
        )}
        <AchievementSummary />
        <CountryDrawer />
        <CountryList />
        <Loader />
        <Error />
      </main>
    </StyledContainer>
  );
};

export default Home;
