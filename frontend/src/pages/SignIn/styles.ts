import styled from "styled-components";
import colors from '../../styles/colors.json'

export const Container = styled.div`
  height: 100vh -70px -30px;
  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    h1 {
      margin-bottom: 24px;
      color: ${colors.textColour};
    }
    div{
      max-width: 100%;
    }
    a {
      color: #${colors.third};
      text-decoration: none;
      font-size: 18px;
      margin-top: 24px;
      display: block;
      transition: color 0.2s;
    }
  }
  > a {
    display: flex;
    align-items: center;
    color: #ff9000;
    text-decoration: none;
  }
`;