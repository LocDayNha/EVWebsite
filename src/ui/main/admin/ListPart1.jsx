import React from 'react'
import ListAddress from './list/ListAddress'
import ListBrandCar from './list/ListBrandCar'
import ListBrandStation from './list/ListBrandStation'

const ListPart1 = () => {
    return (
        <div className='flex flex-row size-full'>
            <ListAddress />
            <ListBrandCar />
            <ListBrandStation/>
        </div>
    )
}

export default ListPart1