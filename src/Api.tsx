
import { Employee, Gender, Role } from "./types";

export const getAllEmployees = async () => {
    const response = await fetch('https://localhost:7292/api/Employee');
    return response.json();
}
export const getAllRoles =async()=>{
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
export const handleUpdateEmployee = (employee:Employee, employeeId: number) => {
    fetch(`https://localhost:7292/api/Employee/${employeeId}`, {
      method: 'PUT', // or 'POST' depending on your server's API
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers you might need, such as authorization headers
      },
      body: JSON.stringify(employee), // Send an empty object as the payload
    })
    .then(response => {
    //   if (response.ok) {
       
    //   } else {
    //     // Handle error response from server
    //   }
    })
    .catch(error => {
      // Handle network error
    });
  };
  
  export const handleDeleteItem = (employeeId?:number) => {
    fetch(`https://localhost:7292/api/Employee/${employeeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.ok) {
        // Remove the deleted item from the client-side list
     //  setItems(prevItems => prevItems.filter(item => item.id !== itemId));
      } else {
        // Handle error response from server
      }
    })
    .catch(error => {
      // Handle network error
    });
  };
  


