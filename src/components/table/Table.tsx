import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Spinner from "components/spinner/Spinner";
import { getFiles } from "features/file/thunks/getFiles";
import styled from "styled-components";

const StyledTable = styled.table`
	max-width: 600px;
	width: 100%;
	border: 1px solid lightgrey;
	border-collapse: collapse;
	thead * {
		background: darkgrey;
		text-transform: uppercase;
		line-height: 40px;
		color: #fff;
		th {
			padding: 0 20px;
		}
	}
	tr {
		&:nth-child(even) {
  		background: #f2f2f2;
		}
	}
	td {
		padding: 15px 20px;
		border: 1px solid #fff;
	}
`;

const Table = () => {
	const dispatch = useAppDispatch();
	const { files } = useAppSelector(state => state.file);

	// prevent update table (every 10 sec) when new file is uploading
	const isFileUploading = () => files?.some(f => !!f.name && !!f.height && !f.file);

	// first render call
	useEffect(() => {
		dispatch(getFiles());
	}, [ dispatch ]);

	// Interval call with condition
	useEffect(() => {
		if (isFileUploading()) return;
		const timer = setInterval(() => dispatch(getFiles()), 10000);
		return () => clearInterval(timer);
	}, [ dispatch, files ]);

	return (
		!files?.length ? <Spinner /> : <StyledTable>
			<thead>
				<tr>
					<th>#</th>
					{
						Object.keys(files[ 0 ]).map((key, i) =>
							<th key={ i }>{ key }</th>
						)
					}
				</tr>
			</thead>
			<tbody>
				{
					files.slice()
						.sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0)
						.map((file, i) =>
							<tr key={ i }>
								<td>{ i + 1 }</td>
								<td>{ file.name }</td>
								<td>{ file.height }</td>
								<td>{ file.file || <Spinner /> }</td>
							</tr>
						)
				}
			</tbody>
		</StyledTable>
	);
};

export default Table;