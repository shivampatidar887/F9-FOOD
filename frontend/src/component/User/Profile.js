import React,{Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/Header/MetaData';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import "./Profile.css";
import LoginSignUp from './LoginSignUp';
const Profile = () => {
    const {user,isAuthenticated,loading}=useSelector((state)=>state.user);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthenticated&&loading===false){
            navigate("/login");
          }
    },[isAuthenticated,loading, navigate])
  return (
    
    <Fragment>
    {isAuthenticated===true?<Fragment>
    <MetaData title={`${user.name}'s Profile`}/>
    <div className="profileContainer">
        <div className="profile-box">
      <div className='profile-1'>
          <img src={user.avatar.url} alt={user.name}/>
          <Link to="/orders">My Orders</Link>
      </div>
      <div className='profile-2'>
          <div>
              <div>
              <h4>Full Name</h4>
              <p>{user.name}</p>
              </div>
              <div>
              <h4>Email</h4>
              <p>{user.email}</p>
              </div>
              <div>
              <h4>Joined On</h4>
              <p>{String(user.createdAt).substr(0,10)}</p>
              </div>
          </div>
          <div>
              <Link to='/me/update'>Edit Profile</Link>
              <Link to="/password/update">Change Password</Link>
          </div>
      </div>
      </div>
    </div>
  </Fragment>:<LoginSignUp/>}
    
  </Fragment>
  )
}

export default Profile
