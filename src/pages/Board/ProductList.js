import React, {useLayoutEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import PageNavi from "../../components/PageNavi/PageNavi";
import Btn from "../../components/Btn/Btn";
const List = styled.table`
  width: 100%;
  border-spacing:0;
  th {
    background: #fafafa;
    padding: 5px;
  }
  tr{
    cursor: pointer;
      td {
        text-align: center;
        padding: 5px;
        border-bottom: 1px solid #ccc;
        border-left:0;
        border-right: 0;
      }
  }
`

function ProductList(props) {
   const navigate = useNavigate();
    // loading state
    const [isLoading, setIsLoading] = useState(false);
    // api Return Data
    const [listData, setListData] = useState([]); // 불러온 데이터를 저장소 생성
    // error state
    const [error, setError] = useState();

    // 02. 페이징 처리
    // 검색과 페이지는 항상 붙어 있는다.
    // 검색 기준으로 페이징을 생성 한다.
    const [searchValues, setSearchValues] = useState({
        // 기본 셋팅 값을 설정
        pageNum : 1, // 현재 페이지
        pageSize : 10, // 화면에 노출해줄 게시글 수
        searchYn : 'Y', // 검색 여부
        searchType : '', // 검색 조건
        searchText : '', // 검색어
    });

    // 01. API 호출 영역
    useLayoutEffect(()=> {
        setIsLoading(true);
        if(searchValues.searchYn === 'Y'){
            axios.get('http://172.16.63.141:8080/bo/board/boardApiList',{ params: searchValues })
            .then((response)=>{
               if(response.data.code === '0000') {
                   let data = response.data.list;
                   console.log(response.data.list, "::::::::: DATA")
                   // useState 에 data 저장
                   setListData(data);
               }
            })
            .catch((error)=>{
                setError(error)
            })
            .finally(()=>{
                setIsLoading(false);
                setSearchValues({
                    ...searchValues,
                    searchYn: 'N'
                });
            });
            // searchValues.pageNum,
            // searchValues.pageSize,
            // searchValues.searchText,
            // searchValues.searchType,
            // searchValues.searchYn
            // 값을 넘긴다.
        }
    }, [searchValues]); // 데이터를 무한 호출을 막기위해서 ,[] 처리

    // 01. 리스트에서 페이지 이동
    const LinkMove = (url) => {
        navigate(url,
            // {state: {}}
        );

    }


    const paginate = (pageNum, pageSize) => {
        console.log(pageNum, pageSize, "=====================");
        setSearchValues({
            ...searchValues, //setSearchValue 의 기본 값을 ...searchValues로 받아온다.
            pageNum: pageNum, // 클릭한 정보를 가저온다.
            pageSize: pageSize, // 기본 사이즈 정보
        });
    }

    // ## 03. 검색어 기준 검색 기능
    // searchType : 검색종류( 제목:title, 내용:contents, 등록자:regName , 제목+내용:all)
    // searchText : 검색어
    function search(e) {
        // e.preventDefault();
        let error =  inputValidate(searchValues)
        console.log(error , " error ")
        console.log(Object.keys(error).length , "Object.keys(error).length ")
        if(Object.keys(error).length === 0) {
            console.log('통과 여부')

            try{
                setSearchValues({
                    ...searchValues,
                    searchYn: 'Y',
                });
            } catch (e){
                console.log(e, "eeeee")
            }


            console.log('통과 여부:222222')
            // ProdListHook(searchValues)
            // const {isLoading, error, data} = ProdListHook(searchValues);
        }
    }

    // 검색 콤보 박스
    const comboChange = (e) =>{
        const {name, value} = e.target;
        setSearchValues({
            ...searchValues,
            [name]:value}
        )
    }
    // ## 00. 검색어 입력 여부 체크
    const inputValidate = (searchValues) => {
        let error = {};

        if(!searchValues.searchText){
            error.searchText = '검색 값을 입력하세요.'
            alert('검색 값을 입력하세요.')
        }

        if(!searchValues.searchType){
            error.searchType = '검색 값을 선택 하세요.'
            alert('검색 값을 선택 하세요.')
        }
        return error;
    }


    // 게시글 작성 영역
    const write = (url) =>{
        navigate(url)
    }
    return (
        <>
            {isLoading && <p>데이터 로딩중 입니다.</p>}

            {/*검색 영역 */}
            {/*<form>*/}
            <div>
                <select name="searchType" id="searchType" onChange={
                    (e)=>
                        comboChange(e)
                }>
                    <option value="">선택하세요</option>
                    <option value="title">제목</option>
                    <option value="contents">내용</option>
                    <option value="regName">작성자</option>
                    <option value="all">제목+내용</option>
                </select>
                <input type="text" name={'searchText'} onChange={(e)=> comboChange(e) } />
                <button type={'button'} onClick={search}>검색</button>
            </div>
            {/*</form>*/}

            <List>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {listData.total > 0 && listData.list ? listData.list.map((item, count)=>(
                    <tr onClick={
                        ()=> LinkMove(`/ProductDetail/${item.brdNo}`)}
                        key={item.brdNo}
                    >
                        <td>
                            {/* 전체 게시글 역순으로 번호 생성 하기 */}
                            {/* 전체 게시물 수 - (페이지당 노출 게시물 수  * ( 현재 페이지 - 1 )) - 인덱스값 */}
                            {listData.total - (searchValues.pageSize * (searchValues.pageNum -1 )) - count }
                        </td>
                        <td>{item.brdTitle}</td>
                        <td>{item.brdName}</td>
                        <td>{item.regDate}</td>

                        <td>{item.viewCnt}</td>
                    </tr>
                    )) :
                    <tr>
                        <td colSpan={5}>데이터가 없습니다</td>
                    </tr>
                    }
                </tbody>
            </List>

            {/*페이징 */}
            <PageNavi
                total={listData.total}
                pageSize={listData.pageSize}
                pageNum={listData.pageNum}
                startRow={listData.navigateFirstPage}
                endRow={listData.navigateLastPage}
                paginate={paginate}
            />

            {/*게시글 작성 */}
            <Btn
                click={ ()=> write('/ProductWrite') }
                type={'button'}
                btnName={'게시글 작성'}
            />
        </>
    );
}

export default ProductList;