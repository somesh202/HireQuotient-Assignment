import React, { useState, useEffect, useRef } from "react";

import "./App.css";
import Pagination from "./components/Pagination/Pagination";
import UsersList from "./components/UsersList/UsersList";
import Navbar from "./components/Navbar/Navbar";
import toast, {Toaster} from "react-hot-toast";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const selectAllRef = useRef(null);
  

const updateUser = (users)=> {
    return users.map(user => {
        user.selected = false;
        user.edit = false;
        user.show = true;
        return user;
    })
} 
const getUsers = (setUsers) => {
  axios
    .get(process.env.REACT_APP_API_URI)
    .then((res) => {
      setUsers(updateUser(res.data));
    })
    .catch((err) => toast.error("Error in fetching users detail"));
};

  useEffect(() => {
    getUsers(setUsers);
    toast.success("All users fetched")
  }, []);
  const search = (search, users) => {
    let tempSearch = search.toLowerCase();
    return users.map((user) => {
      if (
        user.name.toLowerCase().includes(tempSearch) ||
        user.email.toLowerCase().includes(tempSearch) ||
        user.role.toLowerCase().includes(tempSearch)
      ) {
         user.show = true;
         return user;
      }
      user.show = false;
      return user;
    });
  };
  const searchUsers = (e) => {
    setPage(1);
    setUsers(search(e.target.value, users));
  };

  const deleteUser = (id) => {
    let tempUsers = users.filter((user) => user.id !== id);
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
    toast.success("User deleted succesfully")
  };

  const editUser = (id) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].edit = true;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  const saveUser = (id, nameRef, emailRef, roleRef) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].name = nameRef.current.value;
    tempUsers[index].email = emailRef.current.value;
    tempUsers[index].role = roleRef.current.value;
    tempUsers[index].edit = false;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
    
    toast.success("User updated succesfully")
  };

  const selectOne = (id) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].selected = !tempUsers[index].selected;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  const selectAll = (e) => {
    const listedUserIds = users
      .filter((user) => user.show)
      .slice(index, index + config.PAGE_SIZE)
      .map((user) => user.id);

    let tempUsers = users.map((user) => {
      if (listedUserIds.includes(user.id)) {
        user.selected = e.target.checked;
        return user;
      }
      return user;
    });

    setUsers(tempUsers);
    setUpdate(!update);
  };

  const deleteSelected = () => {
    if (window.confirm("Selected users will be deleted")) {
      setUsers((prevState) => prevState.filter((user) => !user.selected));
      selectAllRef.current.checked = false;
    }
  };
  const config = {}
  config.PAGE_SIZE = 10

  const getRecordIndex = (page)=> {
      return (page-1)*config.PAGE_SIZE ;
  }
  const index = getRecordIndex(page);
  return (
    <div className="App">
      <Navbar />
      <Toaster />
      <input
        className="search"
        type="text"
        placeholder="Search"
        onChange={searchUsers}
      ></input>
      <UsersList
        page={page}
        setPage={setPage}
        selectAll={selectAll}
        selectAllRef={selectAllRef}
        selectOne={selectOne}
        saveUser={saveUser}
        editUser={editUser}
        deleteUser={deleteUser}
        users={users
          .filter((user) => user.show)
          .slice(index, index + config.PAGE_SIZE)}
      ></UsersList>
      <Pagination
        usersLength={users.filter((user) => user.show).length}
        page={page}
        setPage={setPage}
        deleteSelected={deleteSelected}
      ></Pagination>
    </div>
  );
}

export default App;
