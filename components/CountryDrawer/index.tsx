import { UserCountry } from "types/Countries";

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
          <p>
            <input
              type="checkbox"
              id="visit"
              name="visit"
              checked={country?.achievements[VISIT] ?? false}
              onChange={() => onAchievementChange(country?.id, VISIT)}
            />{" "}
            Visit {country?.name}
          </p>
          <p>
            <input
              type="checkbox"
              id="eat"
              name="eat"
              checked={country?.achievements[EAT] ?? false}
              onChange={() => onAchievementChange(country?.id, EAT)}
            />{" "}
            Eat food from {country?.name}
          </p>
          <p>
            <input
              type="checkbox"
              id="know"
              name="know"
              checked={country?.achievements[KNOW] ?? false}
              onChange={() => onAchievementChange(country?.id, KNOW)}
            />{" "}
            Know someone from {country?.name}
          </p>
        </form>
      )}
    </div>
  );
};

export default CountryDrawer;
