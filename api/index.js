require('dotenv').config();
var cors = require('cors')

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const mongoUri = process.env.MONGO_ATLAS_CONNECTION_STRING;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const employeeSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    birthDate: Date,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    startDate: Date,
    department: String
});

const Employee = mongoose.model('Employee', employeeSchema);

app.use(cors());


app.post('/employee', async (req, res) => {
    const employee = new Employee({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        country: req.body.country,
        startDate: req.body.startDate,
        department: req.body.department
    });

    try {
        const result = await employee.save();
        console.log(result);
        res.status(201).send(result);

    } catch (error) {
        res.status(400).send(error);
    }
});

// app.get

app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).send(employees);
        
    } catch (error) {
        res.status(400).send(error);
    }
});

// app.update
app.patch('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        employee.firstName = req.body.firstName;
        employee.lastName = req.body.lastName;
        employee.birthDate = req.body.birthDate;
        employee.street = req.body.street;
        employee.city = req.body.city;
        employee.state = req.body.state;
        employee.zipCode = req.body.zipCode;
        employee.country = req.body.country;
        employee.startDate = req.body.startDate;
        employee.department = req.body.department;
        const result = await employee.save();
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});