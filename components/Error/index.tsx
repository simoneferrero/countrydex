import { useAppSelector } from "app/hooks";
import { errorSelector } from "features/countries/countriesSlice";

import styled, { css } from "styled-components";

const StyledErrorContainer = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.errorBackground};
    border-radius: 5px;
    bottom: ${theme.sizing.xl};
    color: ${theme.colors.errorFont};
    left: 50%;
    padding: ${theme.sizing.xs} ${theme.sizing.md};
    position: absolute;
    text-align: center;
    transform: translateX(-50%);
    z-index: 900;
  `}
`;

const Error = () => {
  const error = useAppSelector(errorSelector);

  if (error === "") {
    return null;
  }

  return <StyledErrorContainer>{error}</StyledErrorContainer>;
};

export default Error;
