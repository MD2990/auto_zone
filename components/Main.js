import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { IoCarSportSharp, IoCarSportOutline } from 'react-icons/io5';
import { FcEditImage } from 'react-icons/fc';
import styles from '../styles/main.module.css';
import { IconContext } from 'react-icons';

export default function AlertDismissible() {
	return (
		<>
			<Container className='text-center'>
				<Row className=' justify-content-center align-items-center  vh-100'>
					<Col s={1}>
						<IconContext.Provider
							value={{
								color: 'blue',
								size: '15em',
							}}>
							<Link href='/Receive'>
								<a style={{ textDecoration: 'none' }}>
									<IoCarSportSharp />
									<h3 className={`${styles.link_fonts} text-truncate`}>
										Receive a Car
									</h3>
								</a>
							</Link>
						</IconContext.Provider>
					</Col>
					<Col s={1}>
						<IconContext.Provider
							value={{
								color: 'C70039',
								size: '15em',
							}}>
							<Link href='/Rent'>
								<a style={{ textDecoration: 'none' }}>
									<IoCarSportOutline />
									<h3 className={`${styles.link_fonts} text-truncate`}>
										Rent a Car
									</h3>
								</a>
							</Link>
						</IconContext.Provider>
					</Col>
					<Col s={1}>
						<IconContext.Provider
							value={{
								color: 'C70039',
								size: '15em',
							}}>
							<Link href='/Select'>
								<a style={{ textDecoration: 'none' }}>
									<FcEditImage />
									<h3 className={`${styles.link_fonts} text-truncate`}>
										Manage
									</h3>
								</a>
							</Link>
						</IconContext.Provider>
					</Col>
				</Row>
			</Container>
		</>
	);
}
