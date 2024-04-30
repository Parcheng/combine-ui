window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"buttons_demo_0\",    【 该Part的ID，可通过 getConfig() 获取配置参数对象等 】",
    "align: \"left\",    【 按钮对齐方式，可选值：left|center|right 】",
    "buttons: [    【 按钮配置对象数组 】",
    "    {",
    "        id: \"button_1\",    【 按钮ID 】",
    "        text: \"按钮一\",    【 按钮的显示文本 】",
    "        call: ｛    【 事件回调函数对象 】",
    "            click: ｛    【 单击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "                fn: function(){  ....  }      【 单击事件回调函数，可选值：函数|函数路径字符串。this：当前按钮配置对象 】",
    "                params: {}      【 单击事件回调函数参数，可选值：所有类型 】",
    "            }",
    "        }",
    "    }, ",
    "    ......",
    "]",
    "",
    "<h2>○ 返回值：</h2>",
    "id: 该 Part 的 ID",
    "params: 该 Part 的配置对象（调用 build 函数传入的配置对象）",
    "config: CONF对象，需要使用 ui.build.buildModule(CONF) 函数转换成 HTML 代码",
    "",
    "<h2>○ 使用方式：</h2>",
    "var partObj = ui.part.buttons.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.parts.buttons.getConfig(id);", t3: "按钮组ID", t4: "配置参数对象", t5: "获得指定 ID 的窗口配置参数"},
        { t1: "click", t2: "ui.parts.buttons.click(id, buttonId);", t3: "按钮组ID，按钮ID", t4: "无", t5: "触发指定 ID 按钮的单击事件"}
    ]
};

window.config.demos = [{
    title: "基本示例",
    height: 250,
    config: {
        id: "buttons_demo_0",
        align: "left",
        buttons: [{
            id: "my_button_1",
            text: "按钮一",
            call: { click: function () { alert("按钮一被点击！") } }
        }, {
            id: "my_button_2",
            text: "按钮二",
            call: { click: function () { alert("按钮二被点击！") } }
        }]
    }
}];
