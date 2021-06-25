import React, { useState } from "react";
import { TAdminCredentials } from "../../types";

interface IAdminProps {
  onSubmit: (credentials: TAdminCredentials) => void;
}
const AdminForm = ({ onSubmit }: IAdminProps) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (question && answer !== "") {
      onSubmit({ question, answer });
      setQuestion("");
      setAnswer("");
    } else {
      console.log("Please filling fealds");

      return;
    }
  };
  return (
    <form onSubmit={onFormSubmit}>
      <input
        value={question}
        type="text"
        placeholder="question"
        onChange={(e) => setQuestion(e.currentTarget.value)}
      />
      <input
        value={answer}
        type="text"
        placeholder="answer"
        onChange={(e) => setAnswer(e.currentTarget.value)}
      />
      <button type="submit">
        <span>Submit</span>
      </button>
    </form>
  );
};
export default AdminForm;
