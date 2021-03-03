import React, { useState } from "react";
import { connect } from "react-redux";
import { postTodo } from "../redux/actions";

type AddTodoProps = {
  postTodo: (input: string) => void;
};

const AddTodo: React.FC<AddTodoProps> = ({ postTodo }) => {
  const [input, setInput] = useState("");
  const updateInput = (input: string) => {
    setInput(input);
  };

  const handleAddTodo = () => {
    postTodo(input);
    setInput("");
  };

  return (
    <div>
      <input onChange={(e) => updateInput(e.target.value)} value={input} />
      <button className="add-todo" onClick={handleAddTodo}>
        Add Todo
      </button>
    </div>
  );
};

export default connect(null, { postTodo })(AddTodo);
