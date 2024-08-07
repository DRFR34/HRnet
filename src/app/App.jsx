import React from 'react'
import NavBar from '../components/NavBar/NavBar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateEmployeeView from '../views/CreateEmployeeView/CreateEmployeeView.jsx';
import EmployeesListView from '../views/EmployeesListView/EmployeesListView.jsx';
export default function App() {
    return (
        <>

            <React.StrictMode>

                <BrowserRouter>
                    <NavBar />



                    <Routes>
                       
                        <Route path="/"
                            element={<CreateEmployeeView />}
                        />

                        <Route path="/employee-list"
                            element={<EmployeesListView />}
                        />

                    </Routes>

                </BrowserRouter>
            </React.StrictMode>

        </>
    )
}
