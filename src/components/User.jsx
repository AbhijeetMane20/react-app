import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function User() {
  const [user, setUser] = useState(null);
  // const user1 = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // const id = user1?.userId;
  useEffect(() => {
    //   id && fetch("http://localhost:8080/user/" + id).then((r) => {
    //     r.json().then((j) => setUser(j));
    //   });
    // }, [id]);
    fetch("http://localhost:8080/user", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      // the data to send
      // body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((resJson) => {
        const res = JSON.stringify(resJson);
        localStorage.setItem("user", res);
        setUser(resJson);
      });
  }, [token]);
  return <div> ( {user ? user.userName : ""} )</div>;
}

export default User;
