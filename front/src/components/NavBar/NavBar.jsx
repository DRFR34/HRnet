import React from 'react'
import { NavLink, useParams, useLocation } from 'react-router-dom'
import './NavBar.scss'

import logo from '../../assets/images/logo.png'


export default function NavBar() {
    return (
        <nav className='nav'>
            <NavLink
                className='nav__link'
                to="/">
                <img className='nav__logo' src={logo} alt="Wealth HealthLogo" />
            </NavLink>
            <div className='nav__links'>
                <NavLink
                    className={(({ isActive }) =>
                        isActive ? 'nav__link isActive' : 'nav__link'
                      )}
                    to="/create-employee">
                    Create Employee
                </NavLink>

                <NavLink
                    className={(({ isActive }) =>
                        isActive ? 'nav__link isActive' : 'nav__link'
                      )}
                    to="/employee-list">
                    Employees list
                </NavLink>
            </div>

        </nav>
    )
}
