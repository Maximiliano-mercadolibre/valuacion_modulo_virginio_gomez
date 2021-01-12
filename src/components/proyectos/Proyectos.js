import React from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
import ListadoTarea from '../tareas/ListadoTarea';

const Proyectos = () => {

    let width = document.documentElement.clientWidth;
    let mobile = false;
    let desktop = false;

    if (width < 768) {
        mobile = true
    }else {
        desktop = true;
    }

    return (
        <div>
            {mobile 
            ? 
            <div className="contenedor-app">
                <Barra />
                <Sidebar />

                <div className="seccion-principal">
                <main>
                <FormTarea />

                <div className="contenedor-tareas">
                <ListadoTarea />
                 </div>
                </main>

                </div>
            </div>
            :
            <div className="contenedor-app">
                <Sidebar />

                <div className="seccion-principal">
                <Barra />

                <main>
                <FormTarea />

                <div className="contenedor-tareas">
                <ListadoTarea />
                 </div>
                </main>

                </div>
            </div>
            
            }
        </div>
    );
};

export default Proyectos;