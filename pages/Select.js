import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { AiFillFileAdd, AiFillEdit } from 'react-icons/ai';
import styles from '../styles/main.module.css';
import { IconContext } from 'react-icons';

export default function Select() {
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
							<Link href='/View'>
								<a style={{ textDecoration: 'none' }}>
									<AiFillEdit color='C70039' />
									<h3 className={`${styles.link_fonts} text-truncate`}>
										Edit / Delete Car
									</h3>
								</a>
							</Link>
						</IconContext.Provider>
					</Col>
					<Col s={1}>
						<IconContext.Provider
							value={{
								size: '15em',
							}}>
							<Link href='/Manage'>
								<a style={{ textDecoration: 'none' }}>
									<AiFillFileAdd color='C70039' />
									<h3 className={`${styles.link_fonts} text-truncate`}>
										Add New Car
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
