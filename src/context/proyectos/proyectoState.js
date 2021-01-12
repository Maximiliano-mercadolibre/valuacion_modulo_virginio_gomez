import React, { useReducer, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import swal from 'sweetalert';

import { FirebaseContext } from '../../firebase/index';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    CANCELAR_AGREGAR_PROYECTO
 } from '../../types';

const ProyectoState = props => {

    const tareasContext = useContext(tareaContext);
    const { tareas = {} } = tareasContext;

    //base de datos
    const { firebase } = useContext(FirebaseContext);

    //Estos valores deben venir en la base de datos
    let proyectos = [];

    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario: false,
        proyecto: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    useEffect(() => {
        //Consultar a base de datos Firebase el listado de "Proyectos" y asignale el array de los proyectos a la constante "proyectos" que tenemos creada localmente
        firebase.db.collection('Proyectos').onSnapshot((querySnapshot) => {
            querySnapshot.forEach(doc => {
                proyectos.push({...doc.data(), key: doc.id});
            });
        })
    }, [firebase.db, proyectos, state]);

    //Serie de funciones para el CRUD (Create, Restored, Update & Deleted)
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });
        
    }

    //Obtener los proyectos guardados
    const obtenerProyectosGuardados = () => {
        setTimeout(() =>{
             dispatch({
                type: OBTENER_PROYECTOS,
                payload: proyectos
            })
        }, 2700) 
    }

    //Crear un nuevo proyecto
    const agregarProyecto = async(proyecto) => {
        //Guardar proyecto en la base de datos
        proyecto.id = await uuidv4();
        firebase.db.collection('Proyectos').doc().set(proyecto)

        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        }) 
    }

    //Cancelar agregar un nuevo proyecto
    const cancelarAgregarProyecto = () => {
        dispatch({
            type: CANCELAR_AGREGAR_PROYECTO,
        }) 
    }

    //Validar el formulario en caso de errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO,
        })
    }

    //Selecciona el proyecto que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //Eliminar un proyecto
    const eliminarProyecto = async (proyecto) => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyecto.id
        });

        //Eliminar de base de datos
        await firebase.db.collection('Proyectos').doc(proyecto.key).delete();

        if (tareas !== null) {

            tareas.map(tarea => {
                if (tarea.proyectoId == proyecto.id) {
                    //Eliminar de base de datos
                    firebase.db.collection('Tareas').doc(tarea.key).delete();
                }
            })
        }
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mostrarFormulario,
                obtenerProyectosGuardados,
                agregarProyecto,
                cancelarAgregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    );
};

export default ProyectoState;