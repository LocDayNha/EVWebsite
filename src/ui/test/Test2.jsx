import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Filter from "../../components/list/filter";

const libraries = ["places"];
const containerStyle = { width: "500px", height: "500px" };
const center = { lat: 21.0285, lng: 105.8542 };

const MyMap = () => {


    return (
        <div className="flex">
            <div className="w-3/10">
                <Filter />
            </div>
            <div className="w-7/10">
                <div className="w-full h-full bg-yellow-500">
                Đây là map
                </div>
            </div>
        </div>


    );
};

export default MyMap;
