# AGENTS.md

## 프로젝트 개요

Hyogi Portfolio는 Next.js App Router 기반의 개발자 포트폴리오 사이트입니다.

## 기술 스택

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react

## 실행 명령어

- `npm run dev`: 로컬 개발 서버 실행
- `npm run build`: 프로덕션 빌드 생성
- `npm run start`: 프로덕션 서버 실행
- `npm run lint`: ESLint 검사 실행

## 디렉터리 구조

```text
app/                 Next.js App Router 라우트, 레이아웃, 페이지
components/          재사용 가능한 React 컴포넌트
components/ui/       shadcn/ui 기반 공통 UI 컴포넌트
lib/                 앱 전역에서 공유하는 유틸리티, 설정, 타입
lib/backend/         백엔드 API, DB, 서버 응답과 관련된 타입과 헬퍼
lib/config/          사이트 메타데이터, 전역 설정값
public/              이미지, 아이콘 등 정적 파일
```

## lib 정리 규칙

- `lib/utils.ts`는 shadcn/ui와 공통 UI 유틸리티를 위해 유지합니다.
- 백엔드 API 응답, 요청, 에러, DB 모델과 가까운 타입은 `lib/backend/`에 둡니다.
- 사이트 이름, 설명, 링크처럼 앱 전역 설정값은 `lib/config/`에 둡니다.
- 프론트엔드 컴포넌트 전용 타입은 해당 컴포넌트 파일 근처에 둡니다.
- 여러 영역에서 재사용되는 타입만 `lib/` 아래로 올립니다.
- 기능이 충분히 커졌을 때만 `features/`, `data/`, `types/`, `hooks/` 같은 상위 폴더를 추가합니다.

## 작업 규칙

- 앱 루트는 저장소 루트입니다. `my-app` 같은 중첩 앱 폴더를 다시 만들지 않습니다.
- TypeScript를 기본으로 사용합니다.
- 기존 프로젝트 구조와 네이밍을 우선 따릅니다.
- 재사용 가능한 UI는 `components/`에 둡니다.
- shadcn/ui 컴포넌트는 `components/ui/`에 둡니다.
- 불필요하게 큰 추상화나 폴더를 미리 만들지 않습니다.

## 스타일링 규칙

- Tailwind CSS를 우선 사용합니다.
- 기존 색상, 여백, 레이아웃 스타일을 유지합니다.
- 모바일과 데스크톱 반응형을 함께 고려합니다.
- 버튼, 아이콘, 공통 UI는 가능한 한 기존 컴포넌트를 재사용합니다.

## Next.js 주의사항

이 프로젝트는 최신 Next.js 버전을 사용합니다.

Next.js의 API, 라우팅 규칙, 파일 구조, 서버/클라이언트 컴포넌트 동작을 변경할 때는 현재 설치된 버전 기준 문서를 확인합니다.

필요하면 로컬 문서 경로를 참고합니다.

```text
node_modules/next/dist/docs/
```

## 작업 완료 전 확인

코드 변경 후에는 가능한 한 아래 명령어를 실행합니다.

```bash
npm run lint
```

구조 변경, 라우팅 변경, 배포에 영향을 주는 변경 후에는 아래 명령어도 실행합니다.

```bash
npm run build
```
