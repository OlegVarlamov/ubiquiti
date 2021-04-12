import fileReducer, {INITIAL_STATE, setUploadProgress} from "./fileSlice";
import {getFiles} from "./thunks/getFiles";

describe("fileSlice", () => {
	describe("reducers", () => {
		it("should handle initial state", () => {
			const nextState = fileReducer(undefined, {type: "unknown"});
			expect(nextState).toBe(INITIAL_STATE);
		});

		it("setUploadProgress", () => {
			const nextState = fileReducer(INITIAL_STATE, setUploadProgress(99));
			expect(nextState.uploadProgress).toBe(99);
		});
	});

	describe("extra reducers", () => {
		it("getFiles.pending", () => {
			const action = {type: getFiles.pending.type};
			const nextState = fileReducer(INITIAL_STATE, action);
			expect(nextState.uploadProgress).toBe(INITIAL_STATE.uploadProgress);
			expect(nextState.isLoading).toBe(true);
		});

		it("getFiles.fulfilled", () => {
			const mockAsyncPayload = {name: "Record name", height: 33, file: "filename.txt"};
			const action = {type: getFiles.fulfilled.type, payload: mockAsyncPayload};
			const nextState = fileReducer(INITIAL_STATE, action);
			expect(nextState.files).toBe(mockAsyncPayload);
			expect(nextState.isLoading).toBe(false);
		});

		it("getFiles.rejected", () => {
			const mockAsyncPayloadError = "error message";
			const action = {type: getFiles.rejected.type, payload: mockAsyncPayloadError};
			const nextState = fileReducer(INITIAL_STATE, action);
			expect(nextState.error).toBe(mockAsyncPayloadError);
			expect(nextState.isLoading).toBe(false);
		});
	});

});
