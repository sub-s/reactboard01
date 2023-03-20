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
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 3px;
        padding: 10px;
        cursor: pointer;
        border: 0;
        &.on {
          background: dodgerblue;
          color: #fff;
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
                            <span>{num}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </PageNavigator>
    );
}

export default PageNavi;