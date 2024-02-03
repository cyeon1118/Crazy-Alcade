import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgfile from "../../assets/images/logo.png";
import background from "../../assets/images/mainback.png";
import "./Main.module.css";
import styles from "./Main.module.css";
import CreateRoomModal from "./CreateRoomModal";
import ItemShopModal from "./ItemShopModal";

const Main = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createRoomButtonPressed, setCreateRoomButtonPressed] = useState(false);
  const [isItemShopModalOpen, setIsItemShopModalOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatContent, setChatContent] = useState([]);
  const [normalMode, setNormalMode] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openItemShopModal = () => {
    setIsItemShopModalOpen(true);
  };

  const closeItemShopModal = () => {
    setIsItemShopModalOpen(false);
  };

  const createRoom = (roomData) => {
    console.log("방이 생성되었습니다:", roomData);
    setCreateRoomButtonPressed(true);
  };

  const handleLanguageChange = (event) => {
    // TODO: 해당 언어 변경에 따른 로직 구현
  };

  const handleDifficultyChange = (event) => {
    // TODO: 해당 난이도 변경에 따른 로직 구현
  };

  const handleCodeReviewChange = (event) => {
    // TODO: 코드 리뷰 변경에 따른 로직 구현
  };

  const handleChatInputChange = (event) => {
    setChatInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (chatInput.trim() !== "") {
      const currentDate = new Date();
      const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

      const newMessage = {
        content: chatInput,
        timestamp: formattedDate,
        isBold: true,
      };

      const newChatContent = [...chatContent, newMessage];
      setChatContent(newChatContent);
      setChatInput("");
    }
  };

  const toggleNormalMode = () => {
    setNormalMode(!normalMode);
  };

  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "740px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "space-between",
  };

  const logoStyle = {
    // 로고에 대한 추가 스타일을 여기에 추가
  };

  const handleLogout = () => {
    // 로그아웃 관련 로직 수행 (필요하다면)
    // 홈 페이지로 이동
    navigate("/");
  };

  return (
    <div className={styles.mainContainer} style={backgroundStyle}>
      {/* 왼쪽 부분 (my-page) */}
      <div className={styles.logo} style={logoStyle}>
        <img className={styles.logoImg} src={imgfile} alt="로고" />
      </div>

      {/* my-page 영역 */}
      <div className={styles.myPage}>
        {/* 이름 입력 칸 */}
        <div className={styles.nameInput}>
          <label htmlFor="name"></label>
          <input type="text" id="name" />
        </div>
        <br />

        {/* 프로필 사진 입력 칸 */}
        <div className={styles.profilePicture}>
          <label htmlFor="profile-pic">프로필 사진</label>
          <input type="file" id={styles.profilePic} accept="image/*" />
        </div>

        {/* 소개 칸 */}
        <div className={styles.introduction}>
          <p>
            <div>Lv. </div>
            <div>경험치 </div>
            <div>코인</div>
          </p>
        </div>

        {/* 하단 흰색 네모 칸 4개 정렬 */}
        <div className={styles.whiteBoxes}>
          <div className={styles.whiteBox}></div>
          <div className={styles.whiteBox}></div>
          <div className={styles.whiteBox}></div>
          <div className={styles.whiteBox}></div>
        </div>

        <br />
        <br />

        {/* 마이페이지 파란색 네모 칸 */}
        <div className={styles.myPageBlueBox}>
          <p>마이페이지</p>
        </div>
      </div>

      {/* 오른쪽 부분 (right-side) */}
      <div className={styles.rightSide}>
        {/* 오른쪽 상단 버튼들 */}
        <div className={styles.rightTop}>
          <button className={styles.introButton}>게임 소개</button>
          <button className={styles.logoutButton} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
        <br />
        <br />

        {/* ItemShop, CreateRoom 버튼 그룹 */}
        <div className={styles.rightMiddle}>
          {/* 아이템상점 버튼 */}
          <button className={styles.itemShopButton} onClick={openItemShopModal}>
            아이템상점
          </button>
          {/* 방 만들기 버튼 */}
          <button
            className={`${styles.createRoomButton} ${createRoomButtonPressed ? styles.createRoomButtonPressed : ""}`}
            onClick={openModal}
          >
            방만들기
          </button>

          {/* ItemShopModal */}
          {isItemShopModalOpen && (
            <div className={styles.overlay}>
              <ItemShopModal closeModal={closeItemShopModal} />
            </div>
          )}

          {/* 모달이 열린 상태라면 CreateRoomModal을 렌더링합니다 */}
          {isModalOpen && (
            <div className={styles.overlay}>
              <CreateRoomModal
                closeModal={closeModal}
                createRoom={createRoom}
              />
            </div>
          )}
        </div>

        {/* 방 목록 부분 */}
        <div className={styles.roomPage}>
          {/* 노말, 아이템전 + 옵션 선택하는 드롭다운 박스 */}
          <div className={styles.optionButtons}>
            {/* 토글 방식으로 노말전, 아이템전 버튼 */}
            <button
              className={`${styles.normalButton} ${normalMode ? styles.active : ""}`}
              onClick={toggleNormalMode}
            >
              노말전
            </button>
            <button
              className={`${styles.itemButton} ${!normalMode ? styles.active : ""}`}
              onClick={toggleNormalMode}
            >
              아이템전
            </button>

            {/* 사용 언어 드롭다운 */}
            <div className={styles.optionButton}>
              <label htmlFor="language">사용 언어</label>
              <select
                name="language"
                id="language"
                onChange={handleLanguageChange}
              >
                <option value="java">Java</option>
                <option value="python">Python</option>
              </select>
            </div>

            {/* 난이도 드롭다운 */}
            <div className={styles.optionButton}>
              <label htmlFor="difficulty">난이도</label>
              <select
                name="difficulty"
                id="difficulty"
                onChange={handleDifficultyChange}
              >
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
              </select>
            </div>

            {/* 코드 리뷰 드롭다운 */}
            <div className={styles.optionButton}>
              <label htmlFor="codeReview">코드 리뷰</label>
              <select
                name="codeReview"
                id="codeReview"
                onChange={handleCodeReviewChange}
              >
                <option value="o">O</option>
                <option value="x">X</option>
              </select>
            </div>

            {/* 미해결 문제 체크박스 */}
            <div className={styles.optionButton}>
              <input type="checkbox" id="unresolved" />
              <label htmlFor="unresolved">미해결 문제</label>
            </div>
          </div>
          {/* 게임 대기 화면 방 */}
          <div className={styles.gameRoomList}>
            {/* 방 하나하나 */}
            <div className={styles.room}>
              {/* 방 안의 제목 */}
              <div className={styles.roomBlueBox}>
                <p>너만 오면 고</p>
              </div>
              <div className={styles.playingText}> playing </div>
              <div className={styles.roomDescription}>백준 1001.A+B</div>
              <div className={styles.roomDescription}>시간 : 1h 30m</div>
              <div className={styles.roomDescription}>언어 : Python</div>
            </div>
            <div className={styles.room}>
              <div className={styles.roomBlueBox}>
                <p>안들어오면 지상렬</p>
              </div>
              <div className={styles.playingText}> playing </div>
              <div className={styles.roomDescription}>백준 16023.아기상어</div>
              <div className={styles.roomDescription}>시간 : 1h 30m</div>
              <div className={styles.roomDescription}>언어 : Python</div>
            </div>
            <div className={styles.room}>
              <div className={styles.roomBlueBox}>
                <p>현직개발자</p>
              </div>
              <div className={styles.waitingText}> waiting </div>
              <div className={styles.roomDescription}>
                백준 1557.왜 이렇게 빨리 끝나나요
              </div>
              <div className={styles.roomDescription}>시간 : 2h 30m</div>
              <div className={styles.roomDescription}>언어 : Java</div>
            </div>
            <div className={styles.room}>
              <div className={styles.roomBlueBox}>
                <p>방 이름을 꼭 지어야해?</p>
              </div>
              <div className={styles.playingText}> playing </div>
              <div className={styles.roomDescription}>
                백준 1033.현직이의 미로찾기
              </div>
              <div className={styles.roomDescription}>시간 : 1h 30m</div>
              <div className={styles.roomDescription}>언어 : Python</div>
            </div>
          </div>

          <div className={styles.backandforthPage}>
            <div
              className={styles.backPage}
              // onClick={this.handleBackPage}
            ></div>
            <div
              className={styles.forthPage}
              // onClick={this.handleForthPage}
            ></div>
          </div>
        </div>

        {/* 채팅 부분 */}
        <div className={styles.chatPage}>
          <button className={styles.chatPageButton}>전체</button>
          <div className={styles.chatContent}>
            {/* 채팅 내용 표시 */}
            {chatContent.map((message, index) => (
              <div key={index}>
                {/* 닉네임과 현재 날짜 및 시간 표시 */}
                <p className={styles.messageInfo}>
                  <span className={styles.nickname}>닉네임 </span>
                  <span className={styles.timestamp}>{message.timestamp}</span>
                </p>
                {/* 메시지 내용 표시 (글씨 두껍게 여부에 따라 스타일 조정) */}
                <div
                  className={`${styles.messageContent} ${message.isBold ? styles.bold : ""}`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          {/* 수정된 스타일을 적용한 부분 */}

          <div className={styles.chatInputContainer}>
            <input
              className={styles.chatInput}
              type="text"
              placeholder="채팅을 입력하세요"
              value={chatInput}
              onChange={handleChatInputChange}
            />
            <button className={styles.sendButton} onClick={handleSendMessage}>
              전송
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main 컴포넌트를 내보냅니다.
export default Main;
