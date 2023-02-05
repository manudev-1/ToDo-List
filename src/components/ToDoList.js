import React, { useState, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../App.css";
import trashCan from "../assets/trash-can.svg";

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
  const [title, setTitle] = useState("");

  const handleTitle = () => {
    document.title = "ToDo List |";
    setTitle(document.getElementById("txAdd").value);
    document.title += " " + title.charAt(0).toUpperCase() + title.slice(1);
  };

  // ! Todolist
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const dragItem = useRef();
  const dragOverItem = useRef();

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
        },
      ]);
      setInput("");
    }
  };

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
            deleted: false
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
  };

  const handleDistance = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id)
        item = { ...task, trashNear: !task.trashNear };
      else item = { ...task };
      return item;
    });
    setTodoList(list);
  };

  const handleDelete = (id) => {
    let list = todoList.map((task) => {
      let item = {}
      if (task.id === id)
        item = { ...task, deleted: true }
      else item = { ...task }
      return item
    });
    setTodoList(list)
  };

  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const drop = (e) => {
    const copyListItems = [...todoList];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTodoList(copyListItems);
  };

  return (
    <div className="ToDo_List font-lato">
      <div className="w-screen h-screen ">
        <div className="w-full h-1/2 flex justify-center items-center">
          <h1 className="stroke font-bold text-9xl">ToDo-List</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-1/6 flex">
            <input
              type="text"
              className={
                inputFocus
                  ? "outline-none border-none h-10 w-5/6 rounded-lg p-2 duration-500 capitalize filter drop-shadow-glowing placeholder:text-gray-200 bg-black text-gray-200"
                  : "outline-none border-none h-10 w-5/6 rounded-lg p-2 duration-500 capitalize placeholder:text-gray-200 bg-black text-gray-200"
              }
              placeholder="What will you do?"
              maxLength={15}
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
          <div className="w-1/6 m-5 text-gray-600">
            <DragDropContext>
              {todoList.map((task, index) => {
                return (
                  <div className="flex items-center">
                    <div
                      className={task.deleted ? 'hidden' :"flex justify-between items-center cursor-pointer border-2 border-solid border-black border-collapse px-5 py-2 w-full my-2"}
                      complete={String(task.complete)}
                      id={task.id}
                      onClick={() => handleCompleteTask(task.id)}
                      onDragStart={(e) => dragStart(e, index)}
                      onDragEnter={(e) => dragEnter(e, index)}
                      onDragEnd={drop}
                      draggable
                    >
                      <p
                        className={
                          task.complete
                            ? "capitalize text-gray-300 duration-500 line-through text-left"
                            : "capitalize text-gray-600 duration-500 text-left"
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
                        task.trashNear ? "animate__infinite animate__heartBeat cursor-pointer duration-500 w-10" : "animate-none cursor-pointer duration-500 w-10"
                      }
                      style= {
                        {'display': task.deleted ? 'none' : 'block'}
                      }
                      src={trashCan}
                      alt="trashCan"
                      onMouseEnter={() => handleDistance(task.id)}
                      onMouseOver={() => handleDistance(task.id)}
                      onMouseLeave={() => handleDistance(task.id)}
                      onClick={() => handleDelete(task.id)}
                    />
                  </div>
                );
              })}
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TODO_LIST;

/*
            <DragDropContext>
              <Droppable droppableId="taks">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {todoList.map((task, index) => {
                      return (
                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                          {(provided) => (
                            <section className="flex items-center" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                              <div
                                className={task.deleted ? 'hidden' :"flex justify-between items-center border-2 border-solid border-black border-collapse px-5 py-2 w-full my-2"}
                                complete={String(task.complete)}
                                onClick={() => handleCompleteTask(task.id)}
                                //onDragStart={(e) => dragStart(e, index)}
                                //onDragEnter={(e) => dragEnter(e, index)}
                                //onDragEnd={drop}
                                //draggable
                              >
                                <p
                                  className={
                                    task.complete
                                      ? "capitalize text-gray-300 duration-500 line-through text-left"
                                      : "capitalize text-gray-600 duration-500 text-left"
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
                                  task.trashNear ? "animate__infinite animate__heartBeat cursor-pointer duration-500 w-10" : "animate-none cursor-pointer duration-500 w-10"
                                }
                                style= {
                                  {'display': task.deleted ? 'none' : 'block'}
                                }
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
                </div>
                )}
              </Droppable>
            </DragDropContext>
*/ 