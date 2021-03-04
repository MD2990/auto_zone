import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import RentForm from '../components/RentForm';
import Available from './api/available/availble';
const url = `http://localhost:3000/aval`;

const Rent = () => {

	return (
		<>
			
			<Available />
		</>
	);
};

export default Rent;
