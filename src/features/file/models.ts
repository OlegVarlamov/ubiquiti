export interface FileState {
	isLoading: boolean;
	isSaving: boolean;
	files?: FileDetails[];
	error?: any;
	uploadProgress?: number;
}

export interface FileDetails {
	uploadId?: string;
	name: string;
	height: number;
	file?: string;
}

export interface ImageDetails {
	name: string;
	size: number;
	localImageUrl: string;
}

export interface CreateFileParams {
	name: string;
	height: number;
}

export interface CreateFileResponse {
	uploadId: string;
}

export interface UploadFileParams {
	uploadId: string;
	file: File;
	// eslint-disable-next-line no-unused-vars
	axiosConfig?: { onUploadProgress: (progress: ProgressEvent) => void; }
}

export interface UploadFileResponse {
	result: boolean;
}

export interface ErrorFile {
	message?: string;
	status?: string;
	field?: string;
}

export interface ValidationErrors {
  errorMessage: string
  field_errors: Record<string, string>
}
