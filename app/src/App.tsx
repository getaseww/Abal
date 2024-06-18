import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Loader from './common/Loader';
import { userStore } from './store/userStore';
import { languageStore } from './store/languageStore';
import { useTranslation } from 'react-i18next';
import Login from './pages/Login';
import { routes } from './constants/constants';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const DefaultLayout = lazy(() => import('./layouts/DefaultLayout'));
const Role = lazy(() => import('./pages/Role'));

const MembershipPlan = lazy(() => import('./pages/MembershipPlan'));
const Subscription = lazy(() => import('./pages/Subscription'));
const Member = lazy(() => import('./pages/Member'));
const Payment = lazy(() => import('./pages/Payment'));
const SMSContent = lazy(() => import('./pages/SMS/Content'));
const SMSPackage = lazy(() => import('./pages/SMS/Package'));
const SMSSubscription = lazy(() => import('./pages/SMS/Subscription'));

const EquipmentCategory = lazy(() => import('./pages/Inventory/EquipmentCategory'));
const Equipment = lazy(() => import('./pages/Inventory/Equipment'));


function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const { t, i18n } = useTranslation()

  const token: string = userStore((state: any) => state.token)
  const lang: string = languageStore((state: any) => state.lang)
  const user: any = JSON.parse(userStore((state: any) => state.user))


  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang])

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/auth/login" element={token == null && token == undefined ? <Login /> : <Navigate to="/" replace={true} />} />

        <Route element={<DefaultLayout />}>
          <Route path="/" element={token != null && token != undefined ? <Dashboard /> : <Navigate to="/auth/login" replace={true} />} />
          <Route path="/dashboard/membership-plan" element={token != null && token != undefined ? <MembershipPlan /> : <Navigate to="/auth/login" replace={true} />} />
          <Route path="/dashboard/subscription" element={token != null && token != undefined ? <Subscription /> : <Navigate to="/auth/login" replace={true} />} />
          <Route path="/dashboard/member" element={token != null && token != undefined ? <Member /> : <Navigate to="/auth/login" replace={true} />} />
          <Route path="/dashboard/payment" element={token != null && token != undefined ? <Payment /> : <Navigate to="/auth/login" replace={true} />} />
          {/* sms pages  */}

          <Route path="/dashboard/sms/content" element={token != null && token != undefined ? <SMSContent /> : <Navigate to="/auth/login" replace={true} />} />
          <Route path="/dashboard/sms/package" element={token != null && token != undefined ? <SMSPackage /> : <Navigate to="/auth/login" replace={true} />} />
          <Route path="/dashboard/sms/subscription" element={token != null && token != undefined ? <SMSSubscription /> : <Navigate to="/auth/login" replace={true} />} />

          {/* Inventory routes */}
          <Route path={routes.INVENTORY_EQUIPMENT_CATEGORY} element={token != null && token != undefined ? <EquipmentCategory /> : <Navigate to="/auth/login" replace={true} />} />
          <Route path={routes.INVENTORY_EQUIPMENT} element={token != null && token != undefined ? <Equipment /> : <Navigate to="/auth/login" replace={true} />} />
          {/* <Route path="/dashboard/inventory/" element={token != null && token != undefined ? <SMSSubscription /> : <Navigate to="/auth/login" replace={true} />} /> */}


        </Route>
      </Routes>
    </>
  );
}

export default App;
