import React, { useEffect, useState } from 'react'
import producto from '../Imagenes/Encabezado/producto_inicio.png'
//LOGOS
import logo_amd from '../Imagenes/Logos/logo-amd.png'
import logo_corsair from '../Imagenes/Logos/logo-corsair.png'
import logo_logitech from '../Imagenes/Logos/logo-logitech.png'
import logo_msi from '../Imagenes/Logos/logo-msi.png'
import logo_nvidia from '../Imagenes/Logos/logo-nvidia.png'
import logo_razer from '../Imagenes/Logos/logo-razer.png'
import logo_hyperx from '../Imagenes/Logos/logo-hyperx.png'
import logo_intel from '../Imagenes/Logos/logo-intel.png'   
import CategoriasService from '../Servicios/CategoriasService'
import { Link } from 'react-router-dom'

const logos = [
    logo_amd,
    logo_corsair,
    logo_logitech,
    logo_msi,
    logo_nvidia,
    logo_razer,
    logo_hyperx,
    logo_intel
  ];

function Inicio() {

    const [categorias,setCategorias] = useState([]);

    useEffect(() => {
        CategoriasService.getCategorias()
          .then((CategoriasResponse) => {
            setCategorias(CategoriasResponse);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

    return (
        <div>
            <div className='bg-index'>
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 pt-16'>
                    <div className='container mx-auto flex flex-wrap items-center pt-16'>
                        <div className='w-1/2 pr-16'>
                            <h2 className='text-white text-3xl mb-3 font-bold'>Logitech</h2>
                            <h1 className='text-[#dfc5f7] xl:text-6xl font-bold xl:mb-3'>THE AURORA COLLECTION</h1>
                            <p className='xl:text-xl xl:mb-4 pb-4 text-white'>Comodidad y ajuste con los G735, compatibles con LIGHTSPEED y Bluetooth®.</p>
                            <Link to="/producto/4" className='text-white bg-[#2b2164] p-3 rounded-lg xl:text-base hover:bg-[#443679] focus:ring-4 focus:ring-[#2b2164]'>Ver producto</Link>
                        </div>
                        <div className='w-1/2 float contenedor'>
                            <div class="float">
                                <img className='w-full' src={producto}></img>
                            </div>
                            <div class="sombra"></div>
                        </div>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="svg-container">
                    <path fill="#ffffff" fill-opacity="1" d="M0,96L13.3,112C26.7,128,53,160,80,165.3C106.7,171,133,149,160,154.7C186.7,160,213,192,240,186.7C266.7,181,293,139,320,128C346.7,117,373,139,400,144C426.7,149,453,139,480,112C506.7,85,533,43,560,64C586.7,85,613,171,640,186.7C666.7,203,693,149,720,144C746.7,139,773,181,800,170.7C826.7,160,853,96,880,85.3C906.7,75,933,117,960,160C986.7,203,1013,245,1040,234.7C1066.7,224,1093,160,1120,138.7C1146.7,117,1173,139,1200,154.7C1226.7,171,1253,181,1280,170.7C1306.7,160,1333,128,1360,112C1386.7,96,1413,96,1427,96L1440,96L1440,320L1426.7,320C1413.3,320,1387,320,1360,320C1333.3,320,1307,320,1280,320C1253.3,320,1227,320,1200,320C1173.3,320,1147,320,1120,320C1093.3,320,1067,320,1040,320C1013.3,320,987,320,960,320C933.3,320,907,320,880,320C853.3,320,827,320,800,320C773.3,320,747,320,720,320C693.3,320,667,320,640,320C613.3,320,587,320,560,320C533.3,320,507,320,480,320C453.3,320,427,320,400,320C373.3,320,347,320,320,320C293.3,320,267,320,240,320C213.3,320,187,320,160,320C133.3,320,107,320,80,320C53.3,320,27,320,13,320L0,320Z" className="path-element" />
                </svg>
                <div className='bg-white '>
                    <div className="max-w-screen-xl items-center justify-between mx-auto p-4 pt-16">
                        <h1 className='text-[#2b2164] outfit-custom font-extrabold text-2xl mb-5'>CATEGORÍAS</h1>
                        <div className='grid grid-cols-3 gap-4'>
                            {categorias.map((categoria) => (
                                <div key={categoria.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden group">
                                    <div className='relative'>
                                        <Link to={`/productos/${categoria.id}`} className="block">
                                            <img 
                                                className="w-full h-64 object-cover" 
                                                src={`https://gamerhouse-260ba47e0100.herokuapp.com//${categoria.imagen}`} 
                                                alt={categoria.nombre} 
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <h5 className="text-2xl font-bold text-white text-center">{categoria.nombre}</h5>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="p-5 text-center hover:bg-black hover:text-white relative">
                                        {categoria.productos} productos
                                        <div className="absolute inset-0 bg-[#2b2164] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {categoria.productos} productos
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='bg-white py-10'>
                    <div className='max-w-screen-xl items-center justify-between mx-auto p-4 pt-16 flow flow-wrap'>
                        <hr className='border-1 bg-zinc-800'/>
                        <div className='flex flex-wrap justify-between mb-4'>
                            <hr className='border-2 border-[#8478ca] w-1/12'/>
                            <hr className='border-2 border-[#8478ca] w-1/12'/>
                        </div>
                        <div className='mb-4 px-4 flex items-center'>
                            <div className='flex flex-col w-2/12'>
                                <h1 className='text-black outfit-custom font-extrabold text-lg mb-1'>MARCAS</h1>
                                <h1 className='text-[#2b2164] outfit-custom font-extrabold text-lg mb-1'>POPULARES</h1>
                            </div>
                            <div className="logos w-10/12">
                                <div className="logos-slide">
                                    {logos.map((logo, index) => (
                                    <img src={logo} key={index} alt={`logo-${index}`} />
                                    ))}

                                    {logos.map((logo, index) => (
                                    <img src={logo} key={`clone-${index}`} alt={`clone-${index}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-between'>
                            <hr className='border-2 border-[#8478ca] w-1/12'/>
                            <hr className='border-2 border-[#8478ca] w-1/12'/>
                        </div>
                        <hr className='border-1 bg-zinc-800'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inicio
