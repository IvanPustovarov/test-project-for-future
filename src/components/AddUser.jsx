import React, { useState } from "react";
const AddUser = props => {
  const newUserCallback = props.newUserCallback;

  const [userId, setUserId] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      id: userId,
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      phone: userPhone,
      address: {
        streetAddress: "",
        city: "",
        state: "",
        zip: ""
      },
      description: "custom user"
    };
    newUserCallback(newUser);
  };

  const isSubmitDisabled = () => {
    return !(
      userId.length &&
      userFirstName.length &&
      userLastName.length &&
      userEmail.length &&
      userPhone.length
    );
  };

  const onInfoChange = (value, field) => {
    switch (field) {
      case "id":
        return setUserId(value);
      case "firstName":
        return setUserFirstName(value);
      case "lastName":
        return setUserLastName(value);
      case "email":
        return setUserEmail(value);
      case "phone":
        return setUserPhone(value);
      default:
        return;
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <span>
          id
          <input
            type="text"
            onChange={event => onInfoChange(event.target.value, "id")}
            value={userId}
          />
        </span>
        <span>
          firstName
          <input
            type="text"
            onChange={event => onInfoChange(event.target.value, "firstName")}
            value={userFirstName}
          />
        </span>
        <span>
          lastName
          <input
            type="text"
            onChange={event => onInfoChange(event.target.value, "lastName")}
            value={userLastName}
          />
        </span>
        <span>
          email{" "}
          <input
            type="text"
            onChange={event => onInfoChange(event.target.value, "email")}
            value={userEmail}
          />
        </span>
        <span>
          phone{" "}
          <input
            type="text"
            onChange={event => onInfoChange(event.target.value, "phone")}
            value={userPhone}
          />
        </span>
        <button type="submit" disabled={isSubmitDisabled()}>
          Send
        </button>
      </form>
    </div>
  );
};
export default AddUser;
