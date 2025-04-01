import React from 'react'
import ListType from '../../../../components/list/listType';

const ListPort = () => {
    return (
        <div className='drak:p-4 dark:bg-gray-900 '>
            <ListType
                title={'Đầu sạc'}
                content1={'Loại đầu sạc'}
                urlGetData={'/port/getAll'}
                urlUpdateStatus={'/port/activeUpdate'}
                titleAlert={'Thông báo'}
                messageAlert={'Bạn có muốn thay đổi trạng thái không?'}
            />
        </div >
    )
}
export default ListPort