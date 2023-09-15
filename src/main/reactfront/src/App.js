import Layout from "./pages/Layout";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import "./App.css";
import ApproveList from "./pages/approve/ApproveList";
import ApproveBuyList from "./pages/approve/ApproveBuyList";
import UserList from "./pages/users/UserList";
import ApproveHandleList from "./pages/approve/ApproveHandleList";
import ApproveBuyHandleList from "./pages/approve/ApproveBuyHandleList";
import ITAssets from "./pages/itassets/ITAssets"
import LoginHome from "./pages/login/LoginHome";
import AssetAllList from "./pages/itassets/AssetAllList";
import AdminMain from "./pages/mainPage/AdminMain";
import Mypage from "./pages/mainPage/Mypage";
import Reports from "./pages/mainPage/Reports";
import UserMain from "./pages/mainPage/UserMain";
import ReturnExchange from "./pages/mainPage/ReturnExchange";
import UserMain_using from "./pages/mainPage/UserMain_using";
import UserMain_request from "./pages/mainPage/UserMain_request";
import Users from "./pages/users/Users";
import AssetRequestListPC from "./pages/itassets/AssetRequestListPC";
import AssetRequestListSW from "./pages/itassets/AssetRequestListSW";
import AssetRequestListSV from "./pages/itassets/AssetRequestListSV";
import AssetRequestListETC from "./pages/itassets/AssetRequestListETC";
function App() {

    return (
        <BrowserRouter>
            <Header/>
            <Sidebar/>
            <Routes>
                <Route path="/" element={<Layout/>}/>
                <Route path="/approveList" element={<ApproveList/>}/>
                <Route path="/approveBuyList" element={<ApproveBuyList/>}/>
                <Route path="/approveHandle" element={<ApproveHandleList/>}/>
                <Route path="/approveBuyHandle" element={<ApproveBuyHandleList/>}/>
                <Route path="/users" element={<UserList/>}/>
                <Route path="/itassets" element={<AssetAllList/>} />
                <Route path="/itassets/pc" element={<AssetRequestListPC/>} />
                <Route path="/itassets/sw" element={<AssetRequestListSW/>} />
                <Route path="/itassets/sv" element={<AssetRequestListSV/>} />
                <Route path="/itassets/etc" element={<AssetRequestListETC/>} />
                <Route path="/adminitassets" element={<ITAssets/>}/>
                <Route path="/login" element={<LoginHome/>}/>
                <Route path="/adminMain" element={<AdminMain />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/userMain" element={<UserMain />} />
                <Route path="/returnExchange" element={<ReturnExchange />} />
                <Route path="/userMain_using" element={<UserMain_using />} />
                <Route path="/userMain_request" element={<UserMain_request />} />
                <Route path="/:page/:subPage/*" element={<Users />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
