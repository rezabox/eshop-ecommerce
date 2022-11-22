import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import style from "./AddProduct.module.scss";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronice" },
  { id: 3, name: "Fashing" },
  { id: 4, name: "Phone" },
];
const initialState = {
  name: "",
  price: 0,
  imageURL: "",
  category: "",
  brand: "",
  desc: "",
};

const AddProduct = () => {
  const [product, setProduct] = useState({
    ...initialState,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e)=>{
    const file = e.target.files[0];
    // console.log(file);
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) =>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      }, 
      () =>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({...product, imageURL: downloadURL});
          toast.success("Image uploaded successfully");
        }); 
      }  
    )
  }
  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const docRef = addDoc(collection(db, "products"), {
         name:product.name,
         imageURL:product.imageURL,
         price: Number(product.price),
         category:product.category,
         brand:product.brand,
         desc:product.desc,
         createdAt: Timestamp.now().toDate(),
      });
       setIsLoading(false);
       setUploadProgress(0);
       setProduct({ ...initialState })
       toast.success("Product uploaded succesfully");
       navigate('/admin/all-products');
    }catch (error){
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <>
     {isLoading && <Loader/>}
    <div className={style.product}>
      <h1>Add New Product</h1>
      <Card cardClass={style.card}>
        <form onSubmit={addProduct}>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product Name"
            name="name"
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />
          <label>Product Image</label>
          <Card className={style.group}>
            {uploadProgress === 0 ? null : (
              <div className={style.progress}>
                <div className={style["progress-bar"]}
                 style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress < 100
                    ? `Uploading ${uploadProgress}`
                    : `Uploading Complete ${uploadProgress}%`}
                </div>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              placeholder="Product Image"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            {product.imageURL === "" ? null : (
              <input
                type="text"
                placeholder="Image URL"
                name="imageURL"
                value={product.imageURL}
                disabled
              />
            )}
          </Card>
          <label>Product price:</label>
          <input
            type="number"
            placeholder="Product price"
            name="price"
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />
          <label>Product Category:</label>
          <select
            required
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="" disabled>
              -- choose product category --
            </option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              );
            })}
          </select>
          <label>Product Compony/Brand:</label>
          <input
            type="text"
            placeholder="Product brand"
            name="brand"
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />
          <label>Product Description</label>
          <textarea
            required
            name="desc"
            value={product.desc}
            cols="30"
            rows="10"
            onChange={(e) => handleInputChange(e)}
          ></textarea>
          <button className="--btn --btn-primary">Save Product</button>
        </form>
      </Card>
    </div>
    </>
  );
};

export default AddProduct;
