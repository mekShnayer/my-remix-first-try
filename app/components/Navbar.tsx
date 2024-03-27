import { Link } from "@remix-run/react"
import './navbar.css'
export const Navbar = () => {
    return <ul className="navbar-container">
        <li className="nav-li">
            <Link prefetch="intent" to={'/'} className="link">Home</Link>
        </li>
        <li className="nav-li">
            <Link prefetch="intent" to={'/contacts'} className="link" >Contacts</Link>
        </li>

    </ul>
}