import React, { useState } from 'react'
import ListType from '../../../../components/list/listType';

const ListVehicle = () => {
    const [checkType, setCheckType] = useState(2);
    return (
        <div className='drak:p-4 dark:bg-gray-900 '>
            <ListType
                checkType={checkType}
                urlUpdateData={'/vehicle/update'}
                title={'Vị trí đặt trạm sạc'}
                content1={'Tên địa chỉ'}
                urlGetData={'/vehicle/getAll'}
                urlUpdateStatus={'/vehicle/activeUpdate'}
                titleAlert={'Thông báo'}
                messageAlert={'Bạn có muốn thay đổi trạng thái không?'}
            />
        </div >
    );
}
export default ListVehicle