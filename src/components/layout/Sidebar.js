import React from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto';
import ListadoProyectos from '../proyectos/ListadoProyectos';


const Sidebar = () => {
    return (
        <aside>
            <h1>
                <h1>ADMINISTRADOR DE TAREAS</h1>

                <NuevoProyecto />

                <div className="division-proyectos-formulario">
                </div>

                <div className="proyectos">
                    <h2>Tus Proyectos</h2>

                    <ListadoProyectos />

                </div>
            </h1>
        </aside>
    );
};

export default Sidebar;