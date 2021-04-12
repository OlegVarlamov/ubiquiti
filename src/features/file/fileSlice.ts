import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FileState} from "./models";
import {createFile} from "./thunks/createFile";
import {getFiles} from "./thunks/getFiles";
import uploadFile from "./thunks/uploadFile";

export const INITIAL_STATE: FileState = {
	isLoading: false,
	isSaving: false,
	files: [],
	error: undefined,
	uploadProgress: 0,
};

const orderSlice = createSlice({
	name: "order",
	initialState: INITIAL_STATE,
	reducers: {
		setUploadProgress: {
			reducer(state, action: PayloadAction<number>) {
				state.uploadProgress = action.payload;
			},
			prepare(payload: number) {
				return {payload};
			},
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getFiles.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getFiles.fulfilled, (state, action) => {
				state.files = action.payload;
				state.isLoading = false;
			})
			.addCase(getFiles.rejected, (state, action) => {
				state.error = action.payload ?? action.error.message;
				state.isLoading = false;
			})
			.addCase(createFile.pending, (state) => {
				state.isSaving = true;
			})
			.addCase(createFile.fulfilled, (state, action) => {
				state.files = state.files?.concat({...action.meta.arg, ...action.payload});
				state.isSaving = false;
			})
			.addCase(createFile.rejected, (state, action) => {
				state.error = action.payload ?? action.error.message;
				state.isSaving = false;
			})
			.addCase(uploadFile.pending, (state) => {
				state.isSaving = true;
			})
			.addCase(uploadFile.fulfilled, (state, action) => {
				state.files = state.files!.map((v) => (v.uploadId === action.meta.arg.uploadId ? {...v, file: action.meta.arg.file.name} : v));
				state.isSaving = false;
			})
			.addCase(uploadFile.rejected, (state, action) => {
				state.error = action.payload ?? action.error.message;
				state.files = state.files?.filter((v) => v.uploadId !== action.meta.arg.uploadId);
				state.isSaving = false;
			});
	},
});

export const {setUploadProgress} = orderSlice.actions;
export default orderSlice.reducer;
