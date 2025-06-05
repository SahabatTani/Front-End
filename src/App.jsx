import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './contexts/AuthContext';
import HistoryProvider from './contexts/HistoryContext';
import HistoryMapProvider from './contexts/HistoryMapContext';
import LoaderProvider from './contexts/LoaderContext';
import ThreadProvider from './contexts/ThreadContext';
import Detect from './pages/Detect';
import Forum from './pages/Forum';
import History from './pages/History';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import ThreadDetail from './pages/ThreadDetail';

function App() {
	return (
		<Router>
			<AuthProvider>
			<LoaderProvider>
			<ToastContainer
				position="top-center"
				autoClose={750}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				draggable
				theme="colored"
			/>
			<Routes>
				<Route path="/" element={
					<HistoryMapProvider>
						<Home />
					</HistoryMapProvider>
				} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/detect" element={<Detect />} />
				<Route path="/history" element={
					<HistoryProvider>
						<History />
					</HistoryProvider>
				} />
				<Route path="/forum" element={
					<ThreadProvider>
						<Forum />
					</ThreadProvider>
				} />
				<Route path="/forum/:threadId" element={
					<ThreadProvider>
						<ThreadDetail />
					</ThreadProvider>
				} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			</LoaderProvider>
			</AuthProvider>
		</Router>
	);
}

export default App;