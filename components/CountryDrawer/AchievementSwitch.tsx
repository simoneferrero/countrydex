import { useTheme } from "styled-components";

import Switch from "react-switch";

import styled from "styled-components";

const StyledLabel = styled.label`
  align-items: center;
  display: flex;
  margin-bottom: 1rem;

  span {
    margin-left: 1rem;
  }
`;

interface Props {
  checked?: boolean;
  disabled: boolean;
  labelText: string;
  onChange: () => void;
}

const AchievementSwitch = ({
  checked = false,
  disabled,
  labelText,
  onChange,
}: Props) => {
  const theme = useTheme();

  return (
    <div>
      <StyledLabel>
        <Switch
          checked={checked}
          disabled={disabled}
          handleDiameter={24}
          height={24}
          offColor={theme.colors.medium}
          offHandleColor={theme.colors["very-light"]}
          onChange={onChange}
          onColor={theme.colors.light}
          onHandleColor={theme.colors["very-light"]}
          width={56}
        />
        <span>{labelText}</span>
      </StyledLabel>
    </div>
  );
};
export default AchievementSwitch;
