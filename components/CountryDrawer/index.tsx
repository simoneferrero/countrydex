import { Achievements } from "types/Achievements";

import { useUser } from "@auth0/nextjs-auth0";

import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  isLoadingSelector,
  selectedCountrySelector,
  setSelectedCountryId,
} from "features/countries/countriesSlice";
import { selectIsBootyMode } from "features/theme/themeSlice";
import {
  addCountryAchievement,
  deleteCountryAchievement,
} from "features/countries/async";

import AchievementSwitch from "./AchievementSwitch";

import { SFW_ACHIEVEMENTS, BOOTY_ACHIEVEMENTS } from "constants/achievements";

import { StyledButton, StyledDrawer } from "./styled";

const CountryDrawer = () => {
  const { user } = useUser();
  const isBootyMode = useAppSelector(selectIsBootyMode);
  const selectedCountry = useAppSelector(selectedCountrySelector);
  const isLoading = useAppSelector(isLoadingSelector);
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
        disabled={!selectedCountry || isLoading}
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
