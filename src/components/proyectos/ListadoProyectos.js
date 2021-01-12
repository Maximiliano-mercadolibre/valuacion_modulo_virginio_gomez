import React, { useContext, useEffect, useState } from 'react';
import Proyect from './proyect'
import proyectoContext from '../../context/proyectos/proyectoContext';
import Spinner from '../Spinner/Spinner';
import imagenFlecha from '../../img/flechapng.png'

const ListadoProyectos = () => {
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, obtenerProyectosGuardados } = proyectosContext;

    const [cargando, guardarCargando] = useState(false);

    useEffect(() => {
        obtenerProyectosGuardados();
        //eslint-disable-next-line
        guardarCargando(true);

        setTimeout(() => {
            guardarCargando(false);
        }, 2700);
    }, []);

    let width = document.documentElement.clientWidth;
    let mobile = false;
    let desktop = false;

    if (width < 768) {
        mobile = true
    }else {
        desktop = true;
    }

    if (desktop && proyectos.length === 0) {
        return (
            <div>
                {cargando ? <Spinner /> :  
                <div>
                    <img className="imagen_flecha" src={imagenFlecha} />
                    <p className="crea_tu_primer_tarea">Crea tu primer proyecto</p>
                </div>
                }
            </div>
        )
    };

    if (mobile && proyectos.length === 0) {
        return (
            <div>
                {cargando ? <Spinner /> :  
                <div>
                    <p>Crea tu primer proyecto</p>
                </div>
                }
            </div>
        )
    };

    return (
        <div>
            <ul className="listado-proyectos">
            {proyectos.map(e => (
                <Proyect
                    key={e.id}
                    proyecto={e}
                />
            ))}
        </ul>
        {cargando ? (<Spinner />) : null}
        </div>
    );
};

export default ListadoProyectos;