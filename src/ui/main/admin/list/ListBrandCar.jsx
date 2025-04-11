import React from 'react'
import ListType from '../../../../components/list/listType';

const ListBrandCar = () => {
    return (
        <div className='drak:p-4 dark:bg-gray-900 '>
            <ListType
                urlUpdateData='brandCar/update'
                title={'Hãng xe'}
                content1={'Tên hãng xe'}
                urlGetData={'/brandcar/getAll'}
                urlUpdateStatus={'/brandcar/activeUpdate'}
                titleAlert={'Thông báo'}
                messageAlert={'Bạn có muốn thay đổi trạng thái không?'}
            />
        </div >
    );
}
export default ListBrandCar