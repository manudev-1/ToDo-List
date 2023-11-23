# ToDo-List :bookmark_tabs:

Hi User! :wave: The goal was to create a To Do List, where the user can Add:heavy_plus_sign:, Edit:fountain_pen:, Move:airplane: and Remove:heavy_multiplication_x: the task that they created.

## Infos

### Reasons:

I decide to create this type of App 'cause I like to undertake ambitious challenge to try get every time a better version of me. :computer:

### Build Status:

The App is `COMPLETE`, but always in search of something new! :heavy_check_mark:

### Code Style:

Code Style: `Standard` by [Prettier](https://prettier.io/) :confetti_ball:

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
  - [React-contenteditable](https://github.com/lovasoa/react-contenteditable#readme)
- [Tailwind CSS](https://tailwindcss.com/)
  - [TailwindCss - scrollbar](https://www.npmjs.com/package/tailwind-scrollbar)
- [AOS](https://www.npmjs.com/package/aos)


### Code Examples

For make this App work you need to get some input, process them and return an output. For doing this I devide the App into several parts:

We take the Task from the input:
```jsx
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
          hoverUndo: false,
          read: false,
        },
      ]);
      setInput("");
      localStorage.setItem('list', JSON.stringify(todoList));
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
            read: false,
          },
        ]);
        setInput("");
        localStorage.setItem('list', JSON.stringify(todoList));
      }
    };
```

And I give you the opportunity to select if a task is Completed or Not:

```jsx
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
      localStorage.setItem('list', JSON.stringify(todoList));
    };
```

Delete Task:

```jsx
    // * Delete Task
    const handleDelete = (id) => {
      let list = todoList.map((task) => {
        let item = {};
        if (task.id === id) item = { ...task, deleted: true, hoverUndo: false };
        else item = { ...task };
        return item;
      });
      setTodoList(list);
      setTotDeleted(totDeleted + 1);
      localStorage.setItem('totDeleted', totDeleted)
      localStorage.setItem('list', JSON.stringify(todoList));
    };
```

Deleted Menu, in case you want a deleted task back:

```jsx
  const handleUndo = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) item = { ...task, deleted: false };
      else item = { ...task };
      return item;
    });
    setTodoList(list);
    setTotDeleted(totDeleted - 1);
    localStorage.setItem('totDeleted', totDeleted)
    localStorage.setItem('list', JSON.stringify(todoList));
  };
```

Set local storage to store the task:

```jsx
  const getLocalStorage = () => {
    let list = localStorage.getItem('list')
    
    if(list) return JSON.parse(localStorage.getItem('list'));
    else return [];
  }

  const getTotDeteled = () => {
    let list = localStorage.getItem('totDeleted')

    if(list) return JSON.parse(localStorage.getItem('totDeleted'));
    else return [];
  }
  ...
  ...
  ...
    // * Tasks
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(todoList))
  }, [todoList])

  // * totDeleted
  useEffect(() => {
    localStorage.setItem('totDeleted', JSON.stringify(Number(totDeleted)))
  }, [totDeleted])
  
```

### How To Use It?

Click on the Input, Write the Task, Press the Button and you are done. You improve your self we store the task :thumbsup:

### License

This project is licensed under the MIT License. :balance_scale:
