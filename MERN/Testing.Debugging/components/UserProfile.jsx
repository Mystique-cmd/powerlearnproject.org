import React, { useState, useEffect } from "react";
import { fetchUser } from "../api";

export default function UserProfile({ id }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser(id).then(setUser);
    }, [id]);

    if (!user) return <div>Loading...</div>;

    return <div>{user.name}</div>;
}
