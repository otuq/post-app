
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://https://post-app-ruby.vercel.app/-url.vercel.app"

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/me`,
            lastModified: new Date(),
        },
    ]
}