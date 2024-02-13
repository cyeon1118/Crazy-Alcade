import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Room from "./pages/Room/Room";
import Game from "./pages/Game/Game";
// import KakaoRedirection from "./pages/Login/KakaoRedirection";
// import GoogleRedirection from "./pages/Login/GoogleRedirection";
import GameIntroduction from "./pages/Main/GameIntroduction";
import LoginRedirection from "./pages/Login/LoginRedirection";
// import NicknameModal from "./pages/Login/NicknameModal";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route
            exact
            path="/login/oauth2/code/kakao"
            element={<KakaoRedirection />}
          />
          <Route
            exact
            path="/login/oauth2/code/google"
            element={<GoogleRedirection />}
          /> */}
          {/* <Route path="/nickname" element={<NicknameModal />} /> */}
          <Route path="/game-introduction" element={<GameIntroduction />} />
          {/* <Route path="/login-redirection" element={<LoginRedirection />} /> */}
          <Route path="/main" element={<Main />} />
          <Route path="/room" element={<Room />} />
          <Route path="/game" element={<Game />} />
          {/* <Route path="/*" element={<h1>비정상적인 접근입니다.</h1>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
