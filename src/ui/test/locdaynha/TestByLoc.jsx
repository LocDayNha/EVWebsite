import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import imgLocation from "../../../assets/image/main/map/IconLoaction.png";
import listStationEV from "./ListTest";

const blackAndWhiteStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121" // Màu nền chính của bản đồ (xám tối)
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off" // Ẩn các biểu tượng như biểu tượng của các công trình
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ffffff" // Màu chữ là trắng
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121" // Màu nền của chữ (xám tối)
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#757575" // Màu sắc các khu vực hành chính
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121" // Màu của các đường phố
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off" // Ẩn biểu tượng trên đường phố
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ffffff" // Màu chữ trên đường phố
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000" // Màu nước (biển, hồ) là đen
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ffffff" // Màu chữ trên vùng nước
      }
    ]
  }
];

const containerStyle = {
  width: "100vw",
  height: "100vh",
  borderRadius: "80px",
};

const mapOptions = {
  styles: blackAndWhiteStyle,
  fullscreenControl: false,
};

const defaultCenter = {
  lat: 16.4637,
  lng: 107.5909,
};

const TestByLoc = () => {
  const [center, setCenter] = useState(defaultCenter);
  const [dataItem, setDataItem] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  }, []);

  return (
    <div className="flex">
      <div className="w-3/10"></div>
      <div className="flex justify-center items-center w-7/10">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            options={mapOptions}
            zoom={10}
            >
            <MarkerF
              position={center}
              icon={{
                url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                           <circle cx="12" cy="12" r="10" fill="#4285F4"/>
                           <circle cx="12" cy="12" r="4" fill="white"/>
                           <circle cx="12" cy="12" r="10" fill="none" stroke="white" stroke-width="2" opacity="0.5"/>
                       </svg>
                  `),
                scaledSize: { width: 25, height: 25 },
              }}
            />

            {listStationEV.map(station => (
              <div key={station._id}>
                <MarkerF
                  position={{
                    lat: parseFloat(station.lat),
                    lng: parseFloat(station.lng),
                  }}
                  title={station.name}
                  icon={{
                    url: imgLocation,
                    scaledSize: { width: 35, height: 35 },
                  }}
                  onClick={() => setDataItem(station)}
                />
              </div>
            ))}
          </GoogleMap>

          {dataItem && (
            <div className="absolute top-10 left-10 bg-white p-4 shadow-lg rounded-4xl w-100">
              <div className="flex">
                <img src="https://evbattery.vn/wp-content/uploads/2023/05/tram-sac-xe-dien-1.jpg" className="w-100 h-50 rounded-t-4xl"></img>
              </div>
              <h5 className="text-lg">{dataItem.name}</h5>
              <p className="text-sm">{dataItem.address}</p>
              <p className="text-sm">{dataItem.location}</p>
              <h3 className="text-gray-600">Trụ sạc</h3>
              <div className="ml-2">
                <div className="flex">
                  <p className="text-sm">✧ CCS2 13kw có 3 cổng 13.000 đ/kwh</p>
                </div>
                <div className="flex">
                  <p className="text-sm">✧ CCS1 10kw có 3 cổng 3.000 đ/kwh</p>
                </div>
              </div>
              <h3 className="text-gray-600">Dịch vụ</h3>
              <div className="ml-2 flex justify-around">
                <div className="flex items-center mt-1">
                  <img src="https://cdn-icons-png.flaticon.com/512/2168/2168395.png" className="w-6 h-6"></img>
                  <p className="text-sm ml-2">Đỗ xe</p>
                </div>
                <div className="flex items-center mt-1">
                  <img src="https://cdn-icons-png.flaticon.com/512/6532/6532060.png" className="w-6 h-6"></img>
                  <p className="text-sm ml-2">Wifi</p>
                </div>
                <div className="flex items-center mt-1">
                  <img src="https://cdn-icons-png.flaticon.com/512/3354/3354187.png" className="w-6 h-6"></img>
                  <p className="text-sm ml-2">Cà phê</p>
                </div>
              </div>
              <div className="ml-2 flex justify-around">
                <div className="flex items-center mt-1">
                  <img src="https://cdn-icons-png.flaticon.com/512/2168/2168395.png" className="w-6 h-6"></img>
                  <p className="text-sm ml-2">Đỗ xe</p>
                </div>
                <div className="flex items-center mt-1">
                  <img src="https://cdn-icons-png.flaticon.com/512/6532/6532060.png" className="w-6 h-6"></img>
                  <p className="text-sm ml-2">Wifi</p>
                </div>
                <div className="flex items-center mt-1">
                  <img src="https://cdn-icons-png.flaticon.com/512/3354/3354187.png" className="w-6 h-6"></img>
                  <p className="text-sm ml-2">Cà phê</p>
                </div>
              </div>
              <h3 className="text-gray-600">Thông tin thêm</h3>
              <div className="ml-2">
                <p className="text-sm">• Thời gian: 06:00 - 20:00</p>
                <p className="text-sm">• Công cộng</p>
                <p className="text-sm">• Đỗ xe tính phí</p>
              </div>
              {/* Thêm các thông tin khác nếu cần */}
            </div>
          )}
        </LoadScript>
      </div>
    </div>
  );
};

export default TestByLoc;
