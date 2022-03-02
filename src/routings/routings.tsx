import { BrowserRouter , Switch , Route } from 'react-router-dom';
import Home from 'Pages/home';
import AddFile  from 'Pages/addFile';
import SearchFile from 'Pages/SearchFile';
import Update from 'Pages/Update';
import Modify from 'Pages/Modify';

const Routings = () => {
	return(
		<BrowserRouter>
			<Switch>
				<Route exact path={'/'}>
					<Home/>
				</Route>
				
				<Route exact path={'/addfile'}>
					<AddFile/>
				</Route>
				<Route exact path={'/search'}>
					<SearchFile/>
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