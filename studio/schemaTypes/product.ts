import { defineField, defineType } from "sanity";

/**
 * A single B-BUCKETS product. Covers footwear, clothing, and accessories via
 * the `category` field, so one schema powers the whole catalog.
 */
export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      // The URL-friendly id, e.g. /shop/black-bucket-hat. Auto-made from name.
      name: "slug",
      title: "Slug (web address)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Footwear", value: "footwear" },
          { title: "Clothing", value: "clothing" },
          { title: "Accessories", value: "accessories" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      options: { layout: "grid" },
      validation: (rule) => rule.min(1).error("Add at least one photo."),
    }),
    defineField({
      name: "sizes",
      title: "Available sizes",
      description:
        "e.g. 7, 8, 9 for shoes — or S, M, L for clothing. Leave empty for one-size accessories.",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "colors",
      title: "Colors",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Color name", type: "string" },
            {
              name: "hex",
              title: "Swatch color (hex)",
              type: "string",
              description: "Optional, e.g. #1A1A1A — shows a color dot on site.",
            },
          ],
          preview: { select: { title: "name", subtitle: "hex" } },
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "materials",
      title: "Materials & care",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "drop",
      title: "Drop / Collection",
      type: "reference",
      to: [{ type: "drop" }],
    }),
    defineField({
      name: "inStock",
      title: "In stock",
      description: "Turn off to show this product as Sold Out.",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "images.0",
    },
  },
});
