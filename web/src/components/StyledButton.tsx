import styled from "styled-components";
import { boxShadowMixin } from "../styles/mixins";

type Props = {
  disabled?: boolean;
};

const primaryStyle = `
  background-color: #2196f3;
  border-bottom: 3px solid #01579b;
  color: white;

  &:hover {
    background-color: #0277bd;
  }

  &:active {
    background-color: #01579b;
  }
`;

const disabledStyle = `
  background-color: #90a4ae;
  border-bottom: 2px solid #607d8b;
  color: white;

  cursor: default;

  &:hover {
    background-color: #90a4ae;
  }

  &:active {
    background-color: #90a4ae;
  }
`;

export const StyledButton = styled.button<Props>`
  border: none;
  border-radius: 4px;
  min-width: 80px;
  height: 30px;
  ${boxShadowMixin}
  transition: all .2s ease-in-out;

  cursor: pointer;

  ${props => (props.disabled ? disabledStyle : primaryStyle)}
`;