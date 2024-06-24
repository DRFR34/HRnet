
import EmployeeModelisedData from './dataModelisationClass';

import employeesListMock from '../assets/data/employeesListMock.json'

const baseURL = `http://localhost:3000/`;



async function fetchAPI(endpoint ) {
  const url = `${baseURL}${endpoint}`;
  try {
    const response = await fetch(url);
        console.log("response", response)
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
  return(employeesListMock)
}

  static async getEmployees () {
    try {
      const data = await fetchAPI('employees');
      return new EmployeeModelisedData(data);
    } catch (error) {
    ApiService.handleServerError(error)
    }
  }


static async postEmployee (employeeData) {
  try {
    const data = await fetchAPI('employees', {
      method: 'POST',
      body: JSON.stringify(employeeData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return(data);
  } catch (error) {
    throw error;
  }
}

}