type ProjectResults =
    | {
        layout: "summary";
        label: string;
        before: string;
        after: string;
        description: string;
        note?: string;
    }
    | {
        layout: "metrics";
        metrics: {
            label: string;
            before: string;
            after: string;
            unit: string;
            change: string;
        }[];
        note?: string;
    };

export const projects = [
    {
        slug: "playball",
        title: "Playball | 15,000명 규모 야구 티켓팅",
        organization: "KT클라우드",
        period: "26.03 - 26.04",
        summary: "재사용 가능한 컴포넌트 설계로 개발 효율을 개선",
        siteUrl: "",
        githubUrl: "https://github.com/goorm-gongbang/101-goormgb-frontend",
        context: {
            title: "복잡한 이용 흐름과 반복되는 화면 구현",
            description:
                "여러 단계를 거치는 기능은 현재 진행 상태를 명확하게 전달해야 했습니다. 기능별 화면을 각각 구현하면 비슷한 UI가 중복되고, 수정 사항을 여러 곳에 반영해야 하는 문제가 생길 수 있었습니다.",
            goal:
                "사용자의 이용 흐름을 분석하여 이해하고, 디자이너와 적극적인 소통을 통해 화면 구조를 개선하며 재사용 가능한 컴포넌트 구조로 일관되게 화면을 구현하기.",
        },
        points: [
            "티켓 예매, 좌석 선택, AI 경기 추천, VQA 기능 화면 개발",
            "사용자 이용 흐름을 분석해 예매 과정을 단계별로 설계",
            "기능별 컴포넌트를 공통 구조로 분리",
            "디렉터리 구조와 컴포넌트 관리 기준을 표준화해 팀원들이 동일한 방식으로 개발할 수 있는 환경 구축",
            "리엑트 기반의 재사용 가능한 컴포넌트를 구현하고 기획·디자이너와 화면 구성을 지속적으로 검토하며 사용성 개선",
        ],
        decisions: [
            {
                id: "framework",
                technology: "Next.js",
                title: "서버 기능을 활용한 API 연동 사전 테스트",
                alternative: "React 기반 클라이언트 환경에서 백엔드 API 개발 완료 후 연동",
                reason: "프론트엔드 개발 범위를 서버 영역까지 확장하고, 백엔드 API가 완성되기 전 Next.js의 서버 기능으로 테스트용 API를 구현해 화면과 데이터 연동 흐름을 미리 검증",
                tradeoff: "테스트용 API와 실제 백엔드 API의 동작에 차이가 있을 수 있어, 실제 API 연동 후 응답 형식과 예외 처리를 추가 검증",
            },
            {
                id: "state",
                technology: "Zustand",
                title: "단계 간 공유 상태를 관리하는 기준",
                alternative: "화면마다 상태를 별도로 보관하고 필요한 값을 전달",
                reason: "여러 단계에서 참조하는 선택 정보를 일관되게 관리하고 전달 경로를 단순화",
                tradeoff: "화면 안에서만 사용하는 임시 상태는 로컬에 유지",
            },
        ],
        problemSolving: {
            title: "API 명세와 실제 입출력 차이로 발생한 연동 오류",
            description:
                "백엔드 API의 실제 요청·응답 형식이 명세서와 달라 프론트엔드에서 데이터 처리 오류가 발생했습니다. 백엔드 개발자와 차이를 확인하고 연동 방식을 조율해 해결했습니다.",
            steps: [
                {
                    label: "01 · 원인 분석",
                    description:
                        "오류가 발생한 요청과 응답을 API 명세서와 비교해, 프론트엔드에서 기대한 형식과 실제 입출력의 차이를 확인했습니다.",
                },
                {
                    label: "02 · 해결",
                    description:
                        "확인한 차이와 오류 상황을 백엔드 개발자에게 공유하고, 요청·응답 형식을 협의해 API와 프론트엔드 연동 코드를 수정했습니다.",
                },
                {
                    label: "03 · 검증",
                    description:
                        "협의한 명세를 기준으로 API를 다시 호출해 요청과 응답이 일치하는지 확인하고, 화면에서 데이터가 정상적으로 처리되는지 검증했습니다.",
                },
            ],
        },
        results: {
            layout: "metrics",
            metrics: [
                {
                    label: "버튼 스타일 구현체",
                    before: "4",
                    after: "1",
                    unit: "개",
                    change: "75% 감소 · 공통 ActionButton으로 통합",
                },
                {
                    label: "페이지 직접 fetch 호출",
                    before: "8",
                    after: "0",
                    unit: "곳",
                    change: "직접 호출 제거 · API 처리 책임 분리",
                },
                {
                    label: "페이지 내부 모달 구현",
                    before: "6",
                    after: "0",
                    unit: "개",
                    change: "6개 모달을 독립 컴포넌트로 분리",
                },
            ],
            note:
                "리팩터링 전후 Git diff 기준. 버튼 4종의 구현체, 전체 page.tsx의 직접 fetch 호출, 경기 상세·좌석 추천 2개 페이지의 인라인 모달을 비교했습니다.",
        } satisfies ProjectResults,
        stacks: [
            "Next.js",
            "React.js",
            "TypeScript",
            "Tailwind CSS",
            "Shadcn",
            "Radix UI",
            "Zustand",
            "Github",
            "Jira",
            "Figma",
        ],
        images: [
            "/images/projects/playball-1.png",
            "/images/projects/playball-2.png",
            "/images/projects/playball-3.png",
            "/images/projects/playball-4.png",
            "/images/projects/playball-5.png",
            "/images/projects/playball-6.png",
            "/images/projects/playball-7.png",
            "/images/projects/playball-8.png",
            "/images/projects/playball-9.png",
            "/images/projects/playball-10.png",
            "/images/projects/playball-11.png",
            "/images/projects/playball-12.png",
            "/images/projects/playball-13.png",
            "/images/projects/playball-14.png",
        ],
    },
    {
        slug: "myway",
        title: "Myway | 공공 데이터 API를 이용한 이벤트",
        organization: "KT클라우드",
        period: "25.12 - 26.01",
        summary: "이벤트 참여 과정을 개선해 사용자 이탈을 줄인 서비스 경험",
        siteUrl: "https://mywayon.com/",
        githubUrl: "https://github.com/twowice/myway",
        context: {
            title: "공공데이터 시각화와 축제별 소통 공간 구현",
            description:
                "공공데이터 API에서 제공하는 데이터를 사용자가 쉽게 파악할 수 있도록 시각화하는 게시판이 필요했습니다. 또한 각 축제 상세페이지에서 사용자들이 정보를 나누고 소통할 수 있도록 Node.js와 Express를 활용한 단체 채팅 서버를 구현했습니다.",
            goal:
                "공공데이터를 시각적으로 전달해 정보 이해를 돕고, 축제별 단체 채팅으로 사용자 간 소통을 지원하기.",
        },
        points: [
            "사용자 참여 과정의 불편을 개선",
            "프로젝트 테스트 과정에서 이벤트 생성부터 참여까지 사용자 입장에서 이동 동선을 분석",
            "이벤트 상세 정보와 신청 기능을 하나의 화면으로 통합하고, 진행 상태를 단계별로 확인하는 UI 개발",
            "리엑트 컴포넌트 구조를 재설계해 중복 코드를 줄임",
            "Context API를 활용해 화면 간 데이터를 일관되게 관리",
            "REST API 연동 과정에서 비동기 처리와 예외 상황을 고려해 로딩 화면과 오류 메시지를 구현하고, 신청 완료 여부가 즉시 반영되도록 개선",
            "Node.js express 소켓 실시간 채팅 서버 개발 (socket.io)",
            "DynamoDB를 활용하여 빠른 데이터 저장과 7일간 메시지 JSON 압축 후 AWS S3 저장 기능 구현",
            "Perspective API를 활용한 채팅 비속어 검증 로직 구현",
        ],
        decisions: [
            {
                id: "festival-sync",
                technology: "Vercel Cron · TourAPI · Supabase",
                title: "정기 동기화와 선택적 상세 조회로 API 호출 최소화",
                alternative:
                    "사용자 조회마다 공공데이터 API를 호출하고 모든 축제의 상세 정보를 반복 조회",
                reason:
                    "API 호출 제한에 대응하기 위해 매일 축제 데이터를 DB에 동기화하고, 화면에서는 저장된 데이터를 조회하도록 구성했습니다. 동기화 시 종료일이 지나지 않은 축제를 대상으로 기본 정보를 갱신하고, 누락된 상세 정보만 추가 요청해 반복 호출을 줄였습니다.",
                tradeoff:
                    "원본 데이터의 변경 사항은 다음 동기화까지 반영이 지연될 수 있으며, 이미 저장된 상세 정보는 값이 변경되어도 자동으로 갱신되지 않습니다.",
            },
            {
                id: "festival-chat",
                technology: "Node.js · Express · Socket.IO",
                title: "서버 자원 제약을 고려한 채팅방 정원 제한",
                alternative:
                    "채팅방 참여 인원 제한 없이 실시간 연결을 수용",
                reason:
                    "AWS 서버의 성능 제약을 고려해 채팅방 동시 참여 인원을 제한했습니다. 축제별 하나의 채팅방을 구성하고, 해당 방의 참여자 전체에 메시지를 브로드캐스트해 축제에 관한 대화를 공유하도록 구현했습니다.",
                tradeoff:
                    "채팅방 정원이 차면 추가 참여가 제한되며, 더 많은 동시 접속자를 수용하려면 서버 자원이나 확장 구조를 개선해야 합니다.",
            },
        ],
        problemSolving: {
            title: "비속어가 그대로 노출되는 실시간 채팅 문제",
            description:
                "사용자가 입력한 메시지가 별도의 유해성 판단 없이 전달되어, 비속어가 채팅창에 그대로 노출되는 문제가 있었습니다.",
            steps: [
                {
                    label: "01 · 원인 분석",
                    description:
                        "소켓 서버의 메시지 전달 과정에 유해성을 판단하는 절차가 없어, 비속어가 포함된 메시지도 다른 참여자에게 전달되는 구조를 확인했습니다.",
                },
                {
                    label: "02 · 해결",
                    description:
                        "소켓 서버에 Perspective API를 도입해 AI가 분석한 메시지의 유해성 점수를 기준으로 노출 여부를 결정했습니다. 기준 점수 이상인 메시지는 차단해 참여자의 채팅창에 표시되지 않도록 처리했습니다.",
                },
                {
                    label: "03 · 검증",
                    description:
                        "정상 메시지의 전달 여부와 기준 점수 이상인 메시지의 노출 차단 여부를 검증 항목으로 정리했습니다.",
                },
            ],
        },
        results: {
            layout: "metrics",
            metrics: [
                {
                    label: "축제 데이터 동기화 작업",
                    before: "3",
                    after: "1",
                    unit: "개",
                    change: "약 67% 감소 · 동기화 흐름 통합",
                },
            ],
            note:
                "Git 커밋 961ad96 전후의 vercel.json 비교 기준. 목록·공통 상세·행사 상세로 분리된 Cron 작업 3개를 하나로 통합했습니다. 외부 API 호출량 감소율과는 별개의 지표입니다.",
        } satisfies ProjectResults,
        stacks: [
            "Next.js",
            "React.js",
            "Auth.js",
            "TypeScript",
            "Tailwind CSS",
            "Shadcn",
            "Radix UI",
            "Zustand",
            "Github",
            "Socket.io",
            "Supabase",
            "PostgreSQL",
            "DynamoDB",
            "Amazon S3",
            "AWS EC2",
            "Node.js Express",
            "Fly.io",
            "Figma",
        ],
        images: [
            "/images/projects/myway-1.png",
            "/images/projects/myway-2.png",
            "/images/projects/myway-3.png",
            "/images/projects/myway-4.png",
            "/images/projects/myway-5.png",
            "/images/projects/myway-6.png",
        ],
    },
    {
        slug: "sip-automation",
        title: "SIP 시험 자동화 | 수작업으로 진행하는 반복 시험 자동화",
        organization: "이루온",
        period: "24.10 - 25.01",
        summary: "시험 생성부터 실행까지 여러 기능 화면을 통합한 자동화 UI 개발",
        siteUrl: "",
        githubUrl: "",
        context: {
            title: "특정 관리자에게 의존하던 시험 수행과 대량의 결과 관리",
            description:
                "기존에는 시험 환경과 수행 절차를 숙지한 특정 관리자만 테스트를 진행할 수 있었고, 대량으로 생성되는 시험 결과를 관리해야 했습니다. 이러한 의존도를 줄이기 위해 누구나 웹에서 시험을 설정·실행하고 결과를 확인할 수 있는 UI가 필요했습니다.",
            goal:
                "AT Manager 웹 프론트엔드를 구현해 프로젝트와 시험 항목 관리부터 실행 요청, 결과 조회까지의 흐름을 시각화하고, 사용자가 복잡한 시험 절차를 간편하게 수행할 수 있도록 만들기.",
        },
        points: [
            "시험 절차와 사용자 흐름 분석",
            "AT Manager UI 구현",
            "Flask REST API 연동 및 요청·응답 검증",
            "Linux 환경 테스트 및 운영 절차 표준화",
            "시험 수행 기간 단축 5일 이상에서 1일 이내로 개선",
            "장비 전문 인력 직접 수행 절차 무인 수행 체계로 전환",
            "SIP 시나리오 및 시험 Case 관리 방식 표준화"
        ],
        decisions: [
            {
                id: "test-hierarchy",
                technology: "웹 UI",
                title: "시험 항목을 Suite·Testcase 트리 구조로 표현",
                alternative: "모든 시험 항목을 하나의 목록으로 나열",
                reason:
                    "대량의 시험 항목을 계층별로 탐색하고, Suite와 Testcase의 소속 관계를 파악하며 필요한 항목을 선택할 수 있도록 구성",
                tradeoff:
                    "항목을 펼치고 접는 상태와 상위·하위 항목의 선택 기준을 함께 관리해야 함",
            },
            {
                id: "execution-group",
                technology: "웹 UI",
                title: "시험 항목 관리와 실행 그룹 구성을 분리",
                alternative: "시험을 실행할 때마다 전체 목록에서 항목을 개별 선택",
                reason:
                    "시험 항목의 관리 구조를 유지하면서도, 실행 목적에 따라 필요한 항목을 별도 그룹으로 구성해 반복 시험을 준비할 수 있도록 설계",
                tradeoff:
                    "시험 항목이 수정되거나 삭제될 때 실행 그룹에 포함된 항목과의 관계를 고려해야 함",
            },
            {
                id: "api-integration",
                technology: "REST API",
                title: "웹 UI와 시험 실행 기능을 API로 분리",
                alternative: "웹 서버 내부에서 시험 실행 로직을 직접 처리",
                reason:
                    "AT Manager 프론트엔드는 시험 설정과 실행 요청, 결과 표시에 집중하고, 실제 시험 수행은 AT Runner가 담당하도록 API를 통해 연동",
                tradeoff:
                    "실행 요청의 성공과 실제 시험 완료를 구분하고, API 오류나 결과 조회 실패를 사용자에게 안내해야 함",
            },
        ],
        problemSolving: {
            title: "시험 도메인 이해 부족으로 어려웠던 초기 화면 기획",
            description:
                "입사 초기에는 회사의 기존 SIP 시험 방식과 다양한 장비의 특성을 충분히 알지 못해 프로젝트의 핵심 요구사항을 파악하기 어려웠습니다. 특히 시험 절차를 웹 화면으로 옮기는 과정에서 스토리보드 구성과 반복 검토에 많은 시간이 필요했습니다.",
            steps: [
                {
                    label: "01 · 원인 분석",
                    description:
                        "기존 시험 절차와 장비별 특성에 대한 이해가 부족해, 사용자가 화면에서 어떤 정보를 확인하고 어떤 순서로 시험을 진행해야 하는지 구체화하기 어려웠습니다.",
                },
                {
                    label: "02 · 해결",
                    description:
                        "프로젝트를 관리하는 이사님과 상무님의 피드백을 바탕으로 기존 시험 흐름과 요구사항을 정리하고, 초기 기획부터 스토리보드를 구성했습니다. 검토 과정에서 확인된 내용을 화면 구성과 기능 흐름에 반복적으로 반영했습니다.",
                },
                {
                    label: "03 · 검증",
                    description:
                        "수정한 스토리보드를 다시 검토받으며 시험 절차와 화면 흐름이 맞는지 확인하고, 요구사항에 대한 해석 차이를 조율했습니다.",
                },
            ],
        },
        results: {
            layout: "summary",
            label: "시험 수행 기간",
            before: "5일 이상",
            after: "1일 이내",
            description:
                "프로젝트를 통해 전문 인력이 직접 수행하던 시험 절차를 자동화하고, SIP 시나리오와 시험 Case 관리 방식을 표준화했습니다. 이 중 AT Manager 웹 프론트엔드를 담당해 시험 항목 관리부터 실행 요청, 결과 조회까지 웹에서 수행할 수 있도록 구현했습니다.",
            note:
                "기존 시험 절차와 장비 특성을 바탕으로 스토리보드를 반복 검토하고, 관리자 피드백을 반영해 실제 시험 흐름에 맞는 화면을 구성했습니다.",
        } satisfies ProjectResults,
        stacks: [
            "JavaScript",
            "HTML/CSS",
            "Python",
            "Flask",
            "Robot Framework",
            "GitLab",
            "Linux",
        ],
        images: [],
    },
];
