import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Detect from './pages/Detect';
import History from './pages/History';
import HistoryDetail from './pages/HistoryDetail';
import Forum from './pages/Forum';
import ThreadDetail from './pages/ThreadDetail';
import NotFound from './pages/NotFound';
import AuthProvider from './contexts/AuthContext';
import HistoryProvider from './contexts/HistoryContext';
import ThreadProvider from './contexts/ThreadContext';

function App() {
	return (
		<Router>
			<AuthProvider>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/detect" element={<Detect />} />
				<Route path="/history" element={
					<HistoryProvider>
						<History />
					</HistoryProvider>
				} />
				<Route path="/history/:historyId" element={
					<HistoryProvider>
						<HistoryDetail />
					</HistoryProvider>
				} />
				<Route path="/forum" element={
					<ThreadProvider>
						<Forum />
					</ThreadProvider>
				} />
				<Route path="/forum/:threadId" element={<ThreadDetail />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;