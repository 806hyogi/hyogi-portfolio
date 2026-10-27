import { Mail } from "lucide-react";
import { ResumeDownloadButton } from "@/components/layout/ResumeDownloadButton";
import { ScrollRevealSection } from "@/components/sections/ScrollRevealSection"

export default function ContactSection() {
    return (
        <ScrollRevealSection
            id="Contact"
            delay={720}
            className="scroll-mt-16 px-4 py-30"
        >
            <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-base font-normal leading-6 text-zinc-900 dark:text-zinc-100">
                    “동료 개발자와 적극적으로 소통하며 해결책을 찾는 협업 인재”
                </p>

                <p className="max-w-[512px] text-base font-normal leading-6 text-gray-700 dark:text-neutral-300">
                    요구사항을 구현하는 데 그치지 않고 사용자 이용 흐름을 분석하여
                    <br className="hidden sm:block" />
                    더 편리한 경험과 높은 품질의 서비스를 만들겠습니다.
                </p>
            </div>

            <div className="flex flex-col justify-center gap-4 pt-10 sm:flex-row">
                <a
                    href="mailto:rhkdgur120@naver.com"
                    className="inline-flex items-center justify-center gap-1 rounded-md bg-blue-500 px-6 py-4 text-base font-medium leading-6 text-white transition-colors hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600">
                    <Mail aria-hidden="true" className="size-5" />
                    이메일 보내기
                </a>
                <ResumeDownloadButton />
            </div>
        </ScrollRevealSection>
    );
}
