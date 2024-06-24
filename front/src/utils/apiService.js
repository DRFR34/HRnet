import EmployeeModelisedData from './dataModelisationClass';
import employeesListMock from '../assets/data/employeesListMock.json';

const baseURL = `http://localhost:3000/`;


async function fetchAPI(endpoint) {
  const url = `${baseURL}${endpoint}`;
  console.log("url", url)
  try {
    const response = await fetch(url);
    console.log("response", response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching the endpoint:', error);
    throw error;
  }
}

export default class ApiService {

  static handleServerError(error) {
    console.error(error);
    return employeesListMock;
  }

  /**
   * Gets the list of employees
   * @returns {Promise<EmployeeModelisedData>} - The employee data
   */
  static async getEmployees() {
    try {
      const data = await fetchAPI('employees');
      console.log(data)
      return new EmployeeModelisedData(data);
    } catch (error) {
        console.log(error)
    //   return ApiService.handleServerError(error);
    return error
    }
  }


  static async postEmployee(employeeData) {
    try {
      const data = await fetchAPI('employees', {
        method: 'POST',
        body: JSON.stringify(employeeData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
