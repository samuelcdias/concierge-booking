
import { createGlobalStyle } from 'styled-components';
import colors from './colors.json'

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        color: ${colors.textColour};
        background: ${colors.background};
        font-style: normal;
        font-weight: normal;
    }
    

    body, input, button, textarea {
        font: 400 14px Nunito, sans-serif
    }
    #root > div > div > .container-page-content {
        min-height: calc(100vh - 95px);
        background: #FFFFFF;
    }

    .react-calendar {
        width: 350px;
        max-width: 100%;
        background: white;
        border: 1px solid #a0a096;
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.125em;
      }
      .react-calendar--doubleView {
        width: 700px;
      }
      .react-calendar--doubleView .react-calendar__viewContainer {
        display: flex;
        margin: -0.5em;
      }
      .react-calendar--doubleView .react-calendar__viewContainer > * {
        width: 50%;
        margin: 0.5em;
      }
      .react-calendar,
      .react-calendar *,
      .react-calendar *:before,
      .react-calendar *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      .react-calendar button {
        margin: 0;
        border: 0;
        outline: none;
      }
      .react-calendar button:enabled:hover {
        cursor: pointer;
      }
      .react-calendar__navigation {
        height: 44px;
        margin-bottom: 1em;
      }
      .react-calendar__navigation button {
        min-width: 44px;
        background: none;
      }
      .react-calendar__navigation button:enabled:hover,
      .react-calendar__navigation button:enabled:focus {
        background-color: #e6e6e6;
      }
      .react-calendar__navigation button[disabled] {
        background-color: #f0f0f0;
      }
      .react-calendar__month-view__weekdays {
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.75em;
      }
      .react-calendar__month-view__weekdays__weekday {
        padding: 0.5em;
      }
      .react-calendar__month-view__weekNumbers {
        font-weight: bold;
      }
      .react-calendar__month-view__weekNumbers .react-calendar__tile {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75em;
        padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
      }
      .react-calendar__month-view__days__day--weekend {
        color: #d10000;
      }
      .react-calendar__month-view__days__day--neighboringMonth {
        color: #757575;
      }
      .react-calendar__year-view .react-calendar__tile,
      .react-calendar__decade-view .react-calendar__tile,
      .react-calendar__century-view .react-calendar__tile {
        padding: 2em 0.5em;
      }
      .react-calendar__tile {
        max-width: 100%;
        text-align: center;
        padding: 0.75em 0.5em;
        background: none;
      }
      .react-calendar__tile:disabled {
        background-color: #f0f0f0;
      }
      .react-calendar__tile:enabled:hover,
      .react-calendar__tile:enabled:focus {
        background-color: #e6e6e6;
      }
      .react-calendar__tile--now {
        background: #ffff76;
      }
      .react-calendar__tile--now:enabled:hover,
      .react-calendar__tile--now:enabled:focus {
        background: #ffffa9;
      }
      .react-calendar__tile--hasActive {
        background: #76baff;
      }
      .react-calendar__tile--hasActive:enabled:hover,
      .react-calendar__tile--hasActive:enabled:focus {
        background: #a9d4ff;
      }
      .react-calendar__tile--active {
        background: #006edc;
        color: white;
      }
      .react-calendar__tile--active:enabled:hover,
      .react-calendar__tile--active:enabled:focus {
        background: #1087ff;
      }
      .react-calendar--selectRange .react-calendar__tile--hover {
        background-color: #e6e6e6;
      }
      .react-date-picker {
        display: inline-flex;
        position: relative;
      }
      .react-date-picker,
      .react-date-picker *,
      .react-date-picker *:before,
      .react-date-picker *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      .react-date-picker--disabled {
        background-color: #f0f0f0;
        color: #6d6d6d;
      }
      .react-date-picker__wrapper {
        display: flex;
        flex-grow: 1;
        flex-shrink: 0;
        border-radius: 6px;
        border: 2px solid ${colors.primary};
        color: ${colors.primary};
      }
      .react-date-picker__inputGroup {
        min-width: calc((4px * 3) +  0.54em * 8  +  0.217em * 2);
        flex-grow: 1;
        padding: 0 2px;
        box-sizing: content-box;
      }
      .react-date-picker__inputGroup__divider {
        padding: 1px 0;
        white-space: pre;
      }
      .react-date-picker__inputGroup__input {
        min-width: 0.54em;
        width: 100%;
        height: 100%;
        position: relative;
        padding: 0 1px;
        border: 0;
        background: none;
        font: inherit;
        box-sizing: content-box;
        -moz-appearance: textfield;
      }
      .react-date-picker__inputGroup__input::-webkit-outer-spin-button,
      .react-date-picker__inputGroup__input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      .react-date-picker__inputGroup__input:invalid {
        background: rgba(255, 0, 0, 0.1);
      }
      .react-date-picker__inputGroup__input--hasLeadingZero {
        margin-left: -0.54em;
        padding-left: calc(1px +  0.54em);
      }
      .react-date-picker__button {
        border: 0;
        background: transparent;
        padding: 4px 6px;
      }
      .react-date-picker__button:enabled {
        cursor: pointer;
      }
      .react-date-picker__button:enabled:hover .react-date-picker__button__icon,
      .react-date-picker__button:enabled:focus .react-date-picker__button__icon {
        stroke: #0078d7;
      }
      .react-date-picker__button:disabled .react-date-picker__button__icon {
        stroke: #6d6d6d;
      }
      .react-date-picker__button svg {
        display: inherit;
      }
      .react-date-picker__calendar {
        width: 350px;
        max-width: 100vw;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1;
      }
      .react-date-picker__calendar--closed {
        display: none;
      }
      .react-date-picker__calendar .react-calendar {
        border-width: thin;
      }
      
    `;

export default GlobalStyle;
