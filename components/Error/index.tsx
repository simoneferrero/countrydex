import { useAppSelector } from "app/hooks";
import { errorSelector } from "features/countries/countriesSlice";

import styled from "styled-components";

const StyledErrorContainer = styled.div`
  background-color: #f44336;
  border-radius: 5px;
  bottom: 2rem;
  color: #fff;
  left: 50%;
  padding: 0.5rem 1rem;
  position: absolute;
  text-align: center;
  transform: translateX(-50%);
  z-index: 900;
`;

const Error = () => {
  const error = useAppSelector(errorSelector);

  if (error === "") {
    return null;
  }

  return <StyledErrorContainer>{error}</StyledErrorContainer>;
};

export default Error;
