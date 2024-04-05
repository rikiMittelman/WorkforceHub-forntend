
import { Employee } from "./types";

export const getAllEmployees = async () => {
    const response = await fetch('https://localhost:7292/api/Employee');
    return response.json();
}
export const getAllRoles=async()=>{
    const response=await fetch ('https://localhost:7292/api/Roles');
    return response.json();
}

export const addNewEmployee = async (data: Employee) => {
    await fetch('https://localhost:7292/api/Employee', {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}



