import { BrowserRouter , Switch , Route } from 'react-router-dom';
import Login from '../Pages/login-component/Login';
import LoginVerification from '../Pages/login-verification/LoginVerify';
import AddFile  from '../Pages/addFile';
import FileVault from '../Pages/file-vault/fileVault';
import Update from '../Pages/Update';
import Modify from '../Pages/Modify';


const Routings = () => {
	return(
		<BrowserRouter>
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
				
				<Route exact path={'/addfile'}>
					<AddFile/>
				</Route>
				
				<Route exact path={'/update'}>
					<Update/>
				</Route>
				<Route exact path={'/modify'}>
					<Modify/>
				</Route>
			</Switch>
		</BrowserRouter>
	)
}

export default Routings;