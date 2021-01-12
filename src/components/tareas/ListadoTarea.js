import React, { Fragment, useContext, useState } from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import swal from 'sweetalert';
import imagen from '../../img/imagen.png'
import imagenFlecha from '../../img/flechapng.png'



const ListadoTarea = () => {
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto, proyectos } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { tareasdelproyecto } = tareasContext;

    let width = document.documentElement.clientWidth;
    let mobile = false;
    let desktop = false;

    if (width < 768) {
        mobile = true
    }else {
        desktop = true;
    }

    console.log(proyectos, 'PROBANDO')

    if (desktop && proyectos.length === 0) {
        return (
            <div>
            </div>
        )
    };

    if (!proyecto && proyectos.length === 0) return (
        <div>
            {mobile ? 
            <h2></h2>
            : (<div>
                <h2>Selecciona uno de tus Proyetos</h2> <img className="imagen_portada" src={imagen} />
                </div>)
            }
        </div>
    )

    if (!proyecto && proyectos.length) return (
        <div>
            {mobile ? 
            <h2>Selecciona uno de tus Proyetos</h2>
            : (<div>
                <h2>Selecciona uno de tus Proyetos</h2> <img className="imagen_portada" src={imagen} />
                </div>)
            }
        </div>
    )

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    if (proyectoActual && proyectoActual.fechaMin && proyectoActual.fechaMax) {

        //Cambiar el idioma del la fecha
        let diaMin = proyectoActual.fechaMin.slice(8, 10);;
        let mesMin = proyectoActual.fechaMin.slice(4, 7);
        let añoMin = proyectoActual.fechaMax.slice(11, 15);

        let diaMax = proyectoActual.fechaMax.slice(8, 10);;
        let mesMax = proyectoActual.fechaMax.slice(4, 7);
        let añoMax = proyectoActual.fechaMax.slice(11, 15);

        let mesEspañolMin;
        let mesEspañolMax;

        switch (mesMin) {
            case 'Jan':
                mesEspañolMin = 'Ene'
                break;

            case 'Feb':
                mesEspañolMin = 'Feb'
                break;

            case 'Mar':
                mesEspañolMin = 'Mar'
                break;

            case 'Apr':
                mesEspañolMin = 'Abr'
                break;

            case 'May':
                mesEspañolMin = 'May'
                break;

            case 'Jun':
                mesEspañolMin = 'Jun'
                break;

            case 'Jul':
                mesEspañolMin = 'Jul'
                break;

            case 'Aug':
                mesEspañolMin = 'Ago'
                break;

            case 'Sep':
                mesEspañolMin = 'Sep'
                break;

            case 'Oct':
                mesEspañolMin = 'Oct'
                break;

            case 'Nov':
                mesEspañolMin = 'Nov'
                break;

            case 'Dec':
                mesEspañolMin = 'Dic'
                break;
        
            default:
                break;
        }

        switch (mesMax) {
            case 'Jan':
                mesEspañolMax = 'Ene'
                break;

            case 'Feb':
                mesEspañolMax = 'Feb'
                break;

            case 'Mar':
                mesEspañolMax = 'Mar'
                break;

            case 'Apr':
                mesEspañolMax = 'Abr'
                break;

            case 'May':
                mesEspañolMax = 'May'
                break;

            case 'Jun':
                mesEspañolMax = 'Jun'
                break;

            case 'Jul':
                mesEspañolMax = 'Jul'
                break;

            case 'Aug':
                mesEspañolMax = 'Ago'
                break;

            case 'Sep':
                mesEspañolMax = 'Sep'
                break;

            case 'Oct':
                mesEspañolMax = 'Oct'
                break;

            case 'Nov':
                mesEspañolMax = 'Nov'
                break;

            case 'Dec':
                mesEspañolMax = 'Dic'
                break;
        
            default:
                break;
        }

        var stringMin = `${diaMin} ${mesEspañolMin} ${añoMin}`;
        var stringMax = `${diaMax} ${mesEspañolMax} ${añoMax}`;
    }

    const onClickEliminar = () => {

        swal({
            title: "Eliminar",
            text: "¿Estás seguro que quieres eliminar este proyecto?",
            icon: "warning",
            buttons: ["Cancel", "Eliminar"]
        }).then(respuesta => {
            if (respuesta) {
                swal({text: "El archivo se ha borrado con éxito",
                icon: "success"});

                eliminarProyecto(proyectoActual)
            }
        })

    }

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <h2 className="fecha-termino">Fecha: {stringMin} - {stringMax}</h2>

            <ul className="listado-tareas" id="contact">
                {tareasdelproyecto.length === 0 
                ? (<li className="tarea tarea-no"><p className="no-hay-tareas">¡¡¡Este proyecto aún no tiene tareas!!!</p></li>)
                : tareasdelproyecto.map(e => (
                    <Tarea
                        key={e.id}
                        tarea={e}
                    />
                ))
                }
            </ul>

            {mobile ? 
                <button
                type="button"
                className="btn btn-eliminar btn-eliminar-proyecto"
                onClick={onClickEliminar}
                >Eliminar Proyecto</button> : null
            }

            {desktop ? 
                <button
                type="button"
                style={{position: 'fixed', top: '87%'}}
                className="btn btn-eliminar btn-eliminar-proyecto"
                onClick={onClickEliminar}
                >Eliminar Proyecto</button> : null
            }
        </Fragment>
    );
};

export default ListadoTarea;