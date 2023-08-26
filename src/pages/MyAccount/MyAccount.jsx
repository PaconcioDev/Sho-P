import { useContext, useRef, useState } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";

function MyAccount() {
  const { setAccount } = useContext(ProductContext);
  const [view, setView] = useState("user-info");
  const parsedAccount = JSON.parse(localStorage.getItem("account"));
  const form = useRef(null);

  const editAccount = () => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const strigifiedAccount = JSON.stringify(data);
    localStorage.setItem("account", strigifiedAccount);
    setAccount(data);
  };

  const renderUserInfo = () => {
    return (
      <div className="flex flex-col w-80 gap-4">
        <p>
          <span className="font-light text-sm">Name: </span>
          <span>{parsedAccount?.name}</span>
        </p>
        <p>
          <span className="mr-1 font-light text-sm">Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <button 
          className="bg-transparent border border-purple-400 rounded-lg p-3 w-full text-purple-400 font-medium disabled:bg-slate-600"
          onClick={() => setView("edit-user-info")}
        >
          Edit
        </button>
      </div>
    );
  };

  const renderEditUserInfo = () => {
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
            defaultValue={parsedAccount.name}
            placeholder="Your name..."
            className="rounded-lg border border-gray-900 py-2 px-4 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-light text-sm">
            Your email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={parsedAccount.email}
            placeholder="Your email..."
            className="rounded-lg border border-gray-900 py-2 px-4 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-light text-sm">
            Your password:
          </label>
          <input
            type="text"
            id="password"
            name="password"
            defaultValue={parsedAccount.password}
            placeholder="******"
            className="rounded-lg border border-gray-900 py-2 px-4 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none"
          />
        </div>
        <button
          className="bg-purple-400 rounded-lg p-3 w-full text-gray-50 font-medium disabled:bg-slate-600"
          onClick={() => {
            setView("user-info"), editAccount();
          }}
        >
          Confirm
        </button>
      </form>
    );
  };

  const renderView = () =>
    view === "edit-user-info" ? renderEditUserInfo() : renderUserInfo();

  return (
    <>
      <div className="flex items-center justify-center w-80 relative">
        <h1 className="mb-5 text-2xl font-bold text-gray-50 bg-purple-400 p-2 rounded-lg">
          My Account
        </h1>
      </div>
      {renderView()}
    </>
  );
}

export { MyAccount };
