# ToDo-List

The goal was to create a To Do List, where the user can Add, Edit, Move and Remove the task that they created.

## Infos

### Reasons:

I decide to create this type of App cause I like to undertake ambitious challenge to try get every time a better version of me.

### Build Status:

The App is currently in development.

### Code Style:

Code Style: `Standard` by [Prettier](https://prettier.io/)

### Screen Shot and Video:

Main Site View:

![image](https://user-images.githubusercontent.com/83871565/217081282-91555d29-c4b6-46b4-a218-22600dbedb45.png)

Video Function:


https://user-images.githubusercontent.com/83871565/217088670-d2b0b161-633c-4e82-8c7d-c13fe12c4ed6.mov


### Tech / FrameWork:

For this App I am using:

- [React](https://en.reactjs.org/)
  - [React Router Dom@6](https://reactrouter.com/en/main)
  - [React Beautiful DnD - Drag and Drop](https://www.npmjs.com/package/react-beautiful-dnd)
- [Tailwind CSS](https://tailwindcss.com/)
  - [TailwindCss - scrollbar](https://www.npmjs.com/package/tailwind-scrollbar)


### Code Examples

For make this App work you need to get some input, process them and return an output. For doing this I devide the App into several parts:

We take the Task from the input:
```
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  
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
```

And I give you the opportunity to select if a task is Completed or Not:

```
  const handleCompleteTask = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id == id) {
        item = { ...task, complete: !task.complete };
      } else item = { ...task };
      return item;
    });
    setTodoList(list);
    console.log(todoList)
  };
```

Delete Task:

```
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
```

Drag Memory Function:

```
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const list = Array.from(todoList);
    const [reorderedTask] = list.splice(result.source.index, 1);
    list.splice(result.destination.index, 0, reorderedTask);

    setDragged(false);
    setTodoList(list);
  };

  const handleDrag = () => {
    if(todoList.length > 1)
      setDragged(true);
  };
```

Restore delited items via a menu:

```
  const handleUndo = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) item = { ...task, deleted: false };
      else item = { ...task };
      return item;
    });
    setTodoList(list)
  }
```

### How To Use It?

Click on the Input, Write the Task, Press the Button and you are done.

### License

This project is licensed under the MIT License.
