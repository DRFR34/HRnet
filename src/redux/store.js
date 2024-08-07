import { configureStore } from "@reduxjs/toolkit";
import createEmployeeReducer from "./features/createEmployee/createEmployeeSlice";

import employeesReducer from "./features/employees/employeesSlice";


 const store = configureStore({    
    reducer: {
        createEmployee:createEmployeeReducer,
        employees: employeesReducer,
    },
});

export default store;
