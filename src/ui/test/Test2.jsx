import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Filter from "../../components/list/filter";
import TimePicker from "../../components/dropdown/TimePicker";
import Time from "../../components/item/Time";
import TimeStation from "../../components/item/Time";

const libraries = ["places"];
const containerStyle = { width: "500px", height: "500px" };
const center = { lat: 21.0285, lng: 105.8542 };

const MyMap = () => {

    const [time, setTime] = useState(null);
    return (
        <div className="flex">
            <TimeStation />
        </div>


    );
};

export default MyMap;
