import styled from "styled-components";
import colors from "../../styles/colors.json"

const isHidden: boolean = true

export const BlockContent = styled.fieldset`
  background: transparent;
  padding: 6px 0px;
  display: flex;
  flex-direction: column;
  align-content: center;
  visibility: ${isHidden? 'hidden' : 'visible'};
  width: ${isHidden? 0 : '100%'};
  height: ${isHidden? '0 !important' : '100%'};
  
  legend {
    font-size: 16px;
    width: ${isHidden? 0 : '100%'};
    height: ${isHidden? 0 : '100%'};
  }

  div + div {
    margin: 0px 8px;
  }

  div {
    display: flex;
    flex-direction: row;
    margin: 0px;
    width: ${isHidden? 0 : '100%'};
    height: ${isHidden? 0 : '100%'};
  }
  
`;

export const FormStyle = styled.form`
  box-sizing: border-box;
  padding: 40px 30px;
  margin-top: 50px;
  margin: 0 auto;
  width: 100%;

  div {
    margin-top: 20 px;
  }

  .react-datepicker-wrapper .react-datepicker__input-container input{
    background: transparent;
      border-radius: 6px;
      border: 2px solid ${colors.primary};
      color: ${colors.primary};
      outline-width: 0;
      fill-opacity:0;
      flex: 1;
      text-indent: 3px;
      padding: 2px;
      font-family: Nunito;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 25px;
      align-items: center;
      z-index: 2;
  }
  `
export const Content = styled.div`
  height: 100%;
`

