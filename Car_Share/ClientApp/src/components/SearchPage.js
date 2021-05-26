import React, { useState } from 'react';
import './styles/RegisterPage.css';
import { ViewportProvider, WhichSideBar } from './ViewPort_Helper';
// import MakeBooking from './MakeBooking'

import { Link, Redirect, useHistory } from "react-router-dom";




// // ========================= View Stuff ============================

// const viewportContext = React.createContext({});

// const ViewportProvider = ({ children }) => {
//     const [width, setWidth] = React.useState(window.innerWidth);
//     const [height, setHeight] = React.useState(window.innerHeight);
//     const handleWindowResize = () => {
//         setWidth(window.innerWidth);
//         setHeight(window.innerHeight);
//     };

//     React.useEffect(() => {
//         window.addEventListener("resize", handleWindowResize);
//         return () => window.removeEventListener("resize", handleWindowResize);
//     }, []);

//     return (
//         <viewportContext.Provider value={{ width, height }}>
//             {children}
//         </viewportContext.Provider>
//     );
// };

// const useViewport = () => {
//     const { width, height } = React.useContext(viewportContext);
//     return { width, height };
// };

// const WhichSideBar = () => {
//     const { width } = useViewport();
//     const breakpoint = 1200;

//     return width < breakpoint ? <SideBarMobile /> : <SideBar />;
// };


// // ========================= End of view stuff ============================

function SearchPage() {
    const history = useHistory();

    const [make, setMake] = useState(0)
    const [model, setModel] = useState(0)
    const [body, setBody] = useState(0)
    const [colour, setColour] = useState(0)

    const [rego, setRego] = useState('')
    const [found, setFound] = useState(false)
    const [initial, setInitial] = useState(true)

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



    const onSubmit = (e) => {
        e.preventDefault()
        var rego_num = Number(rego);
        var arrayLength = carDetails.length;
        for (var i = 0; i < arrayLength; i++) {
            if (carDetails[i].id == rego_num) {
                setMake(carDetails[i].make)
                setModel(carDetails[i].model)
                setBody(carDetails[i].body)
                setColour(carDetails[i].colour)

                setFound(true)
                return
            } else {
                setFound(false)
                setInitial(false)
            }
        }

        // if (!text) {
        //     alert('Please add a task')
        //     return
        // }

        // onAdd({ text, day, reminder })

        // setText('')
        // setDay('')
        // setReminder(false)
    }

    const onClick = () => {

        history.push({
            pathname: '/make_booking',
            // search: '?update=true',  // query string
            state: {  // location state
                id: rego,
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
                                {!found && !initial && < div > Couldn't find a car with entered ID </div>}
                                {/* STYLE TEXT BOX LABEL HERE */}
                                <div className="profileLabel"> Search using the Registration ID of car.. </div>
                                {/* STYLE FORM HERE */}
                                <form onSubmit={onSubmit}>
                                    <input type="text" placeholder=" e.g. 2" value={rego} onChange={(e) => setRego(e.target.value)}></input>
                                    <input type="submit" value="Search"></input>
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
                                        {body}
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