// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from 'axios';
// // import { userList } from "../Data";


// //Get Users Action
// export const getUsers = createAsyncThunk("getUsers", async (args, { rejectWithValue }) => {
//     const response = await axios.get('https://6443f21e466f7c2b4b5df7ed.mockapi.io/users');

//     try {
//         const result = await response.data;
//         return result
//     } catch (error) {
//         return rejectWithValue(error);
//     }
// })

// //Create Action
// export const createUser = createAsyncThunk("createUser", async (payload, { rejectWithValue }) => {
//     const response = await axios.post('https://6443f21e466f7c2b4b5df7ed.mockapi.io/users', payload);

//     try {
//         const result = await response.json;
//         console.log("create action", result)
//         return result
//     } catch (error) {
//         return rejectWithValue(error)
//     }
// })

// //Update Action
// export const updateUser = createAsyncThunk("updateUser", async (payload, { rejectWithValue }) => {
//     const response = await axios.put(`https://6443f21e466f7c2b4b5df7ed.mockapi.io/users/${payload.id}`, payload);

//     try {
//         const result = await response.json;
//         console.log("update action", result)
//         return result
//     } catch (error) {
//         return rejectWithValue(error)
//     }
// })

// //Delete User Action
// export const deleteUser = createAsyncThunk("deleteUser", async (id, { rejectWithValue }) => {
//     const response = await axios.delete(`https://6443f21e466f7c2b4b5df7ed.mockapi.io/users/${id}`);

//     try {
//         const result = await response.data;
//         return result
//     } catch (error) {
//         return rejectWithValue(error);
//     }
// })


// const userSlice = createSlice({
//     name: "users",
//     initialState: {
//         users: [],
//         loading: false,
//         error: null,
//         searchDataState: ""
//     },

//     reducers: {
//         searchUser: (state, action) => {
//             state.searchDataState = action.payload
//         }
//     },
//     extraReducers: {
//         // Handling Create User Promises
//         [createUser.pending]: (state) => {
//             state.loading = true;
//         },
//         [createUser.fulfilled]: (state, action) => {
//             state.loading = false;
//             state.users = [...state.users, action.payload];
//         },
//         [createUser.rejected]: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         // Handling Get Users Promises
//         [getUsers.pending]: (state) => {
//             state.loading = true;
//         },
//         [getUsers.fulfilled]: (state, action) => {
//             state.loading = false;
//             state.users = action.payload
//         },
//         [getUsers.rejected]: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         // Handling Delete User Promises
//         [deleteUser.pending]: (state) => {
//             state.loading = true;
//         },
//         [deleteUser.fulfilled]: (state, action) => {
//             state.loading = false;
//             const id = action.payload.id
//             if (id) {
//                 state.users = state.users.filter((ele) => ele.id !== id)
//             }
//         },
//         [deleteUser.rejected]: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         // Handling Update User Promises
//         [updateUser.pending]: (state) => {
//             state.loading = true;
//         },
//         [updateUser.fulfilled]: (state, action) => {
//             state.loading = false;
//             state.users = state.users.map((ele) => (
//                 ele.id === action.payload.id ? action.payload : ele
//             ));
//         },
//         [updateUser.rejected]: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//     }
// })

// export default userSlice.reducer;

// export const { searchUser } = userSlice.actions




import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// Get Users Action
export const getUsers = createAsyncThunk("users/getUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('https://6443f21e466f7c2b4b5df7ed.mockapi.io/users');
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

// Create Action
export const createUser = createAsyncThunk("users/createUser", async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post('https://6443f21e466f7c2b4b5df7ed.mockapi.io/users', payload);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

// Update Action
export const updateUser = createAsyncThunk("users/updateUser", async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.put(`https://6443f21e466f7c2b4b5df7ed.mockapi.io/users/${payload.id}`, payload);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

// Delete User Action
export const deleteUser = createAsyncThunk("users/deleteUser", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`https://6443f21e466f7c2b4b5df7ed.mockapi.io/users/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading: false,
        error: null,
        // 2. creating a global state to hold search data value
        searchDataState: ""
    },
    reducers: {
        searchUser: (state, action) => {
            state.searchDataState = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handling Create User Promises
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handling Get User Promises
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handling Delete User Promises
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handling Update User Promises
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((user) => (user.id === action.payload.id ? action.payload : user));
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { searchUser } = userSlice.actions;

export default userSlice.reducer;
