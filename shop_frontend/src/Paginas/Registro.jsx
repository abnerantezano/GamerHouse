import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import RegistroService from "../Servicios/RegistroService";

const CrearUsuario = () => {

    const navigate = useNavigate();
    const {register, handleSubmit, watch, formState: { errors }} = useForm();

    const password = watch('password');

    const EnviarDatos = (data) => {
        const usuario = {
            correo: data.correo,
            password: data.password,
            nombre: data.nombre_completo,
            is_active: false,
        };
        console.log(usuario);

        RegistroService.postUsuario(usuario)
            .then( (usuario) => {
                console.log(usuario);
                navigate("/iniciar-sesion")
            })
            .catch((error)=>{
                console.error(error);
            })
    };

    return (
        <form onSubmit={handleSubmit(EnviarDatos)}>
            <div className="bg-[#F0EEEC] w-full mt-20 py-20">
                <div className="flex items-center justify-center">
                    <div className="w-1/2 bg-white py-16 rounded-lg shadow-xl">
                        <div className="flex justify-center mb-5 w-full">
                            <div className="w-1/2">
                                <h1 className="font-bold text-2xl mx-auto text-indigo-600 justify-center mb-8">Registro</h1>
                                <div className='mb-4'> 
                                  <label className="block mb-2 text-sm font-semibold text-gray-700">Nombre completo</label>
                                  <InputText type="text" id="nombre_completo" {...register('nombre_completo', { required: 'Ingrese su nombre completo' })}  className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring focus:ring-indigo-200 focus:border-dark w-full p-2.5" />
                                  {errors.nombre_completo && <span className="text-red-500 text-sm">{errors.nombre_completo.message}</span>}
                                </div>
                                <div className='mb-4'> 
                                  <label className="block mb-2 text-sm font-semibold text-gray-700">Correo electrónico</label>
                                  <InputText type="email" id="correo" {...register('correo', { required: 'Ingrese su correo electrónico' })}  className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring focus:ring-indigo-200 focus:border-dark w-full p-2.5" />
                                  {errors.correo && <span className="text-red-500 text-sm">{errors.correo.message}</span>}
                                </div>
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-semibold text-gray-700">Contraseña</label>
                                    <InputText
                                        type="password"
                                        id="password"
                                        {...register('password', { required: 'Ingrese una contraseña' })}
                                        className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring focus:ring-indigo-200 focus:border-dark w-full p-2.5"
                                    />
                                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                                </div>
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Confirmar contraseña</label>
                                    <InputText
                                        type="password"
                                        id="confirmarPassword"
                                        {...register('confirmarPassword', {
                                            required: 'Confirme la contraseña',
                                            validate: value => value === password || 'Las contraseñas no coinciden'
                                        })}
                                        className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring focus:ring-indigo-200 focus:border-dark w-full p-2.5"
                                    />
                                    {errors.confirmarPassword && <span className="text-red-500 text-sm">{errors.confirmarPassword.message}</span>}
                                </div>
                                <div className="flex justify-center my-8">
                                    <button
                                        type="submit"
                                        className="focus:outline-none w-full text-white bg-indigo-500 hover:bg-indigo-900 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                    >
                                        Crear cuenta
                                    </button>
                                </div>
                                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                    <p className="mx-4 mb-0 text-center font-semibold">O</p>
                                </div>
                                <div className="mb-5 flex justify-center">
                                    <label className="block text-sm font-medium text-gray-900">
                                        ¿Ya tienes una cuenta? <Link to="/iniciar-sesion" className="text-gray-500">Iniciar Sesión</Link>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CrearUsuario;
