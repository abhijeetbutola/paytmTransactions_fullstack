'use client';

import Navbar from "@/components/layout/Navbar";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import UserList from "@/components/users/UserList";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [usersData, setUsersData] = useState([]);
    const [userBalance, setUserBalance] = useState(0);
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

                    setUsersData(response.data.user);
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            };

            fetchData();
        }
    }, [inputTerm, token]);

    console.log(usersData);
    

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                try {
                    const response = await axios.get("http://localhost:5000/api/v1/account/balance", {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    setUserBalance(response.data.balance);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            }
            fetchData()
        }
    }, [token])

    return (
        <div className="flex flex-col gap-4">
            <Navbar />
            <div className="flex flex-col gap-3 px-8">
                <div>
                    <Text as="p" className="font-bold">Your balance is: Rs {userBalance}</Text>
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
                        {usersData.length > 0 ? <UserList users={usersData} /> : <Text>No users found</Text>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
