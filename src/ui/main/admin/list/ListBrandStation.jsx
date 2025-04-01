import React from 'react'
import ListType from '../../../../components/list/listType';

const ListBrandStation = () => {

    return (
        <div className='drak:p-4 dark:bg-gray-900 '>
            <ListType
                title={'Hãng trạm sạc'}
                content1={'Tên trạm sạc'}
                urlGetData={'/brand/getAll'}
                urlUpdateStatus={'/brand/activeUpdate'}
                titleAlert={'Thông báo'}
                messageAlert={'Bạn có muốn thay đổi trạng thái không?'}
            />
        </div >
    );
}
export default ListBrandStation