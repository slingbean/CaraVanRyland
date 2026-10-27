import {defineField, defineType} from 'sanity'

export const shortType = defineType({
    name: 'short',
    title: 'Shorts',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Short Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'youtubeUrl',
            title: 'YouTube Shorts URL',
            type: 'url',
            description: 'Paste the link to your YouTube Short.',
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
                        ) || 'Please enter a valid YouTube URL.'
                    } catch {
                        return 'Please enter a valid YouTube URL.'
                    }
                }),
        }),
        defineField({
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alternative Text',
                    type: 'string',
                }),
            ],
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    {title: 'Van Life', value: 'van-life'},
                    {title: 'Travel', value: 'travel'},
                    {title: 'Surfing', value: 'surfing'},
                    {title: 'Food', value: 'food'},
                    {title: 'Art & Music', value: 'art-music'},
                    {title: 'Comedy', value: 'comedy'},
                    {title: 'Other', value: 'other'},
                ],
            },
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
            subtitle: 'category',
            media: 'thumbnail',
        },
    },
})