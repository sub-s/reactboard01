import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";


function ProductDetail( props, viewCnt ) {
    const {brdNo} = useParams(); // 리스트 페이지에서 파라미터로 받은 값을 셋팅
    // console.log(brdNo, "클릭을 해서 받은 brdNo 값");

    // axios로 받은 값을 Seate설정 하고 &&연산자를 사용 안할 경우
    // '' 로 빈값을 설정 해준다.
    // 데이터를 호출 할대 값이 비어 있으면 에러가 발생한다.
    const [dataDetail, setDataDetail] = useState('')
    const [count, setCount] = useState(0);

    useEffect(()=>{
        axios.get(`http://172.16.63.141:8080/bo/board/boardApiView?brdNo=${brdNo}`) //?brdNo=${brdNo} 로 인자값 전달
            .then((res)=>{
                let data = res.data.list
                console.log(data, "디테일 데이터 값");
                setDataDetail(data)
                setCount(data.viewCnt);
            })
            .catch((e)=>{console.log('1')})


        // 조회수 업데이트
        axios.post(`http://172.16.63.141:8080/bo/board/boardApiViewUpdateCnt?brdNo=${brdNo}`) //?brdNo=${brdNo} 로 인자값 전달
            .then((res)=>{
                let data = res.data.list
                console.log(data, "디테일 데이터 값");
                setCount(dataDetail.viewCnt + 1);
                //setDataDetail(data)
            })
            .catch((e)=>{console.log('1')})
    }, []);


    // 조회수

    console.log(viewCnt , "뷰 카운터 받아오나...")


    return (
        <>
            {dataDetail &&
                <div>
                    <p>제목 : {dataDetail.brdTitle}</p>
                    <p>작성자 : {dataDetail.brdName}</p>
                    <p>조회수 : {dataDetail.viewCnt}</p>
                    <p>작성일 : {dataDetail.regDate}</p>

                    {/*
                        <p>내용 : {dataDetail.brdContents}</p> 로 데이터를 노출 하면
                        에디터 Textarea 영역에 입력된 값을
                        <div dangerouslySetInnerHTML={{ __html: dataDetail.brdContents }}></div> 변경 해주면
                        노출 할때에 태그가 함께 보이는 현상을 막아줌
                    */}
                    <div dangerouslySetInnerHTML={{ __html: dataDetail.brdContents }}></div>
                </div>
            }
        </>
    );
}

export default ProductDetail;