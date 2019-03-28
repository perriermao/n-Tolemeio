import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { connect, Provider } from "react-redux";
import { createStore } from "redux";

let reducer = function(state, action) {
  if (action.type === "addTodo") {
    return { todos: state.todos.concat(action.content) };
  }
  if (action.type === "availabilitySearch") {
    return { ...state, listings: [], city: "", startDate: "", endDate: "" };
  }
  if (action.type === "search-results") {
    console.log("search", action);
    return { ...state, search: action.results };
  }
  return state; // Needed because react-redux calls your reducer with an @@init action
};
const store = createStore(
  reducer, // reducer
  { listings: [], city: "", startDate: "", endDate: "" }, // initial state (in this case, empty)
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
