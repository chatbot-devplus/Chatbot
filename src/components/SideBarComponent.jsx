import React from 'react'
import {

    Link,
  } from 'react-router-dom';
import HistoryItem from './HistoryItem';
const SideBarComponent = () => {
  return (
    <div>
        <div className="" style={{backgroundColor:"#ccc"}}>
            <div className="">
            My Sidebar
            </div>
            <nav className="">
                <ul>
                    <HistoryItem/>
                    
                </ul>
            </nav>
        </div>
  </div>
  )
}

export default SideBarComponent