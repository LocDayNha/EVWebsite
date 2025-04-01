import React from 'react'
import ListType from '../../../../components/list/listType';

const ListVehicle = () => {
    return (
        <div className='drak:p-4 dark:bg-gray-900 '>
            <ListType
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