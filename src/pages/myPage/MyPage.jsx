import React, { useState } from "react";
import btnPlus from "../../assets/btn_plus.png";
import { RoundButton } from "../../components/buttons/Buttons";

function MyPage() {
  const [myCompany, setMyCompany] = useState(null);

  const handleAddClick = () => {
    // TODO: 모달 오픈 로직 추가해야함
    console.log("기업추가버튼클릭함.");
  };

  return (
    <main>
      <section>
        <h2>나의 기업을 선택해 주세요!</h2>

        <div>
          {/* 선택전상태 */}

          {/* {!myCompany && (
            <div>
              <button>
                <img src={btnPlus} alt="기업 추가 버튼" />
                <span>기업 추가</span>
              </button>
            </div>
          )} */}

          {/* 선택 후 상태 */}
        </div>
      </section>

      <div>
        <RoundButton disabled={!myCompany}>기업 비교하기</RoundButton>
      </div>
    </main>
  );
}

export default MyPage;
