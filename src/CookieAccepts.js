import './App.css';

function CookieAccepts() {

  const p = document.querySelectorAll("#p")

  p.forEach((element) => {
    var char = element.innerHTML.split("")
  })

  return (
    <div className="CookieAccepts">
      <div className="w-screen h-screen bg-gradient-to-tl from-violet-400 via-indigo-600 to-fuchsia-500 flex justify-center items-center">
        <p className='text-6xl absolute font-bold text-opac z-0' id='p'>TODO LIST</p>
        <p className='text-6xl absolute font-bold text-opac z-0' id='p'>TODO LIST</p>
        <div className="w-72 h-72 bg-white rounded-lg flex flex-col items-center z-10">
          <h1 className='m-4 font-medium text-2xl'>ToDo List</h1>
          <p className='mx-4 text-center font-extralight'>This site needs your consent to storage the information.</p>
          <p className='mx-4 text-center font-extralight'>Check the checkbox to agree or unfortunally you will not able to access to the site</p>
          <div className="m-4">
            <input type="checkbox" name="coockiAccepts" id="cookieAccepts" className='mx-1'/>
            <label htmlFor="coockiAccepts" className='mx-1'>Agree</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieAccepts;
