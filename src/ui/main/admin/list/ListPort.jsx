import React, { useState } from 'react'
import ListType from '../../../../components/list/listType';

const ListPort = () => {
    const [checkType, setCheckType] = useState(1);
    return (
        <div className='drak:p-4 dark:bg-gray-900 '>
            <ListType
                urlUpdateData={'/port/update'}
                checkType={checkType}
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