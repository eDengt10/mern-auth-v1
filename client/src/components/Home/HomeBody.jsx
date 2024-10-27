import React from "react";
import { Home } from 'lucide-react';
import "../../styles/Home/HomeBody.scss";


const  HomeBody = () => {

  return (
    <div className="home-body">
      <div className="home-body__card">
        <div className="home-body__card-content">
          <div className="home-body__header">
            <h1 className="home-body__header-title">
              <Home className="home-body__header-icon" aria-hidden="true" />
              Welcome to home
            </h1>
          </div>
          <div className="home-body__content">
            <p className="home-body__content-text">
              Have a good day
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBody;
