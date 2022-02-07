import { UserCountry } from "types/Countries";

import AchievementSwitch from "./AchievementSwitch";

import classNames from "classnames";

import styles from "./index.module.css";

interface Props {
  country?: {
    name: string;
    id: string;
    achievements: UserCountry;
  };
  onAchievementChange: (country: string, achievement: string) => void;
}

const VISIT = "VISIT";
const EAT = "EAT";
const KNOW = "KNOW";

const CountryDrawer = ({ country, onAchievementChange }: Props) => {
  const drawerStyles = classNames(styles.drawer, {
    [styles.open]: !!country,
  });

  return (
    <div className={drawerStyles}>
      <h3>{country?.name ?? "No country selected"}</h3>
      {!!country && (
        <form className={styles.achievements}>
          <AchievementSwitch
            checked={country?.achievements[VISIT]}
            onChange={() => onAchievementChange(country?.id, VISIT)}
            labelText={`Visit ${country?.name}`}
          />
          <AchievementSwitch
            checked={country?.achievements[EAT]}
            onChange={() => onAchievementChange(country?.id, EAT)}
            labelText={`Eat food from ${country?.name}`}
          />
          <AchievementSwitch
            checked={country?.achievements[KNOW]}
            onChange={() => onAchievementChange(country?.id, KNOW)}
            labelText={`Know someone from ${country?.name}`}
          />
        </form>
      )}
    </div>
  );
};

export default CountryDrawer;
