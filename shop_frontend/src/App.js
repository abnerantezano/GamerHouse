import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
//COMPONENTES
import Navegador from './Componentes/Navegador';
import Pie from './Componentes/Pie';
//PAGINAS
import Inicio from './Paginas/Inicio';
import Productos from './Paginas/Productos';
import Carrito from './Paginas/Carrito';
import DetalleProducto from './Paginas/Detalle_producto';

function App() {
  return (
    <div>
      <Router>
        <Navegador/>
        <div>
          <Routes>
            <Route exact path='/' element={<Inicio />} />
            <Route exact path='/productos/:id' element={<Productos />} />
            <Route exact path='/productos' element={<Productos />} />
            <Route exact path='/producto/:id' element={<DetalleProducto />} />
            <Route exact path='/compra/:id' element={<Carrito />} />
          </Routes>
        </div>
        <Pie/>
      </Router>
    </div>
  );
}

export default App;
