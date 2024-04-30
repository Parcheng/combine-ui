window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"form_demo_1\",    【 该Module的ID，可通过 getConfig() 获取配置参数对象等 】",
    "load: {    【 数据加载配置对象。注意：该配置对象仅在module的组件中才可以使用 】",
    "    url: \"./data/listData.json\",    【 数据请求URL 】",
    "    type: \"GET\",    【 请求类型。可选值：GET|POST 】",
    "    params: {},    【 请求参数，提示：请求URL时会自动将search表单中填写的查询添加加载到此对象中 】",
    "    }",
    "},",
    "form: [    【 表单配置对象。提示：此处引用的Part中Form组件 】",
    "    { key: \"name\", title: \"名称\", type: \"text\" },",
    "    { ",
    "        key: \"type\", title: \"类型\", type: \"select\", children: [], ",
    "        load: {    【 下拉框数据加载对象，提示：也可以用于radio和checkbox类型 】",
    "            ref: \"...\",    【 引用数据字典的名称（当数据字典内数据未加载则会根据url和params加载数据） 】",
    "            url: \"...\",    【 请求数据的接口地址 】",
    "            params: { ... },    【 请求参数 】",
    "            text: \"name\",    【 下拉框显示的文本所对应数据的字段名 】",
    "            value: \"code\"    【 下拉框value值所对应数据的字段名 】",
    "        } ",
    "    },",
    "    ......",
    "],",
    "buttons: [    【 按钮组配置对象。提示：此处引用的Part中Buttons组件 】",
    "    { ",
    "        id: \"test\", text: \"测试\", ",
    "        fn: function(){ ... }    【 按钮单击事件，this对象：{ button: 当前按钮对象, module: module配置对象 } 】",
    "    }, { ",
    "        id: \"submit\", text: \"提交\", ",
    "        fn: \"save\",    【 内置函数save，功能：调用保存数据接口。可选内置函数：linkTo|save 】",
    "        url: \"...\"    【 配置保存数据接口地址 】",
    "    }, {",
    "        id: \"submit\", text: \"跳转\", ",
    "        fn: \"linkTo\",    【 内置函数linkTo，功能：跳转到指定页面。可选内置函数：linkTo|save 】",
    "        url: \"https://www.baidu.com\",    【 配置linkTo跳转到的URL 】",
    "        urlParams: [\"name\",\"count\"]    【 配置linkTo跳转到的URL所带的参数名称，参数值会自动从该项数据中取 】",
    "    }",
    "]",
    "",
    "<h2>○ 返回值：</h2>",
    "id: 该 Module 的 ID",
    "params: 该 Module 的配置对象（调用 build 函数传入的配置对象）",
    "config: CONF对象，需要使用 ui.build.buildModule(CONF) 函数转换成 HTML 代码",
    "",
    "<h2>○ 使用方式：</h2>",
    "var partObj = ui.module.form.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.modules.form.getConfig(id);", t3: "模块ID", t4: "配置参数对象", t5: "获得指定 ID 的列表模块配置参数"},
        { t1: "form.loadData", t2: "ui.modules.form.form.loadData(params);", t3: "{moduleId: 模块ID}", t4: "无", t5: "获得指定 ID 的列表模块配置参数"},
        { t1: "button.click", t2: "ui.modules.form.button.click(params);", t3: "{moduleId: 模块ID}", t4: "无", t5: "触发指定 ID 的表单模块的按钮单击事件"},
        { t1: "button.call.…", t2: "ui.modules.form.button.call.…", t3: "否", t4: "无", t5: "自定义回调函数对象，字节通过\".\"进行添加，默认包含linkTo、update两个函数"}
    ]
};

window.config.demos = [{
    title: "示例一",
    height: 350,
    config: {
        id: "form_demo_0",
        form: {
            col: 2,
            elements: [
                { key: "name", title: "名称", type: "text" },
                { key: "type", title: "类型", type: "text" },
                { key: "count", title: "点击量", type: "text" },
                { key: "mark", title: "备注", type: "textarea" }
            ]
        },
        buttons: [ { id: "finish", text: "提交"  } ]
    }
}, {
    title: "示例二",
    height: 350,
    config: {
        id: "form_demo_1",
        form: {
            col: 2,
            load: {
                url: "./data/formData.json",
                type: "GET",
                params: {}
            },
            elements: [
                { key: "name", title: "名称", type: "text" },
                { key: "type", title: "类型", type: "text" },
                { key: "count", title: "点击量", type: "text" },
                { key: "mark", title: "备注", type: "textarea" }
            ]
        },
        buttons: [ 
            { id: "1", text: "提交", fn:"save", url:"..."  },
            { id: "2", text: "跳转",fn: "linkTo", url: "https://www.baidu.com", urlParams: ["name"]  } 
        ]
    },
    html: "<script>ui.modules.form.form.loadData({moduleId: 'form_demo_1'})</script>"
}];