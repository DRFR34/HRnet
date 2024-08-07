
export default class EmployeeModelisedData {
    constructor(data) {
      if (!data || typeof data !== 'object') {
        throw new Error("Modelisation class> Invalid data");
      }
  
      // Properties assigantion  
      this._id = data._id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.birthDate = data.birthDate;
      this.street = data.street;
      this.city = data.city;
      this.state = data.state;
      this.zipCode = data.zipCode;
      this.country = data.country;
      this.startDate = data.startDate;
      this.department = data.department;
  
    }
/**
 * Method for converting instance to plain object, for compatibilty with redux storage
 * @returns {object} - Contains all the properties an employee has
 */
 toPlainObject() {
  return {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      street: this.street,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
      country: this.country,
      startDate: this.startDate,
      department: this.department
  };
}
  }
  