import React, { useReducer, useEffect, useContext } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import { FirebaseContext } from '../../firebase/index';

import { 
    TAREAS_PROYECTOS,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINA_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    CANCELAR_EDITAR_TAREA
 } from '../../types/index';


const TareaState = props => {

    const { firebase } = useContext(FirebaseContext);

    const initialState = {
        tareas: [],
        tareasdelproyecto: null,
        errortarea: false,
        tareaseleccionada: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    useEffect(() => {
        firebase.db.collection('Tareas').onSnapshot((querySnapshot) => {
            querySnapshot.forEach(doc => {
                initialState.tareas.push({...doc.data(), key: doc.id});
            });
        })
    }, [state, firebase.db, initialState]);

    //Obtener tareas de un proyecto
    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTOS,
            payload: proyectoId,
        })
    }

    //Agregar una tarea nueva al proyecto seleccionado
    const agregarTarea = (tarea) => {

        //Guardar tareas en base de datos
        firebase.db.collection('Tareas').doc().set(tarea)

        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    //Valida y muestra un error al ingresar una tarea
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA,
        })
    }

    //Eliminar tarea
    const eliminarTarea = tarea => {
        dispatch({
            type: ELIMINA_TAREA,
            payload: tarea.id
        })

        //Eliminar de base de datos
        firebase.db.collection('Tareas').doc(tarea.key).delete();
    }

    //Cambiar estado de tarea
    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
        //Actualizar datos de tarea base de datos
        firebase.db.collection('Tareas').doc(tarea.key).update(tarea);
    }

    //Extraer una tarea para Editarla
    const guardarTareaActual = async (tarea) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //Edita o modifica una tarea
    const actualizarTarea = tarea => {
        
        //Actualizar datos de tarea base de datos
        firebase.db.collection('Tareas').doc(tarea.key).update(tarea);

        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    }

    //Cancelar agregar una nueva tarea
    const cancelarAgregarTarea = () => {
        dispatch({
            type: CANCELAR_EDITAR_TAREA,
        }) 
    }

    return (
        <TareaContext.Provider
        value={{
            tareas: state.tareas,
            tareasdelproyecto: state.tareasdelproyecto,
            errortarea: state.errortarea,
            tareaseleccionada: state.tareaseleccionada,
            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
            cambiarEstadoTarea,
            guardarTareaActual,
            actualizarTarea,
            cancelarAgregarTarea
        }}
        >
            {props.children}
        </TareaContext.Provider>
    );
};

export default TareaState;