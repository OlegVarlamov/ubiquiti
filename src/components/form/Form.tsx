
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { createFile } from "features/file/thunks/createFile";
import uploadFile from "features/file/thunks/uploadFile";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import RenderField from "./RenderField";
import RenderFile from "./RenderFile";
import { required, maxLength100, number, minValue0, maxValue500, validateImageWeight } from "./rules";
import { unwrapResult } from "@reduxjs/toolkit";
import { CreateFileParams, ImageDetails } from "features/file/models";
import styled from "styled-components";
import { setUploadProgress } from "features/file/fileSlice";
import Table from "components/table/Table";
import ProgressBar from "components/progressbar/ProgressBar";

const StyledFormContainer = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 40px;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%
`;
const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	row-gap: 20px;
	max-width: 600px;
	border: 1px solid whitesmoke;
	padding: 20px;

	label {
		font-size: .7rem;
		color: #bbbbbb;
	}
	input, button {
		width: 100%;
		height: 30px;
	}
`;
const StyledErrorMessage = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Form: React.FC<InjectedFormProps> = ({ error, handleSubmit, pristine, reset, submitting }: InjectedFormProps) => {
	const fileInput = React.useRef(null);
	const dispatch = useAppDispatch();
	const [ blobUrl, setBlobUrl ] = useState<string>();
	const [ blobFileName, setBlobFileName ] = useState<string>();
	const { uploadProgress, isSaving, error: reduxError } = useAppSelector(state => state.file);

	const axiosProgressConfig = {
		onUploadProgress: (progress) => {
			const {loaded, total} = progress;
			const percentageProgress = Math.floor((loaded / total) * 100);
			dispatch(setUploadProgress(percentageProgress));
		}
	};

	const submitForm = (values: any & CreateFileParams) => {
		dispatch(createFile({ name: values.name, height: values.height }))
			.then(unwrapResult)
			.then(async originalPromiseResult => {
				if (originalPromiseResult.status !== "error" && !!blobUrl) {

					const file = await fetch(blobUrl)
						.then(r => r.blob())
						.then(blobFile => new File(
							[ blobFile ],
							blobFileName || "uploadedFileName",
							{ type: blobFile.type }
						));

					dispatch(uploadFile({
						uploadId: originalPromiseResult.uploadId,
						file: file,
						axiosConfig: axiosProgressConfig
					})).then(unwrapResult).then(()=>window.URL.revokeObjectURL(blobUrl));

				}
			});
	};

	const handleFileSelect = ({ localImageUrl, name }: React.ChangeEvent<HTMLInputElement> & ImageDetails) => {
		setBlobUrl(localImageUrl);
		setBlobFileName(name);
	};

	return (
		<StyledFormContainer>

			{ isSaving && !!uploadProgress && <ProgressBar completed={uploadProgress ?? 0} />}

			{ !!reduxError && <StyledErrorMessage><h4>{reduxError.error}</h4> <div>{reduxError.message}</div></StyledErrorMessage>}

			<StyledForm onSubmit={ handleSubmit(submitForm) }>
				<div>
					<Field
						label="Name"
						name="name"
						component={ RenderField }
						type="text"
						validate={ [ required, maxLength100 ] }
					/>
				</div>
				<div>
					<Field
						label="Height"
						name="height"
						component={ RenderField }
						type="number"
						min={ 0 }
						max={ 500 }
						validate={ [ number, required, minValue0, maxValue500 ] }
					/>
				</div>
				<div>
					<Field
						label="File"
						name="file"
						component={ RenderFile }
						type="file"
						multiple={ false }
						onChange={ handleFileSelect }
						ref={ fileInput }
						validate={ [ required, validateImageWeight ] }
					/>
				</div>
				<div>
					<button type="submit" disabled={ pristine || submitting }>
						Submit
					</button>
				</div>
			</StyledForm>

			<Table />

		</StyledFormContainer>
	);
};

export default reduxForm({
	form: "fileForm"
})(Form);
