import { useLocation } from 'react-router-dom'
import profileCss from "./profile.module.css"

function Profile() {
  const location = useLocation();
  console.log(location.state);
  return (
    <div className={profileCss.typeArea}>
      <div className={profileCss.userInfo}>
        <div></div>
        <div>
          <div><h4>{location.state.name}</h4><button></button></div>
          <div><span>正式会员</span></div>
          <div><span>G币：0</span></div>
        </div>
        <div>空间  &gt;</div>
      </div>
      <div id={profileCss.userMedia}>
        <div>
          <div>5</div>
          <div>动态</div>
        </div>
        <div>
          <div>135</div>
          <div>关注</div>
        </div>
        <div>
          <div>1</div>
          <div>粉丝</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;


