import { Typography } from "@mui/material";
import { keyframes, styled } from "@mui/material/styles";

export const LoadingContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: fixed;
  width: 100vw;
  z-index: 10;
  background: white;
  gap: 16px;
`;

export const LoadingText = styled(Typography)`
  color: #1f2329;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
`;

export const LoadingAnimation = keyframes`
 0% {
    left: 0;
    width: 0;
  }

  25% {
    left: 0;
    width: 33%;
  }

  50% {
    left: 15%;
    width: 50%;
  }

  75% {
    left: 30%;
    width: 70%;
  }

  100% {
    left: 100%;
    width: 0;
  }
`;

export const LoadingBarContainer = styled("div")`
  background: #d3d8de;
  margin: 10px auto;
  border-radius: 16px;
  max-width: 80vw;

  @media screen and (min-width: 1025px) {
    width: 680px;
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 728px;
  }

  @media screen and (min-width: 429px) and (max-width: 768px) {
    width: 550px;
  }

  @media screen and (max-width: 428px) {
    width: 288px;
  }
`;

export const Bar = styled("div")`
  height: 4px;
  border-radius: 16px;
  position: relative;
  background: linear-gradient(90deg, #d71598 0%, #a513ce 49.43%, #284eed 100%);
  width: 0%;
  left: 0%;
  animation: ${LoadingAnimation} 3s linear infinite;
`;
