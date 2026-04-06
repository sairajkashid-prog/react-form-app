import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name is required";
    if (!form.email.includes("@")) err.email = "Invalid Email";
    if (!form.age) err.age = "Age is required";

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validate();

    if (Object.keys(err).length > 0) {
      setErrors(err);
      setSuccess("");
    } else {
      setErrors({});
      setSuccess("Form Submitted Successfully!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>React Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <p style={{ color: "red" }}>{errors.name}</p>

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <p style={{ color: "red" }}>{errors.email}</p>

        <input
          placeholder="Age"
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <p style={{ color: "red" }}>{errors.age}</p>

        <br /><br />
        <button type="submit">Submit</button>
      </form>

      <h3 style={{ color: "green" }}>{success}</h3>
    </div>
  );
}

export default App;