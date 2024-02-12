import {Route, Routes} from 'react-router-dom';
import {Outlet} from 'react-router-dom';
import RequireAuth from '../processes/RequireAuth/RequireAuth.tsx';
import Layout from '../components/Layout/Layout.tsx';
import LoginPage from '../pages/LoginPage/LoginPage.tsx';
import EventPage from '../pages/EventPage/EventPage.tsx';
import Page404 from '../pages/Page404/Page404.tsx';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/" element={
                <RequireAuth>
                    <Layout>
                        <Outlet/>
                    </Layout>
                </RequireAuth>
            }>
                <Route path="/calendar" element={<EventPage />}/>
            </Route>
            <Route path="*" element={<Page404 />}> </Route>
        </Routes>
    );
};

export default AppRouter;