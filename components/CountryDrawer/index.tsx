import { Achievements } from "types/Achievements";

import { useUser } from "@auth0/nextjs-auth0";

import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  selectedCountrySelector,
  setSelectedCountryId,
} from "features/countries/countriesSlice";
import { selectIsBootyMode } from "features/theme/themeSlice";

import AchievementSwitch from "./AchievementSwitch";

import { SFW_ACHIEVEMENTS, BOOTY_ACHIEVEMENTS } from "constants/achievements";

import styled from "styled-components";
import {
  addCountryAchievement,
  deleteCountryAchievement,
} from "features/countries/async";

export const StyledDrawer = styled.div`
  background-color: ${({ theme }) => theme.colors["very-dark"]};
  color: ${({ theme }) => theme.colors["very-light"]};
  padding: 1rem;
  position: absolute;
  right: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "0" : "-20rem")};
  top: 6rem;
  transition: right 0.5s ease-in-out;
  width: 20rem;

  h3 {
    margin: 0;
    margin-bottom: 1rem;
  }
`;

const StyledButton = styled.button`
  background: none;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors["very-light"]};
  color: ${({ theme }) => theme.colors["very-light"]};
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  outline: inherit;
  padding: 4px 8px;
`;

const CountryDrawer = () => {
  const { user } = useUser();
  const isBootyMode = useAppSelector(selectIsBootyMode);
  const selectedCountry = useAppSelector(selectedCountrySelector);
  const dispatch = useAppDispatch();

  const onAchievementChange = (achievementId: string) => {
    if (selectedCountry?.achievements.includes(achievementId)) {
      return dispatch(
        deleteCountryAchievement({
          userId: user?.sub || "",
          countryId: selectedCountry.ISO_A3,
          achievementId,
        })
      );
    }

    return dispatch(
      addCountryAchievement({
        userId: user?.sub || "",
        countryId: selectedCountry?.ISO_A3 || "",
        achievementId,
      })
    );
  };

  const getAchievementList = (achievements: Achievements) =>
    Object.values(achievements).map(({ id, text }) => (
      <AchievementSwitch
        checked={selectedCountry?.achievements.includes(id)}
        disabled={!selectedCountry}
        key={id}
        labelText={text + (selectedCountry?.NAME || "...")}
        onChange={() => onAchievementChange(id)}
      />
    ));

  const sfwAchievementList = getAchievementList(SFW_ACHIEVEMENTS);
  const bootyAchievementList = getAchievementList(BOOTY_ACHIEVEMENTS);

  return (
    <StyledDrawer isOpen={!!selectedCountry}>
      <h3>{selectedCountry?.NAME ?? "No country selected"}</h3>
      <form>{isBootyMode ? bootyAchievementList : sfwAchievementList}</form>
      <StyledButton onClick={() => dispatch(setSelectedCountryId(""))}>
        <span>Close &gt;</span>
      </StyledButton>
    </StyledDrawer>
  );
};

export default CountryDrawer;
