import React, { useState } from "react";
import "../App.css";

function TODO_LIST() {
  // ! Input Edit
  const [inputFocus, setInputFocus] = useState(false);

  const handleInputFocus = () => {
    setInputFocus(true);
  };

  const handleInputBlur = () => {
    setInputFocus(false);
  };

  // ! Title
  const [title, setTitle] = useState("")

  const handleTitle = () => {
    document.title = "ToDo List |"
    setTitle(document.getElementById("txAdd").value)
    document.title += " " + title.charAt(0).toUpperCase() + title.slice(1)
  }

  // ! Todolist
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleInputData = (e) => {
    if (input !== "") {
      const id = todoList.length + 1;
      setTodoList((prev) => [
        ...prev,
        {
          id: id,
          task: input,
          complete: false,
        },
      ]);
      setInput("");
    }
  };

  const handleCompleteTask = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) {
        item = { ...task, complete: !task.complete };
      } else item = { ...task };
      return item;
    });
    setTodoList(list);
    console.log(todoList)
  };

  return (
    <div className="ToDo_List font-lato">
      <div className="w-screen h-screen ">
        <div className="w-full h-1/2 flex justify-center items-center">
          <h1 className="stroke font-bold text-9xl">
            ToDo-List
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-1/6 flex">
            <input
              type="text"
              className={
                inputFocus
                  ? "outline-none border-none h-10 w-5/6 rounded-lg p-2 duration-500 capitalize filter drop-shadow-glowing placeholder:text-gray-200 bg-black text-gray-200"
                  : "outline-none border-none h-10 w-5/6 rounded-lg p-2 duration-500 capitalize placeholder:text-gray-200 bg-black"
              }
              placeholder="What will you do?"
              maxLength={15}
              id="txAdd"
              value={input}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onInput={(e) => setInput(e.target.value)}
              onChange={handleTitle}
            />
            <button
              className={
                inputFocus
                  ? "w-1/6 bg-black rounded-lg text-gray-200 filter drop-shadow-glowing duration-500"
                  : "w-1/6 duration-500 bg-black rounded-lg text-gray-200"
              }
              onClick={() => handleInputData()}
            >
              Add
            </button>
          </div>
          <div className="bg-white w-1/6 h-64 m-5 shadow-insideShadow rounded-lg p-3 text-gray-600">
            {todoList.map((task) => {
              return (
                <div
                  className="flex justify-between items-center"
                  complete={String(task.complete)}
                  id={task.id}
                  onClick={() => handleCompleteTask(task.id)}
                >
                  <p className={task.complete ? 'capitalize text-gray-300 duration-500' : 'capitalize text-gray-600 duration-500'}>{task.task}</p>
                  <p className={task.complete ? 'capitalize text-green-400 opacity-100 duration-500 font-semibold' : 'duration-500 opacity-0'}>Completed</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default TODO_LIST;
