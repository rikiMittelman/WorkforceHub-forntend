
import { action, makeAutoObservable, observable } from 'mobx';
import { addNewEmployee, getAllEmployees, getAllRoles, handleUpdateEmployee, handleDeleteItem } from '../Api';
import { Employee, Gender, Role } from '../types';


class GlobalStore {
  employees: Employee[] = [];
  rolesList: Role[] = [];
  loading: boolean = true;
  selectedEmployee: Employee = {
    id: -1,
    firstName: '',
    lastName: '',
    identity: '',
    startWorkDate: new Date(),
    dateOfBirth: new Date(),
    gender: Gender.Male,
    status: true,
    roles: []
  };
  setSelectedEmployee = (emp: Employee) => {
    this.selectedEmployee = emp;
  }
  //   filteredEmployees: Employee[] = [];
  //   searchQuery: string = '';

  constructor() {
    makeAutoObservable(this, {
      employees: observable,
      selectedEmployee: observable,
      setSelectedEmployee: action,
      rolesList: observable,
      addEmployee: action,
      deleteEmployee: action,
      editEmployee: action,
      getEmployees: action,
      getAllRoles: action,
      saveChanges: action,
      loading : observable
        });
  }

  
  addEmployee() {
    this.loading = true;
    try {
      addNewEmployee(this.selectedEmployee); 
      if(this.selectedEmployee.status)// Call the API function
      {
        this.employees.push(this.selectedEmployee); 
      }// Update the local state if needed}
    } catch (error) {
      console.error('Error adding employee:', error);
    }
    finally {
      action(() => {
        this.loading = false;
      })();
    }
  }
  updateEmployee() {
    this.loading = true;

    try {
      handleUpdateEmployee(this.selectedEmployee, this.selectedEmployee.id);
      const index = this.employees.findIndex(emp => emp.id ===  this.selectedEmployee.id);
      if (index !== -1) {
        this.employees[index] =  this.selectedEmployee;
      }
    }
    catch (error) {
      console.error('Error update employee:', error);
    }
    finally {
      action(() => {
        this.loading = false;
      })();
    }
  }

  deleteEmployee() {
    this.loading = true;

    try {
    handleDeleteItem(this.selectedEmployee.id);
    this.employees = this.employees.filter(e => e.id != this.selectedEmployee.id);
    } catch { }
    finally {
      action(() => {
        this.loading = false;
      })();
    }


    // const index = this.employees.findIndex(emp => emp.id === employeeId);
    // if (index !== -1) {
    //   this.employees[index].status = false;
    // }
    // delete api request to update in db(beckend)
  }

  // Fetch employees from server (assuming an async operation)
  async getEmployees() {
    this.loading = true;
    try {
      const data = await getAllEmployees();
      this.employees = data;
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      action(() => {
        this.loading = false;
      })();
    }
  }

  async getAllRoles() {
    this.loading = true;

    try {
      const data = await getAllRoles();
      this.rolesList = data;
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
    finally {
      action(() => {
        this.loading = false;
      })();
    }
  }
  // Save changes to server (assuming an async operation)
  async saveChanges() {
    try {
    } catch (error) {
      console.error('Error saving changes: ', error);
    }
  }
}
export default new GlobalStore();



