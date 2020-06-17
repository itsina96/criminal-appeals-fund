import React from "react";
import { NavbarLoggedIn } from "../../components/Navbar/Navbar";
import { ApplicationCard } from "../../components/ApplicationCard/ApplicationCard";
import { UserContext } from "../../Context";
import { Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getAirtable } from "../../utils/fetch";
import {
	ApplicationSection,
	ApplicationPageHeader,
	ApplicantInfo,
	ApplicantName,
} from "./ProfilePage.style";

const useStyles = makeStyles((theme) => {});

const ProfilePage = () => {
	const classes = useStyles();
	const token = localStorage.getItem("user");
	const [user, setUser] = React.useContext(UserContext);
	const [applicationsObject, setApplicationsObject] = React.useState([]);
	const [applicationMessage, setApplicationMessage] = React.useState(
		"Loading..."
	);
	// const dummyUser = { id: ["recazQW1JnmB6CxAy"] }

	const makeApplicationCard = (applicationsObject) => {
		return applicationsObject.map((application) => {
			return <ApplicationCard {...application} />;
		});
	};

	React.useEffect(() => {
		getAirtable("GET", "applications", token).then((data) => {
			if (data.response.length === 0) {
				setApplicationMessage(
					"You currently have no applications under review"
				);
			} else {
				console.log(data.response);
				setApplicationsObject(data.response);
			}
		});
	}, [user]);

	React.useEffect(() => {
		console.log(applicationsObject);
	}, [applicationsObject]);

	return (
		<div>
			<NavbarLoggedIn />
			<ApplicationPageHeader>
				<ApplicantInfo>
					<ApplicantName>{`Hello, ${user.first_name}`}</ApplicantName>
					{user.isVerified === "yes" ? (
						<Link to="/apply">
							<Button
								className={classes.applyButton}
								variant="contained"
								color="primary">
								Apply for funding
							</Button>
						</Link>
					) : (
						<h3>
							Your account is currently unverified, please check back in 24hrs!
						</h3>
					)}
				</ApplicantInfo>
			</ApplicationPageHeader>
			<ApplicationSection>
				{applicationsObject.length !== 0 ? (
					makeApplicationCard(applicationsObject)
				) : (
					<h2>{applicationMessage}</h2>
				)}
			</ApplicationSection>
		</div>
	);
};

export default ProfilePage;
