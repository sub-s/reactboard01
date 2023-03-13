import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Btn from "../../components/Btn/Btn";
const Detail = styled.div `
    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #ccc;
      
      p{
        width: 70px;
        padding: 10px;
      }
    }
    p{
      padding: 10px;
    }
    div {
      min-height: 200px;
      margin-bottom: 20px;
      p{
        padding: 0px;
      }
      border: 1px solid #ccc;
      padding: 10px;
    }
`

function ProductDetail( props ) {
    const API_URL = process.env.REACT_APP_API_URI;
    const navigate = useNavigate();
    const {brdNo} = useParams(); // 리스트 페이지에서 파라미터로 받은 값을 셋팅
    // console.log(brdNo, "클릭을 해서 받은 brdNo 값");

    // axios로 받은 값을 Seate설정 하고 &&연산자를 사용 안할 경우
    // '' 로 빈값을 설정 해준다.
    // 데이터를 호출 할대 값이 비어 있으면 에러가 발생한다.
    const [dataDetail, setDataDetail] = useState('')
    const [error, setError] = useState('')
    const [count, setCount] = useState(0);

    // 삭제
    const [delYn, setDelYn] = useState({
        brdNo :'',
        delYn : 'N'
    })

    useEffect(()=>{
        // `${API_URL}/bo/board/boardApiList`

        axios.get(`${API_URL}/bo/board/boardApiView?brdNo=${brdNo}`) //?brdNo=${brdNo} 로 인자값 전달
            .then((res)=>{
                let data = res.data
                console.log(data, "디테일 데이터 값");

                if(data.code === '0000'){
                    setDataDetail(data.list);
                    if(data.list === null){
                        alert('게시물이 없습니다.')
                        console.log('여기까지 타기는 하는 건가?')
                        navigate('/ProductList')
                    }
                }




            })
            .catch((e)=>{console.log('1')})


    }, []);


    const PageMove = (url,brdNo) => {
        if(brdNo){
            navigate(url+'/'+brdNo,
                // {state: {}}
            )
        }else {
            navigate(url)
        };
    }

    const PageDel = (brdNo) => {
        if(brdNo) {

            let param = {
                brdNo : brdNo,
                delYn : 'Y'
            }
            axios.post(`${API_URL}/bo/board/boardApiDelete`, param)
                .then((res)=>{
                    let data = res.data
                    console.log(data, "삭제를 눌렀을때");
                    if(data.code === '0000') {
                        alert(data.msg);
                        navigate('/ProductList')
                    }
                })
                .catch((error)=>{
                    setError(error)
                    console.log('Error')
                });
        }
    }


    return (
        <>
            {dataDetail &&
                <Detail>
                    <ul>
                        <li><p>제목 :</p> {dataDetail.brdTitle}</li>
                        <li><p>작성자 :</p> {dataDetail.brdName}</li>
                        <li><p>조회수 :</p> {dataDetail.viewCnt}</li>
                        <li><p>작성일 :</p> {dataDetail.regDate}</li>
                    </ul>
                    {/*
                        <p>내용 : {dataDetail.brdContents}</p> 로 데이터를 노출 하면
                        에디터 Textarea 영역에 입력된 값을
                        <div dangerouslySetInnerHTML={{ __html: dataDetail.brdContents }}></div> 변경 해주면
                        노출 할때에 태그가 함께 보이는 현상을 막아줌
                    */}
                    <p>내용</p>
                    <div dangerouslySetInnerHTML={{ __html: dataDetail.brdContents }}></div>
                </Detail>
            }
            <Btn
                btnName={'리스트'}
                click={()=> PageMove('/ProductList')}
            />
            <Btn
                btnName={'수정'}
                click={()=> PageMove('/ProductWrite', dataDetail.brdNo)}
            />
            <Btn
                btnName={'삭제'}
                click={()=> PageDel( dataDetail.brdNo)}
            />
        </>
    );
}

export default ProductDetail;