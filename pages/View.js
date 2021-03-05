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
import useSWR, { mutate } from 'swr';
import ToolkitProvider, {
	Search,
	CSVExport,
} from 'react-bootstrap-table2-toolkit';
import React from 'react';
import Link from 'next/link';
import Form from '../components/Edit_Delete_Form';
import { toast } from 'react-toastify';

export default function View({ allData }) {
	const { SearchBar, ClearSearchButton } = Search;
	const { ExportCSVButton } = CSVExport;
	console.log(allData);
	const router = useRouter();
	const { data, error } = useSWR('http://localhost:3000/api/cars', {
		initialData: allData,
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

	const style = {
		cursor: 'pointer',
	};

	mutate('http://localhost:3000/api/cars', data, true);
	function priceFormatter(column, colIndex) {
		return (
			<p className=' text-wrap text-uppercase  text-truncate ' style={style}>
				{column}
			</p>
		);
	}
	const columns = [
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
		{
			dataField: 'available',
			text: 'Available',
			sort: true,

			editor: {
				type: Type.CHECKBOX,
				value: 'true:false',
			},
		},
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
			dataField: 'model',
			order: 'desc',
		},
	];
	const rowEvents = {
		onClick: (e, row, rowIndex) => {
			const carForm = {
				model: row.model,
				make: row.make,
			};

			router.push(`http://localhost:3000/${row._id}/edit`);
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
			<ToolkitProvider keyField='_id' columns={columns} data={data} search>
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
							data={data}
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
			<div className='container-xl mt-4 mb-4'>
				<PaginationProvider pagination={paginationFactory(options)}>
					{contentTable}
				</PaginationProvider>
			</div>
		</>
	);
}

/* View.getInitialProps = async (ctx) => {
	const res = await axios('http://localhost:3000/api/cars');
	const json = res.data;
	return { cars: json };
}; */
export async function getServerSideProps(context) {
	const res = await fetch(`http://localhost:3000/api/cars`);
	const allData = await res.json();

	if (!allData) {
		return {
			notFound: true,
		};
	}

	return {
		props: { allData }, // will be passed to the page component as props
	};
}
