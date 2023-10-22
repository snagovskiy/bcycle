// tina/config.js
import { Select, defineConfig } from "tinacms";
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineConfig({
  client: { skip: true },
  branch,
  clientId: process.env.clientId,
  // Get this from tina.io
  token: process.env.token,
  // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "static"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "src/content"
    }
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "\u0421\u0442\u0430\u0438\u0442\u044C\u0438",
        path: "src/content",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              const date = /* @__PURE__ */ new Date();
              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
              let currentDate = `${year}-${month}-${day}`;
              return `${currentDate}-${values?.title?.toLowerCase().replace(/ /g, "-")}`;
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "excerpt",
            label: "\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043F\u043E\u0441\u0442\u0430"
          },
          {
            type: "image",
            name: "image",
            label: "\u041A\u0430\u0440\u0442\u0438\u043D\u043A\u0430 \u043F\u043E\u0441\u0442\u0430",
            ui: {
              parse(value) {
                return value.startsWith("/") ? value.slice(1) : value;
              }
            }
          },
          {
            label: "\u0422\u0435\u0433\u0438",
            name: "tags",
            type: "string",
            list: true,
            required: true
          },
          {
            label: "\u0410\u0432\u0442\u043E\u0440",
            name: "author",
            type: "string",
            list: true
          },
          {
            type: "boolean",
            name: "comments",
            label: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0440\u0430\u0440\u0438\u0438",
            description: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043A\u043E\u043C\u0435\u0442\u0430\u0440\u0438\u0438 \u0432 \u0441\u0442\u0430\u0442\u044C\u0435"
          },
          {
            type: "boolean",
            name: "draft",
            label: "\u0427\u0435\u0440\u043D\u043E\u043A\u0438\u043A",
            description: "\u041F\u043E\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432 \u0447\u0435\u0440\u043E\u043D\u043E\u0432\u0438\u043A\u0438"
          },
          {
            type: "datetime",
            name: "date",
            label: "\u0414\u0430\u0442\u0430"
          },
          {
            type: "rich-text",
            name: "body",
            label: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435",
            isBody: true
          }
        ]
      }
    ]
  },
  search: {
    tina: {
      indexerToken: process.env.clientSearch,
      stopwordLanguages: ["rus"]
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  }
});
export {
  config_default as default
};
