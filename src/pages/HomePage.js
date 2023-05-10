import React, { useState, useEffect, useCallback } from 'react';

import { getcourses } from '../firebase/homePage.js';
import Loader from '../components/Loader/Loader.js';
import ShowMsg from '../components/ShowMsg/ShowMsg.js';
import MuiBtn from '../components/MuiBtn/MuiBtn.js';

import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';

import photoNotAvailable from '../images/photoNotAvailable.jpeg';

import '../styles/homePage.css';

const keyPoints = [
	{ title: 'Self-Paced', description: 'Watch Anytime, Anywhere Unlimited Video Playbacks for lifetime.' },
	{ title: 'Unlimited', description: ' Lifetime access of course.' },
	{ title: 'Language', description: 'Indian English and Hindi.' },
	{ title: 'Support', description: '24/7 Student support line.' },

]

function HomePage() {
	const [msg, setMsg] = useState({ text: '', type: '' });
	const [isGetCourseApiLoading, setIsGetCourseApiLoading] = useState(false);
	const [allCourses, setAllCourses] = useState([]);

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
		getcourses(setAllCourses, setIsGetCourseApiLoading, handleMsgShown);
	}, [handleMsgShown]);

	const handleAddToCartBtnClick = useCallback(
		(courseId) => {
			const userCart = JSON.parse(localStorage.getItem('user_cart')) || [];
			if (!userCart.includes(courseId)) {
				userCart.push(courseId);
				localStorage.setItem('user_cart', JSON.stringify(userCart));
				handleMsgShown('Course Added to Cart', 'success');
			} else {
				handleMsgShown('Course Already in Cart', 'warning');
			}
		},
		[handleMsgShown]
	);

	return (
		<div className="homePage">
			<Toolbar />
			<div className="homePageTitle" component="main">
				Learn with SharpLearn
			</div>
			<div className="homePageSharpLearnIntro">
				<div>
					Become a certified Software Developer with 100% Practical Learning from Beginner to Advance.
					Kickstart Your Career By Working With Top Companies & Government Organizations Who Are Ready To Hire You!
					Even if you're a complete beginner with zero knowledge
				</div>


				{keyPoints.map((item, index) =>

					<div className='homePageKeyPoint' key={index}>
						<DoneIcon sx={{ mr: 1 }} />
						<div> <b>{item?.title}:- </b> {item?.description}</div>
					</div>
				)}
			</div>
			<div className='homePageCoursesTitle'>Courses🔗</div>
			<div className="homePageTrendingCourses">
				<img src={allCourses[0]?.courseThumbnail} className='TrendingCoursesImg' alt="" />
				<div className='trendingDetailsBox'>
					<div className='trendingCoursesTitle'>{allCourses[0]?.courseName}</div>
					<div className='trendingCoursesAbout'>{allCourses[0]?.aboutCourse}</div>
					<div className='trendingCoursesPriceSection'>
						<div className='trendingCoursesPrice'>Now ₹{allCourses[0]?.courseDiscountedPrice},</div>
						<div className='trendingCoursesOrgPrice'>₹{allCourses[0]?.courseORGPrice}</div>
					</div>
					<Button variant='contained' sx={{ mt: 2 }}>Buy Now </Button>
				</div>
			</div>

			{msg && <ShowMsg isError={msg?.text ? true : false} msgText={msg?.text} type={msg?.type} />}
		</div>
	);
}

export default HomePage;
