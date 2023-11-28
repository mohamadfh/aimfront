import './App.css';
import Spinner from "./Components/Spinner/Spinner";
import GlobalStyles from "./globalStyles";
import ScrollToTop from "./Components/ScrollToTop";
import { createContext, useState, Suspense } from "react";
import Router from "./Router";

export const authContext = createContext(false);

function App() {
    const [auth, setAuth] = useState(sessionStorage.getItem("token"));

    return (

        <>
            <GlobalStyles/>
            <ScrollToTop/>
            <Suspense fallback={<Spinner color={{ c: "#8b9ce8" }} />}>
                <authContext.Provider value={{ auth, setAuth }}>
                    <Router />
                </authContext.Provider>
            </Suspense>
        </>

        // <div className="App">
        //   <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <p>
        //       Edit <code>src/App.js</code> and save to reload.
        //     </p>
        //     <a
        //       className="App-link"
        //       href="https://reactjs.org"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a>
        //   </header>
        // </div>
    );
}

export default App;
