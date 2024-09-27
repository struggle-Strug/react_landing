//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Assesment from './pages/AssessmentPage';
import AssesmentTest from './pages/AssessmentTestPage';
import AssessmentTestOwn from "./pages/AssessmentTestOwnPage";
import Home from './pages/HomePage';
import HomeTest from './pages/HomeTestPage';
import RegisterMember from './pages/RegisterMemberPage';
import RegisterTeam from './pages/RegisterTeamPage'
import RegisterCompany from './pages/RegisterCompanyPage';
import Result from './pages/ResultPage';
import Team from './pages/TeamPage';
import LoginPage from './pages/LoginPage';
import OldLoginPage from "./pages/OldLoginPage";
import Dashboard from "./pages/Dashboard";
import OldForgotPasswordPage from "./pages/ForgotPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from './pages/ResetPasswordPage';
import TermsPage from './pages/TermsPage';
import Productivity from "./pages/ProductivityPage";
import SideNavigationLayout from './components/Layout';
import PrivateRoutes from './utils/PrivateRoutes';
import { UserProvider } from "./context/UserContext";



function App() {

  return (
    <>
      <Router>
        <UserProvider>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/old_login' element={<OldLoginPage />} />
            <Route path='/old_forgot' element={<OldForgotPasswordPage />} />
            <Route path='/forgot' element={<ForgotPasswordPage />} />
            <Route path='/new_dashboard' element={<Dashboard />} />
            <Route path="/password/reset">
              <Route path=":resetkey" element={<ResetPasswordPage />} />
            </Route>
            <Route
              path="*"
              element={
                <SideNavigationLayout>
                  <Routes>
                    <Route element={<PrivateRoutes />}>
                      {/* <Route path=':id/' element={<Home />} /> */}
                      <Route path=':id' element={<HomeTest />} />
                      {/* <Route path=':id/assessment' element={<Assesment />} /> */}
                      <Route path=':id/assessmentOwn' element={<AssessmentTestOwn />} />
                      <Route path=':id/assessment' element={<AssesmentTest />} />
                      <Route path=':id/result' element={<Result />} />
                      <Route path=':id/team' element={<Team />} />
                      <Route path=':id/register/member' element={<RegisterMember />} />
                      <Route path=':id/register/team' element={<RegisterTeam />} />
                      <Route path=':id/register/company' element={<RegisterCompany />} />
                      <Route path=':id/productivity' element={<Productivity />} />
                      <Route path='/terms' element={<TermsPage />} />
                    </Route>
                  </Routes>
                </SideNavigationLayout>
              }
            />
          </Routes>
        </UserProvider>
      </Router>
    </>
  )
}

export default App
