import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Btn from "../../components/Btn/Btn";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import styled from "styled-components";
import InputItem from "../../components/Input/InputItem";

const WriteArea = styled.div`
  ul {
    li {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      input {
        width: 90%;
        padding: 10px;
        border: 1px solid #ccc;
      }
      textarea {
        width: 90%;
        padding: 10px;
        resize: none;
        min-height: 200px;
        border: 1px solid #ccc;
      }
    }
  }
  .ck-editor {
    margin-top: 20px;
    width: 100%;

    .ck-content {
      min-height: 300px;
    }
  }
`;

function ProductWrite(props) {
  const API_URL = process.env.REACT_APP_API_URI;
  const { brdNo } = useParams();
  const navigate = useNavigate();
  // 01. 서버에 전송 할 파라미터를 셋팅 한다.
  const [values, setValues] = useState({
    brdNo: "",
    brdTitle: "",
    brdName: "",
    brdContents: "",
  });

  // ## 00. Editor Insert
  const [contents, setContents] = useState("");


  useEffect(() => {
    // `${API_URL}/bo/board/boardApiList`
    // 게시글 brdNo가 있으면 실행
    if (brdNo > 0) {
      axios
        .get(`${API_URL}/bo/board/boardApiView?brdNo=${brdNo}`) //?brdNo=${brdNo} 로 인자값 전달
        .then((res) => {
          let data = res.data.list;
          console.log(data, "디테일 데이터 값");
          setValues(data);
        })
        .catch((e) => {
          console.log("1");
        });
    }
  }, []);

  // 2. onChange 이벤트가 발생할 때 useState 에 값을 새롭게 갱신한다.
  const txtChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // 03. 전송 버튼
  function saveBtn(e) {
    // e.preventDefault();
    let error = inputValidate(values);
    console.log(error, " error ");
    console.log(Object.keys(error).length, "Object.keys(error).length ");
    if (Object.keys(error).length === 0) {
      console.log("통과 여부");
      let param = {
        brdNo: values.brdNo,
        brdTitle: values.brdTitle,
        brdName: values.brdName,
        brdContents: contents,
      }
      axios
        .post(`${API_URL}/bo/board/modifyBoardApi`, param)
        .then((response) => {
          let data = response.data;
          console.log(data.code);
          if (data.code === "0000") {
            alert(data.msg);
            navigate("/ProductList");
          } else {
            alert(data.msg);
          }
        })
        .catch(() => {})
        .finally(() => {});
      console.log("통과 여부:222222");
    }
  }
  // ## 00. 검색어 입력 여부 체크
  const inputValidate = (values) => {
    let error = {};

    if (!values.brdTitle) {
      error.brdTitle = "제목을 입력하세요.";
      // alert('제목을 입력하세요.')
    }

    if (!values.brdName) {
      error.brdName = "작성자 이름을 입력 하세요.";
      // alert('작성자 이름을 입력 하세요.')
    }

    if (!contents) {
      error.brdContents = "네용을 입력 하세요.";
      // alert('네용을 입력 하세요.')
    }
    return error;
  };

  // const LinkMove = (url) => {
  //     navigate(url,
  //         // {state: {}}
  //     );
  //
  // }

  const [image, setImage] = useState("");
  const [flag, setFlag] = useState(false);
  const imgLink = "http://localhost:5000/images/";

  const customUploadAdapter = (loader) => {
    // (2)
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const data = new FormData();
          loader.file.then((file) => {
            data.append("name", file.name);
            data.append("file", file);

            axios
              .post("/api/upload", data)
              .then((res) => {
                if (!flag) {
                  setFlag(true);
                  setImage(res.data.filename);
                }
                resolve({
                  default: `${imgLink}/${res.data.filename}`,
                });
              })
              .catch((err) => reject(err));
          });
        });
      },
    };
  };
  function uploadPlugin(editor) {
    // (3)
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  return (
    <WriteArea>
      <input type={"hidden"} name={"brdNo"} value={values.brdNo} />
      <ul>
        <li>
          제목
          <InputItem
            type={"text"}
            name={"brdTitle"}
            event={txtChange}
            value={values.brdTitle}
          />
        </li>
        <li>
          작성자
          <InputItem
            type={"text"}
            name={"brdName"}
            event={txtChange}
            value={values.brdName}
          />
        </li>
        <li>



          <CKEditor
            config={{
              // (4)
              extraPlugins: [uploadPlugin],
            }}
            editor={ClassicEditor}
            data={values.brdContents}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              // txtChange(event)
              setContents(data);
              console.log({ event, editor, data }, "LLLLLLL");
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}

            // name={'brdContents'}
            // onChange={(e)=> txtChange(e) }
            // value={values.brdContents}
          />
        </li>
      </ul>
      <Btn click={() => saveBtn()} btnName={"저장"} />
    </WriteArea>
  );
}

export default ProductWrite;
