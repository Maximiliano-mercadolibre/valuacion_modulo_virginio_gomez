import React, { Fragment, useContext, useEffect, useState } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import DatePicker from "react-datepicker";
import swal from 'sweetalert';
import { formatDistance } from 'date-fns/esm'
import { es } from 'date-fns/esm/locale'
 
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale, setDefaultLocale } from  "react-datepicker";

const NuevoProyecto = () => {

    //Obtener el state del formulario que se encuentra en el initialState dentro del archivo ProyectoState
    //el useContext que estamos importando aqui (un nuevo hooks) nos permite consumir el proyectoContext y asignar su valor a una variable
    const proyectosContext = useContext(proyectoContext);
    const { 
        formulario,
        agregarProyecto,
        errorformulario,
        mostrarError,
        mostrarFormulario,
        cancelarAgregarProyecto
    } = proyectosContext;

    //State del proyecto
    const [proyecto, setProyecto] = useState({
        nombre: '',
    });

    const [fechaMin, setFechaMin] = useState(null);
    const [fechaMax, setFechaMax] = useState(null);

    useEffect(() => {

        if(fechaMin){
            var stringFechaMin = fechaMin.toString();

            setProyecto({
                ...proyecto,
                fechaMin: stringFechaMin,
            });
        }

        if(fechaMax){
            var stringFechaMax = fechaMax.toString();

            setProyecto({
                ...proyecto,
                fechaMax: stringFechaMax
            });
        }

    }, [fechaMin, fechaMax])

    //destructury
    const { nombre } = proyecto;

    const onSubmitProyecto = e => {
        e.preventDefault();

        //Validar el proyecto
        if (nombre === '' || fechaMin === null || fechaMax === null) {
            mostrarError();
            return;
        }

        setProyecto({
            ...proyecto,
            fechaMin: fechaMin,
            fechaMax: fechaMax
        });

        //Agregar al state
        agregarProyecto(proyecto);

        //Reiniciar el form
        setProyecto({
            nombre: ''
        });

        swal("Felicidades proyecto creado!", "El nuevo proyecto se agregó a tu lista!", "success");

        setFechaMin();
        setFechaMax();

    }

    const onClickCancel = () => {
        //Reiniciar el form
        setProyecto({
            nombre: ''
        });

        cancelarAgregarProyecto();

        setFechaMin();
        setFechaMax();
        return;
    }

    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value,
        })
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormulario()}
            >
                Crear Nuevo Proyecto
            </button>

            {
                formulario ? (
                    <form 
                className="formulario-nuevo-proyecto"
                onSubmit={onSubmitProyecto}
            >
                <b className="labe_nuevo_proyecto">Nombre Del Proyecto</b>
                <input 
                    type="text"
                    className="input-text"
                    placeholder="Ingrese Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={onChangeProyecto}
                    maxLength={29}
                />

                <b className="labe_nuevo_proyecto">Fecha Inicio</b>
                <DatePicker
                    className="datePiker-fecha-min"
                    placeholderText="Ingrese fecha"
                    selected={fechaMin}
                    minDate={new Date()}
                    maxDate={fechaMax}
                    locale={es}
                    onChange={date => setFechaMin(date)}
                />

                <b className="labe_nuevo_proyecto">Fecha Término</b>
                <DatePicker
                    className="datePiker-fecha-max"
                    placeholderText="Ingrese fecha"
                    selected={fechaMax}
                    minDate={fechaMin}
                    locale={es}
                    onChange={date => setFechaMax(date)}
                />

                <input 
                    type="submit"
                    className="btn btn-primario btn-block btn-confirmar-proyecto"
                    value="Confirmar"
                />
                <button 
                    type="button"
                    onClick={onClickCancel}
                    className="btn btn-secundario2 btn-block btn-cancelar-proyecto"
                >Cancelar</button>

            </form>
                ) : null
            }
            { errorformulario ?
             <p className="mensaje error">Tanto el nombre como las fecha del proyecto son obligatorias</p> :
              null}
            
        </Fragment>
    );
};

export default NuevoProyecto;