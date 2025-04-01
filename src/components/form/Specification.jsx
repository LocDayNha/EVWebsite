import React, { useState, useEffect } from 'react'
import TextInputText from '../textinput/Text'
import Button from '../button/Button'
import Radio from '../dropdown/Radio';

const Specification = (props) => {

    const { onChange, checkValidation, value } = props;

    const dataTypePort =
    [
        { "_id": "wq21e1dq11ed21wd1", "name": "Cây xăng" },
        { "_id": "12e1r1feaf11fasfd", "name": "Cây Mice" }
    ]

    const [openViewSpecification, setOpenViewSpecification] = useState(false);

    return (
        <div className="w-full mt-1 mb-1 flex-col items-center">
            <div className='w-full flex justify-between items-center'>
                <span className="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-white">Danh sách trụ sạc</span>
                <div className='' onClick={() => setOpenViewSpecification(true)}>
                    <span className="text-green-700 text-sm dark:text-white">Thêm trụ sạc</span>
                </div>
            </div>

            {openViewSpecification ?
                <div className="fixed inset-0 flex items-center justify-center bg-gray-200/10 backdrop-blur-[2px] p-5">

                    <div className='w-160 p-3 rounded-2xl bg-white'>
                        <div className='w-full flex justify-between'>
                            <div className='w-1/4'>
                                <TextInputText title='Công suất (kw)' placeholder='Nhập số kw' />
                            </div>
                            <div className='w-1/4'>
                                <TextInputText title='Số lượng cổng sạc' placeholder='Nhập số cổng' />
                            </div>
                            <div className='w-1/4'>
                                <TextInputText title='Giá tiền (vnđ/kwh)' placeholder='Nhập giá tiền' />
                            </div>
                        </div>

                        <div className='w-full flex justify-between'>
                            <div className='w-2/5'>
                                <Radio data={dataTypePort} title='Cổng sạc' />
                            </div>
                            <div className='w-2/5'>
                                <Radio data={dataTypePort} title='Loại phương tiện' />
                            </div>
                        </div>

                        <Button title='Xác nhận' />

                    </div>

                </div>
                :
                null
            }

            <span className="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-white">Chưa có danh sách trụ sạc</span>
        </div>
    )
}

export default Specification