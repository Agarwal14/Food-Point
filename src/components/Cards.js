import React, { useState,useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
export default function Cards(props) {

let options = props.options;
let priceOptions = Object.keys(options);
let data = useCart();

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
 let foodItem = props.item;
 const dispatch = useDispatchCart();
 const handleClick = () => {
  if (!localStorage.getItem("authToken")) {
    navigate("/login")
  }
}
const handleQty = (e) => {
  setQty(e.target.value);
}
 const handleOptions = (e) => {
  setSize(e.target.value);
}
const handleAddToCart = async () => {
   let food = []
   for (const item of data) {
     if (item.id === foodItem._id) {
       food = item;

      break;
    }
   }
  
  // console.log(food)
  // console.log(new Date())
   if (food !== []) {
     if (food.size === size) {
      await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
      return
     }
    else if (food.size !== size) {
      await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
      console.log("Size different so simply ADD one more to the list")
      return
    }
    return
  }
 await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
//  console.log(data);
}
useEffect(() => {
  setSize(priceRef.current.value)
}, [])
let finalPrice = qty * parseInt(options[size]); 
  return (
    <div>
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }}/>
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          
          <div className="container w-100 p-0"style={{ height: "38px" }}>
            <select className="m-2 h-100 bg-info rounded"style={{ select: "#FF0000" }} onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 bg-info rounded"  style={{ select: "#FF0000" }} ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map((i)=>{
                return <option key={i} value={i}>{i}</option>
              })}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>
        </div>
        <hr></hr>
          <button className={`btn btn-info justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
      </div>
    </div>
    </div>
  );
}
