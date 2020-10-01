import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 32px;
  background: #3e3b44;
`;

export const HeaderContent = styled.div`
  max-width: 1500px;
  margin-left: 40px;
  display: flex;
  align-items: center;

  h1 {
    color: #f9f9f9;
    padding: 0 20px 5px 0;
    border-right: 1px solid #eee;
  }

  a {
    font-size: 20px;
    margin-left: 30px;
    text-decoration: none;
    color: #f4f4f4;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f2f2f2')};
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
      text-decoration: none;
    }

    strong {
      color: #f2f2f2;
      font-size: 20px;
      margin-right: 5px;
      padding: 0 20px 5px 0;
      border-right: 1px solid #fff;
    }

    button {
      margin-left: 15px;
      color: #cccfd2;
      background: transparent;
      border: 0;
    }
  }
`;
