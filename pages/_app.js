import axios from 'axios';
import { SWRConfig } from 'swr';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (

			<SWRConfig value={{ fetcher: (url) => axios(url).then((r) => r.data) }}>
				<Component {...pageProps} />
			</SWRConfig>
		
	);
}

export default MyApp;
