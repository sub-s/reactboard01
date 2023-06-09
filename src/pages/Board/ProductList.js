import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageNavi from "../../components/PageNavi/PageNavi";
import Btn from "../../components/Btn/Btn";
import Loading from "../../components/Loading/Loading";
import InputItem from "../../components/Input/InputItem";
import ComboBox from "../../components/ComboBox/ComboBox";
const List = styled.table`
  width: 100%;
  border-spacing: 0;
  border-top: 2px solid #282c34;
  th {
    background: #fafafa;
    padding: 15px 5px 15px;
    border-bottom: 1px solid #ccc;
  }
  tbody {
    tr {
      cursor: pointer;
      td {
        text-align: center;
        border-bottom: 1px solid #ccc;
        padding: 15px 5px 15px;
        border-left: 0;
        border-right: 0;
      }
    }
  }
`;

const SearchArea = styled.div`
  text-align: right;
  padding: 20px 0 20px;
`;

function ProductList(props) {
  const API_URL = process.env.REACT_APP_API_URI;
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
    pageNum: 1, // 현재 페이지
    pageSize: 10, // 화면에 노출해줄 게시글 수
    searchYn: "Y", // 검색 여부
    searchType: "all", // 검색 조건
    searchText: "", // 검색어
  });

  // 01. API 호출 영역
  useLayoutEffect(() => {
    if (searchValues.searchYn === "Y") {
      setIsLoading(true);
      axios
        .get(`${API_URL}/bo/board/boardApiList`, { params: searchValues })
        .then((response) => {
          if (response.data.code === "0000") {
            let data = response.data.list;
            console.log(response.data.list, "::::::::: DATA");
            // useState 에 data 저장
            setListData(data);
          }
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);

          setSearchValues({
            ...searchValues,
            searchYn: "N",
          });
        });
      // searchValues.pageNum,
      // searchValues.pageSize,
      // searchValues.searchText,
      // searchValues.searchType,
      // searchValues.searchYn
      // 값을 넘긴다.
    }
  }, [
    searchValues.pageNum,
    searchValues.pageSize,
    searchValues.searchText,
    searchValues.searchType,
    searchValues.searchYn,
  ]); // 데이터를 무한 호출을 막기위해서 ,[] 처리

  // 01. 리스트에서 페이지 이동
  const LinkMove = (url) => {
    navigate(
      url
      // {state: {}}
    );
  };

  const paginate = (pageNum, pageSize) => {
    console.log(pageNum, pageSize, "=====================");
    setSearchValues({
      ...searchValues, //setSearchValue 의 기본 값을 ...searchValues로 받아온다.
      pageNum: pageNum, // 클릭한 정보를 가저온다.
      pageSize: pageSize, // 기본 사이즈 정보
      searchYn: "Y",
    });
  };

  // ## 03. 검색어 기준 검색 기능
  // searchType : 검색종류( 제목:title, 내용:contents, 등록자:regName , 제목+내용:all)
  // searchText : 검색어
  function search(e) {
    // e.preventDefault();
    let error = inputValidate(searchValues);
    console.log(error, " error ");
    console.log(Object.keys(error).length, "Object.keys(error).length ");
    if (Object.keys(error).length === 0) {
      console.log("통과 여부");
      setSearchValues({
        ...searchValues,
        searchYn: "Y",
      });
      console.log("통과 여부:222222");
      // ProdListHook(searchValues)
      // const {isLoading, error, data} = ProdListHook(searchValues);
    }
  }

  // 검색 콤보 박스
  const comboChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target, "e.target");
    console.log(name, value, ">>>>>>>>>>>>>>");
    setSearchValues({
      ...searchValues,
      [name]: value,
    });
  };
  // ## 00. 검색어 입력 여부 체크
  const inputValidate = (searchValues) => {
    let error = {};

    if (!searchValues.searchText) {
      error.searchText = "검색 값을 입력하세요.";
      alert("검색 값을 입력하세요.");
    }

    if (!searchValues.searchType) {
      error.searchType = "검색 값을 선택 하세요.";
      alert("검색 값을 선택 하세요.");
    }
    return error;
  };

  // 게시글 작성 영역
  const write = (url) => {
    navigate(url);
  };

  const selectList = [
    { value: "선택하세요", name: "선택하세요" },
    { value: "title", name: "제목" },
    { value: "contents", name: "본문" },
    { value: "regName", name: "작성자" },
    { value: "all", name: "본문 + 작성자" },
  ];
  return (
    <>
      {/*데이터 호출 시 로딩 중*/}
      {isLoading && <Loading />}
      {/*검색 영역 */}
      <SearchArea>
        <ComboBox options={selectList}
          name={"searchType"}
          id={"searchType"}
          defaultOption={searchValues.searchType}
          event={comboChange}
        />


        <InputItem
          type={'text'}
          name={"searchText"}
          event={comboChange}
        />

        <Btn click={search} type={"button"} btnName={"검색"} class={"a"} />
      </SearchArea>

      <List>
        <colgroup>
          <col width={"7%"} />
          <col width={"*"} />
          <col width={"13%"} />
          <col width={"13%"} />
          <col width={"13%"} />
        </colgroup>
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
          {listData.total > 0 && listData.list ? (
            listData.list.map((item, count) => (
              <tr
                onClick={() => LinkMove(`/ProductDetail/${item.brdNo}`)}
                key={item.brdNo}
              >
                <td>
                  {/* 전체 게시글 역순으로 번호 생성 하기 */}
                  {/* 전체 게시물 수 - (페이지당 노출 게시물 수  * ( 현재 페이지 - 1 )) - 인덱스값 */}
                  {/*{listData.total - (searchValues.pageSize * (searchValues.pageNum -1 )) - count }*/}

                  {listData.total -
                    (listData.pageNum - 1) * listData.pageSize -
                    count}
                  {/*//${pg.total -(pg.pageNum -1) * pg.pageSize*/}
                </td>
                <td style={{ textAlign: "left" }}>{item.brdTitle}</td>
                <td>{item.brdName}</td>
                <td>{item.regDate}</td>

                <td>{item.viewCnt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>데이터가 없습니다</td>
            </tr>
          )}
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
        click={() => write("/ProductWrite")}
        type={"button"}
        btnName={"게시글 작성"}
        class={"a"}
      />
    </>
  );
}

export default ProductList;
