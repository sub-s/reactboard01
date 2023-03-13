import React from 'react';
import styled from "styled-components";
import {type} from "@testing-library/user-event/dist/type";

const Button = styled.button`
  border: 1px solid #ccc;
  padding: 15px;
  box-sizing: border-box;
`


function Btn(props) {
    return (
        <>
            <Button type={props.type} onClick={props.click}>
                {props.btnName ? props.btnName : '버튼'}
            </Button>
        </>
    );
}

export default Btn;