// Footer.js
import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import ItemButton from "./components/ItemButton";
import ActionButton from "./components/ActionButton";

const Footer = () => {
  const [octopusEffect, setOctopusEffect] = useState(false);
  const [chickEffect, setChickEffect] = useState(false);
  const [submitEffect, setSubmitEffect] = useState(false);

  // 아이템 사용 함수
  const handleUseItem = (item) => {
    console.log(`아이템 사용: ${item}`);

    // 각 아이템에 대한 효과 로직 추가
    if (item === "아이템1") {
      setOctopusEffect(true);
      setTimeout(() => {
        setOctopusEffect(false);
        firework(); // 아이템1 사용 시 firework 함수 호출
      }, 3000);
    } else if (item === "아이템2") {
      setChickEffect(true);
      setTimeout(() => {
        setChickEffect(false);
      }, 3000);
    } else if (item === "아이템3") {
      setWaterBalloonEffect(true);
      setTimeout(() => {
        setWaterBalloonEffect(false);
      }, 3000);
    }
  };

  // 임시 저장 함수
  const handleSave = () => {
    console.log("임시 저장");
  };

  // 코드 실행 함수
  const handleRun = () => {
    console.log("코드 실행");
  };

  // 코드 제출 함수
  const handleSubmit = () => {
    console.log("코드 제출");
  };

  return (
    <div className={styles.footer}>
      {/* 내 아이템 영역 */}
      <div className={styles.itemContainer}>
        <div className={styles.itemHeader}>내 아이템</div>
        {/* 각각의 아이템 버튼을 ItemButton 컴포넌트로 대체 */}
        <ItemButton
          itemName="아이템1"
          onUseItem={() => handleUseItem("아이템1")}
        />
        <ItemButton
          itemName="아이템2"
          onUseItem={() => handleUseItem("아이템2")}
        />
        <ItemButton
          itemName="아이템3"
          onUseItem={() => handleUseItem("아이템3")}
        />
      </div>

      {/* 기존 버튼들 유지 */}
      <ActionButton
        className={styles.button}
        color="#3498db"
        text="임시 저장"
        onClick={handleSave}
      />
      <ActionButton
        className={styles.button}
        color="#27ae60"
        text="코드 실행"
        onClick={handleRun}
      />
      <ActionButton
        className={styles.button}
        color="#e74c3c"
        text="코드 제출"
        onClick={handleSubmit}
      />
    </div>
  );
};

Footer.propTypes = {}; // 필요한 경우에만 prop-types를 추가

export default Footer;
