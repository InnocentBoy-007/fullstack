import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import axios from "axios";

export default function Homepage() {
  const [errorMssg, setErrorMssg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const apiEndpoint_POST = `${
    import.meta.env.VITE_REACT_APP_API_ENDPOINT
  }/createUser`;

  const [users, setUsers] = useState([]);
  const [buyerList, setBuyerList] = useState([]);

  const fetchData = async () => {
    try {
      const primary_response_GET = `${
        import.meta.env.VITE_REACT_APP_API_ENDPOINT
      }/getAllUsers`;
      const backup_response_GET = "backup endpoint";
      let response;

      try {
        response = await axios.get(primary_response_GET); // fetching this endpoint first
      } catch (error) {
        response = await axios.get(backup_response_GET); // if the primary endpoint don't work, fetching the backup endpoint
        console.log(error);
      }

      // axios automatically parses the data into json format
      const userDatas = response.data; // returns the response in the form of json - JavaScript Object Notation
      setUsers(userDatas);
      //   console.log(userDatas);

      // fetching buyer's data
      const primaryBuyerEndpoint = `${
        import.meta.env.VITE_REACT_APP_API_ENDPOINT
      }/getAllBuyers`;
      const backupBuyerEndpoint = "backup endpoint";
      let buyerResponse;

      try {
        buyerResponse = await axios.get(primaryBuyerEndpoint);
      } catch (error) {
        buyerResponse = await axios.get(backupBuyerEndpoint);
        console.log(error);
      }

      const buyerData = buyerResponse.data;
      setBuyerList(buyerData);
      //   console.log("Buyer Data---> ", buyerData);
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

    if (!name || !email || !address) {
      window.alert("All fields required!");
    } else {
      try {
        const data = { name, email, address };
        const response = await axios.post(apiEndpoint_POST, data, {
          headers: { "Content-Type": "application/json" },
        });
        // const postdata = response.data;
        // console.log(postdata);
        // Reset the state variables to empty strings
        setName("");
        setEmail("");
        setAddress("");
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleLogout = () => {
    signOut(auth) // signs out the current user
      .then(() => {
        // Sign-out successful.
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  };

  const deleteUsers = async (id) => {
    if (!id) {
      console.log("ID not provided!");
      return; // Return early to prevent API call
    }

    // console.log("ID--->", id); // Making sure if the id is correct or not

    const deleteUrl = `${
      import.meta.env.VITE_REACT_APP_API_ENDPOINT
    }/deleteUser/${id}`;
    try {
      const response = await axios.delete(deleteUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const deletedUserData = response.data;
      //   console.log(deletedUserData);
      setUsers(users.filter((user) => user.id !== id));
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const [storeEditUsers, setStoreEditUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [editFlag, setEditFlag] = useState(false);

  const handleEditUsers = (item) => {
    setUserId(item._id);
    setStoreEditUsers(item);
    setEditFlag(true);
  };

  const updateUsers = async (id) => {
    const updateUrl = `${
      import.meta.env.VITE_REACT_APP_API_ENDPOINT
    }/updateUser/${userId}`;
    try {
      const response = await axios.put(updateUrl, storeEditUsers, {
        method: {
          "content-type": "application/json",
        },
      });
      const responseData = response.data;
      //   console.log(responseData); //
      fetchData();
      setName("");
      setEmail("");
      setAddress("");
      setUserId("");
      setEditFlag(false);
      window.alert("Updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <table className="w-full text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>
                <button
                  style={{ border: "2px solid red" }}
                  onClick={() => deleteUsers(item._id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  style={{ border: "2px solid red" }}
                  onClick={() => handleEditUsers(item)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>This is home page</h2>
      {buyerList.map((item, index) => (
        <div key={index}>
          <div className="flex gap-2 flex-wrap">
            <p>{index + 1}</p>
            <p>{item._id}</p>
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.address}</p>
          </div>
        </div>
      ))}
      <input
        type="text"
        placeholder="Name"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
        value={editFlag ? storeEditUsers.name : name}
        onChange={(e) => {
          editFlag
            ? setStoreEditUsers({ ...storeEditUsers, name: e.target.value })
            : setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
        value={editFlag ? storeEditUsers.email : email}
        onChange={(e) => {
          editFlag
            ? setStoreEditUsers({ ...storeEditUsers, email: e.target.value })
            : setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Address"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
        value={editFlag ? storeEditUsers.address : address}
        onChange={(e) => {
          editFlag
            ? setStoreEditUsers({ ...storeEditUsers, address: e.target.value })
            : setAddress(e.target.value);
        }}
      />
      {editFlag ? (
        <>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2"
            onClick={() => updateUsers(userId)}
          >
            Update
          </button>
        </>
      ) : (
        <>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2"
            onClick={onSubmit}
          >
            Send
          </button>
        </>
      )}

      <button onClick={handleLogout} style={{ border: "2px solid red" }}>
        Log out
      </button>
    </div>
  );
}
