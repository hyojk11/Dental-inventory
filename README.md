#  SmileTap - 치과 재고 관리 시스템
> 치과에서 사용되는 다양한 소모품과 재료의 재고를 체계적으로 관리할 수 있는 스마트 재고 관리 시스템입니다.  
> 모바일/웹을 통한 실시간 재고 파악과 간편한 재고 등록, 수정, 삭제 기능을 제공합니다.

---

## 주요 화면

### 1. 로그인 & 회원가입
> JWT 기반 인증 시스템을 통한 로그인 및 회원가입 기능 제공  
![image](https://github.com/user-attachments/assets/b715f275-bc8c-4cd4-90f4-30e749eb3fd1)
![image](https://github.com/user-attachments/assets/bdbc5f89-5eb1-4804-8f32-5d303c729a78)
![image](https://github.com/user-attachments/assets/293a00f9-65a0-42f4-852a-2a0f2b6f7f98)

### 2. 재고 현황 조회
> 카테고리, 제조사, 제품명, 상태별 재고 목록을 테이블로 조회  
![image](https://github.com/user-attachments/assets/c7695acd-8556-4dd4-b2ce-a4f4f9fa95e1)

### 3. 재고 등록 & 수정
> 모달 폼을 통한 재고 등록/수정 기능, 상태(판매중/일시품절/단종) 변경 지원  
![image](https://github.com/user-attachments/assets/21097ed9-2de5-409e-985b-7b15a1e49541)
![image](https://github.com/user-attachments/assets/805d3103-d8be-4925-b5d6-843a3d916a9a)

---

## 주요 기능 요약

| 기능                  | 설명 |
|----------------------|------|
| **JWT 인증 로그인**    | Access Token 발급 및 인증된 사용자만 접근 허용 |
| **재고 CRUD**          | 재고 등록 / 조회 / 수정 / 삭제 기능 지원 |
| **판매상태 관리**      | 제품 상태(판매중, 일시품절, 단종) 관리 |
| **모달 기반 UI**      | 재고 등록 및 수정 시 모달 사용으로 UX 향상 |
| **DTO 유효성 검사**     | class-validator를 통한 입력값 검증 |
| **커스텀 Pipe 적용**    | 판매 상태 값에 대한 서버 측 유효성 검사 |
| **CORS 설정**         | 클라이언트-서버 간 Cross-Origin 요청 허용 |
| **SPA 구조**          | Next.js 기반 클라이언트 사이드 렌더링으로 빠른 페이지 전환 |
| **반응형 디자인**       | Tailwind CSS를 활용한 모바일 대응 디자인 |

---

## 기술 스택

| 구분       | 내용 |
|------------|------|
| Backend    | TypeScript, NestJS, TypeORM, JWT |
| Frontend   | Next.js, React, Tailwind CSS |
| DB         | MySQL |
| API 통신   | Axios |
| 인증       | JWT (Access Token) |
| 상태 관리  | useState |
| 개발 도구  | AWS (배포 예정), IntelliJ |

---

## 디렉토리 구조 (일부)
```
├── backend
│ ├── src
│ │ ├── auth
│ │ │ ├── auth.controller.ts
│ │ │ ├── auth.service.ts
│ │ │ ├── jwt.strategy.ts
│ │ ├── items
│ │ │ ├── items.controller.ts
│ │ │ ├── items.service.ts
│ │ │ ├── item.entity.ts
│ │ ├── user
│ │ │ ├── user.entity.ts
│ │ └── app.module.ts
│ └── main.ts
├── frontend
│ ├── components
│ │ ├── Navbar.tsx
│ │ ├── Leftside.tsx
│ │ ├── Footer.tsx
│ ├── pages
│ │ ├── login.tsx
│ │ ├── register.tsx
│ │ ├── inventory.tsx
│ └── styles
│ └── globals.css
```
---

## 구현 포인트 & 학습 내용

- NestJS의 모듈화 아키텍처와 의존성 주입(DI) 패턴을 이해하고 적용
- TypeORM 기반 Entity 설계 및 Repository 패턴을 통한 DB 연동
- class-validator와 Pipe를 활용한 요청 데이터 유효성 검사 및 오류 처리
- JWT 인증 방식을 도입하여 세션 관리 부담 없는 스케일러블 인증 시스템 구축
- Next.js 기반의 SPA 구현으로 사용자 경험(UX) 개선
- Tailwind CSS를 활용한 반응형 디자인 구현
- Axios 인스턴스화로 API 통신 모듈화 및 관리 편의성 확보
- 클라이언트-서버 CORS 이슈 해결 및 보안 강화
- 실시간 재고 관리 프로세스를 통해 치과 재고 관리 업무 최적화 경험
