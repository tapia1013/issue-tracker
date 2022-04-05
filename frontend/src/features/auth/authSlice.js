import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

/**
 * createSlice = like store
 * 
 * initialState = like initialstate in store
 * 
 * createAsyncThunk = a function so that we can create asynchronous data
 */

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// (Takes in name we want to use can be anything, async function)
// Register new user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    const message = (
      error.response && error.response.data && error.response.data.message
    )
      || error.message
      || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      const message = (
        error.response && error.response.data && error.response.data.message
      )
        || error.message
        || error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  //builder allows us to add cases like builder.addCase, shape our state
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer