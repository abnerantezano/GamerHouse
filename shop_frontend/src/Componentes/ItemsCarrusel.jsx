import React from 'react'
import Carrusel from './Carrusel';
import ellie from '../Imagenes/Carrusel/ellie.png'

function ItemsCarrusel() {
    //VALORES DEL CARRUSEL
    const slides = [
        {
            id: 1,
            titulo: "TECLADO G715 TKL",
            desc1 : "ESCRIBE",
            desc2: "SIN LÍMITES",
            imagenUrl: 'https://resource.logitech.com/content/dam/gaming/en/products/keyboards/g715-wireless-keyboard/gallery/g715-gallery-1.png',
            tipo : "item1"
        },
        {
            id: 2,
            titulo: "The Last Of Us PART II",
            desc1 : "POTENCIA",
            desc2: "TU AVENTURA",
            imagenUrl: 'https://i.postimg.cc/CLMDPVzV/ELLIE.png',
            tipo : "item2"
        },
        {
            id: 3,
            titulo: "ECHO DOT (5ª generación)",
            desc1 : "MEJORA TU",
            desc2: "EXPERIENCIA",
            imagenUrl: 'https://todoaplazo.com/images/products/0bfbdbd8-a429-466d-9d8a-be3b5bbd16d2-AMAZON-48.png',
            tipo : "item3"
        },
    ];

    return (
    <div>
        <Carrusel slides={slides} />
    </div>
  )
}

export default ItemsCarrusel
