import React, { Fragment, useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link,useNavigate } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/Header/MetaData";
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import LoginSignUp from "../User/LoginSignUp.js";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated,loading,user} = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    if (typeof isAuthenticated==="undefined"&&loading===false){
      navigate("/login")
  }
  if(isAuthenticated===false&&loading===false){
    navigate("/login")
  }
    dispatch(getProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch,navigate,isAuthenticated,loading]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
    totalAmount = Math.floor(totalAmount);
  // const lineState = {
  //   labels: ["Initial Amount", "Amount Earned"],
  //   datasets: [
  //     {
  //       label: "TOTAL AMOUNT",
  //       backgroundColor: ["tomato"],
  //       hoverBackgroundColor: ["rgb(197, 72, 49)"],
  //       data: [0, totalAmount],
  //     },
  //   ],
  // };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <Fragment>
      {isAuthenticated===true&&user.role==="admin"?(<div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        {/* <div className="lineChart">
          <Line data={lineState} />
        </div> */}
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>):(<LoginSignUp/>)}
    </Fragment>
  );
};

export default Dashboard;
