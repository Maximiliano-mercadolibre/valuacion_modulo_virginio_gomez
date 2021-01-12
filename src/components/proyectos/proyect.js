import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

import { Link } from 'react-scroll'

const Proyect = ({proyecto}) => {
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;


    //Funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {

        // window.scroll(10, 1600);
        proyectoActual(id); //Fijar un proyecto actual

        obtenerTareas(id); //mostrar solo las tareas pertenecientes al proyecto seleccionado
    }

    return (
        <li>
            <Link
                type="button"
                className="btn btn-blank"
                smooth={true}
                duration={1000}
                to="contact"
                onClick={ () => seleccionarProyecto(proyecto.id) }
            >
                {proyecto.nombre}
            </Link>
        </li>
    );
};

export default Proyect;