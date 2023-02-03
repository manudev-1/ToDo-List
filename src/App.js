import './index.css';
import CookieAccepts from './components/CookieAccepts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App(){
    return(
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/' element={<CookieAccepts />}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App;