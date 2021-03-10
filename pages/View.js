import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import useSWR, { mutate, trigger, fetcher } from 'swr';
import ToolkitProvider, {
	Search,
	CSVExport,
} from 'react-bootstrap-table2-toolkit';
import paginationFactory, {
	PaginationListStandalone,
	PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';

import fetch from 'isomorphic-unfetch';
import { toast } from 'react-toastify';
import axios from 'axios';
import dbConnect, { jsonify } from '../utils/dbConnect';
import Car from '../models/Car';
const url = `http://localhost:3000/edit`;
const errorUrl = `http://localhost:3000/View`;

export default function View({ car }) {
	const { SearchBar, ClearSearchButton } = Search;
	const { ExportCSVButton } = CSVExport;
	const router = useRouter();
	const style = {
		cursor: 'pointer',
	};

	const { data, error } = useSWR('/api/cars', {
		initialData: car,
	});

	if (error)
		return (
			<div className='d-flex justify-content-center text-center mt-xl-5 pt-xl-5 vh-100'>
				<div className='ms-auto spinner-grow  text-danger ' role='status'>
					<span className='visually-hidden'> </span>
					<h6 className=' ml-xl-n5 pl-xl-n5 mt-xl-5  text-nowrap '>
						Please try again !!!
					</h6>
				</div>
			</div>
		);

	if (!data)
		return (
			<div className='d-flex justify-content-center text-center mt-xl-5 pt-xl-5 vh-100'>
				<div className='ms-auto spinner-grow  text-primary ' role='status'>
					<span className='visually-hidden'></span>
					<h6 className=' ml-xl-n2 mt-xl-5  text-nowrap '>Loading ...</h6>
				</div>
			</div>
		);

	function priceFormatter(column, colIndex) {
		return (
			<p
				className=' text-wrap text-uppercase  text-truncate disabled '
				style={style}>
				{column}
			</p>
		);
	}

	function editBtnFormatter(column, colIndex) {
		return (
			<button className=' btn btn-info btn-sm'>
				{column.substring(column.length) + 'Edit'}
			</button>
		);
	}
	function deleteBtnFormatter(column, colIndex) {
		const len = column.toString().length;
		return (
			<button className=' btn btn-danger btn-sm'>
				{column.toString().substring(len) + 'Delete'}
			</button>
		);
	}
	const columns = [
		{
			dataField: '_id',
			text: 'Edit',
			formatter: editBtnFormatter,
		},
		{
			dataField: `available`,
			text: 'Delete',
			formatter: deleteBtnFormatter,
		},
		{
			dataField: 'model',
			text: 'Car Model',
			formatter: priceFormatter,
		},
		{
			dataField: 'make',
			text: 'Car Make',
			sort: true,
			formatter: priceFormatter,
		},
		{
			dataField: 'year',
			text: 'Year',
			sort: true,
			formatter: priceFormatter,
		},

		{
			dataField: 'vin',
			text: 'Vin Number',
			sort: true,
			formatter: priceFormatter,
		},

		{
			dataField: 'color',
			text: 'Color',
			sort: true,
			formatter: priceFormatter,
		},

		{
			dataField: 'mileage',
			text: 'Mileage',
			sort: true,
			formatter: priceFormatter,
		},
		{
			dataField: 'rental_fees',
			text: 'Rental Fees',
			sort: true,
		},
		{
			dataField: 'registration_expiry_date',
			text: 'Registration Expiry_Date',
			sort: true,
			formatter: priceFormatter,
		},
		/* {
			dataField: 'available',
			text: 'Available',
			sort: true,

			editor: {
				type: Type.CHECKBOX,
				value: 'true:false',
			},
		}, */
		{
			dataField: 'notes',
			text: 'Notes',
			sort: true,
			width: 150,
			formatter: priceFormatter,
		},
	];
	const rowStyle = (row, rowIndex) => {
		return rowIndex;
	};
	const defaultSorted = [
		{
			dataField: 'year',
			order: 'desc',
		},
	];

	const handleDelete = async (id) => {
		try {
			const deleteUrl = `http://localhost:3000/api/cars/${id}`;
			const url = `http://localhost:3000//api/cars`;
			mutate(url, false);

			await axios.delete(deleteUrl);

			//car.car.filter((car) => car._id !== id);

			toast(
				`Deleting ...`,

				{
					type: toast.TYPE.ERROR,
					autoClose: 1000,
				}
			);
			trigger(url);
		} catch (error) {
			toast(
				` Something went wrong, please try again` + error,

				{
					type: toast.TYPE.ERROR,
					autoClose: 3500,
				}
			);
		}
	};
	const rowEvents = {
		onClick: (e, row, rowIndex, rowClasses) => {
			if (e.target.textContent === 'Delete') {
				if (confirm(`Are you sure you want to delete:  ${row.model} `))
					handleDelete(row._id);
				rowClasses = 'disabled';
			}

			if (e.target.textContent === 'Edit') {
				router.push(`http://localhost:3000/${row._id}`);
			}
		},
	};

	const options = {
		custom: true,
		paginationSize: 4,
		pageStartIndex: 1,
		firstPageText: 'First',
		prePageText: 'Back',
		nextPageText: 'Next',
		lastPageText: 'Last',
		nextPageTitle: 'First page',
		prePageTitle: 'Pre page',
		firstPageTitle: 'Next page',
		lastPageTitle: 'Last page',
		showTotal: true,
		totalSize: car.length,
	};

	const contentTable = ({ paginationProps, paginationTableProps }) => (
		<div>
			<PaginationListStandalone {...paginationProps} />
			<ToolkitProvider keyField='_id' columns={columns} data={car} search>
				{(toolkitprops) => (
					<div>
						<SearchBar {...toolkitprops.searchProps} />
						<ClearSearchButton {...toolkitprops.searchProps} />
						<BootstrapTable
							{...toolkitprops.baseProps}
							{...paginationTableProps}
							striped
							hover
							condensed
							bootstrap4
							keyField='_id'
							data={car}
							columns={columns}
							defaultSorted={defaultSorted}
							defaultSortDirection='asc'
							rowEvents={rowEvents}
						/>
						<ExportCSVButton {...toolkitprops.csvProps}>
							Export CSV!!
						</ExportCSVButton>
					</div>
				)}
			</ToolkitProvider>
			<PaginationListStandalone {...paginationProps} />
		</div>
	);

	return (
		<>
			<div className='container-xl mt-xl-4 mt-xl-5 marTop '>
				<PaginationProvider pagination={paginationFactory(options)}>
					{contentTable}
				</PaginationProvider>
			</div>
		</>
	);
}

export const getStaticProps = async () => {
	dbConnect();
	const data = await Car.find({});
	const car = await jsonify(data);
	if (!car) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			car,
		},
		revalidate: 1,
	};
};

/* export const getStaticProps = async () => {
	const fetcher = (url) => fetch(url).then((r) => r.json());

	const car = await fetcher('http://localhost:3000/api/cars');

	if (!car) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			car,
		},
		revalidate: 1,
	};
}; */
