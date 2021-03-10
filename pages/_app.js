import axios from 'axios';
import { SWRConfig } from 'swr';
import '../styles/globals.css';
import { Router } from 'next/dist/client/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'mdbreact/dist/css/mdb.css';
import { ToastContainer, Zoom } from 'react-toastify';
import Layout from '../components/Layout';
import 'react-bootstrap';

//NProgress.configure({ easing: 'ease', speed: 500 });
NProgress.configure({ showSpinner: true });
Router.events.on('routeChangeStart', () => {
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
	NProgress.done();
});
Router.events.on('routeChangeError', () => {
	NProgress.done();
});

function MyApp({ Component, pageProps }) {
	return (
		<SWRConfig value={{ fetcher: (url) => axios(url).then((r) => r.data) }}>
			<ToastContainer autoClose={2000} limit={1} transition={Zoom} />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SWRConfig>
	);
}

export default MyApp;
