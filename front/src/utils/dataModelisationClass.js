export default class EmployeeModelisedData {
    constructor(data) {
        
            this._id = data._id 
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
    }
