import React, { useEffect, useState } from 'react';
import './styles/RegisterPage.css';
import { ViewportProvider, WhichSideBar } from './ViewPort_Helper';
import { useHistory } from "react-router-dom";

function SearchPage() {
    const history = useHistory();
    const [loading, setLoading] = useState(true)
    const [car, setCar] = useState(0)
    const [make, setMake] = useState(0)
    const [model, setModel] = useState(0)
    const [bodyType, setBodyType] = useState(0)
    const [colour, setColour] = useState(0)

    const [rego, setRego] = useState('')
    const [found, setFound] = useState(false)
    const [initial, setInitial] = useState(true)

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
            })
            .catch(error => {
                console.log(error)
            }).finally(() => {
                setLoading(false)
            })

    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        var rego_num = Number(rego);
        var arrayLength = carDetails.length;
        for (var i = 0; i < arrayLength; i++) {
            if (carDetails[i].carID == rego_num) {
                setCar(carDetails[i])
                setMake(carDetails[i].make)
                setModel(carDetails[i].model)
                setBodyType(carDetails[i].bodyType)
                setColour(carDetails[i].colour)

                setFound(true)
                return
            } else {
                setFound(false)
                setInitial(false)
            }
        }
    }

    const onClick = () => {
        console.log(car)
        history.push({
            pathname: '/make_booking',
            // search: '?update=true',  // query string
            state: {  // location state
                car: car,
            },
        });

    }
    return (
        <ViewportProvider>
            <div className="ViewAllCarsWrapper">
                <WhichSideBar />
                <div className="viewAllCars">
                    <div className="rowBooking">
                        <div className="bookingTitle">Search</div>
                        <div className="pageTitle">
                            <div className="blueT">Car</div>
                            <div className="yellowT">Share</div>
                            <div className="blueT">Scheme</div>
                        </div>
                    </div>
                    <div className="allCars">
                        <div className='filterSection'>
                            <div className="profileSignUpEmail">
                                {/* STYLE ERROR MESSAGE HERE */}
                                {!found && !loading && !initial && < div > Couldn't find a car with entered ID </div>}

                                {/* STYLE TEXT BOX LABEL HERE */}
                                <div className="profileLabel"> Search using the Registration ID of car.. </div>
                                {/* STYLE FORM HERE */}

                                <form onSubmit={onSubmit}>
                                    <input type="text" placeholder=" e.g. 2" value={rego} onChange={(e) => setRego(e.target.value)}></input>
                                    {loading && <h5>loading</h5>}
                                    {!loading && <input type="submit" value="Search"></input>}
                                </form>
                            </div>

                        </div>

                        <div className='displaySection'>

                            {/* STYLE HERE */}

                            <h2>Car Details:</h2>
                            {
                                found && <div>
                                    <h2>
                                        {make}
                                    </h2>
                                    <h2>
                                        {bodyType}
                                    </h2>
                                    <h2>
                                        {colour}
                                    </h2>
                                    <h2>
                                        {model}
                                    </h2>
                                    {/* BUTTON HERE */}
                                    <button onClick={() => onClick()}>Book here</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </ViewportProvider >
    );
}

export default SearchPage;