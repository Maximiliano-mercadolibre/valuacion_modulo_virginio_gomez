import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import swal from 'sweetalert';

const Tarea = ({tarea}) => {
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual } = tareasContext;

    //Funcion que se ejecuta cuando el usuario presiona el boton de eliminar tarea
    const handleOnClickEliminarTarea = () => {

        swal({
            title: "Eliminar",
            text: "¿Estás seguro que quieres eliminar esta tarea?",
            icon: "warning",
            buttons: ["Cancel", "Eliminar"]
        }).then(respuesta => {
            if (respuesta) {
                swal({text: "Tarea eliminada con éxtio",
                icon: "success", timer:"2500"});

                eliminarTarea(tarea);
                obtenerTareas(proyecto[0].id)
            }
        })
    };

    //funcion cambia status de la tarea
    const cambiarEstado = (tarea) =>{
        if (tarea.estado) {
            tarea.estado = false;
        } else { 
            tarea.estado = true;
        }
        cambiarEstadoTarea(tarea);
    };

    //Agregar una tarea actual cuando el usuario desea editarla
    const handleOnClickSeleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    };

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado ? (<button className="completo" type="button" onClick={() => cambiarEstado(tarea)}>Tarea Completada</button>)
                : (<button className="incompleto" type="button" onClick={() => cambiarEstado(tarea)}>Marcar completado</button>)}
            </div>

            <div className="acciones">
                <button
                type="button"
                className="btn btn-primario"
                onClick={() => handleOnClickSeleccionarTarea(tarea)}
                >Editar</button>

                <button
                type="button"
                className="btn btn-secundario"
                onClick={() => handleOnClickEliminarTarea(tarea.id)}
                >Eliminar</button>
            </div>
        </li>
    );
};

export default Tarea;