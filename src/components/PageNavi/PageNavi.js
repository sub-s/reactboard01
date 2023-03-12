import React, {useState} from 'react';
import styled from "styled-components";

const PageNavigator = styled.div`
  margin-top: 20px;
  ul {
    width: auto;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    li {
      margin-right: 2px;
      button {
        display: block;
        border-radius: 2px;
        padding: 10px;
        border: 1px solid #ccc;
        cursor: pointer;
        &.on {
          border: 1px solid dodgerblue;
        }
      }
    }
  }
`
function PageNavi({total, pageSize, pageNum ,paginate, startRow, endRow}) {
    // 총 게시물 페이지 수를 노출 공식
    const pageNumbers = [];
    let PageCount = parseInt((total - 1) / pageSize) + 1;
    //let PageCount parseInt( (전체 게시글 수 - 1 ) / 화면에 노출해줄 게시글 수 ) + 1;
    for(let i = 1 ; i <= PageCount; i++){
        pageNumbers.push(i)
    }
    return (
        <PageNavigator>
            <ul>
                {pageNumbers.map((num)=>(
                    <li key={num}>
                        <button onClick={(e) => paginate(num, pageSize)}
                            className={pageNum === num ? "on" : null }
                        >
                            {num}
                        </button>
                    </li>
                ))}
            </ul>
        </PageNavigator>
    );
}

export default PageNavi;