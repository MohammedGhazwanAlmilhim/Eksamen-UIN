import {Link, Outlet} from "react-router-dom";
import React from "react" 


//Layout for alle sidene
export default function Layout(){
    return (
        <div id="container">
            <Outlet/>
        <footer>
        <p>Laget av GameHub</p>
        </footer>
        </div>
    );
}