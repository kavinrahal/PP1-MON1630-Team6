import React, { useEffect, useState } from 'react';
import './styles/ViewAllCars.css';
import CarDetailsElement from './CarDetailsElement';
import { ViewportProvider, WhichSideBar } from './ViewPort_Helper';

function ViewAllCars() {
    // const [carDetails, setCarDetails] = useState([
    //     {
    //         carID: 1,
    //         rego: 'dummy_rego1',
    //         make: 'dummy_make1',
    //         model: 'dummy_model1',
    //         bodyType: 'dummy_body1',
    //         colour: 'dummy_colour'
    //     },
    //     {
    //         carID: 2,
    //         rego: 'dummy_rego2',
    //         make: 'dummy_make2',
    //         model: 'dummy_model2',
    //         bodyType: 'dummy_body2',
    //         colour: 'dummy_colour1'
    //     },
    //     {
    //         carID: 3,
    //         rego: 'dummy_rego3',
    //         make: 'dummy_make3',
    //         model: 'dummy_model3',
    //         bodyType: 'dummy_body3',
    //         colour: 'dummy_colour'
    //     },
    //     {
    //         carID: 4,
    //         rego: 'dummy_rego3',
    //         make: 'dummy_make3',
    //         model: 'dummy_model3',
    //         bodyType: 'dummy_body3',
    //         colour: 'dummy_colour'
    //     },
    //     {
    //         carID: 5,
    //         rego: 'dummy_rego2',
    //         make: 'dummy_make2',
    //         model: 'dummy_model2',
    //         bodyType: 'dummy_body2',
    //         colour: 'dummy_colour1'
    //     },
    // ])


    const [loading, setLoading] = useState(true)
    const [carDetails, setCarDetails] = useState([])

    useEffect(() => {
        fetch("https://localhost:5001/api/car")
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then(data => {
                setCarDetails(data)
                setDisplayCars(data)
            })
            .catch(error => {
                console.log(error)
            }).finally(() => {
                setLoading(false)
            })

    }, [])


    const [make, setMake] = useState(0)
    const [model, setModel] = useState(0)
    const [bodyType, setBodyType] = useState(0)
    const [colour, setColour] = useState(0)

    const [displayCars, setDisplayCars] = useState(carDetails)

    const populateMake = [...new Set(carDetails.map(function (item) { return item["make"]; }))];
    const populateModel = [...new Set(carDetails.map(function (item) { return item["model"]; }))];
    const populateBody = [...new Set(carDetails.map(function (item) { return item["bodyType"]; }))];
    const populateColour = [...new Set(carDetails.map(function (item) { return item["colour"]; }))];

    const [sortDown, setSortDown] = useState(true)

    const sort = () => {
        const copy = [...displayCars]
        if (sortDown) {
            copy.sort(function (a, b) {
                return b.carID - a.carID
            })
        } else {
            copy.sort(function (a, b) {
                return a.carID - b.carID
            })
        }
        setSortDown(!sortDown);
        setDisplayCars(copy);
    }

    const clear = () => {
        setModel("")
        setMake("")
        setColour("")
        setBodyType("")
        setDisplayCars(carDetails)
    }


    const onClick = () => {
        if (make != '' && model != '' && bodyType != '' && colour != '') {
            setDisplayCars(carDetails.filter((car) => car.make == make && car.model == model && car.bodyType == bodyType && car.colour == colour))
        } else if (make != '') {
            setDisplayCars(carDetails.filter((car) => car.make == make))
        } else if (model != '') {
            setDisplayCars(carDetails.filter((car) => car.model == model))
        } else if (bodyType != '') {
            setDisplayCars(carDetails.filter((car) => car.bodyType == bodyType))
        }
        else if (colour != '') {
            setDisplayCars(carDetails.filter((car) => car.colour == colour))
        }
        else if (make != '' && model != '') {
            setDisplayCars(carDetails.filter((car) => car.make == make && car.model == model))
        }
        else if (make != '' && bodyType != '') {
            setDisplayCars(carDetails.filter((car) => car.make == make && car.bodyType == bodyType))
        }
        else if (make != '' && colour != '') {
            setDisplayCars(carDetails.filter((car) => car.make == make && car.colour == colour))
        }
        else if (model != '' && bodyType != '') {
            setDisplayCars(carDetails.filter((car) => car.model == model && car.bodyType == bodyType))
        }
        else if (model != '' && colour != '') {
            setDisplayCars(carDetails.filter((car) => car.model == model && car.colour == colour))
        }
        else if (bodyType != '' && colour != '') {
            setDisplayCars(carDetails.filter((car) => car.bodyType == bodyType && car.colour == colour))
        }
        else if (make != '' && model != '' && bodyType != '') {
            setDisplayCars(carDetails.filter((car) => car.make == make && car.model == model && car.bodyType == car.bodyType))
        }
        else if (make != '' && bodyType != '' && colour != '') {
            setDisplayCars(carDetails.filter((car) => car.make == make && car.bodyType == bodyType && car.bodyType == car.bodyType))
        }
        else if (make != '' && model != '' && colour != '') {
            setDisplayCars(carDetails.filter((car) => car.make == make && car.model == model && car.colour == car.colour))
        }
        else if (model != '' && bodyType != '' && colour != '') {
            setDisplayCars(carDetails.filter((car) => car.model == model && car.bodyType == bodyType && car.colour == car.colour))
        }
        else {
            setDisplayCars(carDetails)
        }
    }


    return (
        <ViewportProvider>
            <div className="ViewAllCarsWrapper">
                <WhichSideBar />
                <div className="viewAllCars">
                    <div className="rowBooking">
                        <div className="bookingTitle">View All Cars</div>
                        <div className="pageTitle">
                            <div className="blueT">Car</div>
                            <div className="yellowT">Share</div>
                            <div className="blueT">Scheme</div>
                        </div>
                    </div>
                    <div className="allCars">
                        <div className='filterSection'>
                            <button className="orderBtn hvr-sweep-to-right" onClick={() => sort()}>Asc/Desc</button>
                            <select className="filterBox" value={make} onChange={(e) => setMake(e.target.value)}>
                                <option value="" >Filter by Make</option>
                                {populateMake.map((loc) => (
                                    <option key={loc} value={loc} >{loc}</option>
                                ))
                                }
                            </select>
                            <select className="filterBox" value={model} onChange={(e) => setModel(e.target.value)}>
                                <option value="" >Filter by Model</option>
                                {populateModel.map((car) => (
                                    <option key={car} value={car} >{car}</option>
                                ))
                                }
                            </select>
                            <select className="filterBox" value={bodyType} onChange={(e) => setBodyType(e.target.value)}>
                                <option value="" >Filter by Body</option>
                                {populateBody.map((car) => (
                                    <option key={car} value={car} >{car}</option>
                                ))
                                }
                            </select>
                            <select className="filterBox" value={colour} onChange={(e) => setColour(e.target.value)}>
                                <option value="" >Filter by Colour</option>
                                {populateColour.map((car) => (
                                    <option key={car} value={car} >{car}</option>
                                ))
                                }
                            </select>
                            <button className="filterBtn hvr-sweep-to-right" onClick={() => onClick()}>Filter</button>
                            <button className="filterBtn hvr-sweep-to-right" onClick={() => clear()}>Clear</button>
                        </div>

                        {loading && <div className='history_element'><h4 style={{ textAlign: "center" }}>loading</h4></div>}

                        {!loading &&
                            <div className='displaySection'>
                                {displayCars.length > 0 ?
                                    displayCars.map((car) => (
                                        <CarDetailsElement className='history_element' key={car.carID} element={car} />))
                                    : <h5 className='history_element' style={{ textAlign: 'center', background: '#f4f4f4' }} >No Available Slots found!</h5>
                                }
                            </div>}
                    </div>

                </div>
            </div>
        </ViewportProvider>
    )
}



export default ViewAllCars;