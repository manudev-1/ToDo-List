import './index.css';
import TODO_LIST from './components/ToDoList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App(){

    return(
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/' element={<TODO_LIST />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;