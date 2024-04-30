window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"list_demo_1\",    【 该Module的ID，可通过 getConfig() 获取配置参数对象等 】",
    "search: {    【 查询模块配置对象，默认无 】",
    "    id: \"\" ,    【 可配置，默认无 】",
    "    form: {    【 表单配置对象。提示：此处引用的Part中Form组件 】",
    "        id: - ,    【 不可配置，默认为search的ID 】",
    "        col: 3,",
    "        elements: [",
    "            { key: \"search.name\", title: \"名称\", type: \"text\", default: \"请输入名称\", },",
    "            { ",
    "                key: \"type\", title: \"类型\", type: \"select\", children:[], ",
    "                load: {    【 下拉框数据加载对象，提示：也可以用于radio和checkbox类型 】",
    "                    url: \"...\",    【 请求数据的接口地址 】",
    "                    params: { ... },    【 请求参数 】",
    "                    text: \"name\",    【 下拉框显示的文本所对应数据的字段名 】",
    "                    value: \"code\"    【 下拉框value值所对应数据的字段名 】",
    "                }",
    "            }",
    "            ......",
    "        ]",
    "    },",
    "    buttons: [    【 按钮组配置对象。提示：此处引用的Part中Buttons组件 】",
    "        id: - ,    【 不可配置，默认为search的ID 】",
    "        buttons: [ ",
    "            { ",
    "                id: \"finish\", text: \"按钮事件测试\" ",
    "                fn: function(){ ... }    【 按钮单击事件，this对象：{ button: 当前按钮对象, module: module配置对象 } 】",
    "            },{ ",
    "                id: \"finish\", text: \"搜索\" ",
    "                fn: \"query\"    【 内置函数query，功能：执行list.load配置查询。可选内置函数：query } 】",
    "            },",
    "            ......",
    "        ],",
    "        call: - ,    【 不可配置，组件内部设置了click事件 】",
    "    ]",
    "},",
    "tool: [    【 工具条模块配置对象，默认无。提示：此处引用的Part中Buttons组件，可以直接简写成tool:[...] 】",
    "    id: - ,    【 不可配置，默认为该Module的ID 】",
    "    buttons: [ ",
    "        { ",
    "            id: \"finish\", text: \"工具栏按钮事件测试\" ",
    "            fn: function(){ ... }    【 按钮单击事件，this对象：{ button: 当前按钮对象, module: module配置对象 } 】",
    "        },{ ",
    "            id: \"finish\", text: \"添加\" ",
    "            fn: \"openWindow\",    【 内置函数linkTo，功能：打开window配置对象中配置的窗口。可选内置函数：openWindow|edit|dels|checkAll 】",
    "            to: \"add\"    【 配置openWindow要打开的窗口，与windows配置对象的属性名相对应 】",
    "        },{ ",
    "            id: \"finish\", text: \"管理\" ",
    "            fn: \"edit\",    【 内置函数edit，功能：List进入编辑模式。注意：仅对List组件生效 】",
    "        },{ ",
    "            id: \"finish\", text: \"批量删除\" ",
    "            fn: \"dels\",    【 内置函数dels，功能：跳转到指定页面 】",
    "            url: \"...\",    【 配置删除数据接口地址 】",
    "            paramKeys: [\"name\",\"count\"]    【 配置提交到接口的参数名称，参数值会自动从该项数据中取 】",
    "        },{ ",
    "            id: \"finish\", text: \"全选\" ",
    "            fn: \"checkAll\",    【 内置函数checkAll，功能：全选。提升：当为List对象时会自动进入编辑模式 】",
    "        }",
    "        ......",
    "    ],",
    "    call: - ,    【 不可配置，组件内部设置了click事件 】",
    "]",
    "list: {    【 列表数据模块配置对象。提示：此处引用的Part中List组件 】",
    "    id: - ,    【 不可配置，默认为该Module的ID 】",
    "    click: false,",
    "    edit: false,",
    "    itemStyle: \"width:100%;\",",
    "    col: 1,    【 列数，默认1 】",
    "    fn: function(){ ... }    【 列表项单击事件，this对象：{ content:当前content对象, module: module配置对象 } 】",
    "    load: {    【 数据加载配置对象。注意：该配置对象仅在module的组件中才可以使用 】",
    "        url: \"./data/listData.json\",    【 数据请求URL 】",
    "        type: \"GET\",    【 请求类型。可选值：GET|POST 】",
    "        params: {},    【 请求参数，提示：请求URL时会自动将search表单中填写的查询添加加载到此对象中 】",
    "        temp: {    【 数据展示模板配置对象，其中@{}中填入数据对象的属性名 】",
    "            type: \"H\",    【 元素排列类型，默认H，可选值：H|L，分别表示横向|纵向排列 】",
    "            col: 1,    【 列数，默认1。提示：一般只需要配置List的col即可 】",
    "            img: { url: \"./img/1.jpg\" },",
    "            title: { style: \"text-align: left;\", text: \"@{name}\" },",
    "            operations: {",
    "                elements: [",
    "                    {",
    "                        key: \"1\", img: \"./img/xl.svg\", text: \"@{count}\",  ",
    "                        fn: function(){ ... }    【 操作项单击事件，this对象：{ operation: 当前operation项对象, content:当前content对象, module: module配置对象 } 】",
    "                    },",
    "                    {",
    "                        key: \"2\", img: \"./img/xl.svg\", text: \"详情\", position: \"right\" ",
    "                        fn: \"linkTo\",    【 内置函数linkTo，功能：跳转到指定页面。可选内置函数：linkTo|openWindow|del 】",
    "                        url: \"https://www.baidu.com\",    【 配置linkTo跳转到的URL 】",
    "                        urlParams: [\"name\",\"count\"]    【 配置linkTo跳转到的URL所带的参数名称，参数值会自动从该项数据中取 】",
    "                    },",
    "                    {",
    "                        key: \"3\", img: \"./img/xl.svg\", text: \"编辑\", position: \"right\" ",
    "                        fn: \"openWindow\",    【 内置函数openWindow，功能：打开window配置对象中配置的窗口 】",
    "                        to: \"update\",    【 配置openWindow要打开的窗口，与windows配置对象的属性名相对应 】",
    "                        init: true    【 是否初始化数据（将list数据填入window表单中），默认true 】",
    "                    },",
    "                    {",
    "                        key: \"4\", img: \"./img/xl.svg\", text: \"删除\", position: \"right\" ",
    "                        fn: \"del\",    【 内置函数del，功能：调用删除数据接口 】",
    "                        url: \"...\",    【 配置删除数据接口地址 】",
    "                        paramKeys: [\"name\",\"count\"]    【 配置提交到接口的参数名称，参数值会自动从该项数据中取 】",
    "                    },",
    "                    .......",
    "                ],",
    "                call: - ,    【 不可配置，组件内部设置了click事件 】",
    "            },",
    "            text: {",
    "                elements: [\"@{content}\"]",
    "            },",
    "        }",
    "    },",
    "    contents: [    【 列表项内容配置对象。注意：当配置了数据加载对象，该对象配置的内容会被加载的数据覆盖 】",
    "       {    【 内容配置对象，同load.temp对象结构相同。提示：此处引用的Part中content组件 】",
    "           img: { ... },    【 注意：img|title|operations|text对象顺序会影响页面显示的顺序 】",
    "           title: { ... },",
    "           operations: {  elements: [...] },",
    "           text: {  elements: [......]  }",
    "       },",
    "       ......",
    "    ],",
    "    call: - ,    【 不可配置，组件内部设置了click事件 】",
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
    "var partObj = ui.module.list.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"

];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.modules.list.getConfig(id);", t3: "模块ID", t4: "配置参数对象", t5: "获得指定 ID 的列表模块配置参数" },
        { t1: "search.click", t2: "ui.modules.table.search.click(params);", t3: "{moduleId: 模块ID}", t4: "无", t5: "触发指定 ID 列表模块的筛选栏按钮点击事件" },
        { t1: "search.call.…", t2: "ui.modules.table.search.call.…", t3: "否", t4: "无", t5: "自定义回调函数对象，字节通过\".\"进行添加，默认包含 query 函数" },
        { t1: "list.loadData", t2: "ui.modules.list.list.loadData(params);", t3: "{moduleId: 模块ID}", t4: "无", t5: "加载指定 ID 列表模块的数据（执行list.load配置的内容）" },
        { t1: "page.check", t2: "ui.modules.list.page.check(params);", t3: "{moduleId: 模块ID}", t4: "无", t5: "触发指定 ID 的翻页事件" }
    ]
};

window.config.demos = [{
    title: "示例一",
    height: 950,
    config: {
        id: "list_demo_0",
        list: {
            click: false,
            itemStyle: "width:100%;",
            contents: [{
                img: { url: "./img/1.jpg" },
                title: { style: "text-align: left;", text: "视觉中国 - 图1" },
                operations: {
                    elements: [
                        { key: "1", img: "./img/xl.svg", text: "1000" },
                        { key: "2", img: "./img/xl.svg", text: "777" },
                        { key: "3", img: "./img/xl.svg", text: "评论", position: "right" },
                        { key: "4", img: "./img/xl.svg", text: "详情", position: "right" },
                    ]
                },
                text: {
                    elements: ["1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"]
                },
            }, {
                img: { url: "./img/1.jpg" },
                title: { style: "text-align: left;", text: "视觉中国 - 图2" },
                operations: {
                    elements: [
                        { key: "1", img: "./img/xl.svg", text: "1200" },
                        { key: "2", img: "./img/xl.svg", text: "7677" },
                        { key: "3", img: "./img/xl.svg", text: "评论", position: "right" },
                        { key: "4", img: "./img/xl.svg", text: "详情", position: "right" },
                    ]
                },
                text: {
                    elements: ["222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222"]
                },
            }]
        },
        page: { curr: 1, maxPage: 5, showSize: 5 }
    }
}, {
    title: "示例二",
    height: 950,
    config: {
        id: "list_demo_1",
        search: {
            form: {
                col: 3,
                elements: [
                    { key: "nane", title: "名称", type: "text", default: "请输入名称", }
                ]
            },
            buttons: [{ id: "finish", text: "搜索", fn: "query"} ]
        },
        tool: [
            { id: "edit", text: "管理列表", fn: "edit" },
            { id: "all", text: "全选", fn: "checkAll" },
            { id: "add", text: "添加", fn: "openWindow", to: "add" },
            { id: "dels", text: "批量删除", fn: "dels", url: "...", paramKeys: ["title"]}
        ],
        list: {
            click: true,
            col: 2,
            fn: function () { console.log(this) },
            load: {
                url: "./data/listData.json",
                type: "GET",
                params: {},
                temp: {
                    img: { url: "./img/1.jpg" },
                    title: { style: "text-align: left;", text: "@{title}" },
                    operations: {
                        elements: [
                            { key: "1", img: "./img/xl.svg", text: "@{count}" },
                            { key: "3", img: "./img/xl.svg", text: "详情", fn: "linkTo", url: "https://www.baidu.com", urlParams:["title","count"] },
                            { key: "4", img: "./img/xl.svg", text: "编辑", position: "right", fn: "openWindow", to: "update" },
                            { key: "5", img: "./img/xl.svg", text: "删除", position: "right", fn: "del", url:"...", paramKeys:["title"] },
                        ]
                    },
                    text: {
                        elements: ["@{text}"]
                    },
                }
            }
        },
        page: { curr: 1, maxPage: 0, showSize: 5 },
        windows: [
            {
                id: "add",
                title: "添加",
                form: [
                    { key: "title", title: "标题", type: "text" },
                    { key: "count", title: "点击量", type: "text" },
                    { key: "text", title: "内容", type: "textarea" }
                ],
                buttons: [{ id: "submit", text: "提交", fn: "save", url: "..." }]
            },{
                id: "update",
                title: "编辑",
                form: [
                    { key: "title", title: "标题", type: "text" },
                    { key: "count", title: "点击量", type: "text" },
                    { key: "text", title: "内容", type: "textarea" }
                ],
                buttons: [{ id: "submit", text: "提交", fn: "save", url: "..." }]
            }
        ]
    },
    html: "<script>ui.modules.list.list.loadData({moduleId: 'list_demo_1'})</script>"
}];

