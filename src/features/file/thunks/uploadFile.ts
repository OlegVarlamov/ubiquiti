import axios, {AxiosError, AxiosResponse} from "axios";
import {apiClient} from "helpers/api";
import {UploadFileParams, UploadFileResponse, ValidationErrors} from "../models";
import {createAsyncThunk} from "@reduxjs/toolkit";

export default createAsyncThunk("file/upload", async (params: UploadFileParams, thunkAPI) => {
	try {
		const source = axios.CancelToken.source();
		thunkAPI.signal.addEventListener("abort", () => {
			source.cancel();
		});
		const data = new FormData();
		data.append("file", params.file);
		const response: AxiosResponse = await apiClient.post<UploadFileResponse>(`/upload/${params.uploadId}`, data, {
			cancelToken: source.token,
			...params.axiosConfig,
		});
		return response.data;
	} catch (err) {
		const error: AxiosError<ValidationErrors> = err;
		if (!error.response) {
			throw err;
		}
		return thunkAPI.rejectWithValue(error.response.data);
	}
});