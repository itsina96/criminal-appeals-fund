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
	const [user, setUser] = React.useState({});
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
				setApplicationsObject(data.response);
			}
		});
	}, [token]);

	React.useEffect(() => {
		getAirtable("GET", "applicants", token).then((data) => {
			setUser(data.response[0]);
		});
	}, [token]);

	return (
		<div>
			<NavbarLoggedIn />
			<ApplicationPageHeader>
				<ApplicantInfo>
					<ApplicantName>{`Hello, ${user.first_name} ${user.last_name}`}</ApplicantName>
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
