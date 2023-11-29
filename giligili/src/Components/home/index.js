
import headerCss from './header.module.css'
import { connect } from "react-redux";
import giligili from "../../data/images/giligili.jpg";
import magnifier from "../../data/images/magnifier.png";
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = (props) => {
  const navigate = useNavigate();
  const [currentChannel, setChannel] = useState(2);
  const goProfile = () => {
    navigate("/profile", { state: { name: props.name } });
    setChannel(5);
  };

  const goSuggestion = () => {
    navigate("/", { state: { name: props.name } });
    setChannel(2);

  }
  return (
    <div>
      <div id={headerCss.line}></div>
      <div id={headerCss.main}>
        <div id={headerCss.header}>
          <div id={headerCss.navigation}>
            <div></div>
            <div>
              <img src={magnifier} alt=""></img>
              <input type="输入搜索"></input>
            </div>
            <div>
              <button></button>
              <div>33</div>
              <img src={giligili} alt=""></img>
            </div>

          </div>
          <div id={headerCss.channels}>
            <ul>
              <li className={currentChannel === 1 ? headerCss.current : ""}>直播</li>
              <li className={currentChannel === 2 ? headerCss.current : ""} onClick={goSuggestion}>推荐</li>
              <li className={currentChannel === 3 ? headerCss.current : ""}>热门</li>
              <li className={currentChannel === 4 ? headerCss.current : ""}>追番</li>
              <li className={currentChannel === 5 ? headerCss.current : ""} onClick={goProfile}>个人</li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet></Outlet>
    </div>

  );
}


const mapStateToProps = (state) => {
  return state;

}


export default connect(mapStateToProps)(Home);
