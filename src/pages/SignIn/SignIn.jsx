import { useContext, useState, useRef } from "react";
import { ProductContext } from "../../context/ProductContext";
import { Link, Navigate } from "react-router-dom";

function SignIn() {
  const { account, setAccount, setSignOut } = useContext(ProductContext);
  const [view, setView] = useState("user-info");
  const [showPassword, setShowPassword] = useState(false);
  const form = useRef(null);

  const accountInLocalStorage = localStorage.getItem("account");
  const parsedAccount = JSON.parse(accountInLocalStorage);
  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = account
    ? Object.keys(account).length === 0
    : true;
  const hasAnAccount = !noAccountInLocalState || !noAccountInLocalStorage;

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false);
    localStorage.setItem("sign-out", stringifiedSignOut);
    setSignOut(false);
    return <Navigate replace to={"/Sho-P"} />;
  };

  const createAccount = () => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const stringifiedAccount = JSON.stringify(data);
    localStorage.setItem("account", stringifiedAccount);
    setAccount(data);
  };

  const renderLogIn = () => {
    return (
      <div className="flex flex-col w-80">
        <p className="flex gap-2 items-center mb-4">
          <span className="font-light">Email: </span>
          <span className="font-bold">{parsedAccount?.email}</span>
        </p>
        <p className="flex gap-2 items-center">
          <span className="font-light">Password: </span>
          <span className="font-bold">{parsedAccount?.password}</span>
        </p>
        <Link to={"/Sho-P"}>
          <button
            className="bg-purple-400 text-gray-50 font-medium py-3 mt-4 mb-2 w-full rounded-lg disabled:bg-black/40"
            onClick={() => handleSignIn()}
            disabled={!hasAnAccount}
          >
            Log In
          </button>
        </Link>
        <div className="text-center">
          <a
            className="font-light text-xs underline underline-offset-4 hover:text-purple-400"
            href="/Sho-P"
          >
            Forgot my password
          </a>
        </div>
        <button
          className="mt-6 py-3 border border-purple-400 rounded-lg disabled:text-black/40 disabled:border-black/40"
          disabled={hasAnAccount}
          onClick={() => setView("create-user-info")}
        >
          Sign up
        </button>
      </div>
    );
  };

  const renderCreateUserInfo = () => {
    return (
      <form ref={form} className="flex flex-col gap-4 w-80">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-light text-sm">
            Your name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={parsedAccount?.name}
            placeholder="name..."
            className="rounded-lg border border-gray-900 py-2 px-4 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-light text-sm">
            Your email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={parsedAccount?.email}
            placeholder="example@domain.com"
            className="rounded-lg border border-gray-900 py-2 px-4 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-light text-sm">
            Your password:
          </label>
          <div className="flex flex-col relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              defaultValue={parsedAccount?.password}
              placeholder="**********"
              className="rounded-lg border border-gray-900 py-2 px-4 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none"
            />
            <button
              className="absolute right-4 top-2"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <button
          className="bg-purple-400 rounded-lg p-3 w-full text-gray-50 font-medium disabled:bg-slate-600"
          onClick={() => createAccount()}
        >
          Create
        </button>
      </form>
    );
  };

  const renderView = () =>
    view === "create-user-info" ? renderCreateUserInfo() : renderLogIn();

  return (
    <>
      <h1 className="w-80 text-center font-semibold text-2xl text-purple-400 p-2 mb-6">
        Welcome
      </h1>
      {renderView()}
    </>
  );
}

export { SignIn };
