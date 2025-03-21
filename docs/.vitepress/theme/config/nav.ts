import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"]  = [
	{
		"text": "编程",
		"items": [
			{
				"text": "前端",
				"link": "/pages/64f57d",
			//	"activeMatch": "articles/01.前端/05.知识点/10.npm和yarn"
			},
			{
				"text": "后端",
				"link": "/pages/6ac2af",
			//	"activeMatch": "articles/02.后端/02.cos/00. 创建客户端"
			},
		]
	},
	{
		"text": "工具类",
		"link": "/pages/eb5aff",
		// "activeMatch": "articles/20.工具类/自动生成frontmatter"
	}

]
