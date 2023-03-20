import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Btn from "../../components/Btn/Btn";
import InputItem from "../../components/Input/InputItem";
const Detail = styled.div`
  li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    padding: 12px 0;
    color: #333333;
    .title {
      color: #000;
      width: 70px;
      padding: 10px;
      font-weight: 500;
    }
  }
  .content {
    min-height: 200px;
    margin-bottom: 20px;
    .title {
      color: #000;
      border-bottom: 1px solid #eaeaea;
      margin-top: 20px;
      padding: 10px;
      font-weight: 500;
    }
    div {
      padding: 10px;
      color: #333333;
    }
  }
`;

const Reply = styled.div`
  .input-box {
    margin-top: 10px;
    text-align: right;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    textarea {
      border: 0;
      width: calc(100% - 90px);
      padding: 10px;
      border: 1px solid #ccc;
    }
  }
  .comment-text {
    margin-bottom: 20px;
    display: block;
    li {
      border-bottom: 1px solid #eaeaea;
      padding: 10px;
      .name {
        font-size: 13px;
        color: #000;
        line-height: 25px;
        font-weight: 700;
      }
      .reply {
        display: block;
        font-size: 13px;
        line-height: 1.38;
        word-break: break-all;
        word-wrap: break-word;
      }

      .data {
        font-size: 12px;
        color: #999;
      }
    }
  }

  .dispNone {
    display: none;
  }
`;

function ProductDetail(props) {
  const userId = "test111";
  const API_URL = process.env.REACT_APP_API_URI;
  const navigate = useNavigate();
  const { brdNo } = useParams(); // 리스트 페이지에서 파라미터로 받은 값을 셋팅
  // console.log(brdNo, "클릭을 해서 받은 brdNo 값");

  // axios로 받은 값을 Seate설정 하고 &&연산자를 사용 안할 경우
  // '' 로 빈값을 설정 해준다.
  // 데이터를 호출 할대 값이 비어 있으면 에러가 발생한다.
  const [dataDetail, setDataDetail] = useState("");
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);

  const [comment, setComment] = useState({
    commentAdd: "Y",
    cmName: "",
    replyText: "",
  });

  const [commentList, setCommentList] = useState("");

  // 삭제
  const [delYn, setDelYn] = useState({
    brdNo: "",
    delYn: "N",
  });

  useEffect(() => {
    // `${API_URL}/bo/board/boardApiList`

    axios
      .get(`${API_URL}/bo/board/boardApiView?brdNo=${brdNo}`) //?brdNo=${brdNo} 로 인자값 전달
      .then((res) => {
        let data = res.data;
        console.log(data, "디테일 데이터 값");

        if (data.code === "0000") {
          setDataDetail(data.list);

          if (data.list === null) {
            alert("게시물이 없습니다.");
            console.log("여기까지 타기는 하는 건가?");
            navigate("/ProductList");
          }
        }
      })
      .catch((e) => {
        console.log("1");
      })
      .finally(() => {
        axios
          .get(`${API_URL}/bo/comment/commentApiList?brdNo=${brdNo}`)
          .then((res) => {
            let commentData = res.data;
            console.log(commentData, "commentData");
            if (commentData.code === "0000") {
              setCommentList(commentData.list);
              setComment({
                ...comment,
                commentAdd: "N",
              });
            }
          })
          .catch(() => {
            console.log("에러");
          });
      });
  }, [comment.commentAdd]);

  function createMarkup() {
    return { __html: "First &middot; Second" };
  }

  const PageMove = (url, brdNo) => {
    if (brdNo) {
      navigate(
        url + "/" + brdNo
        // {state: {}}
      );
    } else {
      navigate(url);
    }
  };

  const PageDel = (brdNo) => {
    if (brdNo) {
      let param = {
        brdNo: brdNo,
        delYn: "Y",
      };
      axios
        .post(`${API_URL}/bo/board/boardApiDelete`, param)
        .then((res) => {
          let data = res.data;
          // console.log(data, "삭제를 눌렀을때");
          if (data.code === "0000") {
            alert(data.msg);
            navigate("/ProductList");
          }
        })
        .catch((error) => {
          setError(error);
          console.log("Error");
        });
    }
  };
  //===============================================
  function ReplyHandle(brdNo) {
    // e.preventDefault();
    let error = ReplyValidate(comment);

    let param = {
      comment: comment.replyText, //댓글내용
      brdNo: brdNo, // 게시글 번호
      cmName: comment.cmName, // 작성자명
    };

    if (Object.keys(error).length === 0) {
      console.log("통과 여부");
      axios
        .post(`${API_URL}/bo/comment/commentApiModify`, param)
        .then((res) => {
          let data = res.data;
          if (data.code === "0000") {
            alert(data.msg);

            setComment({
              commentAdd: "Y",
              replyText: "",
              cmName: "",
            });
            //setDataDetail(...dataDetail)
          }
          //     navigate('/ProductList')
        })
        .catch((error) => {
          setError(error);
          console.log("Error");
        });
    }
  }

  const ReplyText = (e) => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const ReplyValidate = (comment) => {
    let error = {};
    if (!comment.cmName) {
      error.replyText = "텍스트를 입력하세요.";
      alert("사용자명 작성하세요.");
    }
    if (!comment.replyText) {
      error.replyText = "텍스트를 입력하세요.";
      alert("텍스트를 입력하세요.");
    }
    return error;
  };

  //============================================= 댓글 영역
  const [reply, setReply] = useState("");

  const [active, setActive] = useState(false);

  const replyModifyBtn = (brdNo, cmNo, delYn) => {
    const param = {
      brdNo: brdNo,
      cmNo: cmNo,
      comment: reply,
      delYn: delYn,
    };

    axios
      .post(`${API_URL}/bo/comment/commentApiModify`, param)
      .then((response) => {
        let data = response.data;
        console.log(data.code);

        // 이건 아닌거 같어... navigate("/ProductDetail", param);
      })
      .catch(() => {})
      .finally(() => {});
    console.log("통과 여부:222222");
  };

  const replyModify = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setReply(value);
    setActive(!active)

  };

  const inputRef = useRef([]);
  const btnRef = useRef([]);
  const commentRef = useRef([]);

  const hiddenBtn = (cmNo) => {
    console.log(inputRef);
    console.log(commentRef);
    setActive(!active);

    let disState = active === true ? "none" : "block";
    inputRef.current[cmNo].style = "display:" + disState;
    btnRef.current[cmNo].style = "display:" + disState;
    commentRef.current[cmNo].style = "display:" + disState;
  };

  return (
    <>
      {dataDetail && (
        <Detail>
          <ul>
            <li>
              <p className={"title"}>제목</p> {dataDetail.brdTitle}
            </li>
            <li>
              <p className={"title"}>작성자</p> {dataDetail.brdName}
            </li>
            <li>
              <p className={"title"}>조회수</p> {dataDetail.viewCnt}
            </li>
            <li>
              <p className={"title"}>작성일</p> {dataDetail.regDate}
            </li>
          </ul>
          {/*
                <p>내용 : {dataDetail.brdContents}</p> 로 데이터를 노출 하면
                에디터 Textarea 영역에 입력된 값을
                <div dangerouslySetInnerHTML={{ __html: dataDetail.brdContents }}></div> 변경 해주면
                노출 할때에 태그가 함께 보이는 현상을 막아줌
            */}
          <div className={"content"}>
            <p className={"title"}>내용</p>
            <div
              dangerouslySetInnerHTML={{ __html: dataDetail.brdContents }}
            ></div>
          </div>
        </Detail>
      )}

      {/* 댓글 영역 */}
      <Reply>
        <InputItem
          type="text"
          name={"cmName"}
          event={ReplyText}
          value={comment.cmName}
          placeholder={"이름을 입력 하세요."}
        />

        <div className={"input-box"}>
          <textarea
            type="text"
            name={"replyText"}
            onChange={ReplyText}
            value={comment.replyText}
          ></textarea>
          <Btn
            btnName={"등록"}
            click={() => ReplyHandle(dataDetail.brdNo)}
            class={"a"}
          />
        </div>
        <ul className={"comment-text"}>
          <li>총 댓글 : {commentList.total}</li>
          {commentList.total > 0 && commentList.list ? (
            commentList.list.map((item, index) => (
              <li key={item.cmNo}>
                {/*<p dangerouslySetInnerHTML={{ __html: item.comment }}></p>*/}
                <p className={"name"}>작성자 : {item.cmName}</p>
                <div>
                  {item.regUid === userId ? "동일계정" : "권한없음"}

                  <p
                    className={"reply"}
                    ref={(el) => (commentRef.current[item.cmNo] = el)}
                  >
                    {item.comment}
                  </p>

                  <InputItem
                    inputRef={(el) => (inputRef.current[item.cmNo] = el)}
                    style={"dispNone"}
                    type={"text"}
                    name={`comment${index}`}
                    event={replyModify}
                    defaultValue={item.comment}
                  />
                </div>
                <p className={"data"}>{item.regDate}</p>
                <div style={{display: 'flex'}}>
                  <Btn
                    btnName={"저장"}
                    class={"dispNone"}
                    btnRef={(el) => (btnRef.current[item.cmNo] = el)}
                    click={() => replyModifyBtn(item.brdNo, item.cmNo, "N")}
                  />

                  <Btn
                    btnName={!active ? "수정" : "취소"}
                    click={() => hiddenBtn(item.cmNo)}
                  />
                  <Btn
                    btnName={"삭제"}
                    click={() => replyModifyBtn(item.brdNo, item.cmNo, "Y")}
                  />
                </div>
              </li>
            ))
          ) : (
            <li>현재 댓글이 없습니다.</li>
          )}
        </ul>
      </Reply>

      <Btn
        btnName={"리스트"}
        class={"a"}
        click={() => PageMove("/ProductList")}
      />

      <Btn
        btnName={"수정"}
        class={"a"}
        click={() => PageMove("/ProductWrite", dataDetail.brdNo)}
      />
      <Btn btnName={"삭제"} click={() => PageDel(dataDetail.brdNo)} />
    </>
  );
}

export default ProductDetail;
