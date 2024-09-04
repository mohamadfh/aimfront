import React from 'react';

const NotFound = () => {
    return (
        <div style={{display: 'flex',alignItems: 'center' , height:"500px"}}>
            <img style={{width: "60%" , height: "60%"}} src={require("../../Assets/Images/404-page-not-found.svg").default} alt={'404'}  />
            <p>صفحه مورد نظرررررررررر پیدا نشد</p>

        </div>
    );
};

export default NotFound;
