export type IntroProfile = {
    name: string
    nameEn?: string
    role: string
    headline?: string
    description?: string
    profileImageUrl: string
    profileImageAlt: string
    links: IntroProfileLink[]
}

export type IntroProfileLink = {
    label: string
    url: string
    icon?: string
}

export type IntroResponse = {
    profile: IntroProfile
}