import type { Theme } from "types/Theme";

import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  changeAchievementSummaryStatus,
  isAchievementSummaryOpenSelector,
} from "./achievementSummarySlice";

import { GrAchievement } from "react-icons/gr";

import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  ${({ $isOpen, theme }: { $isOpen: boolean; theme: Theme }) => css`
    align-items: center;
    background: ${theme.colors.veryDark};
    border-radius: 50%;
    border: none;
    bottom: 0;
    color: ${theme.colors.veryLight};
    cursor: pointer;
    display: flex;
    font: inherit;
    height: 3rem;
    justify-content: center;
    left: 0;
    opacity: ${!$isOpen ? 1 : 0};
    outline: inherit;
    padding: ${theme.sizing.xs};
    position: absolute;
    visibility: ${!$isOpen ? "visible" : "hidden"};
    width: 3rem;

    &:hover {
      background: ${theme.colors.medium};
    }

    path {
      fill: ${theme.colors.veryLight};
    }
  `};
`;

const AchievementSummaryButton = () => {
  const isAchievementSummaryOpen = useAppSelector(
    isAchievementSummaryOpenSelector
  );
  const dispatch = useAppDispatch();

  const labelText = `${
    isAchievementSummaryOpen ? "Close" : "Open"
  } Achievement Summary`;

  const handleClick = () => {
    dispatch(changeAchievementSummaryStatus(!isAchievementSummaryOpen));
  };

  return (
    <StyledButton
      $isOpen={isAchievementSummaryOpen}
      aria-label={labelText}
      onClick={handleClick}
    >
      <GrAchievement size={25} />
    </StyledButton>
  );
};

export default AchievementSummaryButton;
