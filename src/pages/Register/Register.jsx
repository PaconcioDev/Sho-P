import "./Register.css";

// TODO: CSS and http request
function Register() {
  return (
    <>
      <h2>Create an Account</h2>
      <main>
        <form method="post">
          <input type="text" placeholder="Name" equired />
          <input type="text" placeholder="Last name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <hr />
          <h3>Optional</h3>
          <input type="text" placeholder="Phone" />
          <button type="submit">SUBMIT</button>
        </form>
      </main>
    </>
  );
}

export { Register };
