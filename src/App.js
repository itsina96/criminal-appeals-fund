import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LogInPage from "./pages/LogInPage/LogInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ApplyPage from "./pages/ApplyPage/ApplyPage";

import { MainWrapper } from "./StyledComponents/PageStyles.style";
// import { GlobalStyle } from "./pages/LandingPage/LandingPage.style";

function App() {
	return (
		<MainWrapper>
			<Router>
				<Switch>
					<Route path="/login">{<LogInPage />}</Route>
					<Route path="/signup">{<SignUpPage />}</Route>
					<Route path="/profile">{<ProfilePage />}</Route>
					<Route path="/apply">{<ApplyPage />}</Route>
					<Route exact path="/">
						<LandingPage />
					</Route>
				</Switch>
			</Router>
		</MainWrapper>
	);
}

export default App;
