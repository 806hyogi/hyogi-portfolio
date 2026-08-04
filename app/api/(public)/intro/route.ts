import { NextResponse } from "next/server"
import { supabase } from "@/lib/backend/supabase"

export async function GET() {
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, name, name_en, role, headline, description, profile_image_url, profile_image_alt")
        .limit(1)
        .single()

    if (profileError) {
        return NextResponse.json(
            { message: "소개 정보를 불러오지 못했습니다." },
            { status: 500 }
        )
    }

    if (!profile) {
        return NextResponse.json(
            { message: "등록된 소개 정보가 없습니다." },
            { status: 404 }
        )
    }

    const { data: links, error: linksError } = await supabase
        .from("profile_links")
        .select("label, url, icon")
        .eq("profile_id", profile.id)
        .order("sort_order", { ascending: true })

    if (linksError) {
        return NextResponse.json(
            { message: "링크 정보를 불러오지 못했습니다." },
            { status: 500 }
        )
    }

    if (!links) {
        return NextResponse.json(
            { message: "등록된 링크 정보가 없습니다." },
            { status: 404 }
        )
    }

    return NextResponse.json({
        profile: {
            name: profile.name,
            nameEn: profile.name_en,
            role: profile.role,
            headline: profile.headline,
            description: profile.description,
            profileImageUrl: profile.profile_image_url,
            profileImageAlt: profile.profile_image_alt,
            links: links ?? []
        },
    })
}