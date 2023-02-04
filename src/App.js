import './index.css';
import CookieAccepts from './components/CookieAccepts';
import TODO_LIST from './components/ToDoList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App(){

    return(
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path='/' element={<CookieAccepts />} />
                    <Route path='/ToDo-List' element={<TODO_LIST />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;