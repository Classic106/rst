import React, { useState, useEffect } from 'react';
import StickyBox from "react-sticky-box";

const AAA = ()=>{

return (<div style={{ height: 80, overflow: 'auto' }}>
  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
    <StickyBox style={{ border: '3px solid green' }}>Sidebar</StickyBox>
    <div style={{ height: 150, border: '3px solid blue' }}>Main Content</div>
  </div>
</div>)
}
export default AAA;
