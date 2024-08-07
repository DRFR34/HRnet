import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import StorageService from '../../../utils/StorageService';

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async () => {
    const response = await StorageService.getEmployees();
    return response;
  }
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    rowsPerPage: 25,
    selectedColumns: [
      'firstName',
      'lastName',
      'startDate',
      'department',
      'birthDate',
      'street',
      'city',
      'state',
      'zipCode'
    ],
    currentPage: 1,
    searchValue: '',
    autoSearch: false,
    searchIsTriggered: false,
    filteredData: [],
    status: 'idle',
    error: null
  },
  reducers: {
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
    setSelectedColumns: (state, action) => {
      state.selectedColumns = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setAutoSearch: (state, action) => {
      state.autoSearch = action.payload;
    },
    setSearchIsTriggered: (state, action) => {
      state.searchIsTriggered = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { 
  setRowsPerPage, 
  setSelectedColumns,
  setCurrentPage,
  setSearchValue,
  setAutoSearch,
  setSearchIsTriggered,
  setFilteredData 
} = employeesSlice.actions;

export const selectAllEmployees = (state) => state.employees.employees;
export const selectEmployeesStatus = (state) => state.employees.status;
export const selectEmployeesError = (state) => state.employees.error;

export default employeesSlice.reducer;
