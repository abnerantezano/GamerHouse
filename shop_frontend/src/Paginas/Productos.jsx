import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
// SERVICIOS
import ProductosService from '../Servicios/ProductosService';
import CategoriasService from '../Servicios/CategoriasService';
// COMPONENTES
import CarritoService from '../Servicios/CarritoService';
import ItemsCarrusel from '../Componentes/ItemsCarrusel';

function Productos() {

    // LISTAS
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);

    // LISTAS FILTRADAS
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

    // RANGO DE PRECIOS
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');

    // PRODUCTOS SELECCIONADOS
    const [carrito, setCarrito] = useState([]);
    const [nuevoItem, setNuevoItem] = useState([]);

    useEffect(() => {
        // CATEGORIAS
        CategoriasService.getCategorias()
            .then((CategoriasResponse) => {
                setCategorias(CategoriasResponse);
            })
            .catch((error) => {
                console.log(error);
            });

        // PRODUCTOS
        ProductosService.getProductos()
            .then((ProductosResponse) => {
                setProductos(ProductosResponse);
                setProductosFiltrados(ProductosResponse);
            })
            .catch((error) => {
                console.log(error);
            });
        
        cargarDatos();
            
    }, []);

    const cargarDatos = () => {
        CarritoService.getItems(1)
            .then((ItemsResponse) => {
                setCarrito(ItemsResponse.items);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    // FILTRAR SEGÚN CAMBIOS
    useEffect(() => {
        filtrarProductos();
    }, [categoriaSeleccionada, precioMin, precioMax]);

    // ACCIÓN DE FILTRADO
    const filtrarProductos = () => {
        let productosFiltrados = productos;

        if (categoriaSeleccionada !== '') {
            const idCategoria = categoriaSeleccionada;
            ProductosService.getProductosPorCategoria(idCategoria)
                .then((response) => {
                    productosFiltrados = response;
                    aplicarFiltroPorPrecio(productosFiltrados);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            aplicarFiltroPorPrecio(productosFiltrados);
        }
    };

    // FILTRO DE PRECIO
    const aplicarFiltroPorPrecio = (productosFiltrados) => {
        let productosFiltradosPorPrecio = productosFiltrados;

        if (precioMin !== '') {
            productosFiltradosPorPrecio = productosFiltradosPorPrecio.filter(producto =>
                parseFloat(producto.precio) >= parseFloat(precioMin)
            );
        }

        if (precioMax !== '') {
            productosFiltradosPorPrecio = productosFiltradosPorPrecio.filter(producto =>
                parseFloat(producto.precio) <= parseFloat(precioMax)
            );
        }

        setProductosFiltrados(productosFiltradosPorPrecio);
    };

    // VER LOS CAMBIOS DE CATEGORIAS SELECCIONADAS
    const handleCategoriaChange = (e) => {
        const value = parseInt(e.target.value);
        if (categoriaSeleccionada === value.toString()) {
            // Si la categoría ya estaba seleccionada, la deseleccionamos
            setCategoriaSeleccionada('');
        } else {
            // Si la categoría no estaba seleccionada, la seleccionamos
            setCategoriaSeleccionada(value.toString());
        }
    };

    // VER LOS CAMBIOS PARA EL FILTRO
    const handlePrecioMinChange = (e) => {
        setPrecioMin(e.target.value);
    };

    const handlePrecioMaxChange = (e) => {
        setPrecioMax(e.target.value);
    };

    // FUNCIÓN DE AGREGAR AL CARRITO
    const AgregarCarrito = (producto) => {
        const productoEnCarrito = carrito && carrito.find(item => item.producto.id === producto.id);
    
        if (productoEnCarrito) {
            const nuevoCarrito = carrito.map(item => {
                if (item.producto.id === producto.id) {
                    return { ...item, cantidad: item.cantidad + 1 };
                }
                return item;
            });

            //ACTUALIZAR CANTIDAD
            CarritoService.patchItem(1, productoEnCarrito.id, { cantidad: productoEnCarrito.cantidad + 1 })
                .then(response => {
                    console.log(response);
                    setCarrito(nuevoCarrito);
                    alert("Producto agregado con éxito");
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            // Si el producto no está en el carrito, lo agregamos
            const nuevoCarrito = [...nuevoItem, { carrito:1, producto: producto.id, cantidad: 1}];
            console.log(nuevoCarrito);
            // Enviar los items del carrito al servicio
            CarritoService.postItem(1, nuevoCarrito)
                .then(response => {
                    console.log(response);
                    cargarDatos();
                    alert("Producto agregado con éxito");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    return (
        <div>
            <ItemsCarrusel />
            <div className='bg-white'>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 py-16">
                    <div className="flex flex-wrap justify-start w-full">
                        <div className="col-span-12 md:col-span-3 w-3/12 border rounded-lg">
                            <div className="box rounded-xl bg-white p-6">
                                <div className="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-7">
                                    <p className="font-medium text-base leading-7 text-black ">Filtro de productos</p>
                                </div>
                                <h6 className="font-medium text-base leading-7 text-black mb-5">Precio</h6>
                                <div className="flex items-center mb-5 gap-1">
                                    <div className="relative w-full">
                                        <input
                                            id="FROM"
                                            value={precioMin}
                                            onChange={handlePrecioMinChange}
                                            className='h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white'
                                            placeholder="Min"
                                        />
                                    </div>
                                    <p className="px-1 font-normal text-sm leading-6 text-gray-600">a</p>
                                    <div className="relative w-full">
                                        <input
                                            id="TO"
                                            value={precioMax}
                                            onChange={handlePrecioMaxChange}
                                            className='h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white'
                                            placeholder="Max"
                                        />
                                    </div>
                                </div>
                                <p className="font-medium text-sm leading-6 text-black mb-3">Categorías</p>
                                <div className="box flex flex-col gap-2">
                                    {categorias.map((categoria) => (
                                        <div key={categoria.id} className="flex items-center">
                                            <input
                                                id={`checkbox-default-${categoria.id}`}
                                                type="checkbox"
                                                name="categoria"
                                                value={categoria.id}
                                                onChange={handleCategoriaChange}
                                                className="w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"
                                                checked={categoria.id.toString() === categoriaSeleccionada}
                                            />
                                            <label htmlFor={`checkbox-default-${categoria.id}`} className="text-sm font-normal text-gray-600 leading-4 cursor-pointer">{categoria.nombre}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='w-9/12 h-auto px-10 grid grid-cols-3 gap-4'>
                            {productosFiltrados.map((producto) => (
                                <div key={producto.id} className="w-full mb-10">
                                    <Link to={`/producto/${producto.id}`} className="relative block h-48 overflow-hidden rounded">
                                        <img alt={producto.nombre} className="block h-full w-full object-cover object-center cursor-pointer" src={`http://3.89.122.197:8000/${producto.imagen}`}  />
                                    </Link>
                                    <div className="mt-4">
                                        <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">{producto.nombre}</h3>
                                        <h2 className="title-font text-lg font-medium text-gray-900">S/ {parseFloat(producto.precio).toFixed(2)}</h2>
                                        <button type="button" onClick={() => AgregarCarrito(producto)} className='mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#302568] hover:bg-[#5e4aa5] focus:ring-4 focus:ring-[#302568] focus:outline-none'>Agregar al carrito<span className='ml-2'><FontAwesomeIcon icon={faCartPlus} /></span></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Productos;
