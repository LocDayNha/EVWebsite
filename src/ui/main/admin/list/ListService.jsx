import React from 'react'
import ListType from '../../../../components/list/listType';

const ListService = () => {
    return (
        <div className='drak:p-4 dark:bg-gray-900 '>
            <ListType
                title={'Dịch vụ'}
                content1={'Tên dịch vụ'}
                urlGetData={'/services/getAll'}
                urlUpdateStatus={'/services/activeUpdate'}
                titleAlert={'Thông báo'}
                messageAlert={'Bạn có muốn thay đổi trạng thái không?'}
            />
        </div >
    )
}
export default ListService