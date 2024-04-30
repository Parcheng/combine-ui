window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"window_demo_1\",    【 该Module的ID，可通过 getConfig() 获取配置参数对象等 】",
    "windows: [    【 窗口配置数组 】",
    "    id: \"window_demo_1\",    【 窗口ID，默认会根据数据index生成 】",
    "    title: \"添加\",    【 窗口标题栏显示文本 】",
    "    form: [    【 表单配置对象。提示：此处引用的Part中Form组件 】",
    "        { key: \"name\", title: \"名称\", type: \"text\" },",
    "        { ",
    "            key: \"type\", title: \"类型\", type: \"select\", children: [], ",
    "            load: {    【 下拉框数据加载对象，提示：也可以用于radio和checkbox类型 】",
    "                url: \"...\",    【 请求数据的接口地址 】",
    "                params: { ... },    【 请求参数 】",
    "                text: \"name\",    【 下拉框显示的文本所对应数据的字段名 】",
    "                value: \"code\"    【 下拉框value值所对应数据的字段名 】",
    "            } ",
    "        },",
    "        ......",
    "    ],",
    "    buttons: [    【 按钮组配置对象。提示：此处引用的Part中Buttons组件 】",
    "           {  ",
    "               id: \"submit\", text: \"测试\", ",
    "               fn: function(){ ... }    【 操作项单击事件，this对象：{ button: 当前按钮对象, window:当前窗口对象, module: module配置对象 } 】",
    "           }, { ",
    "               id: \"submit\", text: \"提交\", ",
    "               fn: \"save\",    【 内置函数save，功能：调用保存数据接口。可选内置函数：save 】",
    "               url: \"...\"    【 配置保存数据接口地址 】",
    "           }",
    "    ]",
    "}",
    "",
    "<h2>○ 返回值：</h2>",
    "id: 该 Module 的 ID",
    "params: 该 Module 的配置对象（调用 build 函数传入的配置对象）",
    "config: CONF对象，需要使用 ui.build.buildModule(CONF) 函数转换成 HTML 代码",
    "",
    "<h2>○ 使用方式：</h2>",
    "var partObj = ui.module.window.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.modules.window.getConfig(id);", t3: "模块ID", t4: "配置参数对象", t5: "获得指定 ID 的列表模块配置参数" },
        { t1: "form.initData", t2: "ui.modules.window.form.initData(params);", t3: "{moduleId: 模块ID}", t4: "无", t5: "初始化指定 ID 的窗口模块内的表单" },
        { t1: "form.getData", t2: "ui.modules.window.form.getData(params);", t3: "{moduleId: 模块ID}", t4: "{...}", t5: "获得指定 ID 的窗口模块内的表单数据" },
        { t1: "form.removeData", t2: "ui.modules.window.form.removeData(params);", t3: "{moduleId: 模块ID}", t4: "无", t5: "删除指定 ID 的窗口模块内的表单数据" },
        { t1: "form.help", t2: "ui.modules.window.form.help(params);", t3: "{moduleId: 模块ID}", t4: "无", t5: "显示指定 ID 的窗口模块内的表单帮助信息" },
        { t1: "button.click", t2: "ui.modules.window.button.click(params);", t3: "{moduleId: 模块ID}", t4: "无", t5: "触发指定 ID 的窗口模块的按钮单击事件" }
    ]
};

window.config.demos = [{
    title: "Form示例",
    height: 200,
    config: {
        id: "window_demo_0",
        windows: [{
            id: "add",
            title: "ADD",
            form: [
                {
                    key: "Text1", title: "Text-1", type: "radio", value: "a", children:
                        [{ text: "A", value: "a" }, { text: "B", value: "b" }]
                },
                { key: "Text2", title: "Text-2", type: "text", default: "" },
                { key: "Text3", title: "Text-3", type: "text", default: "" }
            ],
            buttons: [{ id: "finish", text: "提交", fn: "save", url: "..." }]
        }]
    },
    html: "<button onclick=\"ui.modules.window.open('window_demo_0','add')\">打开</button>" +
    "&nbsp;&nbsp;<button onclick=\"ui.modules.window.close('window_demo_0','add')\">关闭</button>"

}, {
    title: "Screen示例",
    height: 200,
    config: {
        id: "window_demo_1",
        windows: [{
            id: "select",
            title: "请选中筛选条件",
            screen: [{
                key: "xh",
                title: "型号",
                items: [{ key: "hp", text: "惠普" }, { key: "dell", text: "戴尔" }, { key: "mate", text: "华为" }, { key: "m", text: "小米" }]
            }, {
                key: "clq",
                title: "处理器",
                items: [{ key: "i3", text: "酷睿i3" }, { key: "i5", text: "酷睿i5" }, { key: "i7", text: "酷睿i7" }]
            }],
            buttons: [{ id: "finish", text: "提交", fn: "save", url: "..." }]
        }]
    },
    html: "<button onclick=\"ui.modules.window.open('window_demo_1','select')\">打开</button>" +
    "&nbsp;&nbsp;<button onclick=\"ui.modules.window.close('window_demo_1','select')\">关闭</button>"

}];
