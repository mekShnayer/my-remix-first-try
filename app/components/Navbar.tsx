import { Link } from "@remix-run/react"
import './navbar.css'
export const Navbar = () => {
    return <ul className="navbar-container">
        <li className="nav-li">
            <Link prefetch="intent" to={'/'}>home</Link>
        </li>
        <li className="nav-li">
            <Link prefetch="intent" to={'/contacts'}>contacts</Link>
        </li>

    </ul>
}