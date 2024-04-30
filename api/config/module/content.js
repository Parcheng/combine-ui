window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"content_demo_1\",    【 该Module的ID，可通过 getConfig() 获取配置参数对象等 】",
    "style: \"....\",    【 自定义样式，可选值：支持所有CSS样式 】",
    "type: \"H\",    【 元素排列类型，默认H，可选值：H|L，分别表示横向|纵向排列 】",
    "col: 1,    【 列数，默认1 】",
    "load: {    【 数据加载配置对象。注意：该配置对象仅在module的组件中才可以使用 】",
    "    url: \"./data/listData.json\",    【 数据请求URL 】",
    "    type: \"GET\",    【 请求类型。可选值：GET|POST 】",
    "    params: {},    【 请求参数，提示：请求URL时会自动将search表单中填写的查询添加加载到此对象中 】",
    "    temp: {    【 数据展示模板配置对象，其中@{}中填入数据对象的属性名 】",
    "        img: { url: \"./img/1.jpg\" },",
    "        title: { style: \"text-align: left;\", text: \"@{name}\" },",
    "        operations: {",
    "            elements: [",
    "                {",
    "                    key: \"1\", img: \"./img/xl.svg\", text: \"@{count}\",  ",
    "                    fn: function(){ ... }    【 操作项单击事件，this对象：{ operation: 当前operation对象, content:当前content对象, module: module配置对象 } 】",
    "                },{",
    "                    key: \"2\", img: \"./img/xl.svg\", text: \"详情\", position: \"right\" ",
    "                    fn: \"linkTo\",    【 内置函数linkTo，功能：跳转到指定页面。可选内置函数：linkTo|openWindow|del 】",
    "                    url: \"https://www.baidu.com\",    【 配置linkTo跳转到的URL 】",
    "                    urlParams: [\"name\",\"count\"]    【 配置linkTo跳转到的URL所带的参数名称，参数值会自动从该项数据中取 】",
    "                },{",
    "                    key: \"3\", img: \"./img/xl.svg\", text: \"编辑\", position: \"right\" ",
    "                    fn: \"openWindow\",    【 内置函数openWindow，功能：打开window配置对象中配置的窗口 】",
    "                    to: \"update\"    【 配置openWindow要打开的窗口，与windows配置对象的属性名相对应 】",
    "                }",
    "                .......",
    "            ],",
    "            call: - ,    【 不可配置，组件内部设置了click事件 】",
    "        },",
    "        text: {",
    "            elements: [\"@{content}\"]",
    "        },",
    "    }",
    "},",
    "contents: {    【 内容配置对象，同load.temp对象结构相同。提示：此处引用的Part中content组件 】",
    "    id: - 【 不可配置，默认为Module的ID 】,",
    "    type: \"H\", ",
    "    col: 1, ",
    "    img: { ... },    【 注意：img|title|operations|text对象顺序会影响页面显示的顺序 】",
    "    title: { ... },",
    "    operations: {  elements: [...] },",
    "    text: {  elements: [......]  }",
    "},",
    "page: {    【 分页配置对象。提示：此处引用的Part中Page组件，点击页码自动调用list的load函数 】",
    "    id: - ,    【 不可配置，默认为该Module的ID 】",
    "    curr: 1, maxPage: 0, showSize: 5 ",
    "    call: - ,    【 不可配置，组件内部设置了check事件 】",
    "}",
    "window: [    【 弹窗配置对象。提示：此处引用的Part中window组件 】",
    "    {    ",
    "       id: \"add\",    【 窗口ID，默认自动生成。openWindow=add 会打开此对象配置的窗口 】",
    "       title: \"添加\",    【 窗口标题栏显示文本 】",
    "       form: [    【 表单配置对象。提示：此处引用的Part中Form组件 】",
    "           { key: \"name\", title: \"名称\", type: \"text\" },",
    "           { ",
    "               key: \"type\", title: \"类型\", type: \"select\", children: [], ",
    "               load: {    【 下拉框数据加载对象，提示：也可以用于radio和checkbox类型 】",
    "                   url: \"...\",    【 请求数据的接口地址 】",
    "                   params: { ... },    【 请求参数 】",
    "                   text: \"name\",    【 下拉框显示的文本所对应数据的字段名 】",
    "                   value: \"code\"    【 下拉框value值所对应数据的字段名 】",
    "               } ",
    "           },",
    "           ......",
    "       ],",
    "       buttons: [    【 按钮组配置对象。提示：此处引用的Part中Buttons组件 】",
    "           {  ",
    "               id: \"submit\", text: \"测试\", ",
    "               fn: function(){ ... }    【 操作项单击事件，this对象：{ button: 当前按钮对象, window:当前窗口对象, module: module配置对象 } 】",
    "           }, { ",
    "               id: \"submit\", text: \"提交\", ",
    "               fn: \"save\",    【 内置函数save，功能：调用保存数据接口。可选内置函数：save 】",
    "               url: \"...\"    【 配置保存数据接口地址 】",
    "           }",
    "       ]",
    "    },",
    "    ......",
    "]",
    "",
    "<h2>○ 返回值：</h2>",
    "id: 该 Module 的 ID",
    "params: 该 Module 的配置对象（调用 build 函数传入的配置对象）",
    "config: CONF对象，需要使用 ui.build.buildModule(CONF) 函数转换成 HTML 代码",
    "",
    "<h2>○ 使用方式：</h2>",
    "var partObj = ui.module.content.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"

];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.modules.content.getConfig(id);", t3: "模块ID", t4: "配置参数对象", t5: "获得指定 ID 的列表模块配置参数" },
        { t1: "content.loadData", t2: "ui.modules.content.content.loadData(params);", t3: "{moduleId: 模块ID}", t4: "无", t5: "加载指定 ID 内容模块的数据（执行content.load配置的内容）" },
        { t1: "page.check", t2: "ui.modules.content.page.check(params);", t3: "{moduleId: 模块ID}", t4: "无", t5: "触发指定 ID 的翻页事件" }

    ]
};

window.config.demos = [{
    title: "示例一",
    height: 450,
    config: {
        id: "content_demo_0",
        content: {
            title: {
                text: "视觉中国 - 图1",
                style: "width:100%;height:auto;"
            },
            text: {
                elements: ["111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111" +
                    "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"]
            }
        },
        page: { curr: 1, maxPage: 10, showSize: 5 }
    }
}, {
    title: "示例二",
    height: 450,
    config: {
        id: "content_demo_1",
        load: {
            url: "./data/contentData.json",
            type: "GET",
            params: {},
            temp: {
                type: "L",
                col: 3, 
                title: { text: "@{title}" },
                text: { elements: ["@{text}"] },
                operations: {
                    elements: [
                        { key: "1", img: "./img/xl.svg", text: "赞" },
                        { key: "2", img: "./img/xl.svg", text: "跳转", position: "right", fn: "linkTo", url: "https://www.baidu.com", urlParams: ["title"] },
                        { key: "3", img: "./img/xl.svg", text: "评论", position: "right", fn: "openWindow", to: "pl" },
                        { key: "4", img: "./img/xl.svg", text: "编辑", position: "right", fn: "openWindow", to: "update" },
                    ]
                }
            }
        },
        page: { curr: 1, maxPage: 10, showSize: 5 },
        windows: [
            {
                id: "pl",
                title: "评论",
                form: [
                    { key: "email", title: "邮箱", type: "text" },
                    { key: "mark", title: "评论", type: "textarea" }
                ],
                buttons: [{ id: "finish", text: "提交", fn: "save", url: "..." }]
            },{
                id: "update",
                title: "编辑",
                form: [
                    { key: "title", title: "标题", type: "text" },
                    { key: "text", title: "内容", type: "textarea" }
                ],
                buttons: [{ id: "finish", text: "提交", fn: "save", url: "..." }]
            }
        ]
    },
    html: "<script>ui.modules.content.content.loadData({moduleId: 'content_demo_1'})</script>"
}];

