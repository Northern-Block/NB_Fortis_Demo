import { BrowserRouter , Switch , Route } from 'react-router-dom';
import Login from 'Pages/login-component/Login';
import LoginVerification from 'Pages/login-verification/LoginVerify';
import AddFile  from 'Pages/add-file/addFile';
import FileVault from 'Pages/file-vault/fileVault';
import Update from 'Pages/update-files/Update';
import Modify from 'Pages/modify-files/Modify';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import Notification from 'Pages/notification/notification';

const Routings = () => {
	return(<>
		<BrowserRouter>
		{/* <Header/> */}
		{/* <Sidebar /> */}
			<Switch>
				<Route exact path={'/'}>
				<Header/>
				<Sidebar />
				<FileVault/>
					{/* <Login/> */}
				</Route>

				<Route exact path={'/login-verify'}>
					<LoginVerification/>
				</Route>

				<Route exact path={'/file-vault'}>
				<Header/>
				<Sidebar />
					<FileVault/>
				</Route>

				<Route exact path={'/notification'}>
				<Header/>
				<Sidebar />
					<Notification/>
				</Route>
				
				
				<Route exact path={'/my-files'}>
				<Header/>
				<Sidebar />
					<AddFile/>
				</Route>
				
				<Route exact path={'/user-activity'}>
				<Header/>
				<Sidebar />
					<Update/>
				</Route>
				<Route exact path={'/modify-files'}>
				<Header/>
				<Sidebar />
					<Modify/>
				</Route>
			</Switch>
		</BrowserRouter>
		</>
	)
}

export default Routings;