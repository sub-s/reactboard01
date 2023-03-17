import {createBrowserRouter} from "react-router-dom";
import App from './App';
import Main from "./pages/Main";
import ProductList from "./pages/Board/ProductList";

import PageNotPound from './pages/ErrorPage/PageNotPound'
import ProductDetail from "./pages/Board/ProductDetail";
import ProductWrite from "./pages/Board/ProductWrite";

export const router = createBrowserRouter([
    {
        path : '/', // 기본 셋팅 '/' 는 메인으로 이동
        element : <App />,
        errorElement: <PageNotPound />, // 페이지 없을 경우 페이지 설정을 해준다.
        children: [
            {
                index : true, // 배열 첫번째 항목인 path와 동일한 true일 경우 메인화면을 출력 해준다.
                element : <Main /> // 메인 페이지
            },
            {
                path: '/ProductList', // 다른 기타 메뉴를 표시 해준다.
                element : <ProductList />
            },
            {
                path: '/ProductDetail/:brdNo',  // 파라미터 값을 받아 온다. :brdNo 값을 선언한다..
                element : <ProductDetail  />
            },
            {
                path: '/ProductWrite', // 게시글 작성
                element: <ProductWrite />,
                children: [
                     {path: ':brdNo', element: <ProductWrite/>} // 다중 주소 사용 방법
                ]
            },

        ],
    },
    {
        // 별도에 LOGIN이나 페이지가 GNB를 타지 않을 경우의 Router을 설정 해준다.
    }
]);