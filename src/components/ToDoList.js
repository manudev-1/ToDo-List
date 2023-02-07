import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../App.css";
import trashCan from '../assets/trash-can.svg';
import drag from '../assets/drag.svg';
import close from '../assets/close.svg'
import undo from '../assets/undo.svg'

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
  const [howDeleted, setHowDeleted] = useState(0)

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
          hoverUndo: false
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
            hoverUndo: false
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
  const handleEnterTrash = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) item = { ...task, trashNear: true };
      else item = { ...task };
      return item;
    });
    setTodoList(list);
  };

  // * Manage Near to TrashCan Icon
  const handleLeaveTrash = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) item = { ...task, trashNear: false };
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
    setHowDeleted(howDeleted+1)
  };

  // * Drag Memory Function
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const list = Array.from(todoList);
    const [reorderedTask] = list.splice(result.source.index, 1);
    list.splice(result.destination.index, 0, reorderedTask);

    if (todoList.length > 1) setDragged(false);
    setTodoList(list);
  };

  // * Dragged or Not
  const handleDrag = () => {
    if (todoList.length > 1) setDragged(true);
  };

  // ! Menu of Deleted
  const [deletedMenu, setDeletedMenu] = useState(false)

  const handleMenu = () => {
    setDeletedMenu(!deletedMenu)
  }

  const hoverUndoEnter = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) item = { ...task, hoverUndo: true };
      else item = { ...task };
      return item;
    });
    setTodoList(list)
  }

  const hoverUndoLeave = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) item = { ...task, hoverUndo: false };
      else item = { ...task };
      return item;
    });
    setTodoList(list)
  }

  const handleUndo = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) item = { ...task, deleted: false };
      else item = { ...task };
      return item;
    });
    setTodoList(list)
    setHowDeleted(howDeleted-1)
  }

  /*
  const disableScroll = () => {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    console.log(scrollTop)
    console.log(scrollLeft)

    window.scrollTo(scrollLeft, scrollTop);
  }
  */

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
                ? "outline-none border-none h-10 w-11/12 rounded-lg p-2 duration-500 capitalize filter drop-shadow-shaded placeholder:text-gray-200 bg-black text-gray-200"
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
                ? "w-1/6 bg-black rounded-lg text-gray-200 filter drop-shadow-shaded duration-500"
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
                <section
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={
                    isDragged
                      ? "w-full opacity-50 duration-500"
                      : "w-full duration-100"
                  }
                >
                  {todoList.map((task, index) => {
                    return (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <section
                            className={task.deleted ? 'w-full flex justify-center m-0' : 'w-full flex justify-center m-1'}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <img
                              src={drag}
                              alt=""
                              {...provided.dragHandleProps}
                              onDrag={handleDrag}
                              className="w-5 m-2 duration-500"
                              style={{
                                display: task.deleted ? "none" : "block",
                              }}
                            />
                            <div
                              className={
                                task.deleted
                                  ? "hidden my-0"
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
                                  ? "cursor-pointer duration-100 w-14"
                                  : "cursor-pointer duration-100 w-10"
                              }
                              style={{
                                display: task.deleted ? "none" : "block",
                              }}
                              src={trashCan}
                              alt="trashCan"
                              onMouseEnter={() => handleEnterTrash(task.id)}
                              onMouseLeave={() => handleLeaveTrash(task.id)}
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
      <div className={howDeleted > 0 ? "absolute inset-0 w-fit h-fit m-2 rounded-full filter drop-shadow-glowing border-2 border-black cursor-pointer" : 'w-fit h-fit'} onClick={handleMenu}>
        <div className= {howDeleted > 0 ? "absolute bg-gray-500 w-4 h-4 rounded-full right-0 z-10 animate-ping opacity-100 duration-500" : 'duration-500 opacity-0'}></div>
        <div className={howDeleted > 0 ? "absolute bg-gray-500 w-4 h-4 rounded-full right-0 z-10 opacity-100 duration-500" : 'duration-500 opacity-0'}></div>
        <img src={trashCan} alt="" className={howDeleted > 0 ? 'relative w-14 p-2 z-0 opacity-100 duration-500' : 'duration-500 opacity-0'}/>
      </div>
      <div className={deletedMenu ? "transition absolute bg-black w-1/6 h-full translate-x-0 top-0 text-white duration-500 z-10 overflow-y-scroll scrollbar scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-700 scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-track-gray-400" : 'transition absolute -translate-x-full w-1/6 h-full top-0 duration-500'}>
        <div className="m-4">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-xl">Deleted Tasks</h1>
            <img src={close} alt="" className="w-5 cursor-pointer" onClick={handleMenu}/>
          </div>
          <hr />
          {todoList.map(task => {
            if(task.deleted){
              return(
                <div className="m-4">
                  <div className="flex justify-between my-5">
                    <p className="capitalize w-5/6 overflow-hidden text-left">{task.task}</p>
                    <img src={undo} alt="" className={task.hoverUndo ? "w-5 cursor-pointer animate-spin" : 'w-5 cursor-pointer'} onClick={() => handleUndo(task.id)} onMouseEnter={() => hoverUndoEnter(task.id)} onMouseLeave={() => hoverUndoLeave(task.id)}/>
                  </div>
                  <hr />
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className={deletedMenu ? 'absolute w-full h-full bg-opacH inset-0 z-0 duration-500 opacity-100' : 'opacity-0 pointer-events-none duration-500'} onClick={handleMenu}></div>
    </div>
  );
}

export default TODO_LIST;
