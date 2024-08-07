import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import StorageService from '../../../utils/StorageService';

export const createEmployee = createAsyncThunk(
  'createEmployee/createEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      console.log("Calling postEmployee in createEmployee thunk...");
      const response = await StorageService.postEmployee(employeeData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const createEmployeeSlice = createSlice({
  name: 'createEmployee',
  initialState: {
    employees: [],
    loading: false,
    error: null,
    modalIsVisible: false,
    isSubmitting: false,
  },
  reducers: {
    hideModal: (state) => {
      state.modalIsVisible = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    showModal: (state) => {
      state.modalIsVisible = true;
    },
    setIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        console.log('Pending: Employee creation is in progress');
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.isSubmitting = false;
        state.employees.push(action.payload);
        state.modalIsVisible = true; // Show modal on success
        console.log('Fulfilled: Employee created successfully', action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.isSubmitting = false;
        state.error = action.payload;
        state.modalIsVisible = true; // Show modal on error
        console.error('Rejected: Employee creation failed', action.payload);
      });
  }
});

export const { hideModal, setError, showModal, setIsSubmitting } = createEmployeeSlice.actions;
export default createEmployeeSlice.reducer;
