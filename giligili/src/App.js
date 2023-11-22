import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./Components/login";
import Home from './Components/home';


function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element= { <Login></Login> }></Route>
          <Route path="/home" element= { <Home></Home> }></Route>
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;