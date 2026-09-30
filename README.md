# sixun — Full-stack Developer

Skiper UI 홈페이지를 참고해 만든 sixun 포트폴리오. 사용자 제공 프로필: **10년+ 풀스택 개발, LLM/AI 활용, 최신 기술, 실질적인 비용 최적화, 팀 리딩**.

## 실행

```sh
npm ci
npm run dev
npm run build
npm run preview
```

React 19, TypeScript, Vite, Motion. 배포 출력은 `dist/`입니다. Vercel/Netlify 등의 정적 호스팅에서 빌드 명령 `npm run build`, 출력 디렉터리 `dist`로 사용합니다.

## 구현

- 원본의 중앙 대형 타이포그래피, 떠 있는 메뉴, 카드 그리드, 하단 섹션 구성을 포트폴리오 콘텐츠에 적용
- 키보드 Cmd/Ctrl+K 검색, 네이티브 dialog 상세 보기, 메뉴, 내부 섹션 이동
- AI 단계 전환, 비용 최적화 토글, 드래그 가능한 기술 카드
- 모바일 레이아웃, 키보드 포커스, 모션 감소 설정 지원
- 외부 연락처는 확인된 GitHub 프로필만 사용

실제 회사명·프로젝트 실적·비용 절감 수치·고객 추천은 제공되지 않아 넣지 않았습니다. 카드 내용은 사용자 제공 강점을 소개하며 실제 프로젝트 사례를 주장하지 않습니다.

## 원본 코드와 출처

`originals/`는 로그인된 Skiper UI Pro Source Code 패널에서 확보한 원본 103개를 보관합니다. 원본 코멘트 및 출처는 유지합니다. 카탈로그 106개 중 #12, #14, #36은 사이트 오류로 미확보했습니다. 전체 홈페이지 소스 또는 ZIP을 확보한 것은 아닙니다. `manifest.json`은 원본 URL과 파일 해시를 기록합니다.

실제 앱에 이식한 부분:

- `src/components/AnimatedLink.tsx`: Skiper40 Link001의 밑줄/화살표 인터랙션을 CSS로 이식
- `src/components/NumberFlow.tsx`: Skiper69의 문자 키와 shared-layout 전환 구조를 적용
- 나머지 화면 구성과 카드 데모는 관찰한 홈페이지를 바탕으로 작성
- 하단 손 이미지는 원본 홈페이지에서 확인한 `cdn.skiper-ui.com/images/footer/LeftHand.png`, `RightHand.png`를 사용하며 외부 CDN에 의존
- 폰트는 Google Fonts DM Sans / Noto Sans KR, 실패 시 시스템 폰트 사용

구매 코드가 포함되어 있으므로 저장소는 비공개로 유지합니다. 배포 시 `dist/`만 제공하며 `originals/`는 공개 정적 디렉터리에 넣지 않습니다.

## 검증 상태

`npm run build` (TypeScript 검사 + Vite 프로덕션 빌드) 통과. 현재 실행 환경의 브라우저 보안 정책이 로컬 HTTP 및 file URL을 허용하지 않아 완성 화면의 브라우저 상호작용/모바일 시각 검증은 미완료입니다. 픽셀 단위의 원본 일치를 보장하지 않습니다. 배포는 수행하지 않았습니다.
