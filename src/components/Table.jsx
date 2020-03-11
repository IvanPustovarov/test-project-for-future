import React, { useState } from "react";
import Navigation from "./Navigation";

const STEP = 50;

const Table = props => {
  const search = props.search;

  const [data] = useState(props.data);
  const [sortBy, setSortBy] = useState("");
  const [currentID, setCurrentID] = useState(undefined);
  const [page, setPage] = useState(1);
  const [isReversed, setIsReversed] = useState(false);

  const handleIdClick = id => {
    setCurrentID(id);
  };

  const handleTableTopClick = value => {
    if (sortBy === value) {
      setIsReversed(!isReversed);
    } else {
      setIsReversed(false);
    }
    setSortBy(value);
  };

  const mapExtraInfo = () => {
    if (!currentID) {
      return;
    }
    const elem = data.find(elem => elem.id == currentID);
    return (
      <div>
        <textarea>{elem.description}</textarea>
        <br />
        Адрес проживания: <b>{elem.address.streetAddress}</b>
        <br />
        Город: <b>{elem.address.city}</b>
        <br />
        Провинция: <b>{elem.address.state}</b>
        <br />
        Индекс: <b>{elem.address.zip}</b>
      </div>
    );
  };

  const getSortedData = () => {
    if (!sortBy) {
      return data;
    }

    const sortedData = data.sort((a, b) => {
      if (sortBy === "id") {
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        return 0;
      }
      if (
        a[sortBy].toString().toLowerCase() > b[sortBy].toString().toLowerCase()
      ) {
        return 1;
      }
      if (
        a[sortBy].toString().toLowerCase() < b[sortBy].toString().toLowerCase()
      ) {
        return -1;
      }
      return 0;
    });

    return isReversed ? sortedData.reverse() : sortedData;
  };

  const getFilteredData = () => {
    if (!search) {
      return getSortedData();
    }
    const filteredData = getSortedData().filter(elem => {
      for (const key in elem) {
        if (key === "address") {
          for (const key in elem.address) {
            if (elem.address[key].includes(search)) {
              return true;
            }
          }
          continue;
        }
        if (elem[key].toString().includes(search)) {
          return true;
        }
      }
      return false;
    });
    return filteredData;
  };

  const paginatedData = () => {
    const end = page * STEP;
    const start = end - STEP;
    return getFilteredData().slice(start, end);
  };

  const pageQuantity = () => {
    return Math.ceil((getFilteredData().length + 1) / 50);
  };

  const pageCallback = page => {
    setPage(page);
  };

  return (
    <div className="table">
      <div className="table-header">
        <span
          style={{ width: "10%" }}
          onClick={() => handleTableTopClick("id")}
        >
          id
        </span>
        <span
          style={{ width: "25%" }}
          onClick={() => handleTableTopClick("firstName")}
        >
          firstName
        </span>
        <span
          style={{ width: "25%" }}
          onClick={() => handleTableTopClick("lastName")}
        >
          LastName
        </span>
        <span
          style={{ width: "20%" }}
          onClick={() => handleTableTopClick("email")}
        >
          email
        </span>
        <span
          style={{ width: "20%" }}
          onClick={() => handleTableTopClick("phone")}
        >
          phone
        </span>
      </div>
      {paginatedData().map((elem, index) => (
        <div key={index} className="table-row">
          <span onClick={() => handleIdClick(elem.id)} style={{ width: "10%" }}>
            {elem.id}
          </span>
          <span style={{ width: "25%" }}>{elem.firstName}</span>
          <span style={{ width: "25%" }}>{elem.lastName}</span>
          <span style={{ width: "20%" }}>{elem.email}</span>
          <span style={{ width: "20%" }}>{elem.phone}</span>
        </div>
      ))}

      {mapExtraInfo()}

      <Navigation
        pageQuantity={pageQuantity()}
        pageCallback={pageCallback}
        page={page}
      />
    </div>
  );
};
export default Table;
