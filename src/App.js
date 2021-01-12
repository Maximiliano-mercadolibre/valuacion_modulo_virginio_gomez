import Proyectos from './components/proyectos/Proyectos';
import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import firebase, { FirebaseContext } from './firebase/index';

function App() {

  return (
    <FirebaseContext.Provider value={{firebase}}>
      <TareaState>
        <ProyectoState>
          <div className="App">
           <Proyectos />
          </div>
        </ProyectoState>
      </TareaState>
    </FirebaseContext.Provider>
      
  );
}

export default App;
