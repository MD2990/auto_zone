import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
	PaginationProvider,
	PaginationListStandalone,
} from 'react-bootstrap-table2-paginator';
import { Type } from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Router, useRouter } from 'next/router';
import axios from 'axios';
import { array } from 'yup';
import useSWR, { mutate } from 'swr';
import ToolkitProvider, {
	Search,
	CSVExport,
} from 'react-bootstrap-table2-toolkit';

export default function View({ cars }) {
	const { SearchBar, ClearSearchButton } = Search;
	const { ExportCSVButton } = CSVExport;
	const router = useRouter();
	const [isOpen, setIsOpen] = React.useState(false);

	const { data, error } = useSWR('http://localhost:3000/api/cars', {
		initialData: cars,
	});

	if (error) return <div>failed to load</div>;
	if (!data) return <div>Lodeing ...</div>;

	mutate('http://localhost:3000/api/cars', data, false);
	function priceFormatter(column, colIndex) {
		return (
			<a className='navbar-brand' href='#'>
				{column}
			</a>
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
			formatter: priceFormatter,
		},
	];

	const defaultSorted = [
		{
			dataField: 'model',
			order: 'desc',
		},
	];
	const selectRow = {
		mode: 'radio',
		clickToSelect: true,
		onSelect: (row, isSelect, rowIndex, e) => {
			confirm('Do you want to edit/delete: ' + row.model)
				? router.push(`http://localhost:3000/api/cars/${row._id}`)
				: false;
		},
	};

	let toggle = () => {
		setModel(!modal);
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
							bootstrap4
							keyField='_id'
							data={data}
							columns={columns}
							defaultSorted={defaultSorted}
							defaultSortDirection='asc'
							selectRow={selectRow}
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
			<div>
				<PaginationProvider pagination={paginationFactory(options)}>
					{contentTable}
				</PaginationProvider>
			</div>

			{/* 	<BootstrapTable
				bootstrap4
				keyField='_id'
				data={data}
				columns={columns}
				pagination={paginationFactory()}
				defaultSorted={defaultSorted}
				defaultSortDirection='asc'
			/> */}
		</>
	);
}

View.getInitialProps = async (ctx) => {
	const res = await axios('http://localhost:3000/api/cars');
	const json = res.data;
	return { cars: json };
};