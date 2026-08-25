export type CoreSection = {
    id: number
    slug: string
    title: string
}

export type CoreItem = {
    id: number
    title: string
    imageUrl: string
    imageAlt: string
    descriptions: string[]
}

export type CoreResponse = {
    section: CoreSection
    items: CoreItem[]
}