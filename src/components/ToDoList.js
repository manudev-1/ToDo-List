import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../App.css";
import trashCan from "../assets/trash-can.svg";
import drag from "../assets/drag.svg";

function TODO_LIST() {
  // ! Input Edit
  // * Focus Var
  const [inputFocus, setInputFocus] = useState(false);

  // * Focus Detection
  const handleInputFocus = () => {
    setInputFocus(true);
  };

  // * Blur Detection
  const handleInputBlur = () => {
    setInputFocus(false);
  };

  // ! Title
  // * Title Var
  const [title, setTitle] = useState("");

  // * Title Modify
  const handleTitle = () => {
    document.title = "ToDo List |";
    setTitle(document.getElementById("txAdd").value);
    document.title += " " + title.charAt(0).toUpperCase() + title.slice(1);
  };

  // ! ToDolist
  // * ToDoList Var
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isDragged, setDragged] = useState(false);

  // * Input from btn
  const handleInputData = () => {
    if (input !== "") {
      const id = todoList.length + 1;
      setTodoList((prev) => [
        ...prev,
        {
          id: id,
          task: input,
          complete: false,
          trashNear: false,
          deleted: false,
        },
      ]);
      setInput("");
    }
  };

  // * Input from KB
  const handleInputDataKB = (e) => {
    if (e.key === "Enter")
      if (input !== "") {
        const id = todoList.length + 1;
        setTodoList((prev) => [
          ...prev,
          {
            id: id,
            task: input,
            complete: false,
            trashNear: false,
            deleted: false,
          },
        ]);
        setInput("");
      }
  };

  // * Complete Task
  const handleCompleteTask = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) {
        item = { ...task, complete: !task.complete };
      } else item = { ...task };
      return item;
    });
    setTodoList(list);
  };

  // * Manage Near to TrashCan Icon
  const handleDistance = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) item = { ...task, trashNear: !task.trashNear };
      else item = { ...task };
      return item;
    });
    setTodoList(list);
  };

  // * Delete Task
  const handleDelete = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) item = { ...task, deleted: true };
      else item = { ...task };
      return item;
    });
    setTodoList(list);
  };

  // * Drag Memory Function
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const list = Array.from(todoList);
    const [reorderedTask] = list.splice(result.source.index, 1);
    list.splice(result.destination.index, 0, reorderedTask);

    setDragged(false);
    setTodoList(list);
  };

  // * Dragged or Not
  const handleDrag = () => {
    if(todoList.length > 1)
      setDragged(true);
  };

  return (
    <div className="ToDo_List font-lato">
      <div className="w-full h-1/2 flex justify-center items-center">
        <h1 className="stroke font-bold text-9xl my-24">ToDo-List</h1>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-1/3 flex">
          <input
            type="text"
            className={
              inputFocus
                ? "outline-none border-none h-10 w-11/12 rounded-lg p-2 duration-500 capitalize filter drop-shadow-glowing placeholder:text-gray-200 bg-black text-gray-200"
                : "outline-none border-none h-10 w-11/12 rounded-lg p-2 duration-500 capitalize placeholder:text-gray-200 bg-black text-gray-200"
            }
            placeholder="What will you do?"
            maxLength={35}
            id="txAdd"
            value={input}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onInput={(e) => setInput(e.target.value)}
            onChange={handleTitle}
            onKeyDown={handleInputDataKB}
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
        <div className="w-2/6 m-5 text-gray-600">
          <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleDrag}>
            <Droppable droppableId="taks">
              {(provided) => (
                <section {...provided.droppableProps} ref={provided.innerRef} className={isDragged ? 'w-full opacity-50 duration-500' : 'w-full duration-500'}>
                  {todoList.map((task, index) => {
                    return (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <section
                            className="w-full flex justify-center"
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <img
                              src={drag}
                              alt=""
                              {...provided.dragHandleProps}
                              onDrag={handleDrag}
                              className="w-5 m-2 duration-500"
                              style={{display: task.deleted ? 'none' : 'block'}}
                            />
                            <div
                              className={
                                task.deleted
                                  ? "hidden"
                                  : "flex justify-between items-center border-2 border-solid border-black px-5 py-2 my-2 w-full cursor-pointer "
                              }
                              complete={String(task.complete)}
                              onClick={() => handleCompleteTask(task.id)}
                            >
                              <p
                                className={
                                  task.complete
                                    ? "capitalize text-gray-300 duration-500 line-through text-left text-ellipsis"
                                    : "capitalize text-gray-600 duration-500 text-left text-ellipsis"
                                }
                              >
                                {task.task}
                              </p>
                              <p
                                className={
                                  task.complete
                                    ? "capitalize text-black opacity-100 duration-500 font-semibold"
                                    : "duration-500 opacity-0 capitalize font-semibold"
                                }
                              >
                                Completed
                              </p>
                            </div>
                            <img
                              className={
                                task.trashNear
                                  ? "animate__infinite animate__heartBeat cursor-pointer duration-500 w-10"
                                  : "animate-none cursor-pointer duration-500 w-10"
                              }
                              style={{
                                display: task.deleted ? "none" : "block",
                              }}
                              src={trashCan}
                              alt="trashCan"
                              onMouseEnter={() => handleDistance(task.id)}
                              onMouseLeave={() => handleDistance(task.id)}
                              onClick={() => handleDelete(task.id)}
                            />
                          </section>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </section>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default TODO_LIST;
