import React, { useState, useRef, useEffect } from "react";
import { GoogleMap,  Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import carData from "./carData.json";
import './styles/searchBar.css';

export default function DropdownSearch({options, id, label, prompt, value, onChange}) {

    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const [query, setQuery] = useState("");
    useEffect(() => {
        document.addEventListener("click", close)
        return () => document.removeEventListener("click", close);
    }, [])

    function close(e) {
        setOpen(e && e.target === ref.current);
    }

    function filter(options) {
        return options.filter((item) => item[label].toLowerCase().indexOf(query.toLowerCase()) > -1);
    }

    function displayValue() {
        if(query.length > 0) return query;
        if(value) return value[label];
        return "";
    }

    return (
        <div className='dd'>
            <div className='control' onClick={() => setOpen((prev) => !prev)}>
                <div className='selectedVal'>
                    <input type="text" ref={ref} placeholder={value ? value[label] : prompt} value={displayValue()} onChange={e => { setQuery(e.target.value); onChange(null);}} onClick={() => setOpen((prev) => !prev)}/>
                </div>
                <div className={`arrow ${open ? "open" : null}`}/>
            </div>
            <div className={`options ${open ? "open" : null}`}>
                {
                    filter(options).map((item) => (
                        <div key={item[id]} className={`option ${value === item ? "selected": null}`} onClick={() => {setQuery(""); onChange(item); setOpen(false);}}>{item[label]}</div>
                    ))
                }
            </div>
        </div>
    )
}   