import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "helpers/api";
import { UploadFileResponse, ValidationErrors } from "../models";

export const getFiles = createAsyncThunk("file/getAll", async (_, thunkAPI) => {
	try {
		const source = axios.CancelToken.source();
		thunkAPI.signal.addEventListener("abort", () => {
			source.cancel();
		});
		const response: AxiosResponse = await apiClient.get<UploadFileResponse>("/data", {
			cancelToken: source.token,
		});
		return await response.data;
	} catch (err) {
		const error: AxiosError<ValidationErrors> = err;
		if (!error.response) {
			throw err;
		}
		return thunkAPI.rejectWithValue(error.response.data);
	}
});