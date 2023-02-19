import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AOS from "aos";
import "aos/dist/aos.css";
import "../App.css";
import trashCan from "../assets/trash-can.svg";
import drag from "../assets/drag.svg";
import close from "../assets/close.svg";
import undo from "../assets/undo.svg";
import edit from "../assets/editing.png"
import ContentEditable from "react-contenteditable";

function TODO_LIST() {
  // ! Init AOS
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  // ! Get In LocalStorage
  const getLocalStorage = () => {
    let list = localStorage.getItem("list");

    if (list) return JSON.parse(localStorage.getItem("list"));
    else return [];
  };

  const getTotDeteled = () => {
    let list = localStorage.getItem("totDeleted");

    if (list) return JSON.parse(localStorage.getItem("totDeleted"));
    else return [];
  };

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
  const [todoList, setTodoList] = useState(getLocalStorage());
  const [isDragged, setDragged] = useState(false);
  const [totDeleted, setTotDeleted] = useState(getTotDeteled());

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
          hoverUndo: false,
          editMode: false,
        },
      ]);
      setInput("");
      localStorage.setItem("list", JSON.stringify(todoList));
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
            hoverUndo: false,
            editMode: false,
          },
        ]);
        setInput("");
        localStorage.setItem("list", JSON.stringify(todoList));
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
    localStorage.setItem("list", JSON.stringify(todoList));
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
    localStorage.setItem("list", JSON.stringify(todoList));
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
    localStorage.setItem("list", JSON.stringify(todoList));
  };

  // * Delete Task
  const handleDelete = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id)
        item = { ...task, deleted: true, hoverUndo: false, editMode: false };
      else item = { ...task };
      return item;
    });
    setTodoList(list);
    setTotDeleted(totDeleted + 1);
    localStorage.setItem("totDeleted", totDeleted);
    localStorage.setItem("list", JSON.stringify(todoList));
  };

  // * Drag Memory Function
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const list = Array.from(todoList);
    const [reorderedTask] = list.splice(result.source.index, 1);
    list.splice(result.destination.index, 0, reorderedTask);

    if (todoList.length > 1) setDragged(false);
    setTodoList(list);
    localStorage.setItem("list", JSON.stringify(todoList));
  };

  // * Dragged or Not
  const handleDrag = () => {
    if (todoList.length > 1) setDragged(true);
  };

  // ! Menu of Deleted
  const [deletedMenu, setDeletedMenu] = useState(false);

  const handleMenu = () => {
    setDeletedMenu(!deletedMenu);
  };

  const hoverUndoEnter = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) item = { ...task, hoverUndo: true, trashNear: false };
      else item = { ...task };
      return item;
    });
    setTodoList(list);
    localStorage.setItem("list", JSON.stringify(todoList));
  };

  const hoverUndoLeave = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) item = { ...task, hoverUndo: false };
      else item = { ...task };
      return item;
    });
    setTodoList(list);
    localStorage.setItem("list", JSON.stringify(todoList));
  };

  const handleUndo = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) item = { ...task, deleted: false };
      else item = { ...task };
      return item;
    });
    setTodoList(list);
    setTotDeleted(totDeleted - 1);
    localStorage.setItem("totDeleted", totDeleted);
    localStorage.setItem("list", JSON.stringify(todoList));
  };

  // ! Set in LocalStorage

  // * Tasks
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todoList));
  }, [todoList]);

  // * totDeleted
  useEffect(() => {
    localStorage.setItem("totDeleted", JSON.stringify(Number(totDeleted)));
  }, [totDeleted]);

  // ! Clean Deleted Item

  const handleDefTrash = () => {
    let items = JSON.parse(localStorage.getItem("list"));
    let filter = items.filter((item) => item.deleted === false);
    setTodoList(filter);
    localStorage.setItem("list", JSON.stringify(todoList));
    setTotDeleted(Number(0));
    localStorage.setItem("totDeleted", Number(0));
  };

  // ! Editing mode

  const handleEditing = (id) => {
    let list = todoList.map((task) => {
        let item = {};
        if (task.id === id) 
          if (!task.complete) item = { ...task, editMode: !task.editMode };
          else item = { ...task };
        else item = { ...task };
        return item;
    });
    setTodoList(list);
    localStorage.setItem("list", JSON.stringify(todoList));
  };

  const handleEdit = (id) => {
    var contect = document.getElementById(id).innerHTML
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) item = { ...task, task: contect};
      else item = { ...task };
      return item;
    });
    setTodoList(list);
    localStorage.setItem("list", JSON.stringify(todoList));
  };

  return (
    <div className="ToDo_List font-lato">
      <div
        className="w-full h-1/2 flex justify-center items-center"
        data-aos-duration="600"
        data-aos="zoom-in-down"
      >
        <h1 className="stroke font-bold xl:text-9xl text-5xl my-24">
          ToDo-List
        </h1>
      </div>
      <div
        className="flex flex-col items-center"
        data-aos-duration="600"
        data-aos="zoom-in-down"
        data-aos-delay="250"
      >
        <div className="xl:w-1/3 flex w-5/6 justify-center">
          <input
            type="text"
            className={
              inputFocus
                ? "outline-none border-none h-10 xl:w-11/12 w-5/6 rounded-lg p-2 duration-500 capitalize filter drop-shadow-shaded placeholder:text-gray-200 bg-black text-gray-200"
                : "outline-none border-none h-10 xl:w-11/12 w-5/6 rounded-lg p-2 duration-500 capitalize placeholder:text-gray-200 bg-black text-gray-200"
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
        <div className="xl:w-2/6 w-5/6 m-5 text-gray-600">
          <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleDrag}>
            <Droppable droppableId="task">
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
                            className={
                              task.deleted
                                ? "w-full justify-center my-0 hidden"
                                : "w-full flex justify-center my-5 !left-auto !top-auto items-center"
                            }
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <img
                              src={drag}
                              alt=""
                              {...provided.dragHandleProps}
                              onDrag={handleDrag}
                              className="h-5 m-2 duration-500"
                              style={{
                                display: task.deleted ? "none" : "block",
                              }}
                            />
                            <div
                              className={
                                task.deleted
                                  ? "hidden my-0"
                                  : "flex justify-between items-center border-2 border-solid border-black px-5 py-2 my-2 w-full"
                              }
                              complete={String(task.complete)}
                            >
                              <ContentEditable
                                id={task.id}
                                className={`capitalize text-ellipsis outline-none ${task.complete ? 'text-gray-200 line-through duration-500' : null} ${task.editMode ? 'underline duration-500' : null} ${task.editMode ? 'text-black' : null}`}
                                html={task.task}
                                disabled={!task.editMode}
                                onChange={() => handleEdit(task.id)}
                              />
                              <div className="flex justify-center">
                                <p
                                  className={`capitalize font-bold duration-500 float-right mr-2 ${task.complete ? "text-black opacity-100 duration-500" : 'opacity-0'}`}
                                >
                                  Completed
                                </p>
                                <div className={`border-2 border-black rounded-full w-5 h-5 relative cursor-pointer ${task.complete ? 'bg-black' : null}`} onClick={() => handleCompleteTask(task.id)}></div>
                              </div>
                            </div>
                            <img
                              className={
                                task.trashNear
                                  ? "cursor-pointer transition scale-125 w-5"
                                  : "cursor-pointer transition scale-100 w-5"
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
                            <img src={edit} alt="" className={`w-5 ${task.complete ? null : 'cursor-pointer'}`} onClick={() => handleEditing(task.id)}/>
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
      <div
        className={`absolute top-0 -left-20 transition w-fit h-fit m-2 rounded-full filter drop-shadow-glowing cursor-pointer ${totDeleted > 0 ? "border-2 border-black !left-0" : null }`}
        onClick={handleMenu}
      >
        <div
          className={
            totDeleted > 0
              ? "absolute bg-gray-500 w-4 h-4 rounded-full right-0 z-10 animate-ping opacity-100 duration-500"
              : "duration-500 opacity-0"
          }
        ></div>
        <div
          className={
            totDeleted > 0
              ? "absolute bg-gray-500 w-4 h-4 rounded-full right-0 z-10 opacity-100 duration-500"
              : "duration-500 opacity-0"
          }
        ></div>
        <img
          src={trashCan}
          alt=""
          className={
            totDeleted > 0
              ? "relative w-14 p-2 z-0 opacity-100 duration-500"
              : "duration-500 opacity-0"
          }
        />
      </div>
      <div
        className={
          deletedMenu ? "absolute w-full h-full inset-0" : "pointer-events-none"
        }
      >
        <div
          className={
            deletedMenu
              ? "transition fixed bg-black xl:w-1/6 w-5/6 h-full translate-x-0 top-0 text-white duration-500 z-10 overflow-y-scroll scrollbar scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-700 scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-track-gray-400"
              : "transition absolute -translate-x-full xl:w-1/6 w-5/6 h-full top-0 duration-500"
          }
        >
          <div className="m-4">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-xl">Deleted Tasks</h1>
              <img
                src={close}
                alt=""
                className="w-5 cursor-pointer"
                onClick={handleMenu}
              />
            </div>
            <hr />
            {todoList.map((task) => {
              if (totDeleted > 0)
                if (task.deleted) {
                  return (
                    <div className="m-4">
                      <div className="flex justify-between my-5">
                        {totDeleted > 0 ? (
                          <p className="capitalize w-5/6 overflow-hidden text-left">
                            {task.task}
                          </p>
                        ) : (
                          <p className="capitalize w-5/6 overflow-hidden text-left">
                            Empty Trash!
                          </p>
                        )}
                        <img
                          src={undo}
                          alt=""
                          className={
                            task.hoverUndo
                              ? "w-5 cursor-pointer animate-spin"
                              : "w-5 cursor-pointer"
                          }
                          onClick={() => handleUndo(task.id)}
                          onMouseEnter={() => hoverUndoEnter(task.id)}
                          onMouseLeave={() => hoverUndoLeave(task.id)}
                        />
                      </div>
                      <hr />
                    </div>
                  );
                } else return <div className=""></div>;
              else return <div className="my-2">Empty Trash!</div>;
            })}
          </div>
          <div className="absolute bottom-0 w-full h-10 flex justify-center items-center border-t-2">
            <button className="font-bold" onClick={handleDefTrash}>
              Empty Your Trash!
            </button>
          </div>
        </div>
        <div
          className={
            deletedMenu
              ? "fixed w-full h-full bg-opacH inset-0 z-0 duration-500 opacity-100"
              : "opacity-0 pointer-events-none duration-500"
          }
          onClick={handleMenu}
        ></div>
      </div>
    </div>
  );
}

export default TODO_LIST;
