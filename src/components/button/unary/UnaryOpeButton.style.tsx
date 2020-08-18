import styled from 'styled-components';
import { Button } from '../Button';

export const StyledUnaryOpeButton = styled(Button)`
  background-color: #f0f0f0;

  &[data-is-active='true'],
  &:hover {
    background-color: #e6e6e6;
  }
`;
