import { memo } from "react";
import { useUser } from "@auth0/nextjs-auth0";

import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  changeAchievementSummaryStatus,
  selectIsAchievementSummaryOpen,
} from "./achievementSummarySlice";
import { countriesSelectors } from "features/countries/countriesSlice";
import { isBootyModeSelector } from "features/theme/themeSlice";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import { SFW_ACHIEVEMENTS, BOOTY_ACHIEVEMENTS } from "constants/achievements";

import { StyledButton, StyledDrawer } from "./styled";

const AchievementSummary = () => {
  const isOpen = useAppSelector(selectIsAchievementSummaryOpen);
  const isBootyMode = useAppSelector(isBootyModeSelector);
  const { user } = useUser();
  const dispatch = useAppDispatch();

  const numberOfCountries = useAppSelector(countriesSelectors.selectTotal);
  const countries = useAppSelector(countriesSelectors.selectAll);

  if (!user) {
    return null;
  }

  const currentAchievements = isBootyMode
    ? BOOTY_ACHIEVEMENTS
    : SFW_ACHIEVEMENTS;
  const maxRows = Object.keys(currentAchievements).length;

  const achievementStats = countries.reduce(
    (prev: { [key: string]: number }, cur) => {
      const countryAchievementNumber = cur.achievements.filter(
        (achievement) =>
          Boolean(achievement) && currentAchievements[achievement]
      ).length;
      const prevCountryAchievementNumber = prev[countryAchievementNumber];

      if (countryAchievementNumber === 0) return prev;

      return {
        ...prev,
        [countryAchievementNumber]: prevCountryAchievementNumber
          ? prevCountryAchievementNumber + 1
          : 1,
      };
    },
    {}
  );

  return (
    <StyledDrawer $isOpen={isOpen}>
      <div>
        <ul>
          {Array.from(Array(maxRows + 1).keys(), (rowNumber) => {
            const fullStars = Array.from(Array(rowNumber).keys(), (key) => (
              <AiFillStar key={`fullStar-${key}`} />
            ));
            const emptyStars = Array.from(
              Array(maxRows - rowNumber).keys(),
              (key) => <AiOutlineStar key={`emptyStar-${key}`} />
            );
            const achievements =
              rowNumber === 0
                ? Object.values(achievementStats).reduce(
                    (sum, cur) => sum - cur,
                    numberOfCountries
                  )
                : achievementStats[String(rowNumber)] || 0;

            return (
              <li key={rowNumber}>
                {[...fullStars, ...emptyStars]}: {achievements}/
                {numberOfCountries}
              </li>
            );
          })}
        </ul>
      </div>
      <StyledButton>
        <h3 onClick={() => dispatch(changeAchievementSummaryStatus(!isOpen))}>
          Totals
        </h3>
      </StyledButton>
    </StyledDrawer>
  );
};

export default memo(AchievementSummary);
