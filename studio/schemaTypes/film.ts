import {defineField, defineType} from 'sanity'

export const filmType = defineType({
    name: 'film',
    title: 'Films',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Film Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'youtubeUrl',
            title: 'YouTube Video URL',
            type: 'url',
            description: 'Paste the link to your YouTube video.',
            validation: (Rule) =>
                Rule.required().uri({
                    scheme: ['http', 'https'],
                }).custom((url) => {
                    if (!url) return true

                    try {
                        const hostname = new URL(url).hostname.toLowerCase()
                        return (
                            hostname === 'youtube.com' ||
                            hostname.endsWith('.youtube.com') ||
                            hostname === 'youtu.be'
                        ) || 'Please enter a vaild YouTube URL.'
                    } catch {
                        return 'Please enter a valid Youtube URL.'
                    }
                }),
        }),
defineField({
    name: 'thumbnail',
    title: 'Film Thumbnail',
    type: 'image',
    options: {
        hotspot: true,
    },
    fields: [
        defineField({
            name: 'alt',
            title: 'Alternative Text',
            type: 'string',
            description: 'Describe the image for accessibility.',
        }),
    ],
}),
defineField({
    name: 'publishedAt',
    title: 'Publication Date',
    type: 'datetime',
    validation: (Rule) => Rule.required(),
}),
defineField({
    name: 'featured',
    title: 'Feature on Homepage',
    type: 'boolean',
    description: 'Highlight this film on the homepage.',
    initialValue: false,
}),
],
orderings: [
    {
        title: 'Newest First',
        name: 'publishedAtDesc',
        by: [{field: 'publishedAt', direction: 'desc'}],
    },
],
preview: {
    select: {
        title: 'title',
        subtitle: 'publishedAt',
        media: 'thumbnail',
    },
},
})