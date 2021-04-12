import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { apiClient } from "helpers/api";
import { CreateFileParams, CreateFileResponse } from "../models";

export const createFile = createAsyncThunk("file/create", async (params: CreateFileParams, thunkAPI) => {
	try {
		const source = axios.CancelToken.source();
		thunkAPI.signal.addEventListener("abort", () => {
			source.cancel();
		});
		const response: AxiosResponse = await apiClient.post<CreateFileResponse>("/submit", params, {
			cancelToken: source.token,
		});
		return response.data;
	} catch (err) {
		if (!err.response) {
			// eslint-disable-next-line no-console
			console.error("Error: Network Error. Checvk API endpoint or VPN connection!");
			return {message: "Error: Network Error", status: "error"};
		}
		return thunkAPI.rejectWithValue(err.response.data);
	}
});