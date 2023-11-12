import { useEffect, useState } from "react";

const User = () => {
  const [user, setUser] = useState([]);
  let wishList = [];

  const usrList = (id) => {
    // console.log(id);
    wishList.push(id);
    // console.log(wishList);
    let wishData = JSON.stringify(wishList);
    localStorage.setItem("list", wishData);
  };

  let data = localStorage.getItem("list");
  data = JSON.parse(data);
  console.log(data);

  const deleteData = (id) => {
    let updateData = data.filter((uid) => uid !== id);
    updateData = JSON.stringify(updateData);
    localStorage.setItem("list", updateData);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUser(json));
  }, []);

  return (
    <div>
      <h1>User</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {user.map((usr) => (
          <div key={usr} className="border border-green-500 m-3 px-4 ">
            <p>{usr.name}</p>
            <button
              onClick={() => usrList(usr.id)}
              className="btn btn-xs my-3 btn-primary"
            >
              wish
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((usr) => (
          <div key={usr} className="border border-green-500 m-3 px-4 ">
            <p>fd {usr}</p>
            <button
              onClick={() => deleteData(usr)}
              className="btn btn-xs my-3 btn-primary"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
