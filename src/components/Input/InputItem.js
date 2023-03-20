import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";

const Input = styled.input`
  border: 1px solid #ccc;
  padding: 10px 5px;
  border-radius: 3px;
  &.a {
  }
  & + button {
    margin-left: 5px;
  }
`;

const InputItem = (props) => {
  // const inputRef = useRef();

  return (
    <>
      <Input
        ref={props.inputRef}
        type={props.type}
        name={props.name}
        onChange={props.event}
        value={props.value}
        defaultValue={props.defaultValue}
        className={props.style ? props.style : ""}
        placeholder={props.placeholder ? props.placeholder : "입력 하세요."}
      />
    </>
  );
};

export default InputItem;
