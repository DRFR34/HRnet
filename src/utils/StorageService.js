export default class StorageService {
    static handleServerError(error) {
        console.error(error);
        return [];
    }

    static async getEmployees() {
        try {
            const employees = JSON.parse(localStorage.getItem('employees')) || [];
            return employees;
        } catch (error) {
            console.error('apiService>getEmployees>Error reading from local storage:', error);
            return StorageService.handleServerError(error);
        }
    }

    static async postEmployee(employeeData) {
        try {
            const employees = JSON.parse(localStorage.getItem('employees')) || [];

            const maxId = employees.reduce((max, employee) => {
                return employee.id > max ? employee.id : max;
            }, 0);

            const newId = maxId + 1;

            const newEmployee = { id: newId, ...employeeData };
            employees.push(newEmployee);

            localStorage.setItem('employees', JSON.stringify(employees));

            return newEmployee;

        } catch (error) {

            console.error("apiService>postEmployee>error", error);
            throw new Error("Failed to save employee to local storage.");
        }
    }

}
