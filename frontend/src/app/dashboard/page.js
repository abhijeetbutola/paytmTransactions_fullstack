'use client';

import Navbar from "@/components/layout/Navbar";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import UserList from "@/components/users/UserList";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [userData, setUserData] = useState([]);
    const [inputTerm, setInputTerm] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        // Ensure this code runs only in the client
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem("token");
            if (storedToken !== token) setToken(storedToken);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                try {
                    const response = await axios.get("http://localhost:5000/api/v1/user/bulk", {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        params: { filter: inputTerm },
                    });

                    setUserData(response.data.user);
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            };

            fetchData();
        }
    }, [inputTerm, token]);    

    return (
        <div className="flex flex-col gap-4">
            <Navbar />
            <div className="flex flex-col gap-3 px-8">
                <div>
                    <Text as="p" className="font-bold">Your balance is: 10,000</Text>
                </div>
                <div className="flex flex-col gap-2">
                    <div>
                        <Text>Users</Text>
                        <Input 
                            className={"w-full"} 
                            placeholder="Search users..." 
                            value={inputTerm} 
                            onChange={(e) => setInputTerm(e.target.value)}
                        />
                    </div>
                    <div>
                        {userData.length > 0 ? <UserList users={userData} /> : <Text>No users found</Text>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
