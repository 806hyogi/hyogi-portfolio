"use client";

import { Download, Mail } from "lucide-react";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const waitForImages = async () => {
    const images = Array.from(document.images);

    await Promise.all(
        images.map(async (image) => {
            if (image.complete && image.naturalWidth > 0) {
                return;
            }

            await new Promise<void>((resolve) => {
                image.onload = () => resolve();
                image.onerror = () => resolve();
            });
        })
    );
};

export default function ContactSection() {

    /* 이력서 다운로드 */
    const handleDownloadPdf = async () => {
        window.dispatchEvent(new Event("portfolio:open-all-projects"));

        await wait(500);
        await waitForImages();
        await wait(300);

        window.print();
    };

    return (
        <section
            id="Contact"
            className="scroll-mt-16 border-b border-slate-300 px-4 py-10 dark:border-slate-700"
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

            <div className="flex flex-col justify-center gap-4 pt-7 sm:flex-row">
                <a
                    href="mailto:rhkdgur120@naver.com"
                    className="inline-flex items-center justify-center gap-1 rounded-xs bg-blue-400 dark:bg-blue-900 px-6 py-4 text-base font-normal leading-6 text-white hover:bg-blue-500">
                    <Mail aria-hidden="true" className="size-5" />
                    이메일 보내기
                </a>
                <button
                    type="button"
                    data-pdf-ignore="true"
                    onClick={handleDownloadPdf}
                    className="cursor-pointer inline-flex items-center justify-center gap-1 rounded-xs px-6 py-4 text-base font-normal leading-6 text-zinc-900 outline outline-1 outline-offset-[-1px] outline-slate-300 dark:text-zinc-100 dark:outline-slate-700"
                >
                    <Download aria-hidden="true" className="size-5" />
                    이력서 다운로드
                </button>
            </div>
        </section>
    );
}