import Link from 'next/link';
import { useRouter } from 'next/router';

import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavItem,
	MDBNavbarToggler,
	MDBCollapse,
	MDBFormInline,
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownMenu,
	MDBDropdownItem,
} from 'mdbreact';

import React, { useState } from 'react';

export default function NavBar() {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const toggleCollapse = () => {
		setIsOpen(!isOpen);
	};

	console.log(router.pathname);

	return (
		<>
			<MDBNavbar fixed='top' color='indigo' dark expand='md'>
				<MDBNavbarBrand>
					<strong className='white-text'>Auto Zone</strong>
				</MDBNavbarBrand>
				<MDBNavbarToggler onClick={() => toggleCollapse()} />
				<MDBCollapse id='navbarCollapse3' isOpen={isOpen} navbar>
					<MDBNavbarNav left>
						{router.pathname !== '/' && (
							<MDBNavItem>
								<Link href='/'>
									<a className='nav-link'>Home</a>
								</Link>
							</MDBNavItem>
						)}

						{router.pathname !== '/View' && (
							<MDBNavItem>
								<Link href='/View'>
									<a className='nav-link'>Manage</a>
								</Link>
							</MDBNavItem>
						)}

						{router.pathname !== '/Manage' && (
							<MDBNavItem>
								<Link href='/Manage'>
									<a className='nav-link'>Add New Car</a>
								</Link>
							</MDBNavItem>
						)}

						<MDBNavItem>
							<MDBDropdown>
								<MDBDropdownToggle nav caret>
									<span className='mr-2'>Dropdown</span>
								</MDBDropdownToggle>
								<MDBDropdownMenu>
									<MDBDropdownItem>
										<Link href='/'>
											<a>Home</a>
										</Link>
									</MDBDropdownItem>
									<MDBDropdownItem>
										<Link href='/register'>
											<a>Register</a>
										</Link>
									</MDBDropdownItem>
									<MDBDropdownItem>
										<Link href='/'>
											<a>Home</a>
										</Link>
									</MDBDropdownItem>
									<MDBDropdownItem>
										<Link href='/register'>
											<a>Register</a>
										</Link>
									</MDBDropdownItem>
								</MDBDropdownMenu>
							</MDBDropdown>
						</MDBNavItem>
					</MDBNavbarNav>
					<MDBNavbarNav right>
						<MDBNavItem>
							<MDBFormInline waves>
								<div className='md-form my-0'>
									<input
										className='form-control mr-sm-2'
										type='text'
										placeholder='Search'
										aria-label='Search'
									/>
								</div>
							</MDBFormInline>
						</MDBNavItem>
					</MDBNavbarNav>
				</MDBCollapse>
			</MDBNavbar>
		</>
	);
}
