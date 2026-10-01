// .tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineConfig({
  branch,
  clientId: null,
  token: null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog Posts",
        path: "src/content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "meta_title",
            label: "Meta Title"
          },
          {
            type: "string",
            name: "description",
            label: "Description"
          },
          {
            type: "datetime",
            name: "date",
            label: "Date"
          },
          {
            type: "string",
            name: "image",
            label: "Image"
          },
          {
            type: "string",
            name: "author",
            label: "Author"
          },
          {
            type: "object",
            name: "categories",
            label: "Categories",
            list: true,
            fields: [
              {
                type: "string",
                name: "category"
              }
            ]
          },
          {
            type: "object",
            name: "tags",
            label: "Tags",
            list: true,
            fields: [
              {
                type: "string",
                name: "tag"
              }
            ]
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      {
        name: "authors",
        label: "Authors",
        path: "src/content/authors",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Name",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description"
          },
          {
            type: "string",
            name: "image",
            label: "Image"
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft"
          }
        ]
      },
      {
        name: "pages",
        label: "Pages",
        path: "src/content/pages",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "meta_title",
            label: "Meta Title"
          },
          {
            type: "string",
            name: "description",
            label: "Description"
          },
          {
            type: "string",
            name: "image",
            label: "Image"
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
