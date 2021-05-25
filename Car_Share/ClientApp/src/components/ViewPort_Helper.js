import React from 'react';
import SideBar from './SideBar';
import SideBarMobile from './SideBarMobile';

// ========================= View Stuff ============================
const viewportContext = React.createContext({});

export const ViewportProvider = ({ children }) => {
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

export const WhichSideBar = () => {
    const { width } = useViewport();
    const breakpoint = 1200;

    return width < breakpoint ? <SideBarMobile /> : <SideBar />;
};


// ========================= End of view stuff ============================