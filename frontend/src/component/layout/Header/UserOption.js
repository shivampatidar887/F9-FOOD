import { makeStyles } from '@material-ui/core';
import React ,{Fragment,useState} from 'react';
import "./Header.css";
import { SpeedDial,SpeedDialAction} from '@material-ui/lab';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch } from 'react-redux';
import { resetCart } from '../../../actions/cartAction';

const UserOption = ({user}) => {
    const navigate=useNavigate();
    const [open,setOpen]=useState(false);
    const alert = useAlert();
    const dispatch=useDispatch();
    const options =[
        {icon:<ListAltIcon/>,name:"Orders",func:orders},
        {icon:<PersonIcon/>,name:"Profile",func:account},
        // {icon:<BsFillCartCheckFill />,name:"Cart",func:cart},
        {icon:<ExitToAppIcon/>,name:"Logout",func:logoutUser},
    ];
      if(user.role==="admin"){
        options.unshift({
            icon:<DashboardIcon/>,
            name: "Dashboard",
            func:dashboard,
        });
      }
      function dashboard(){
        navigate("/admin/dashboard");
      }
      function orders(){
        navigate("/orders");
      }
      function account(){
        navigate("/account");
      }
      function logoutUser(){
         dispatch(resetCart());
         dispatch(logout());
        alert.success("Logout SuccessFully");
      }
  return (
    <Fragment>
    
        <SpeedDial
      ariaLabel='SpeedDial tooltip example'
      onClose={()=>setOpen(false)}
      onOpen={()=>setOpen(true)}
      open={open}
      direction="down"
      className='speedDial'
      icon={<img
      className='speedDialIcon'
      src={user.avatar.url?user.avatar.url:"/Profile.png"}
      alt="Profile"
      />
      }
      >
       {options.map((item)=>(
        <SpeedDialAction
          key={item.name}
          icon={item.icon}
          tooltipTitle={item.name}
          onClick={item.func}
        />
       ))}
      </SpeedDial>
        
    </Fragment>
  )
}

export default UserOption
