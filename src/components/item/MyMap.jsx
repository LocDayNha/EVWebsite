import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const libraries = ["places"]; 
const containerStyle = { width: "100%", height: "500px" };
const center = { lat: 21.0285, lng: 105.8542 }; 

const MyMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyADJCV_7LiFmdeMd9TLZe_pLKn8qTDlank",
    libraries,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  if (!isLoaded) return <p>Đang tải bản đồ...</p>;

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setSelectedLocation({ lat, lng, address: "Đang tìm địa chỉ..." });

    // Gọi Nominatim API để lấy địa chỉ từ tọa độ
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedLocation((prev) => ({
          ...prev,
          address: data.display_name || "Không tìm thấy địa chỉ",
        }));
      })
      .catch(() => {
        setSelectedLocation((prev) => ({
          ...prev,
          address: "Lỗi khi lấy địa chỉ",
        }));
      });
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={handleMapClick}
      >
        {selectedLocation && <Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} />}
      </GoogleMap>

      {selectedLocation && (
        <div className="mt-4 p-2 bg-gray-200 rounded">
          <p><strong>Tọa độ:</strong> {selectedLocation.lat}, {selectedLocation.lng}</p>
          <p><strong>Địa chỉ:</strong> {selectedLocation.address}</p>
        </div>
      )}
    </div>
  );
};

export default MyMap;
