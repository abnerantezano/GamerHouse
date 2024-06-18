import React from 'react'
import logo from '../logo.png'
// REACT ROUTER DOOM
import { Link, useLocation } from 'react-router-dom'
//FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'


function Navegador() {
    window.addEventListener("scroll", function() {
        var nav = document.querySelector("nav");
        if (window.scrollY > 0) {
            nav.classList.add("scrolled"); 
        } else {
            nav.classList.remove("scrolled"); 
        }
    });

    const location =  useLocation();
    return (
        <div>
            <header>
                <nav className=" w-full fixed top-0 left-0 z-10 bg-transparent">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a href="/"><img src="https://see.fontimg.com/api/renderfont4/X3jd2/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/R2FtZXJIb3VzZQ/bruce-forever-regular.png" className="w-3/12" alt="Logo"/></a>
                        <div className="items-center justify-between hidden md:flex md:w-auto md:order-1" id="navbar-user">
                        <ul className="flex flex-row px-8">
                            <li>
                                <Link to="/" className={`block bg-transparent text-lg ${location.pathname === '/' ? 'text-white font-bold' : 'text-white'} px-4 `}>
                                Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/productos" className={`block bg-transparent text-lg ${location.pathname === '/productos' ? 'text-white font-bold' : 'text-white'} px-4`}>
                                Productos
                                </Link>
                            </li>
                        </ul>
                            <Link to={`/compra/${1}`} className="text-[#3b266b] bg-white hover:bg-[#3b266b] hover:text-white focus:ring-4 focus:outline-none focus:ring-[#e8d8fc] font-medium rounded-lg text-sm px-4 py-2 text-center"><span><FontAwesomeIcon icon={faCartShopping} /></span> </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navegador
