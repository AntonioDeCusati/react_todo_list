import "./styles.css";
import { useState } from "react";
// TODO
// 1. Add
// 2. Delete
// 3. Edit
interface InputElement {
  id?: number;
  description: string;
}

interface Todo extends InputElement {
  id: number;
}

const initialState = {
  description: ""
};

export default function App() {
  const [formElement, setFormElement] = useState<InputElement>(initialState);
  const [todos, setTodos] = useState<Todo[]>([]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newElement: InputElement = {
      ...formElement,
      description: e.currentTarget.value
    };
    setFormElement(newElement);
  }

  function editElement(e: React.MouseEvent<HTMLLIElement>, todo: Todo) {
    console.log("[edit] todo: ", todo);
    setFormElement(todo);
  }

  function addElement() {
    console.log("TODO: ", formElement);
    // ID

    if (formElement.id) {
      const newElement: Todo = {
        id: formElement.id,
        description: formElement.description
      };

      setTodos((t) =>
        t.map((td) => {
          return td.id === newElement.id! ? newElement : td;
        })
      );
    } else {
      // ADD
      const newTodos = todos;
      newTodos.push({ id: Date.now(), description: formElement.description });
      setTodos([...newTodos]);
    }
    setFormElement(initialState);
  }

  function deleteElement(e: React.MouseEvent<HTMLButtonElement>, t: Todo) {
    e.stopPropagation();
    console.log("[delete]: ", t);
    setTodos((todo) => {
      return todo.filter((td) => td.id !== t.id);
    });
  }

  function undo() {
    setFormElement(initialState);
  }

  return (
    <div className="App">
      <div className="input-group">
        <input
          className="form-control"
          name="todoElement"
          placeholder="insert a todo"
          onChange={onChange}
          value={formElement.description}
        />
        <button className="btn btn-outline-primary" onClick={addElement}>
          {formElement.id ? "EDIT" : "ADD"}
        </button>
      </div>
      <div>
        <ul className="list-group">
          {todos.map((t: Todo) => {
            return (
              <li
                onClick={(e) => editElement(e, t)}
                key={t.id}
                className="list-group-item"
              >
                <div className="d-flex justify-content-between align-items-center">
                  {t.description}
                  <button
                    onClick={(e) => {
                      deleteElement(e, t);
                    }}
                    className="btn btn-danger"
                  >
                    X
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <button onClick={undo}>Clear</button>
    </div>
  );
}
