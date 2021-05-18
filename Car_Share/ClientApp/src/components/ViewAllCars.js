import React, { Component, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './styles/ViewAllCars.css';
import BookingHistoryElement from './BookingHistoryElement';
import SideBar from './SideBar';
import SideBarMobile from './SideBarMobile';
import CarDetailsElement from './CarDetailsElement';

function ViewAllCars () {

    const [carDetails, setCarDetails] = useState([
        {
            id: 1,
            rego: 'dummy_rego1',
            make: 'dummy_make1',
            model: 'dummy_model1',
            body: 'dummy_body1',
            colour: 'dummy_colour'
        },
        {
            id: 2,
            rego: 'dummy_rego2',
            make: 'dummy_make2',
            model: 'dummy_model2',
            body: 'dummy_body2',
            colour: 'dummy_colour1'
        },
        {
            id: 3,
            rego: 'dummy_rego3',
            make: 'dummy_make3',
            model: 'dummy_model3',
            body: 'dummy_body3',
            colour: 'dummy_colour'
        },
        {
            id: 4,
            rego: 'dummy_rego3',
            make: 'dummy_make3',
            model: 'dummy_model3',
            body: 'dummy_body3',
            colour: 'dummy_colour'
        },
        {
            id: 5,
            rego: 'dummy_rego2',
            make: 'dummy_make2',
            model: 'dummy_model2',
            body: 'dummy_body2',
            colour: 'dummy_colour1'
        },
    ])

    const [make, setMake] = useState(0)
    const [model, setModel] = useState(0)
    const [body, setBody] = useState(0)
    const [colour, setColour] = useState(0)

    const [displayCars, setDisplayCars] = useState(carDetails)

    const populateMake = [...new Set(carDetails.map(function (item) { return item["make"]; }))];
    const populateModel = [...new Set(carDetails.map(function (item) { return item["model"]; }))];
    const populateBody = [...new Set(carDetails.map(function (item) { return item["body"]; }))];
    const populateColour = [...new Set(carDetails.map(function (item) { return item["colour"]; }))];

    const [sortDown, setSortDown] = useState(true)

    const sort = () => {
        const copy = [...displayCars]
        if (sortDown) {
            copy.sort(function (a, b) {
                return b.id - a.id
            })
        } else {
            copy.sort(function (a, b) {
                return a.id - b.id
            })
        }
        setSortDown(!sortDown);
        setDisplayCars(copy);
    }


    const onClick = () => {
        if (make != '' && model != '' && body != '' && colour != '') {
            setDisplayCars(carDetails.filter((car) => car.make == make && car.model == model && car.body == body && car.colour == colour))
        } else if (make != '') {
            setDisplayCars(carDetails.filter((car) => car.make == make))
        } else if (model != '') {
            setDisplayCars(carDetails.filter((car) => car.model == model))
        } else if (body != ''){
            setDisplayCars(carDetails.filter((car) => car.body == body))
        }
        else if (colour != ''){
            setDisplayCars(carDetails.filter((car) => car.colour == colour))
        }
        else if(make != '' && model != ''){
            setDisplayCars(carDetails.filter((car) => car.make == make && car.model == model))
        }
        else if(make != '' && body != ''){
            setDisplayCars(carDetails.filter((car) => car.make == make && car.body == body))
        }
        else if(make != '' && colour != ''){
            setDisplayCars(carDetails.filter((car) => car.make == make && car.colour == colour))
        }
        else if(model != '' && body != ''){
            setDisplayCars(carDetails.filter((car) => car.model == model && car.body == body))
        }
        else if(model != '' && colour != ''){
            setDisplayCars(carDetails.filter((car) => car.model == model && car.colour == colour))
        }
        else if(body != '' && colour != ''){
            setDisplayCars(carDetails.filter((car) => car.body == body && car.colour == colour))
        }
        else if(make != '' && model != '' && body != ''){
            setDisplayCars(carDetails.filter((car) => car.make == make && car.model == model && car.body == car.body))
        }
        else if(make != '' && body != '' && colour != ''){
            setDisplayCars(carDetails.filter((car) => car.make == make && car.body == body && car.body == car.body))
        }
        else if(make != '' && model != '' && colour != ''){
            setDisplayCars(carDetails.filter((car) => car.make == make && car.model == model && car.colour == car.colour))
        }
        else if(model != '' && body != '' && colour != ''){
            setDisplayCars(carDetails.filter((car) => car.model == model && car.body == body && car.colour == car.colour))
        }
        else {
            setDisplayCars(carDetails)
        }
    }

    const viewportContext = React.createContext({});

    const ViewportProvider = ({ children }) => {
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);
    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return (
        <viewportContext.Provider value={{ width, height }}>
        {children}
        </viewportContext.Provider>
    );
    };

    const useViewport = () => {
    const { width, height } = React.useContext(viewportContext);
    return { width, height };
    };

    const WhichSideBar = () => {
    const { width } = useViewport();
    const breakpoint = 1200;

    return width < breakpoint ? <SideBarMobile /> : <SideBar />;
    };

    return(
        <ViewportProvider>
            <div className = "ViewAllCarsWrapper">
                <WhichSideBar/>
                <div className = "viewAllCars">
                    <div className = "rowBooking">
                        <div className = "bookingTitle">View All Cars</div>
                        <div className = "pageTitle">
                            <div className = "blueT">Car</div>
                            <div className = "yellowT">Share</div>
                            <div className = "blueT">Scheme</div>
                        </div>
                    </div>
                    <div className = "allCars">
                        <div className='filterSection'>
                            <button className = "orderBtn hvr-sweep-to-right" onClick={() => sort()}>Asc/Desc</button>
                            <select className = "filterBox" onChange={(e) => setMake(e.target.value)}>
                                <option value="" >Filter by Make</option>
                                {populateMake.map((loc) => (
                                    <option key={loc} value={loc} >{loc}</option>
                                ))
                                }
                            </select>
                            <select className = "filterBox" onChange={(e) => setModel(e.target.value)}>
                                <option value="" >Filter by Model</option>
                                {populateModel.map((car) => (
                                    <option key={car} value={car} >{car}</option>
                                ))
                                }
                            </select>
                            <select className = "filterBox" onChange={(e) => setBody(e.target.value)}>
                                <option value="" >Filter by Body</option>
                                {populateBody.map((car) => (
                                    <option key={car} value={car} >{car}</option>
                                ))
                                }
                            </select>
                            <select className = "filterBox" onChange={(e) => setColour(e.target.value)}>
                                <option value="" >Filter by Colour</option>
                                {populateColour.map((car) => (
                                    <option key={car} value={car} >{car}</option>
                                ))
                                }
                            </select>
                            <button className = "filterBtn hvr-sweep-to-right" onClick={() => onClick()}>Filter</button>
                        </div>

                        <div className='displaySection'>
                            {displayCars.length > 0 ?
                                displayCars.map((car) => (
                                    <CarDetailsElement className='history_element' key={car.id} element={car} />))
                                : <h5 className='history_element' style={{ textAlign: 'center', background: '#f4f4f4'}} >No Available Slots found!</h5>
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        </ViewportProvider>
    )
}



export default ViewAllCars;