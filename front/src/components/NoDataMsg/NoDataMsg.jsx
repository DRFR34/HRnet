import React from 'react'

import './NoDataMsg.scss';

export default function NoDataMsg( { searchResult, searchValue} ) {

    if (searchResult > 0) return null;

    if ((searchValue ==='') && (searchResult === 0)) {
  
        return (
        <div className='MsgWrapper'>

        <h1 className='MsgWrapper__title'>No data to display</h1>
        <p className='MsgWrapper__text'>The employees data is empty.</p>

    </div>)
    };
    if (searchValue !=='' && searchResult === 0) {
       
    return (
        <div className='MsgWrapper'>

            <h1 className='MsgWrapper__title'>No result found</h1>
            <p className='MsgWrapper__text'>There is no data matching your search, please try another request.</p>

        </div>
    )
}
}
