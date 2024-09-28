import React, { useState, useEffect } from "react";

export default function Homepage() {
  const [users, setUsers] = useState([]);
  const [errorMssg, setErrorMssg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        // `${process.env.REACT_APP_API_URL}/user/getAllUsers` ||
        "http://localhost:8000/api/user/getAllUsers"
      );
      const data = await response.json();
      setUsers(data);
      console.log(data);
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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/user/createUser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, address }),
        }
      );
      const data = await response.json();
      console.log(data);
      // Reset the state variables to empty strings
      setName("");
      setEmail("");
      setAddress("");
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2>This is home page</h2>
      {users.map((item, index) => (
        <div key={item.id} className="p-4">
          {index + 1}
          <p>Name: {item.name}</p>
          <p>Email: {item.email}</p>
          <p>Address: {item.address}</p>
        </div>
      ))}
      <input
        type="text"
        placeholder="Name"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Address"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2"
        onClick={onSubmit}
      >
        Sign up
      </button>
    </div>
  );
}
