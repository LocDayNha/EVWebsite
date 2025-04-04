import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { AlignCenter } from "lucide-react";

const libraries = ["places"];

const center = { lat: 21.0285, lng: 105.8542 };

const MyMap = (props) => {

  const { onChange, checkValidation, checkMap, setCheckMap, value, title, setLocation, setLat, setLng } = props;
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyADJCV_7LiFmdeMd9TLZe_pLKn8qTDlank",
    libraries,
  });
  if (!isLoaded) return <p>Đang tải bản đồ...</p>;

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setSelectedLocation({ lat, lng, address: "Đang tìm địa chỉ..." });
    setLat(lat);
    setLng(lng);

    // Gọi Nominatim API để lấy địa chỉ từ tọa độ
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedLocation((prev) => ({
          ...prev,
          address: data.display_name || "Không tìm thấy địa chỉ",
        }));
        setLocation(data.display_name);
      })
      .catch(() => {
        setSelectedLocation((prev) => ({
          ...prev,
          address: "Lỗi khi lấy địa chỉ",
        }));
      });
  };

  return (
    <div className="w-full mt-1">
      <div className="w-full mt-1">
        <span className="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-white">{title}</span>
        <div className="mt-1">
          <div
            className={`flex items-center rounded-md bg-white dark:bg-gray-600 pl-3 outline-1 -outline-offset-1 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 ${checkValidation === true ? "outline-red-500" : "outline-gray-300"} has-[input:focus-within]:outline-indigo-600"`}
          >
            <div
              onClick={onChange}
              className="block w-full grow py-1.5 pr-3 pl-1 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white focus:outline-none sm:text-sm/6"
            >
              {value}
            </div>
          </div>
        </div>
      </div>
      {checkMap ?

        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-500/10 backdrop-blur-[2px] p-5">
          <div className="w-full max-w-[500px]">
            <div className="items-right justify-right">
              <button className='hover:text-red-500' onClick={() => setCheckMap(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "500px",
              }}
              center={center}
              zoom={13}
              onClick={handleMapClick}
            >
              {selectedLocation && (
                <Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} />
              )}
            </GoogleMap>
          </div>

          {selectedLocation && (
            <div className="mt-4 p-2 bg-gray-200 rounded max-w-[500px] w-full">
              <p><strong>Tọa độ:</strong> {selectedLocation.lat}, {selectedLocation.lng}</p>
              <p><strong>Địa chỉ:</strong> {selectedLocation.address}</p>
            </div>
          )}
        </div>



        :
        null
      }


    </div>
  );
};

const containerStyle = { width: "500px", height: "500px", AlignCenter: "center" };

export default MyMap;
