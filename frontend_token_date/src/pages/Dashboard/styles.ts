import styled, { keyframes } from 'styled-components';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const Container = styled.div`
  animation: ${appearFromLeft} 1s;
`;

export const Content = styled.main`
  max-width: 1500px;
  margin: 50px auto;
  display: flex;
`;

export const Events = styled.div`
  flex: 1;
  margin-right: 300px;

  h1 {
    color: #333;
    font-size: 36px;
    border-bottom: 1px solid #333;
  }

  > p {
    margin-top: 8px;
    color: #333;

    span + span {
      margin-left: 8px;
      padding-left: 8px;
      border-left: 1px solid #333;
    }
  }

  strong {
    color: #333;
    font-size: 20px;
    margin-left: 2px;
    font-weight: bold;
  }
`;

export const NextEvents = styled.div`
  margin-top: 40px;
  text-align: left;

  & + div {
    margin-top: 16px;
  }

  div {
    display: flex;

    strong {
      color: #f2f2f2;
      margin-right: auto;
    }

    button {
      color: #f4ede8;
      background: transparent;
      border: 0;
    }
  }

  > div {
    background: #3e3b44;
    display: flex;
    flex-direction: column;

    align-items: left;

    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;

    > span {
      margin-left: 5px;
      margin-bottom: 10px;
      font-size: 15px;
      display: flex;
      align-items: center;
      color: #fff;

      h5 {
        font-size: 15px;
        margin-left: auto;
      }

      svg {
        color: #000;
        margin-right: 8px;
      }
    }
  }
`;
