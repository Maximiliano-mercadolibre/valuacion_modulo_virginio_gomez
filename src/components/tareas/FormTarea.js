import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { v4 as uuidv4 } from 'uuid';

const FormTarea = () => {
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { 
        tareaseleccionada,
        errortarea,
        agregarTarea,
        validarTarea,
        obtenerTareas,
        actualizarTarea,
        cancelarAgregarTarea
    } = tareasContext;

    useEffect(() => {
        if (tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada)
        }else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada]);

    //State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: '',
    });

    const { nombre } = tarea;

    //Si no hay proyecto seleccionado
    if (!proyecto) return null;

    //Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] = proyecto;

    //Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    };

    const onSubmit = e => {
        e.preventDefault();

        //Validar
        if (nombre.trim() === '') {
            validarTarea();
            return
        }

        //Si es edición o si es nueva tarea
        if (tareaseleccionada === null) {
            //tarea nueva
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;
            tarea.id = uuidv4();

            agregarTarea(tarea);
            
        }else {
            //Actualizar tarea existente
            actualizarTarea(tarea)
        }

        //Obtener y filtrar las tareas del proeycto actual
        obtenerTareas(proyectoActual.id);

        //Reiniciar el form
        guardarTarea({
            nombre: ''
        });
    };

    const onClickCancel = () => {

        cancelarAgregarTarea();

        //Reiniciar el form
        guardarTarea({
            nombre: ''
        });

        return;
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        maxLength={20}
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type="submit"
                        className={tareaseleccionada ? 'btn btn-primario-dos btn-submit-dos btn-block' : 'btn btn-primario btn-submit btn-block'}
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar nueva tarea al proyecto'}
                    />
                    {tareaseleccionada ?
                        <button
                        type="button"
                        className="btn btn-primario-cancel btn-submit-tres btn-block"
                        onClick={onClickCancel}
                        >
                            Cancelar
                        </button> : null
                    }
                    
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tearea es obligatorio</p> : null}
        </div>
    );
};

export default FormTarea;