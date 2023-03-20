import React from 'react';
import styled from "styled-components";

const Select = styled.select`
  padding: 9px 5px;
  border-radius: 3px;
  margin-right: 5px;
  border: 1px solid #ccc;
`
function ComboBox(props) {
    return (
        <Select
            name={props.name}
            id={props.id}
            onChange={ props.event }
            value={props.defaultOption}
        >
                {props.options.map( (item, index) => (
                    <option value={item.value} key={index}
                            defaultValue={props.defaultOption === item.value}
                    >
                        {item.name}
                    </option>
                ))}
        </Select>
    );
}

export default ComboBox;