import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #c8c8c8;
  height: 56px;
  border-radius: 30px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 110%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#f2f2f2')};
  }
`;
