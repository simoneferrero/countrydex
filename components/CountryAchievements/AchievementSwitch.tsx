import { useTheme } from "styled-components";

import Switch from "react-switch";

import styled from "styled-components";

const StyledLabel = styled.label`
  align-items: center;
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  span {
    margin-left: ${({ theme }) => theme.spacing.lg};
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
          offColor={theme.colors.content}
          offHandleColor={theme.colors.primary}
          onChange={onChange}
          onColor={theme.colors.tertiary}
          onHandleColor={theme.colors.primary}
          width={56}
        />
        <span>{labelText}</span>
      </StyledLabel>
    </div>
  );
};
export default AchievementSwitch;
