import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";

const Navi = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 20px;
  ul{
    display: flex;
    justify-content: flex-start;
    li {
      margin-right: 20px;
    }
  }
`
function Navigation(props) {
    return (
        <Navi>
            <h1>
                <Link to={'/'}>
                    React Board
                </Link>
            </h1>

            <ul>
                <li>
                    <Link to={'/'}>홈으로</Link>
                </li>
                <li>
                    <Link to={'/ProductList'}>
                        게시판
                    </Link>
                </li>
            </ul>
        </Navi>
    );
}

export default Navigation;