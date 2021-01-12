import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    CANCELAR_AGREGAR_PROYECTO
 } from '../../types';

export default(state, dispatch) => {
    switch(dispatch.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            }
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: dispatch.payload
            }

        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, dispatch.payload],
                formulario: false,
                errorformulario: false
            }

        case CANCELAR_AGREGAR_PROYECTO:
            return {
                ...state,
                formulario: false,
                errorformulario: false
            }

        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true
            }

        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter(e => e.id === dispatch.payload)
            }

        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(e => e.id !== dispatch.payload),
                proyecto: null
            }

        default:
            return state;
    }
}