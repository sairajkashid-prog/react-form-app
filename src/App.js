import React, { useState } from "react";
import "./App.css";

const RULES = {
  name: (v) => (!v.trim() ? "Name is required" : v.trim().length < 3 ? "At least 3 characters" : ""),
  email: (v) => (!v ? "Email is required" : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "Enter a valid email address" : ""),
  age: (v) => (!v ? "Age is required" : isNaN(v) ? "Age must be a number" : Number(v) < 18 ? "Must be 18 or older" : Number(v) > 120 ? "Enter a realistic age" : ""),
  password: (v) => (!v ? "Password is required" : v.length < 8 ? "At least 8 characters" : !/[A-Z]/.test(v) ? "Add an uppercase letter" : !/\d/.test(v) ? "Add a number" : ""),
};

const FIELDS = [
  { name: "name", label: "Full Name", type: "text", ph: "Sairaj Kashid", icon: "👤" },
  { name: "email", label: "Email Address", type: "email", ph: "you@example.com", icon: "✉️" },
  { name: "age", label: "Age", type: "number", ph: "21", icon: "🎂" },
  { name: "password", label: "Password", type: "password", ph: "Minimum 8 characters", icon: "🔒" },
];

function App() {
  const [form, setForm] = useState({ name: "", email: "", age: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const strength = (() => {
    const v = form.password;
    let s = 0;
    if (v.length >= 8) s++;
    if (/[A-Z]/.test(v)) s++;
    if (/\d/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v)) s++;
    return s;
  })();

  const setField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name]) setErrors((e) => ({ ...e, [name]: RULES[name](value) }));
  };

  const blur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((e) => ({ ...e, [name]: RULES[name](form[name]) }));
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    FIELDS.forEach((f) => { const err = RULES[f.name](form[f.name]); if (err) next[f.name] = err; });
    setErrors(next);
    setTouched({ name: true, email: true, age: true, password: true });
    if (Object.keys(next).length) { setSuccess(""); return; }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess("✅ Form submitted successfully — all validations passed.");
    }, 700);
  };

  const valid = FIELDS.every((f) => !RULES[f.name](form[f.name]));

  return (
    <div className="page">
      <div className="aurora" aria-hidden="true" />
      <main className="card">
        <header className="head">
          <div className="badge">React · Controlled Components</div>
          <h1>Create your account</h1>
          <p>Every field validates live, on blur and on submit.</p>
        </header>

        <form onSubmit={submit} noValidate>
          {FIELDS.map((f) => {
            const err = errors[f.name];
            const ok = touched[f.name] && !err && form[f.name];
            return (
              <div className={"field" + (err ? " has-error" : "") + (ok ? " has-ok" : "")} key={f.name}>
                <label htmlFor={f.name}>
                  {f.icon} {f.label}
                  {ok && <span className="tick">✓ valid</span>}
                </label>
                <input
                  id={f.name}
                  type={f.type}
                  placeholder={f.ph}
                  value={form[f.name]}
                  onChange={(e) => setField(f.name, e.target.value)}
                  onBlur={() => blur(f.name)}
                  aria-invalid={!!err}
                  aria-describedby={err ? f.name + "-err" : undefined}
                />
                {err && <small id={f.name + "-err"} className="err">{err}</small>}
                {f.name === "password" && form.password && (
                  <div className="strength">
                    {[1, 2, 3, 4].map((i) => (
                      <span key={i} className={i <= strength ? "on s" + strength : "off"} />
                    ))}
                    <em>{["very weak", "weak", "fair", "good", "strong"][strength]}</em>
                  </div>
                )}
              </div>
            );
          })}

          <button type="submit" className="submit" disabled={submitting}>
            {submitting ? "Submitting…" : valid ? "Create account →" : "Fix errors to continue"}
          </button>

          {success && <p className="success">{success}</p>}
        </form>

        <footer className="foot">
          {FIELDS.filter((f) => !RULES[f.name](form[f.name])).length}/{FIELDS.length} fields valid
          <span>·</span>
          <a href="https://github.com/sairajkashid-prog/react-form-app" target="_blank" rel="noopener">source ↗</a>
        </footer>
      </main>
    </div>
  );
}

export default App;
