import Switch from "react-switch";

interface Props {
  checked?: boolean;
  onChange: () => void;
  labelText: string;
}

const AchievementSwitch = ({ checked = false, onChange, labelText }: Props) => (
  <div>
    <label>
      <Switch
        height={20}
        width={48}
        onColor="#dcba82"
        offColor="#a88e63"
        onHandleColor="#e1d8c8"
        offHandleColor="#e1d8c8"
        handleDiameter={24}
        checked={checked}
        onChange={onChange}
      />
      <span>{labelText}</span>
    </label>
  </div>
);

export default AchievementSwitch;
