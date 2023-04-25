import {Link, Outlet} from "react-router-dom";

//Layout for alle sidene
export default function Layout(){
    return (
        <div id="container">
            <nav>
            <Link to="/">
                <img src="../assets/logo.png" alt="Logo"/>
            </Link>
            <ul>
                <li><Link to="/gameshop">Shop</Link></li>
                <li><Link to="/mygames">My Games</Link></li>
                <li><Link to="/favourites">Favourites</Link></li>
            </ul>
            <section>
                <figure>
                    <img src="../assets/user.png"/>
                </figure>
                <p>Mohammga</p>
            </section>
        </nav>
        <Outlet/>
        <footer>
        <p>Laget av GameHub</p>
        </footer>
        </div>
    );
}