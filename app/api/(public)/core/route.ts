import { NextResponse } from "next/server"
import { supabase } from "@/lib/backend/supabase"

type CoreItemRow = {
    id: number
    title: string
    image_url: string
    image_alt: string | null
}

type CoreItemDescriptionRow = {
    core_item_id: number
    content: string
}

export async function GET() {

    const { data: section, error: sectionError } = await supabase
        .from("portfolio_section")
        .select("id, slug, title")
        .eq("slug", "core")
        .eq("is_visible", true)
        .maybeSingle()

    if (sectionError) {
        return NextResponse.json(
            { message: "핵심 역량 섹션 정보를 불러오지 못했습니다." },
            { status: 500 }
        )
    }

    if (!section) {
        return NextResponse.json(
            { message: "등록된 핵심 역량 섹션 정보가 없습니다." },
            { status: 404 }
        )
    }

    const { data: items, error: itemsError } = await supabase
        .from("core_item")
        .select("id, title, image_url, image_alt")
        .eq("section_id", section.id)
        .eq("is_visible", true)
        .order("sort_order", { ascending: true })

    if (itemsError) {
        return NextResponse.json(
            { message: "핵심 역량 항목을 불러오지 못했습니다." },
            { status: 500 }
        )
    }

    if (!items) {
        return NextResponse.json(
            { message: "등록된 핵심 역량 항목 정보가 없습니다." },
            { status: 404 }
        )
    }

    const coreItems = (items ?? []) as CoreItemRow[]
    const itemIds = coreItems.map((item) => item.id)
    if (itemIds.length === 0) {
        return NextResponse.json({
            section,
            items: [],
        })
    }

    const { data: descriptions, error: descriptionsError } = await supabase
        .from("core_item_description")
        .select("core_item_id, content")
        .in("core_item_id", itemIds)
        .order("sort_order", { ascending: true })

    if (descriptionsError) {
        return NextResponse.json(
            { message: "핵심 역량 설명을 불러오지 못했습니다." },
            { status: 500 }
        )
    }

    if (!descriptions) {
        return NextResponse.json(
            { message: "등록된 핵심 역량 설명 정보가 없습니다." },
            { status: 404 }
        )
    }

    const descriptionsByItemId = new Map<number, string[]>()
        ; ((descriptions ?? []) as CoreItemDescriptionRow[]).forEach((description) => {
            const currentDescriptions =
                descriptionsByItemId.get(description.core_item_id) ?? []

            descriptionsByItemId.set(description.core_item_id, [
                ...currentDescriptions,
                description.content,
            ])
        })

    return NextResponse.json({
        section: {
            id: section.id,
            slug: section.slug,
            title: section.title,
        },
        items: coreItems.map((item) => ({
            id: item.id,
            title: item.title,
            imageUrl: item.image_url,
            imageAlt: item.image_alt ?? `${item.title} 이미지`,
            descriptions: descriptionsByItemId.get(item.id) ?? [],
        })),
    })
}