import React, { useState } from "react";
import styled from "styled-components";
import OrderDetails from "./admin_user_orders";

function AdminOrderContainer() {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-1 col-lg-1">
        </div>
        
        <div className="col-12 col-md-10 col-lg-10">
        <OrderDetails />
        </div>
        <div className="col-12 col-md-1 col-lg-1">
        </div>
      </div>
    </div>
  );
}

export default AdminOrderContainer;

