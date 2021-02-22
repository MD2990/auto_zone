import axios from 'axios';
import { SWRConfig } from 'swr';
import '../styles/globals.css';
import { Router } from 'next/dist/client/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

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
			<Component {...pageProps} />
		</SWRConfig>
	);
}

export default MyApp;
