import { UserCountry } from "types/Countries";

import AchievementSwitch from "./AchievementSwitch";

import { SFW_ACHIEVEMENTS, BOOTY_ACHIEVEMENTS } from "constants/achievements";

import classNames from "classnames";

import styles from "./index.module.css";

interface Props {
  country?: {
    name: string;
    id: string;
    achievements: UserCountry;
  };
  isBootyMode: boolean;
  onAchievementChange: (country: string, achievement: string) => void;
}

const CountryDrawer = ({
  country,
  isBootyMode,
  onAchievementChange,
}: Props) => {
  const drawerStyles = classNames(styles.drawer, {
    [styles.open]: !!country,
  });

  const sfwAchievementList = Object.values(SFW_ACHIEVEMENTS).map(
    ({ id, text }) => (
      <AchievementSwitch
        key={id}
        checked={country?.achievements[id]}
        onChange={() => onAchievementChange(country?.id || "", id)}
        labelText={text + country?.name}
      />
    )
  );

  const bootyAchievementList = Object.values(BOOTY_ACHIEVEMENTS).map(
    ({ id, text }) => (
      <AchievementSwitch
        key={id}
        checked={country?.achievements[id]}
        onChange={() => onAchievementChange(country?.id || "", id)}
        labelText={text + country?.name}
      />
    )
  );

  return (
    <div className={drawerStyles}>
      <h3>{country?.name ?? "No country selected"}</h3>
      {!!country && (
        <form className={styles.achievements}>
          {isBootyMode ? bootyAchievementList : sfwAchievementList}
        </form>
      )}
    </div>
  );
};

export default CountryDrawer;
