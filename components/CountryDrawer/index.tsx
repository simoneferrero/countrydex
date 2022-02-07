import { Achievements } from "types/Achievements";
import { UserCountry } from "types/Countries";

import { useAppSelector } from "app/hooks";
import { selectIsBootyMode } from "features/theme/themeSlice";

import AchievementSwitch from "./AchievementSwitch";

import { SFW_ACHIEVEMENTS, BOOTY_ACHIEVEMENTS } from "constants/achievements";

import styled from "styled-components";

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

interface Props {
  country?: {
    achievements: UserCountry;
    id: string;
    name: string;
  };
  onAchievementChange: (country: string, achievement: string) => void;
}

const CountryDrawer = ({ country, onAchievementChange }: Props) => {
  const isBootyMode = useAppSelector(selectIsBootyMode);

  const getAchievementList = (achievements: Achievements) =>
    Object.values(achievements).map(({ id, text }) => (
      <AchievementSwitch
        checked={country?.achievements[id]}
        key={id}
        labelText={text + country?.name}
        onChange={() => onAchievementChange(country?.id || "", id)}
      />
    ));

  const sfwAchievementList = getAchievementList(SFW_ACHIEVEMENTS);
  const bootyAchievementList = getAchievementList(BOOTY_ACHIEVEMENTS);

  return (
    <StyledDrawer isOpen={!!country}>
      <h3>{country?.name ?? "No country selected"}</h3>
      {!!country && (
        <form>{isBootyMode ? bootyAchievementList : sfwAchievementList}</form>
      )}
    </StyledDrawer>
  );
};

export default CountryDrawer;
