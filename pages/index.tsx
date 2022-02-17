import { Theme } from "types/Theme";

import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { isCountryListOpenSelector } from "features/countries/countriesSlice";
import { fetchCountries } from "features/countries/async";

import AchievementSummary from "features/achievementSummary/AchievementSummary";
import CountryAchievements from "@/components/CountryAchievements";
import CountryList from "@/components/CountryList";
import Error from "@/components/Error";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Map from "@/components/Map";

import styled, { css } from "styled-components";

const StyledContainer = styled.div`
  ${({
    $isCountryListOpen,
    theme,
  }: {
    $isCountryListOpen: boolean;
    theme: Theme;
  }) => css`
    height: calc(100vh - 4rem);
    margin-top: 4rem;
    overflow-y: hidden;

    main {
      display: grid;
      height: 100%;
      transition: ${theme.transition};

      @media (min-width: ${theme.breakpoints.lg}) {
        ${$isCountryListOpen && "grid-template-columns: auto auto;"}
      }
    }
  `}
`;

const StyledLoginPrompt = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  padding: ${({ theme }) => theme.spacing.md};
  position: absolute;
  text-align: center;
  top: 0;
  width: 100%;
`;

const Home = () => {
  const { user } = useUser();
  const isCountryListOpen = useAppSelector(isCountryListOpenSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchCountries(user?.sub || ""));
    }
  }, [dispatch, user]);

  return (
    <StyledContainer $isCountryListOpen={isCountryListOpen}>
      <Header />
      <main>
        <Map />
        {!user && (
          <StyledLoginPrompt>
            <h2>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/api/auth/login">Log in or sign up</a> to save your
              achievements!
            </h2>
          </StyledLoginPrompt>
        )}
        <CountryList />
        <AchievementSummary />
        <CountryAchievements />
        <Loader />
        <Error />
      </main>
    </StyledContainer>
  );
};

export default Home;
