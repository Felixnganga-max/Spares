import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(ShopContext);

  console.log("This is the token", token);
  

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/user-orders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer token
          },
        }
      );
      setData(response.data.data);
      console.log("The Users data information", response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      console.log("No token provided, cannot fetch orders.");
    }
  }, [token]);

  return <></>;
};

export default MyOrders;
