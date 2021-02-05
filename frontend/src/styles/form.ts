import styled from "styled-components";
import colors from "./colors.json"

export const InputDiv = styled.div`
    input, textarea, select, button {
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
        max-width: 350px;      
    }
    `  
export const FormStyle = styled.div`
    box-sizing: border-box;
    padding: 40px 30px;
    margin-top: 50px;
    margin: 0 auto;
    width: 100%;
    `