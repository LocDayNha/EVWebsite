
import React, { useEffect, useState } from 'react'
import Station from '../../../components/list/station'
import AxiosInstance from '../../../components/util/AxiosInstance';

const ListStation = () => {

  const [dataStation, setDataStation] = useState([]);
  const [dataStationId, setDataStationId] = useState([]);


  const getDataStation = async () => {
    try {
      const dataStation = await AxiosInstance().get('/station/get');
      if (dataStation.data && dataStation.data.length > 0) {
        setDataStation(dataStation.data);
      } else {
        setDataStation([]);
        console.log('Không tìm thấy dữ liệu từ /station/get');
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu station:', error);
    }
  };

  const getDataStationByID = async (id) => {
    try {
      const dataStation = await AxiosInstance().post('/station/getById', { id: id });
      if (dataStation.data && dataStation.data.length > 0) {
        setDataStationId(dataStation.data);
      } else {
        setDataStation([]);
        console.log('Không tìm thấy dữ liệu từ /station/get');
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu station:', error);
    }
  };


  useEffect(() => {
    getDataStation();
  }, []);
  // console.log('dataStation:', dataStation);

  return (
    <div>
      <div>
        <Station data={dataStation} />

      </div>
    </div>
  )
}

export default ListStation
