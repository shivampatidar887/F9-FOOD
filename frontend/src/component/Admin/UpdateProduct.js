import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Header/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import LoginSignUp from "../User/LoginSignUp";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();
  const { error, product } = useSelector((state) => state.productDetails);
  const {loading,error:updateError,isUpdated} = useSelector((state) => state.product);
  const {isAuthenticated,user,loading:mloading} = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const categories = [
    "Pizza",
    "Maggi",
    "Burger",
    "Sandwich",
    "Fries",
    "Pasta",
  ];
  useEffect(() => {
    if (typeof isAuthenticated==="undefined"&&mloading===false){
      navigate("/login")
  }
  if(isAuthenticated===false&&mloading===false){
    navigate("/login")
  }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, alert, error, id]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      // setImage(product.image.url);
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    id,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("image", image);
    dispatch(updateProduct(id, myForm));
  };

  const updateProductImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      {isAuthenticated===true&&user.role==="admin"?(<Fragment>
      <MetaData title="Update Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="updateProfileImage">
              <img src={imagePreview} alt="Image Preview" />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={updateProductImageChange}
                multiple
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>):(<LoginSignUp/>)}
    </Fragment>
  );
};

export default UpdateProduct;
