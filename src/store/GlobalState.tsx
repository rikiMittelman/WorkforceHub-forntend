
import { action, makeAutoObservable, observable } from 'mobx';
import {  addNewEmployee, getAllEmployees, getAllRoles } from '../Api';
import { Employee, Role } from '../types';


class GlobalStore {
  employees: Employee[] = [];
  roles: Role[] = [];
  //   filteredEmployees: Employee[] = [];
  //   searchQuery: string = '';

  constructor() {
    makeAutoObservable(this, {
      employees: observable,
      roles: observable,
      addEmployee: action,
      deleteEmployee: action,
      editEmployee: action,
      getEmployees: action,
      getAllRoles: action,
      saveChanges: action
  });
  }


  addEmployee(employee: Employee) {
    try {
      addNewEmployee(employee); // Call the API function
      this.employees.push(employee); // Update the local state if needed
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  }

  deleteEmployee(employeeId: number) {
    const index = this.employees.findIndex(emp => emp.id === employeeId);
    if (index !== -1) {
      this.employees[index].status = 'Inactive';
    }
    // delete api request to update in db(beckend)
  }

  editEmployee(employeeId: number, updatedEmployee: Employee) {
    const index = this.employees.findIndex(emp => emp.id === employeeId);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
    // put re...
  }

  //   filterEmployees() {
  //     this.filteredEmployees = this.employees.filter(employee =>
  //       Object.values(employee)
  //             .some(val => val.toString().toLowerCase().includes(this.searchQuery.toLowerCase()))
  //     );
  //   }

  //   setSearchQuery(query: string) {
  //     this.searchQuery = query;
  //     this.filterEmployees();
  //   }

  // Fetch employees from server (assuming an async operation)
  async getEmployees() {
    try {
      const data = await getAllEmployees();
      this.employees = data;
    } catch (error) {
      console.error('Error fetching employees:', error);
    }

  }
  async getAllRoles() {
    try {
      const data = await getAllRoles();
      this.roles = data;
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }
  // Save changes to server (assuming an async operation)
  async saveChanges() {
    try {
      // Make API call to save changes
      // await fetch('/api/save', {
      //   method: 'POST',
      //   body: JSON.stringify(this.employees),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
    } catch (error) {
      console.error('Error saving changes: ', error);
    }
  }
}
export default new GlobalStore();

