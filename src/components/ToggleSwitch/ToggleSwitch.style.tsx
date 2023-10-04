import styled from "@emotion/styled";
import checkmark from "../../assets/icons/checkmark.svg";
import close from "../../assets/icons/close.svg";

export const Toggle = styled.button`
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
  top: 4px;

  &:after {
    content: url(${close});
    color: ${({ theme }) => theme.colors.neutral700};
    left: 25px;
    position: absolute;
    top: 0px;
  }

  &:before {
    content: url(${checkmark});
    color: ${({ theme }) => theme.colors.neutral700};
    left: 9px;
    position: absolute;
    top: 0px;
    z-index: 1;
  }
`;

export const Input = styled.input`
  cursor: pointer;
  left: 0;
  position: absolute;
  opacity: 0;
  top: 0;
  width: 35px;
  z-index: 5;

  &:checked + span {
    background-color: ${({ theme }) => theme.colors.neutral100};

    &:after {
      background-color: ${({ theme }) => theme.colors.secondary700};
      transform: translate3d(15px, 0, 0);
    }
  }
`;

export const Slider = styled.span`
  background-color: ${({ theme }) => theme.colors.neutral100};
  border-radius: 32px;
  cursor: pointer;
  display: block;
  height: 16px;
  position: relative;
  width: 31px;

  &:after {
    background-color: ${({ theme }) => theme.colors.neutral700};
    border-radius: 100%;
    content: "";
    height: 12px;
    left: 2px;
    position: absolute;
    transition: 0.25s ease-in-out;
    top: 2px;
    width: 12px;
    z-index: 2;
  }
`;
