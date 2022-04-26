import React, {useEffect,useState} from "react";
import {Switch, Route} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import SellerRegister from "./pages/auth/SellerRegister";
import RiderRegister from "./pages/auth/RiderRegister";
// import tryyy from "./pages/auth/tryyy";  //delete this afterwards
import Home from "./pages/Home";
import SellerShop from "./pages/SellerShop";  //shop
import Header from './components/nav/Header';
import SideDrawer from "./components/drawer/SideDrawer";
import logsignNav from './components/nav/Header';
import ScrollButton from './pages/ScrollButton'; //scroll
import "./App.css";
import "./responsive.css";
//import "./login.css";
import RegisterComplete from './pages/auth/RegisterComplete'
import {ToastContainer} from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";

import {auth} from './firebase';

import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { async } from "@firebase/util";

import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SuperAdminDashboard from "./pages/admin/SuperAdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage";

import Revenue from "./pages/admin/Revenue";

import Payment from "./pages/Payment";
import Chat from "./components/Chat";
import Comments from "./components/Comments";
import HomeAdd from "./components/HomeAdd";
import UserList from "./components/cards/UserList";

import AboutUs from "./components/AboutUs";
import blog from "./components/blog";
import faq from "./components/faq";
import plan from "./components/plan";
import thankyou from "./components/thankyou";
import termscon from "./components/termscon";
import comrules from "./components/comrules";
import termservice from "./components/termservice";
const App = () => {
const dispatch = useDispatch()
// to check firebase auth state
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      console.log("user", user);

      currentUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
        })
        .catch((err) => console.log(err));
    }
  });
  // cleanup
  return () => unsubscribe();
}, [dispatch]);

  return (
    
 <>

 <Header />
 <SideDrawer />

  {/* <UserList /> */}
  <ToastContainer />
  <ScrollButton />
  <Switch>
  <Route exact path="/" component={Home}/>  
  
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/register/complete" component={RegisterComplete}/>
      <UserRoute exact path="/seller" component={SellerRegister}/>
      <UserRoute exact path="/rider" component={RiderRegister}/>

      <Route exact path="/seller/:seller" component={SellerShop}/>
      <Route exact path="/forgot/password" component={ForgotPassword}/>
      <UserRoute exact path="/user/history" component={History} />
      <UserRoute exact path="/user/password" component={Password} />
      <UserRoute exact path="/user/wishlist" component={Wishlist} />
      <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      <AdminRoute exact path="/admin/dashboard/super" component={SuperAdminDashboard} />
      <AdminRoute exact path="/admin/category" component={CategoryCreate} />
      <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
          <AdminRoute exact path="/admin/sub" component={SubCreate} />
          <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
          <AdminRoute exact path="/admin/product" component={ProductCreate} />
          <AdminRoute exact path="/admin/products" component={AllProducts} /> 
          <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
         <Route exact path="/product/:slug" component={Product} />
         <Route exact path="/category/:slug" component={CategoryHome} />
         <Route exact path="/sub/:slug" component={SubHome} />
         <Route exact path="/shop" component={Shop} />
         <Route exact path="/cart" component={Cart} />
         <UserRoute exact path="/checkout" component={Checkout} />
         <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
         <AdminRoute exact path="/admin/revenue" component={Revenue} />
         <UserRoute exact path="/payment" component={Payment} />
         <UserRoute exact path="/chat" component={Chat}/>
         <Route exact path="/users" component={UserList} />
         <Route exact path="/comments" component={Comments} />

         <Route exact path="/about-us" component={AboutUs}/>
         <Route exact path="/blog" component={blog}/>
         <Route exact path="/faq" component={faq}/>
         <Route exact path="/plan" component={plan}/>
         <Route exact path="/thank-you" component={thankyou}/>
         <Route exact path="/terms-condition" component={termscon}/>
         <Route exact path="/community-rules" component={comrules}/>
         <Route exact path="/terms-service" component={termservice}/>
  </Switch>

 </>
  );
};

//slug->fetch, grab the specific category
export default App;
