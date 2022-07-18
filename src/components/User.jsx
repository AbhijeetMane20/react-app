import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function User() {
  const [user, setUser] = useState(null);
  const user1 = JSON.parse(localStorage.getItem("user"));
  const id = user1?.userId;
  useEffect(() => {
    id && fetch("http://localhost:8080/user/" + id).then((r) => {
      r.json().then((j) => setUser(j));
    });
  }, [id]);
  return <div>( {user ? user.userName : ""} )</div>;
}

export default User;
