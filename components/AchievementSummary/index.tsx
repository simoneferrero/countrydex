import type { UserCountries } from "types/Countries";

import { memo, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";

import { useAppSelector } from "app/hooks";
import { selectIsBootyMode } from "features/theme/themeSlice";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import { SFW_ACHIEVEMENTS, BOOTY_ACHIEVEMENTS } from "constants/achievements";

import { StyledButton, StyledDrawer } from "./styled";

interface Props {
  totalCountries: number;
  userCountries: UserCountries;
}

const AchievementSummary = ({ totalCountries, userCountries }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const isBootyMode = useAppSelector(selectIsBootyMode);
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const currentAchievements = isBootyMode
    ? BOOTY_ACHIEVEMENTS
    : SFW_ACHIEVEMENTS;
  const maxCountryAchievements = Object.keys(currentAchievements).length;

  const achievementStats = Object.values(userCountries).reduce(
    (prev: { [key: string]: number }, cur) => {
      const countryAchievementNumber = Object.entries(cur).filter(
        ([type, value]) => Boolean(value) && currentAchievements[type]
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
          {Array.from(Array(maxCountryAchievements + 1).keys(), (v) => {
            const fullStars = Array.from(Array(v).keys(), (key) => (
              <AiFillStar key={`fullStar-${key}`} />
            ));
            const emptyStars = Array.from(
              Array(maxCountryAchievements - v).keys(),
              (key) => <AiOutlineStar key={`emptyStar-${key}`} />
            );
            const achievements =
              achievementStats[String(v)] ||
              Object.values(achievementStats).reduce(
                (sum, cur) => sum - cur,
                totalCountries
              );

            return (
              <li key={v}>
                {[...fullStars, ...emptyStars]}: {achievements}/{totalCountries}
              </li>
            );
          })}
        </ul>
      </div>
      <StyledButton>
        <h3 onClick={() => setIsOpen((prevValue) => !prevValue)}>Totals</h3>
      </StyledButton>
    </StyledDrawer>
  );
};

export default memo(AchievementSummary);
