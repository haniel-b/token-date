import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;

  text-align: center;

  max-width: 800px;
  margin: 0 auto;
  margin-top: 120px;
  border-radius: 30px;

  background: #333;
  box-shadow: 3px 10px 20px 5px rgba(0, 0, 0, 0.5);
`;

export const FormContent = styled.form`
  margin: 0 10px;
  padding: 100px;
  display: flex;

  form {
    width: 300px;

    h1 {
      color: #fff;
      margin-bottom: 20px;
    }
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Content = styled.div`
  color: #333;
  align-items: center;
  background: #f2f2f2;
  justify-content: center;
  width: 100%;

  padding: 50px;
  border-radius: 0 30px 30px 0;
`;

export const AnimationContainer = styled.div`
  display: flex;

  animation: ${appearFromLeft} 1s;
`;
