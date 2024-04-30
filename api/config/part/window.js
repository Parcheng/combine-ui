window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"window_demo_0\",    【 该Part的ID，可通过 getConfig() 获取配置参数对象等 】",
    "style: \"width:100%;\"     【 自定义样式，可选值：CSS格式样式 】",
    "title: \"这是一个标题\",    【 窗口标题栏显示文字 】",
    "body: \"...\" ,    【 显示的内容。支持类型：HTML代码|CONF配置对象（如：ui.parts.form.build(conf).config得到的对象） 】",
    "call: {      【 事件回调对象 】",
    "    open:{      【 打开窗口事件回调对象，如果没有自定义参数，可简写成open: function(){ ...... } 】",
    "        fn: function(param){  ....  },      【 打开窗口事件回调函数，可选值：函数|函数路径字符串。this：当前窗口配置对象 】",
    "        params: { val: \"test\" }      【 打开窗口事件回调函数参数，可选值：所有类型 】",
    "    } ",
    "    close:{      【 关闭窗口事件回调对象，如果没有自定义参数，可简写成close: function(){ ...... } 】",
    "        fn: function(param){  ....  },      【 关闭窗口事件回调函数，可选值：函数|函数路径字符串。this：当前窗口配置对象 】",
    "        params: { val: \"test\" }      【 关闭窗口事件回调函数参数，可选值：所有类型 】",
    "    } ",
    "    verify:{      【 验证窗口是否存在事件回调对象，如果没有自定义参数，可简写成verify: function(){ ...... } 】",
    "        fn: function(param){  ....  },      【 验证窗口是否存在事件回调函数，可选值：函数|函数路径字符串。this：当前窗口配置对象 】",
    "        params: { val: \"test\" }      【 验证窗口是否存在事件回调函数参数，可选值：所有类型 】",
    "    } ",
    "} ",
    "",
    "<h2>○ 返回值：</h2>",
    "id: 该 Part 的 ID",
    "params: 该 Part 的配置对象（调用 build 函数传入的配置对象）",
    "config: CONF对象，需要使用 ui.build.buildModule(CONF) 函数转换成 HTML 代码",
    "",
    "<h2>○ 使用方式：</h2>",
    "var partObj = ui.part.window.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.parts.window.getConfig(id);", t3: "ID", t4: "配置参数对象", t5: "获得指定 ID 的窗口配置参数" },
        { t1: "drag", t2: "ui.parts.window.drag(id);", t3: "ID", t4: "无", t5: "触发指定 ID 的 window 窗口的拖动事件" },
        { t1: "open", t2: "ui.parts.window.open(id);", t3: "ID", t4: "无", t5: "打开指定 ID 的 window 窗口" },
        { t1: "close", t2: "ui.parts.window.close(id);", t3: "ID", t4: "无", t5: "关闭指定 ID 的 window 窗口" },
        { t1: "verify", t2: "ui.parts.window.verify(id);", t3: "ID", t4: "无", t5: "验证指定 ID 的 window 窗口是否存在" }
    ]
};

window.config.demos = [{
    title: "HTML示例",
    height: 250,
    config: {
        id: "window_demo_0",
        title: "这是一个标题",
        body: "<div style=\'height:300px;margin:20px;\'>这是窗口中的内容...</div>"
    },
    html: "<button onclick=\"ui.parts.window.open('window_demo_0')\">打开</button>" +
        "&nbsp;&nbsp;<button onclick=\"ui.parts.window.close('window_demo_0')\">关闭</button>"
}, {
    title: "CONF示例",
    height: 250,
    config: {
        id: "window_demo_1",
        title: "这是一个标题",
        body: [ui.parts.form.build({
            id: "form_demo_0",
            elements: [
                { key: "key_1", title: "姓名", type: "text", default: "请填写姓名", verify: "NO_NULL", help: "提示：text 类型", error: "该值不能为空！" },
                {
                    key: "key_2", title: "头像", type: "file", default: "请上传头像", verify: "NO_NULL", help: "file 类型", error: "该值不能为空！",
                    url: "http://127.0.0.1/uploadTest", fileName: "fileBtn", upload: function () { alert(上传成功); }
                },
                {
                    key: "key_3", title: "性别", type: "radio", value: "B", verify: "NO_NULL", help: "提示：radio 类型", error: "该值不能为空！",
                    children: [{ text: "男", value: "A" }, { text: "女", value: "B" }]
                }, {
                    key: "key_4", title: "爱好", type: "checkbox", value: "B,C", verify: "NO_NULL", help: "提示：checkbox 类型", error: "该值不能为空！",
                    children: [{ text: "运动", value: "A" }, { text: "音乐", value: "B" }, { text: "旅行", value: "C" }]
                }, {
                    key: "key_5", title: "学历", type: "select", verify: "NO_NULL", value: "C", help: "提示：select 类型", error: "该值不能为空！",
                    children: [{ text: "低", value: "A" }, { text: "中", value: "B" }, { text: "高", value: "C" }]
                },
                { key: "key_6", title: "生日", type: "date", verify: "NO_NULL", help: "提示：date 类型", error: "该值不能为空！" },
                { key: "key_7", title: "描述", type: "textarea", verify: "NO_NULL", help: "提示：textarea 类型", error: "该值不能为空！" }
            ]
        }).config]
    },
    html: "<button onclick=\"ui.parts.window.open('window_demo_1')\">打开</button>" +
        "&nbsp;&nbsp;<button onclick=\"ui.parts.window.close('window_demo_1')\">关闭</button>"
}];


