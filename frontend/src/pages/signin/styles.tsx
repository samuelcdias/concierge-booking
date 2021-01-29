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
  width:100%;

  
  form {
    background: white;
    border-radius: 6px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 40px 30px;
    margin-top: 50px;
    width: 340px;
    text-align: center;
    h1 {
      margin-bottom: 24px;
      color: ${colors.textColour};
    }
    div{
      max-width: 100%;
    }
    .div-button{
      position: relative;
      bottom: 0;
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