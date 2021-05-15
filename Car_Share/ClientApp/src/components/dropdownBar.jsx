import React, { useState, useRef, useEffect } from "react";
import carData from './carData.json';

const DropdownBar = () => {

    const uniqueType = getUnique(carData, 'type');
    
    function getUnique(arr, comp) {
        const unique = arr
        .map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e])
        .map(e => arr[e]);

        return unique;
    }
    
    return (
        <select>
            {
                uniqueType.map(item => ( 
                <option key={item.id}>
                {item.type}
                </option>
            ))}
        </select>
      )
}
export default DropdownBar;