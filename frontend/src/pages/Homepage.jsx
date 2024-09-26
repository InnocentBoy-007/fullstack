import React, { useState, useEffect } from "react";

export default function Homepage() {
  const [users, setUsers] = useState([]);
  const [errorMssg, setErrorMssg] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        // `${process.env.REACT_APP_API_URL}/user/getAllUsers` ||
        "http://localhost:8000/api/user/getAllUsers"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setErrorMssg(
          `Api cannot be fetched: ${error.response.status} - ${error.response.statusText}`
        );
        console.log(
          `Api cannot be fetched: ${error.response.status} - ${error.response.statusText}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMssg(`Api cannot be fetched: No response received`);
        console.log(`Api cannot be fetched: No response received`);
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMssg(`Api cannot be fetched: ${error.message}`);
        console.log(`Api cannot be fetched: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>This is home page</h2>
      {users.map((item) => (
        <div key={item.id}>
          <p>Name: {item.name}</p>
          <p>Email: {item.email}</p>
          <p>Address: {item.address}</p>
        </div>
      ))}
    </div>
  );
}
