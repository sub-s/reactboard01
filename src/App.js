import './App.css';
import { Outlet} from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import styled from "styled-components";

const Container = styled.div `
  padding: 20px;
`
function App() {
  return (
      <>
        <Navigation />
         <Container>
            <Outlet />
         </Container>
      </>
  );
}

export default App;
