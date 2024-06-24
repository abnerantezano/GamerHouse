import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import TokenService from '../Servicios/TokenService';

function Navegador() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const token = TokenService.getToken();
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        TokenService.removeToken();
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 0) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <header className=''>
                <nav className="w-full fixed top-0 left-0 z-10 bg-transparent ">
                    <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                        <Link className="w-full justify-start" to="/"><img src="https://see.fontimg.com/api/renderfont4/X3jd2/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/R2FtZXJIb3VzZQ/bruce-forever-regular.png" className="w-1/2" alt="Logo" /></Link>
                        <div className="flex items-center justify-center flex-grow w-full ">
                            <ul className="flex space-x-4">
                                <li>
                                    <Link to="/" className={`block bg-transparent text-base ${location.pathname === '/' ? 'text-white font-bold' : 'text-white'} px-4`}>
                                        Inicio
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/productos" className={`block bg-transparent text-base ${location.pathname === '/productos' ? 'text-white font-bold' : 'text-white'} px-4`}>
                                        Productos
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex items-center w-full justify-end">
                            <div className='text-white ml-4 flex space-x-2'>
                                {isLoggedIn ? (
                                    <button
                                        onClick={handleLogout}
                                        className="block bg-transparent text-base text-white px-4"
                                    >
                                        Cerrar sesión
                                    </button>
                                ) : (
                                    <>
                                        <Link to="/iniciar-sesion" className={`block bg-transparent text-base ${location.pathname === '/iniciar-sesion' ? 'text-white font-bold' : 'text-white'} px-4`}>Iniciar sesión</Link>
                                        <span>/</span>
                                        <Link to="/registro" className={`block bg-transparent text-base ${location.pathname === '/registro' ? 'text-white font-bold' : 'text-white'} px-4`}>Registrar</Link>
                                    </>
                                )}
                            </div>
                            <Link to={`/compra/${1}`} className="text-[#3b266b] bg-white hover:bg-[#3b266b] hover:text-white focus:ring-4 focus:outline-none focus:ring-[#e8d8fc] font-medium rounded-lg text-sm px-4 mx-4 py-2 text-center">
                                <span><FontAwesomeIcon icon={faCartShopping} /></span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Navegador;
