import React from 'react'
import ListType from '../../../../components/list/listType';

const ListAddress = () => {
    return (
        <div className='drak:p-4 dark:bg-gray-900 '>
            <ListType
                urlUpdateData='location/update'
                title={'Vị trí đặt trạm sạc'}
                content1={'Tên địa chỉ'}
                urlGetData={'/location/getAll'}
                urlUpdateStatus={'/location/activeUpdate'}
                titleAlert={'Thông báo'}
                messageAlert={'Bạn có muốn thay đổi trạng thái không?'}
            />
        </div >
    );
}
export default ListAddress