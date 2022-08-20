# Redux-toolkit Tutorial

### Cloning instructions

```bash
git clone 'https://github.com/arun0808rana/redux-toolki-alt-tut.git'
cd redux-toolki-alt-tut
code .
npm install
npm start
exit
```

### START HERE

You still need to add redux and react-redux inspite of @reduxjs/toolkit

```js
npm install redux react-redux @reduxjs/toolkit
```

Slices come under `/features` folder. Eg. `/features/userSlice.js`

> Try naming slices with `Slice` as suffixes for better recognition

### Editing index.js file

```js
// ------------index.js-------------

import { Provider } from 'react-redux';
// notice it is different than redux
// infact redux nowadays throws depreciation err
import { configureStore } from '@reduxjs/toolkit';

// redux toolkit enforces the name features for making slices
// in features/user, user is the slice, should have been userSlice
// for better readability
import userReducer from './features/user';

// abstract store to a separate file for separation of concerns
// and better readability
const store = configureStore({
  reducer: {
    // user is the name of the reducer
    user: userReducer,
    // you can add multiple reducers here and name them
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
```

### Adding userSlice.js file inside `features` directory

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    name: "",
    age: 0,
    email: "",
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  //   this is where it differs in a weird way than redux
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        // action has type and payload
        // action type will be similar to "user/login", wher user
        // reducer is 'user' is reducer and 'login' is
        // action-creator
        value: action.payload,
      };
      //   we can reutrn the new state
      //   or we can do like this
      //   state = initialState
      //   but then it would not copy
      //   deep state values and hence i used
      // ...state to make deep copy
      // confirm this method with the official doc
    },
    logout: (state, action) => {
      return initialState;
    },
  },
});

console.log(userSlice, "userSlice");

// exporting action creaters
// export these so that you can import them
// to where you want to dispatch them from using useDispatch hook
export const { login, logout } = userSlice.actions;

// exporting it as default for index.js
// there you can name it anything since its a default export
// it is used inside configureStore() fn
export default userSlice.reducer;
```

### Dispatching actions

```js
import React from "react";
// still same as redux
import { useDispatch } from "react-redux";
// importing action creators
import { login } from "../features/user";
import { logout } from "../features/user";

function Login() {
  const dispatch = useDispatch();
  const handleLogin = () => {
    //   calling action creators
    //   inside dispatch and passing
    //   payload
    dispatch(
      login({
        name: "arun",
        age: 29,
        email: "arungmail",
      })
    );
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Login;
```

### Consuming in components

```js
import React from "react";
//  still using react-redux for useSelector
import { useSelector } from "react-redux";

function Profile() {
  // still same like redux
  // user in state.user.value is reducer
  const user = useSelector((state) => state.user.value);
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name:{user.name}</p>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}

export default Profile;
```

### Adding more reducers

1. Make `slice` file.
2. This way you isolate reducer, state, actions, and actions creators in one place i.e a slice.
3. Export it.
4. Import it in `index.js`.
5. Add the import to the `reducer` key inside `configureStore` .
6. Use a key-value pair for adding reducer.
