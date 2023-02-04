import React, { useState } from 'react';
import '../App.css';

function TODO_LIST(){
/*    
    const [name, setName] = useState('');
    const [things, setThings] = useState([]);
    const [isFocused, setIsFocused] = useState(false)
    var [id, setId] = useState(0)
    const txAdd = document.getElementById("txAdd")
    
    const handleData = (event) => {
        if(event.key === 'Enter')
            if(txAdd.value !== ''){
                things.push({
                    id: id,
                    name: name,
                    complete: false
                })
                setId(id+1)
                txAdd.blur()
                setTimeout(() => {
                    txAdd.focus();
                },100);
            }
    }

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleCheck = (id) => {
        things.map((thing) => {
            if(thing.id == id){
                if(!thing.complete){
                    thing.complete = true
                }else{
                    thing.complete = false
                }
            }
                
        })
    }

    return(
        <div className="ToDo_List font-lato">
            <div className="w-screen h-screen bg-gradient-to-tl from-violet-400 via-indigo-600 to-fuchsia-500">
                <div className="w-full h-1/2 flex justify-center items-center">
                    <h1 className='stroke font-bold text-9xl absolute text-transparent'>ToDo-List</h1>
                    <h1 className='animate font-bold text-9xl absolute text-indigo-600'>ToDo-List</h1>
                </div>
                <div className="flex flex-col items-center">
                    <input type="text" className={isFocused ? 'outline-none border-none h-10 w-1/6 rounded-lg p-2 capitalize bg-add bg-no-repeat bg-5 bg-right-m filter drop-shadow-glowing placeholder:text-gray-700' : 'outline-none border-none h-10 w-1/6 rounded-lg p-2 capitalize'} placeholder='What will you do?' maxLength={20} value={name} onChange={e => setName(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} onKeyDown={handleData} id='txAdd'/>
                    <div className="bg-white w-1/6 h-64 m-5 shadow-insideShadow rounded-lg p-3 text-gray-600">
                        {things.map(thing => {
                            return(
                                <div className="w-full flex justify-between items-center">
                                    <p key={thing.id} className={thing.complete ? 'capitalize text-gray-300 duration-500' : 'capitalize text-gray-600 duration-500'}>{thing.name}</p>
                                    <div className="flex">
                                        <label htmlFor="completed" className={thing.complete ? 'opacity-100 duration-500' : 'opacity-0 duration-500'}>Completed</label>
                                        <input type="checkbox" name="completed" key={thing.id} onChange={handleCheck(thing.id)} className={thing.complete ? 'ml-2' : 'ml-2'}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
    */
};
export default TODO_LIST