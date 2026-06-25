import { defineField, defineType } from "sanity";

/**
 * A "drop" (a release / collection). Products point at a drop via a reference,
 * so you can group items and build a page per drop later.
 */
export const drop = defineType({
  name: "drop",
  title: "Drop / Collection",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (web address)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "releaseDate",
      title: "Release date",
      type: "datetime",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "releaseDate", media: "coverImage" },
  },
});
