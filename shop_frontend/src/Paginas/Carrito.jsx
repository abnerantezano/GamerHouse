import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Carrito_vacio from '../Imagenes/carrito_vacio.png';
// FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
//PRIME REACT
import { DataView } from 'primereact/dataview';
//SERVICIOS
import CarritoService from '../Servicios/CarritoService';

function Carrito() {
    const { id } = useParams();
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState(null);
    const [cantidades, setCantidades] = useState({});

    const cargarDatos = () => {
        CarritoService.getItems(id)
            .then((response) => {
                setCarrito(response);
                setProductos(response.items);
                const cantidadesIniciales = response.items.reduce((acc, item) => {
                    acc[item.id] = item.cantidad;  // Cambiar a usar item.id en lugar de item.producto.id
                    return acc;
                }, {});
                setCantidades(cantidadesIniciales);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        cargarDatos();
    }, [id]);

    const actualizarCantidad = (itemId, nuevaCantidad) => {
        const campos = { cantidad: nuevaCantidad };
        CarritoService.patchItem(id, itemId, campos)
            .then((response) => {
                console.log(response);
                // Actualizar el estado de las cantidades
                setCantidades(prevCantidades => ({
                    ...prevCantidades,
                    [itemId]: nuevaCantidad
                }));
                cargarDatos();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const aumentar = (itemId) => {
        const nuevaCantidad = cantidades[itemId] + 1;  // Acceder a itemId directamente
        setCantidades(prevCantidades => ({
            ...prevCantidades,
            [itemId]: nuevaCantidad
        }));
        actualizarCantidad(itemId, nuevaCantidad);
    };

    const disminuir = (itemId) => {
        const nuevaCantidad = Math.max(cantidades[itemId] - 1, 0);  // Acceder a itemId directamente
        setCantidades(prevCantidades => ({
            ...prevCantidades,
            [itemId]: nuevaCantidad
        }));
        actualizarCantidad(itemId, nuevaCantidad);
    };

    const eliminarItem = (itemId) => {
        CarritoService.deleteItem(id, itemId)
            .then((response) => {
                console.log(response);
                cargarDatos();
                alert("Producto eliminado");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const listTemplate = (item, index) => (
        <div key={index} className="w-full grid grid-cols-6 gap-4 items-center justify-center text-start px-4 pt-6 pb-4 relative">
            <img className="w-full h-36 object-cover rounded-md" src={`http://54.242.254.159:8000/${item.producto.imagen}`} alt={item.producto.nombre} />
            <h1 className='text-sm col-span-2'>{item.producto.nombre} {item.id}</h1>
            <p className='text-start w-full'>S/ {item.producto.precio}</p>
            <div className='w-full flex flex-wrap items-center'>
                <button type='button' onClick={() => disminuir(item.id)} className='bg-indigo-600 p-2 text-white rounded-l'>-</button>
                <p className='p-2 border-t border-b'>{cantidades[item.id]}</p>  {/* Cambiar a usar item.id */}
                <button type='button' onClick={() => aumentar(item.id)} className='bg-indigo-600 p-2 text-white rounded-r'>+</button>
            </div>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">S/ {parseFloat(item.precio_subtotal).toFixed(2)}</p>
            <button type="button" onClick={() => eliminarItem(item.id)} className='absolute z-10 right-4 top-6'><FontAwesomeIcon icon={faXmark} /></button>
        </div>
    );

    const finalizarCompra = () => {
        alert("Compra realiza con éxito");
    };

    return (
        <div>
            <div className='bg-indigo-300 mt-20'>
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 py-10'>
                    <div className='container mx-auto flex flex-wrap items-center'>
                        <div className='w-1/2 pr-16'>
                            <h1 className='text-[#2b2164] xl:text-6xl font-bold xl:mb-3'>Tu canasta</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white'>
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 pt-16'>
                    <div className='container mx-auto flex flex-wrap items-center pt-16'>
                        <div className='w-full pb-32'>
                            {productos.length === 0 ? (
                                <div className='w-full px-24 flex flex-wrap items-center justify-center '>
                                    <img className="w-1/2" src={Carrito_vacio} alt='imagen' />
                                    <div className='w-1/2 flex flex-col items-end'>
                                        <h1 className='text-2xl mb-4 text-end'>Tu carrito de compras está vacío en este momento. ¡Agrega algunos productos y comienza a llenarlo!</h1>
                                        <Link to="/productos" className='text-white bg-[#2b2164] p-3 rounded-lg xl:text-base hover:bg-[#443679] focus:ring-4 focus:ring-[#2b2164]'>Ver productos</Link>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex flex-wrap items-start justify-between'>
                                    <div className="w-8/12 border rounded-lg p-4 shadow-lg">
                                        <div className='w-full grid grid-cols-6 gap-4 items-center justify-center text-start font-bold px-4 pt-2 pb-4'>
                                            <h1 className='col-span-3'>Producto</h1>
                                            <h1 className='w-full'>Precio</h1>
                                            <h1 className=''>Cantidad</h1>
                                            <h1>Subtotal</h1>
                                        </div>
                                        <hr className='w-full '/>
                                        <div>
                                            <DataView value={productos} className="bg-transparent" pt={{ content: 'bg-transparent text-sm', grid: 'bg-transparent' }} itemTemplate={listTemplate} paginator paginatorClassName="bg-transparent text-gray-500 p-4" rows={4} />
                                        </div>
                                    </div>
                                    <div className='w-4/12 px-6'>
                                        <div className='border rounded-lg p-4 shadow-lg'>
                                            <div className='flex flex-wrap justify-between items-center'>
                                                <p className='text-gray-400'>Subtotal </p>
                                                <p>S/ {parseFloat(carrito.precio_total).toFixed(2)}</p>
                                            </div>
                                            <div className='flex flex-wrap justify-between items-center mt-2 mb-4'>
                                                <p className='text-gray-400'>Descuento </p>
                                                <p>No tiene cupón</p>
                                            </div>
                                            <hr className='w-full'/>
                                            <div className='flex flex-wrap justify-between items-center my-4'>
                                                <p className='text-gray-400'>Total: </p>
                                                <p>S/ {parseFloat(carrito.precio_total).toFixed(2)}</p>
                                            </div>
                                            <button onClick={finalizarCompra} className='w-full bg-indigo-700 rounded-lg p-2 text-white'>Ir a pagar</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carrito;
