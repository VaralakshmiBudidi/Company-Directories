import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { companyApi } from './companyApi';

// Async thunks
export const fetchCompanies = createAsyncThunk(
  'company/fetchCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const companies = await companyApi.getAllCompanies();
      return companies;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCompany = createAsyncThunk(
  'company/createCompany',
  async (companyData, { rejectWithValue }) => {
    try {
      const newCompany = await companyApi.createCompany(companyData);
      return newCompany;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCompany = createAsyncThunk(
  'company/updateCompany',
  async ({ id, companyData }, { rejectWithValue }) => {
    try {
      const updatedCompany = await companyApi.updateCompany(id, companyData);
      return updatedCompany;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCompany = createAsyncThunk(
  'company/deleteCompany',
  async (id, { rejectWithValue }) => {
    try {
      await companyApi.deleteCompany(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  companies: [],
  filteredCompanies: [],
  filters: {
    name: '',
    location: '',
    industry: '',
  },
  sortAsc: true,
  currentPage: 1,
  perPage: 10,
  loading: false,
  error: null,
};

const apiSlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.currentPage = 1;

      state.filteredCompanies = state.companies.filter(company => {
        const nameMatch = company.name.toLowerCase().includes(state.filters.name.toLowerCase());
        const locationMatch = !state.filters.location || company.location === state.filters.location;
        const industryMatch = !state.filters.industry || company.industry === state.filters.industry;
        return nameMatch && locationMatch && industryMatch;
      });
    },
    sortByName: (state) => {
      state.sortAsc = !state.sortAsc;
      state.filteredCompanies.sort((a, b) => {
        if (state.sortAsc) {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
      state.currentPage = 1; // Reset to first page when changing per page
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch companies
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
        state.filteredCompanies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create company
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.loading = false;
        // Add the new company to the list
        state.companies.push(action.payload);
        // Update filtered companies to include the new company
        state.filteredCompanies = state.companies;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update company
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.companies.findIndex(company => company.id === action.payload.id);
        if (index !== -1) {
          state.companies[index] = action.payload;
          state.filteredCompanies = state.companies;
        }
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete company
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = state.companies.filter(company => company.id !== action.payload);
        state.filteredCompanies = state.companies;
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, sortByName, setPage, setPerPage } = apiSlice.actions;
export default apiSlice.reducer;
