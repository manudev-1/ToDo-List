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

![image](https://user-images.githubusercontent.com/83871565/216817886-f6138651-f0ab-4bfd-9685-e7bd3bfb84b2.png)

### Tech / FrameWork:

For this App I am using:

- [React](https://en.reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router Dom@6](https://reactrouter.com/en/main)

### Code Examples

For make this App work you need to get some input, process them and return an output. For doing this I devide the App into several parts:

We take the Task from the input:
```
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  
  // FROM Button
  const handleInputData = (e) => {
    if (input != "") {
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
  
  // FROM KeyBoard
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

### How To Use It?

Click on the Input, Write the Task, Press the Button and you are done.

### License

This project is licensed under the MIT License.
