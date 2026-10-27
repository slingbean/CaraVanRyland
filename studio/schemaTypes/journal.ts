import {defineField, defineType} from 'sanity'

export const journalType = defineType({
    name: 'journal',
    title: 'Journal',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Entry Title',
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
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            description: 'A short introduction for the journal preview.',
        }),

        defineField({
            name: 'coverImage',
            title: 'Cover Image',
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
            name: 'body',
            title: 'Journal Entry',
            type: 'array',
            of: [
                {type: 'block'},
                {
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
                },
            ],
        }),

        defineField({
            name: 'gallery',
            title: 'Photo Gallery',
            type: 'array',
            of: [
                {
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
                        defineField({
                            name: 'caption',
                            title: 'Caption',
                            type: 'string',
                        }),
                    ],
                },
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
                    {title: 'Photography', value: 'photography'},
                    {title: 'Art & Music', value: 'art-music'},
                    {title: 'Food', value: 'food'},
                    {title: 'Everyday Life', value: 'everyday-life'},
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
            media: 'coverImage',
        },
    },
})