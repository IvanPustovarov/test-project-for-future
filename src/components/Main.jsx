import React, { useState, useEffect } from "react";
import Table from "./Table";
import Search from "./Search";
import AddUser from "./AddUser";

const BIG_DATA_URL =
  "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";

const SMALL_DATA_URL =
  "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";

const Main = props => {
  const [isRenderTable, setIsRenderTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [stateAddUser, setStateAddUser] = useState(false);

  const [search, setSearchKey] = useState("");

  const handleAddUser = () => {
    setStateAddUser(true);
  };

  const addUser = () => {
    if (stateAddUser) {
      return (
        <AddUser newUserCallback={newUserCallback} isAdded={stateAddUser} />
      );
    }
  };

  useEffect(() => {
    setIsLoading(true);
    return () => {
      setIsLoading(false);
    };
  }, [isLoading]);

  const handleClickData = data => {
    setIsLoading(true);

    let requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    setIsRenderTable(false);
    fetch(data, requestOptions)
      .then(response => response.json())
      .then(result => setData(result))
      .then(() => setIsRenderTable(true))
      .catch(error => console.log("error", error));
  };

  const searchCallback = childrenKey => {
    setSearchKey(childrenKey);
  };

  const newUserCallback = user => {
    data.unshift(user);
    setStateAddUser(false);
  };

  const currentTable = () => {
    if (isRenderTable) {
      return <Table data={data} search={search} />;
    }
  };

  return (
    <div>
      <Search searchCallback={searchCallback} />

      <button onClick={handleAddUser} disabled={!data.length}>
        Add User
      </button>

      <button onClick={() => handleClickData(BIG_DATA_URL)}>Big Data</button>
      <button onClick={() => handleClickData(SMALL_DATA_URL)}>
        Small Data
      </button>

      {addUser()}
      {currentTable()}
    </div>
  );
};
export default Main;
