# ViewMyStartup - 3팀 프론트엔드


![제목을-입력해주세요_-001](https://github.com/user-attachments/assets/b806f69a-a0bd-41e4-9643-b290844431db)

이 프로젝트는 **ViewMyStartup**의 프론트엔드 부분을 담당합니다. 이 홈페이지는 **스타트업 정보를 제공하고 여러 스타트업을 비교하여 투자 결정하는데 도움을 줍니다. 또한 가상 투자 기능으로 투자에 대한 연습할 수 있는 기능**을 제공하며, [기술 스택](#기술-스택)을 사용하여 개발되었습니다.

## 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [사용 방법](#사용-방법)
3. [기술 스택](#기술-스택)
4. [팀원 소개](#팀원-소개)
5. [기여 방법](#기여-방법)

## 프로젝트 소개

이 프로젝트는 **실무 연습을 키우기 위한 프로젝트**입니다. 

이 프로젝트의 프론트엔드는 **재사용성 극대화를 고려한 UI 컴포넌트 설계**를 목표로 합니다. 
공통 UI 요소를 모듈화하여 유지보수성을 높이고, 여러 페이지에서 반복적으로 사용되는 컴포넌트를 효율적으로 관리하고 확장하는 경험을 쌓을 수 있습니다.
데이터 필터링 및 정렬 기능 구현하며 필터링한 값을 어떻게 가져오는게 좋은 지 최적화를 고민합니다

## 사용 방법

- 기업 전체 리스트를 확인할 수 있으며 기업의 이름을 클릭하면 기업의 상세 페이지로 이동합니다.
- 상세 페이지에서 해당 기업에 대한 코멘트를 확인할 수 있으며 가상 투자를 할 수 있습니다.
- 나의 기업 비교에서 기업을 선택하고 선택한 기업을 클릭하면 기업의 상세 페이지로 이동합니다.
- 투자 코멘트를 달기 위해 투자자의 이름과 투자금액, 투자 코멘트, 비밀번호를 입력합니다. 비밀번호는 코멘트를 삭제하거나 수정할 때 본인임을 증명할 때 사용됩니다.

### 예시

```bash
# 예시 명령어
npm run build   # 빌드 명령어
```
## 기술 스택 
### 이 프로젝트는 다음 기술 스택을 사용하여 개발되었습니다:

<p align="center">
  <img src="https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white" alt="npm" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/React%20Router-CA4245?style=flat&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/SCSS-CC6699?style=flat&logo=sass&logoColor=white" alt="SCSS" />
  <img src="https://img.shields.io/badge/CSS%20Modules-000?style=flat&logo=css3&logoColor=white" alt="CSS Modules" />
  <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white" alt="Git" />
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" alt="GitHub" />
</p>


## 팀원 소개
<table align="center">
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/y10b"><img src= "https://github.com/y10b.png?size=100"width="100px;" alt=""/><br /><sub><b> 팀장 : 김승준</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/danikim8"><img src="https://github.com/danikim8.png?size=100" width="100px;" alt=""/><br /><sub><b> 팀원 : 김단이</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/wooju01"><img src="https://github.com/wooju01.png?size=100" width="100px;" alt=""/><br /><sub><b> 팀원 : 김우주</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/YSJ0228"><img src="https://github.com/YSJ0228.png?size=100" width="100px;" alt=""/><br /><sub><b> 팀원 : 윤세준</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/kr-programmer-sky"><img src="https://github.com/kr-programmer-sky.png?size=100" width="100px;" alt=""/><br /><sub><b> 팀원 : 양성경</b></sub></a><br /></td>
     <tr/>
  </tbody>
</table>

## 기여

# 👑 김승준
- 전체 스타트업 목록(홈페이지)페이지 및 스타트업 테이블 제작
  - 테이블 공통 스타일로 제작, 테이블 페이지 공통 스타일로 제작
- 비교 현황 페이지 및 비교 현황 테이블 제작
- 투자 현황 페이지 및 투자 현황 테이블 제작
- 초성 검색 구현
  - 기업 명은 초성 검색으로 검색되게 구현
  - 기업 소개, 카테고리는 전체로 검색되게 구현
- 페이지네이션 구현
- 오픈그래프 구현

# ✨ 양성경
- index.css 제작, reset.css 적용
- 헤더 제작
- 전체 버튼 제작
- 나의 기업 비교 페이지의 모달 제작: 나의 기업 선택하기, 비교할 기업 선택하기
- 나의 기업 비교 페이지의 결과 표 구현(2개)

# ✨ 김단이
- `나의 기업 비교` 페이지 전체 구현
- API 호출 로직 **axiosInstance로 통일** 및 **모듈화**
- 정렬 기능  
  - `정렬용 드롭다운 셀렉트 박스 (filter)` UI 및 기능 구현  
  - 공통 정렬 옵션 정의 파일 `sortOptions.js` 생성  
  - 프론트 전역에서 정렬 기준 통일 및 정렬값 처리
 
# ✨ 김우주
 - 기업 상세 페이지 전체 구현
 - 기업 투자 수정하기 모달 연결
 - 투자 리스트 조회
 - 기업 삭제 모달
 - 투자 내역이 없는 경우 없는 페이지 표시

# ✨ 윤세준
 - input, Search 검색 기능 구현
 - 투자 모달,투자 수정 모달 구현
 - 투자 팝업 구현
 - 비밀번호 암호화
