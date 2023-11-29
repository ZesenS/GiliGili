import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./components/login";
import Home from './components/home';
import Suggestion from './components/suggestion';
import Profile from './components/profile';
import store from "./store";
import { Provider } from 'react-redux';
function App() {

  return (
    <Provider store={store}>
      <BrowserRouter> 
          <Routes>
            <Route path="/login" element= { <Login></Login> }></Route>
            <Route path="/" element= { <Home></Home> }>
              <Route index element= { <Suggestion></Suggestion> }></Route>
              <Route path='/profile' element={<Profile></Profile>}></Route>
            </Route>
          </Routes>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;