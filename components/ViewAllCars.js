import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
	PaginationProvider,
	PaginationListStandalone,
} from 'react-bootstrap-table2-paginator';
import { Type } from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR, { mutate, trigger } from 'swr';
import ToolkitProvider, {
	Search,
	CSVExport,
} from 'react-bootstrap-table2-toolkit';
import React from 'react';
import Link from 'next/link';
import Form from '../components/Edit_Delete_Form';
import { toast } from 'react-toastify';

export default function View({ car }) {
	const { SearchBar, ClearSearchButton } = Search;
	const { ExportCSVButton } = CSVExport;
	const router = useRouter();
	const style = {
		cursor: 'pointer',
	};

	const { data, error } = useSWR('http://localhost:3000/api/cars', {
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
	mutate('http://localhost:3000/api/cars', data, true);

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
		const url = `http://localhost:3000/View`;
		const deleteUrl = `http://localhost:3000/api/cars/${id}`;
		try {
			mutate(
				'http://localhost:3000/api/cars',
				car.filter((c) => c._id !== id),
				false
			);
			await axios.delete(deleteUrl);

			trigger('http://localhost:3000/api/cars');

			//setShow(false);
			/* 	toast(
				`Deleting ...`,

				{
					type: toast.TYPE.ERROR,
					autoClose: 1800,
				}
			); */
			/* 	setTimeout(() => {
				router.replace(url);
			}, 2000); */
		} catch (error) {
			//setShow(false);
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
		onClick: (e, row, rowIndex) => {
			if (e.target.textContent === 'Delete') {
				return handleDelete(row._id);
			}

			if (e.target.textContent === 'Edit') {
				return router.push(`http://localhost:3000/${row._id}`);
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
		totalSize: data.length,
	};

	const contentTable = ({ paginationProps, paginationTableProps }) => (
		<div>
			<PaginationListStandalone {...paginationProps} />
			<ToolkitProvider
				keyField='_id'
				columns={columns}
				data={car ? car : data}
				search>
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
							data={car ? car : data}
							//className='row-cols-xl-6'
							rowClasses='row-cols-xl-2'
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
			<h4 className='marTop'>{data.length}</h4>
			<div className='container-xl mt-xl-4 mt-xl-5 marTop '>
				<PaginationProvider pagination={paginationFactory(options)}>
					{contentTable}
				</PaginationProvider>
			</div>
		</>
	);
}
