import { Select, defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";


export default defineConfig({
  client: { skip: true },
  branch,
  clientId: process.env.clientId, // Get this from tina.io
  token: process.env.token, // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "src/content",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Стаитьи",
        path: "src/content",
        ui: {
          filename: {
            readonly: false,
            slugify: values => {
              const date = new Date();
              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
        
              let currentDate = `${year}-${month}-${day}`;
        
              return `${currentDate}-${values?.title?.toLowerCase().replace(/ /g, '-')}`
            }
          }
        },  

        fields: [
          {
            type: "string",
            name: "title",
            label: "Заголовок",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Краткое описание поста"
          },
          {
            type: 'image',
            name: 'image',
            label: 'Картинка поста',
            ui: {             
              parse(value) {
                //remove leading slash if it exists
                return value.startsWith("/") ? value.slice(1) : value;
              },
            },
          },
          {
            label: 'Теги',
            name: 'tags',
            type: 'string',
            list: true,
            required: true,
          },
          {
            label: 'Автор',
            name: 'author',
            type: 'string',
            list: true,                   
          },     
          {
            type: 'boolean',
            name: 'comments',
            label: 'Комментрарии',
            description: 'Включить кометарии в статье',
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Чернокик',
            description: 'Поместить в чероновики',
          },  
          {
            type: 'datetime',
            name: 'date',
            label: 'Дата',
          },
          {
            type: "rich-text",
            name: "body",
            label: "Сообщение",
            isBody: true,
          },
        ],
      },
    ],    
  },
  search: {
    tina: {
      indexerToken: process.env.clientSearch,
      stopwordLanguages: ['rus']
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  },
});
