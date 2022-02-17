import { useAppSelector } from "app/hooks";
import { isLoadingSelector } from "features/countries/countriesSlice";

import styled from "styled-components";

const StyledLoaderContainer = styled.div`
  bottom: 1rem;
  position: absolute;
  right: 1rem;
  z-index: 900;
`;
const StyledLoader = styled.div`
  display: inline-block;
  height: 80px;
  position: relative;
  width: 80px;

  div {
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border: 8px solid ${({ theme }) => theme.colors.veryDark};
    border-color: ${({ theme }) => theme.colors.veryDark} transparent
      transparent transparent;
    border-radius: 50%;
    box-sizing: border-box;
    display: block;
    height: 64px;
    margin: 8px;
    position: absolute;
    width: 64px;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => {
  const isLoading = useAppSelector(isLoadingSelector);

  if (!isLoading) {
    return null;
  }

  return (
    <StyledLoaderContainer>
      <StyledLoader>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </StyledLoader>
    </StyledLoaderContainer>
  );
};

export default Loader;
