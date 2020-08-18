import styled from 'styled-components';
import { Button } from '../Button';

export const StyledBiaryOpeButton = styled(Button)`
  background-color: #f0f0f0;

  &[data-is-active='true'],
  &:hover {
    background-color: #006eb1;
    color: #d5eeee;
  }
`;
