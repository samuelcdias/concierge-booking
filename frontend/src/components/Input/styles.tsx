import styled from 'styled-components';
import colors from '../../styles/colors.json'

export const Container = styled.div`
    background: transparent
    padding: 16px;
    text-indent: 7px;
    display: flex;
    flex-direction: column;
    align-items: left;
    
    label { 
        margin: 0px;
        font-size: 18px;
    }

    & + div {
        margin-top: 8px;
    }
    .icon-input {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        margin: 0px;

        & + div {
            margin-top: 8px;
        }
        input {
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
        }
        svg { 
            margin-right: 16px;
        }
    }
    `;