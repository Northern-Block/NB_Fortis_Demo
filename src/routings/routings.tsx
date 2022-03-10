import { BrowserRouter , Switch , Route } from 'react-router-dom';
import Login from 'Pages/login-component/Login';
import LoginVerification from 'Pages/login-verification/LoginVerify';
import AddFile  from 'Pages/add-file/addFile';
import FileVault from 'Pages/file-vault/fileVault';
import Update from 'Pages/update-files/Update';
import Modify from 'Pages/modify-files/Modify';
import Header from 'components/header';
import Sidebar from 'components/sidebar';

const Routings = () => {
	return(<>
		<BrowserRouter>
		<Header/>
		<Sidebar />
			<Switch>
				<Route exact path={'/'}>
					<Login/>
				</Route>

				<Route exact path={'/login-verify'}>
					<LoginVerification/>
				</Route>

				<Route exact path={'/file-vault'}>
					<FileVault/>
				</Route>
				
				<Route exact path={'/my-files'}>
					<AddFile/>
				</Route>
				
				<Route exact path={'/user-activity'}>
					<Update/>
				</Route>
				<Route exact path={'/modify-files'}>
					<Modify/>
				</Route>
			</Switch>
		</BrowserRouter>
		</>
	)
}

export default Routings;