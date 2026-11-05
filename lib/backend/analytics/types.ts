/**
 * resume_download	이력서 다운로드 클릭
    project_github_click	프로젝트 GitHub 클릭
    project_site_click	프로젝트 배포 사이트 클릭
    contact_email_click	이메일 링크 클릭
    project_expand	프로젝트 아코디언 열기
    project_image_expand	프로젝트 이미지 확대
 */
export const analyticsEventLabels = {
    resume_download: "이력서 다운로드 클릭",
    project_github_click: "프로젝트 GitHub 클릭",
    project_site_click: "프로젝트 배포 사이트 클릭",
    contact_email_click: "이메일 링크 클릭",
    project_expand: "프로젝트 아코디언 열기",
    project_image_expand: "프로젝트 이미지 확대",
};

export type AnalyticsEventName = keyof typeof analyticsEventLabels;

export type AnalyticsEventSummary = {
    event_name: AnalyticsEventName;
    total: number;
    visitors: number;
};