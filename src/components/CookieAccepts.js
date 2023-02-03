import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function CookieAccepts() {

  return (
    <div className="CookieAccepts">
        <div className="relative w-screen h-screen flex justify-center">
          <h1 className='stroke font-bold text-9xl absolute text-transparent my-5'>ToDo List</h1>
          <h1 className='animate font-bold text-9xl absolute text-cyan-400 my-5'>ToDo List</h1>
          <div className="w-screen h-screen bg-gradient-to-tl from-violet-400 via-indigo-600 to-fuchsia-500 flex flex-col justify-center items-center">
            <div className="w-72 h-72 bg-white rounded-lg flex flex-col items-center justify-center z-10 duration-700"id='card'>
              <p className='m-4 text-center'>This site needs your consent to storage the information.</p>
              <p className='mx-4 text-center'>Check the checkbox to agree or unfortunally you will not able to access to the site</p>
              <div className="m-4">
                <Link to="/to-do">
                  <input type="checkbox" name="coockiAccepts" id="cookieAccepts" className='mx-1'/>
                </Link>
                <label htmlFor="coockiAccepts" className='mx-1 font-bold'>Agree</label>
              </div>
            </div>
            <div className="flex">
              <p className='mr-2 my-2 font-extralight text-white'>Thank you for choosing us!</p>
              <p className='mx-2 my-2 font-extralight text-white'>We wish you a great experience</p>
              <p className='ml-2 my-2 font-extralight text-white'>And remember to never give up!</p>
            </div>
          </div>
        </div>
    </div>
  );
}

export default CookieAccepts;
