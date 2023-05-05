import React, { useEffect, useCallback, useState } from 'react';

import { getAllCartItems } from '../firebase/cartPage';

import Loader from '../components/Loader/Loader.js';
import ShowMsg from '../components/ShowMsg/ShowMsg';

import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';

import photoNotAvailable from '../images/photoNotAvailable.jpeg';
import cartIsEmpty from '../images/cart-is-empty.png';

import '../styles/cartPage.css';

function HomePage() {
	const [msg, setMsg] = useState({ text: '', type: '' });
	const [isGetCourseApiLoading, setIsGetCourseApiLoading] = useState(true);
	const [allCartCourses, setAllCartCourses] = useState([]);
	const [totalCoursePrices, setTotalCoursePrices] = useState({ courseORGPrice: 0, courseDiscountedPrice: 0 });

	const handleMsgShown = useCallback((msgText, type) => {
		if (msgText) {
			setMsg({ text: msgText, type: type });
			setTimeout(() => {
				setMsg({ text: '', type: '' });
			}, 2500);
		} else {
			console.log('Please Provide Text Msg');
		}
	}, []);

	useEffect(() => {
		getAllCartItems(setAllCartCourses, setIsGetCourseApiLoading, handleMsgShown);
	}, [handleMsgShown]);

	useEffect(() => {
		let cartPriceSum = { courseORGPrice: 0, courseDiscountedPrice: 0 };
		for (var i = 0; i < allCartCourses.length; i++) {
			cartPriceSum.courseORGPrice = cartPriceSum.courseORGPrice + parseInt(allCartCourses[i].courseORGPrice);
			cartPriceSum.courseDiscountedPrice =
				cartPriceSum.courseDiscountedPrice + parseInt(allCartCourses[i].courseDiscountedPrice);
		}
		setTotalCoursePrices(cartPriceSum);
	}, [allCartCourses]);

	const handleRemoveBtnClick = useCallback((courseId) => {
		const userCart = JSON.parse(localStorage.getItem('user_cart')) || [];
		var filteredArray = userCart.filter(function (e) {
			return e !== courseId;
		});
		localStorage.setItem('user_cart', JSON.stringify(filteredArray));
		window.location.reload();
	}, []);

	return (
		<div className="cartPage">
			{/* <NavBar /> */}
			<Toolbar />
			<div className="cartPageContainer" component="main">
				<div className="leftContainer">
					<div className="shoppingCartTitle">Shopping Cart</div>

					<Loader isLoading={isGetCourseApiLoading} />

					{allCartCourses.length === 0 && !isGetCourseApiLoading && (
						<div className="cartIsEmpty">
							<img src={cartIsEmpty} alt="" />
							<div>Your is cart currently empty.</div>
						</div>
					)}

					{allCartCourses.map((item, index) => {
						return (
							<div className="cartCourseBox" key={index}>
								<img
									className="cartCourseImg"
									src={item?.courseThumbnail || photoNotAvailable}
									loading="lazy"
									alt=""
								/>
								<div className="cartCourseInfo">
									<div className="cartCourseType">Type:- {item?.courseType}</div>
									<div className="cartCourseTitle">{item?.courseName}</div>
									<div className="cartCoursePrice">₹{item?.courseDiscountedPrice}</div>
									<Button onClick={() => handleRemoveBtnClick(item?.courseId)}>Remove</Button>
								</div>
							</div>
						);
					})}
				</div>
				<div className="rightContainer">
					<div className="cartPriceSum">
						<div className="cartPriceSumTitle">Price Details</div>
						<div className="cartPriceDetails">
							<div className="cartPriceDetailsName">Price</div>
							<div className="cartPriceDetailsValue">₹{totalCoursePrices?.courseORGPrice}</div>
						</div>
						<div className="cartPriceDetails">
							<div className="cartPriceDetailsName">Discount</div>
							<div className="cartPriceDetailsValue cartDiscountPriceValue">
								- ₹{totalCoursePrices?.courseORGPrice - totalCoursePrices?.courseDiscountedPrice}
							</div>
						</div>
						<hr className="totalPriceLine" />
						<div className="cartPriceDetails cartTotalPrice">
							<div className="cartPriceDetailsName">Total Amount</div>
							<div className="cartPriceDetailsValue">₹{totalCoursePrices?.courseDiscountedPrice}</div>
						</div>
					</div>
					<div className="VerifiedPaymet">
						<VerifiedUserTwoToneIcon sx={{ mr: 1 }} />
						<>Safe and Secure Payments. 100% Authentic products.</>
					</div>

					<Button
						variant="contained"
						className="cartCheckoutBtn"
						color="warning"
						sx={{ my: 3, px: 3, py: 1.5 }}
						fullWidth
						onClick={() => handleMsgShown('This Feature is not available yet', 'warning')}
					>
						Place Order
					</Button>
				</div>
			</div>
			{msg && <ShowMsg isError={msg?.text ? true : false} msgText={msg?.text} type={msg?.type} />}
		</div>
	);
}

export default HomePage;
