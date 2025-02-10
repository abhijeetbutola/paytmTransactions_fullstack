'use client';
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

function Signup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: ""
    })

    const handleFormData = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({...prevData, [name]: value}))
    }

    const handleFormSubmit = async () => {
        const { firstName, lastName, username, password } = formData;
    
        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/user/signup",
                {
                    firstName,
                    lastName,
                    username,
                    password
                },
                {
                    headers: {
                        "Content-Type": "application/json" 
                    }
                }
            );
            
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message);
        }
    };
    
    

    return (
        <div className="bg-black/20 h-screen">
            <div className="h-full flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg">
                    <div className="flex flex-col items-center gap-2 pb-8">
                        <Text as="h1" className="font-bold text-4xl">Sign Up</Text>
                        <Text as="p" className="text-neutral-500 text-sm font-medium">Enter your information to create an account</Text>
                    </div>
                    <div>
                        <Input id={"firstName"} name={"firstName"} label={"First Name"} placeholder="John" className="w-full" value={formData.firstName} onChange={handleFormData} />
                        <Input id={"lastName"} name={"lastName"} label={"Last Name"} placeholder="Doe" className="w-full" value={formData.lastName} onChange={handleFormData} />
                        <Input id={"email"} name={"username"} label={"Email"} placeholder="johndoe@example.com" className="w-full" value={formData.username} onChange={handleFormData} />
                        <Input id={"password"} name={"password"} label={"Password"} placeholder="****" className="w-full" value={formData.password} onChange={handleFormData} />
                    </div>
                    <div className="pb-2">
                        <Button type="submit" variant="primary" className="w-full" onClick={handleFormSubmit}>Sign Up</Button>
                    </div>
                    <div className="flex justify-center">
                        <Text as="p">Already have an account?</Text>
                        <Link href={"/signin"}>
                            <Text as="p" className="underline cursor-pointer">Sign in</Text>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;