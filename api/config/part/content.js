window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"content_demo_0\",    【 该Part的ID，可通过 getConfig() 获取配置参数对象等 】",
    "style: \"width:100%;\"     【 自定义样式，可选值：CSS格式样式 】",
    "type: \"H\",    【 元素排列类型，默认H，可选值：H|L，分别表示横向|纵向排列 】",
    "col: 1,    【 列数，默认1 】",
    "img: {     【 图片配置对象，默认无图片 】",
    "    style: \"width:100%;\"     【 图片栏自定义样式，可选值：CSS格式样式 】",
    "    url: \"./img/1.jpg\"     【 图片地址 】",
    "}, ",
    "title: {     【 标题配置对象，默认无标题 】",
    "    click: true,     【 是否支持点击事件，默认true 】",
    "    style: \"width:100%;\",     【 标题栏自定义样式，可选值：CSS格式样式 】",
    "    text: \"风景 - 图1\",     【 标题显示文本 】",
    "    call: ｛    【 事件回调函数对象 】",
    "        click: ｛    【 单击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "            fn: function(){  ....  }      【 单击事件回调函数，可选值：函数|函数路径字符串。this：该content整个配置对象 】",
    "            params: {}      【 单击事件回调函数参数，可选值：所有类型 】",
    "        }",
    "    }",
    "}, ",
    "operations: {    【 操作栏配置对象，默认无操作栏 】",
    "    elements: [    【 操作项配置对象数组 】",
    "        { ",
    "            key: \"1\",    【 操作项Key 】", 
    "            click: true,     【 是否支持点击事件，默认true， 】",
    "            img: \"./img/xl.svg\",     【 操作项显示的图片地址，默认无 】",
    "            text: \"点赞\"     【 操作项显示的文本信息，默认无 】",
    "            call: ｛    【 操作项事件回调函数对象，优先级最高。注意：只会触发优先级高的回调函数 】",
    "                click: ｛    【 单击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "                    fn: function(){  ....  },   【 单击事件回调函数，可选值：函数|函数路径字符串。this：{ operation: 当前operation对象, content: 该content整个配置对象 } 】 ",
    "                    params: {}     【 单击事件回调函数参数，可选值：所有类型 】",
    "                }",
    "            }",    
    "        },{  ",
    "            key: \"4\",  ",
    "            img: \"./img/xl.svg\",  ",
    "            text: \"收藏\",   ",
    "            position: \"right\"     【 操作项显示位置，默认left，可选值：left|right 】",
    "        }, ",
    "    ],  ",
    "    call: ｛    【 操作项公共事件回调函数对象，优先级最低。注意：只会触发优先级高的回调函数 】",
    "        click: ｛    【 单击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "            fn: function(){ .... },   【 单击事件回调函数，可选值：函数|函数路径字符串。this：{ operation: 当前operation对象, content: 该content整个配置对象 } 】",
    "            params: {}     【 单击事件回调函数参数，可选值：所有类型 】",
    "        }",
    "    }",
    "},  ",
    "text: {     【 文本配置对象 】",
    "    elements: [    【 文本数组，数组中每一项为一行，支持HTML代码 】",
    "        \".......\", \".......\", \".......\", \".......\"]  ",
    "}",
    "",
    "<h2>○ 返回值：</h2>",
    "id: 该 Part 的 ID",
    "params: 该 Part 的配置对象（调用 build 函数传入的配置对象）",
    "config: CONF对象，需要使用 ui.build.buildModule(CONF) 函数转换成 HTML 代码",
    "",
    "<h2>○ 使用方式：</h2>",
    "var partObj = ui.part.content.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];


window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.parts.table.getConfig(id);", t3: "ID", t4: "配置参数对象", t5: "获得指定 ID 的内容零件配置参数" },
        { t1: "title.click", t2: "ui.parts.table.title.click(id);", t3: "ID", t4: "无", t5: "触发指定 ID 内容零件的标题点击事件" },
        { t1: "operation.click", t2: "ui.parts.table.operation.click(id, key);", t3: "ID，操作项的Key", t4: "无", t5: "触发指定 ID 内容零件，指定 Key 的操作项点击事件" }
    ]
};

window.config.demos = [{
    title: "基本示例",
    height: 400,
    config: {
        id: "content_demo_0",
        col: 2,
        img: { url: "./img/1.jpg" },
        title: { 
            text: "风景 - 图1",
            call: {
                click: function(){ alert("我点击了标题"); }
            } 
        },
        operations: {
            elements: [
                { key: "1", img: "./img/xl.svg", text: "点赞" },
                { key: "2", img: "./img/xl.svg", text: "评论" },
                { key: "3", img: "./img/xl.svg", text: "详情", position: "right" },
                { key: "4", img: "./img/xl.svg", text: "收藏", position: "right" },
            ],
            call: {
                click: function(){ alert(this.operation.text+"被点击！"); }
            }
        },
        text: { elements: ["这是一张风景图片.......", "这是一张风景图片.......", "这是一张风景图片.......", "这是一张风景图片......."] }
    }
}, {
    title: "纵向示例",
    height: 400,
    config: {
        id: "content_demo_1",
        type: "L",
        col: 3,
        img: { url: "./img/2.jpg" },
        title: { text: "风景 - 图2" },
        operations: {
            elements: [
                { key: "1", img: "./img/xl.svg", text: "点赞" },
                { key: "2", img: "./img/xl.svg", text: "评论" },
                { key: "3", img: "./img/xl.svg", text: "详情", position: "right" },
                { key: "4", img: "./img/xl.svg", text: "收藏", position: "right" },
            ]
        },
        text: {
            elements: ["这是一张风景图片.......","这是一张风景图片.......","这是一张风景图片.......","这是一张风景图片......."]
        }
    }
}];



