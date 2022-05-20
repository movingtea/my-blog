import {css, Global} from "@emotion/react";
import * as React from "react";

export default function GlobalStyles() {
    return (
        <Global styles={css`
            html, body {
                background-color: #fff;
                padding: 0;
                margin: 0;
            }
            a {
                color: inherit;
                text-decoration: none;
            }

            a:hover {
                text-decoration: underline;
            }
            * {
                box-sizing: border-box;
            }

            p {
                 margin-block: 0;
            }
            
            @media only screen and (min-width: 701px) {
                .container {
                    background: url("/img/main_bg_14.png") no-repeat fixed;
                    background-size: cover;
                    width: 100vw;
                    height: auto;
                    min-height: 100vh;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
            
                .pageBody {
                    background-color: #FFF;
                    border-radius: 40px;
                    box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.2);
                    margin: 3% auto;
                    max-width: 1248px;
                    padding: 40px 70px 80px;
                    display: flex;
                    flex-flow: column;
                    position: relative;
                    flex: 0 0 100%;
                    min-height: 100vh;
                    align-items: center;
                }
            }           
        `}/>
    )
}