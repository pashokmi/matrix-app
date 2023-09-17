import InputForm, {InputData} from './components/InputForm';
import MatrixTable from './components/MatrixTable';
import {MatrixProvider, useMatrix} from './context/MatrixProvider';

// Компонент App
function App() {


    return (
        <MatrixProvider>
            <div className="container">
                <h1>Matrix generator</h1>
                <InputForm/>
                <MatrixTable/>
            </div>
        </MatrixProvider>
    );
}

export default App;
