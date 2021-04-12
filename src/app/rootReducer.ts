import {combineReducers} from "@reduxjs/toolkit";
import fileReducer from "features/file/fileSlice";
import {reducer as formReducer} from "redux-form";

const rootReducer = combineReducers({
	file: fileReducer,
	form: formReducer,
});

export default rootReducer;
