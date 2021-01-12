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

export default(state, dispatch) => {
    switch(dispatch.type) {
        case TAREAS_PROYECTOS:
            return {
                ...state,
                tareasdelproyecto: state.tareas.filter(tarea => tarea.proyectoId === dispatch.payload)
            }

            case AGREGAR_TAREA:
            return {
                ...state,
                tareas: [...state.tareas, dispatch.payload],
                errortarea: false
            }

            case VALIDAR_TAREA:
            return {
                ...state,
                errortarea: true
            }

            case ELIMINA_TAREA:
            return {
                ...state,
                tareas: state.tareas.filter(tarea => tarea.id !== dispatch.payload),
                tareaseleccionada: null
            }

            case ACTUALIZAR_TAREA:
            case ESTADO_TAREA:
            return {
                ...state,
                tareas: state.tareas.map(tarea => tarea.id === dispatch.payload.id ? dispatch.payload : tarea),
                tareaseleccionada: null
            }

            case TAREA_ACTUAL:
            return {
                tareaseleccionada: null,
                ...state,
                tareaseleccionada: dispatch.payload
            }

            case CANCELAR_EDITAR_TAREA:
            return {
                ...state,
                tareaseleccionada: null
            }

            default:
                return state;
    }
}