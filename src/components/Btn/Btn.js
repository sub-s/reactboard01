import React from 'react';
import styled from "styled-components";
import {type} from "@testing-library/user-event/dist/type";

const Button = styled.button`
  border: 1px solid #ccc;
  padding: 10px 15px;
  box-sizing: border-box;
  border-radius: 3px;
  &.a {
    border: 0;
      background: dodgerblue;
    color: #fff;
  }
  & + button {
    margin-left: 5px;
  }
`


function Btn(props) {
    return (
        <>
            <Button type={props.type} onClick={props.click} className={props.class ? props.class : '' } ref={props.btnRef}>
                {props.btnName ? props.btnName : '버튼'}
            </Button>
        </>
    );
}

export default Btn;