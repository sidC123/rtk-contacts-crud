1. Dependencies:
    bootstrap
    npm install @reduxjs/toolkit
    npm install react-redux

2. Create a global store
    src > redux > store.js

    import { configureStore } from "@reduxjs/toolkit";

    export const store = configureStore({
    reducer: {},
    });

3. Providing store to complete react app
    <Provider store={store}>
        <App />
    </Provider>

4. Planning the app ahead:
    - Create.jsx : for creating a contact and filling in Details
    - Home.jsx : where all contacts will be shown 
    - Navbar.jsx: holds the total count, route to create contact, search bar
    - Loading.jsx: loading animation

5. Creating api:
    - either custom API using nodeJs
    - or mockApi
    - deciding the schema : name, age, email, gender, etc...
    - testing api
    - create demoData.json just to render the components

6. Home.jsx to render contacts data.

7. Create.jsx:
    - create form to submit data and create a contact

8. Create UserReducer.jsx
    ACTION:

    //Get Users Action
    export const getUsers = createAsyncThunk("getUsers", async (args, { rejectWithValue }) => {
        const response = await axios.get('https://6443f21e466f7c2b4b5df7ed.mockapi.io/users');

        try {
            const result = await response.data;
            return result
        } catch (error) {
            return rejectWithValue(error);
        }
    })

    SLICE: 

    const userSlice = createSlice({
        name: "users",

        initialState: {
        users: [],
        loading: false,
        error: null,
        },

        extraReducers: {
            //handling response here
        }
    })

9. Finally dispatching actions from front end