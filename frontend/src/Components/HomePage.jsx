import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../constants/constants";

function HomePage() {
  const [products, setProducts] = useState([]);
    useEffect(() => {
        getProduct();
    }, [])
    const getProduct = () => {
      axios({
          method: 'get',
          url: `${baseUrl}get-products`,
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('usertoken'))}`
          }
      }).then((data) =>
          //console.log(data.data,"dataaaaaaaaaa")
          setProducts(data.data)
      )

  }

  return (
    <div className="container m-5">
      <h1>User Home</h1>
      <div className="card" style={{width: "18rem"}}>
      <img src={products.image} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{products.name}</h5>
          <p className="card-text">
            Category : {products.category}
          </p>
          <p>
            Company : {products.company}
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default HomePage;
