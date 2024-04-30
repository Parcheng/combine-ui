window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"grid_demo_0\",    【 该Part的ID，可通过 getConfig() 获取配置参数对象等 】",
    "col: 3,    【 列数 】",
    "elements: [    【 网格所有单元格配置对象的数组 】",
    "    { ", 
    "        key: \"1\",   【 网格中单元格的Key 】",
    "        text: \"Title-1\",   【 网格中显示的文本，默认无 】",
    "        width: 1,   【 网格宽度，1：表示1倍 】",
    "        height: 2,    【 网格高度，1：表示2倍 】",
    "        dblclick: true    【 是否支持双击事件，默认true 】",
    "        click: true   【 是否支持单击事件，默认true 】", 
    "    }, ",
    "    ......",
    "],",
    "call: {    【 公共回调函数 】",
    "    【 事件回调对象，如果有自定义参数，可写成click: { fn:function(){ ...... }, params:{...} } 】",
    "    click: function () { .... },  【 触发单击事件的回调函数，可选值：函数变量的路径字符串|函数。this：当前单元格配置对象 】",
    "    dblclick: function () { .... }   【 触发双击事件的回调函数，可选值：函数变量的路径字符串|函数。this：当前单元格配置对象 】",
    "}",
    "",
    "<h2>○ 返回值：</h2>",
    "id: 该 Part 的 ID",
    "params: 该 Part 的配置对象（调用 build 函数传入的配置对象）",
    "config: CONF对象，需要使用 ui.build.buildModule(CONF) 函数转换成 HTML 代码",
    "",
    "<h2>○ 使用方式：</h2>",
    "var partObj = ui.part.grid.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.parts.grid.getConfig(id);", t3: "ID", t4: "配置参数对象", t5: "获得指定 ID 的网格配置参数" },
        { t1: "click", t2: "ui.parts.grid.click(id, index);", t3: "ID，元素索引", t4: "无", t5: "触发指定索引元素的单击事件（会调用该元素 call.click 定义的回调函数）" },
        { t1: "dblclick", t2: "ui.parts.grid.dblclick(id, index);", t3: "ID，元素索引", t4: "无", t5: "触发指定索引元素的双击事件（会调用该元素 call.dblclick 定义的回调函数）" }
    ]
};

window.config.demos = [{
    title: "基本示例",
    height: 420,
    config: {
        id: "grid_demo_0",
        col: 5,
        call: {
            click: function () { alert("网格 " + this.key + " 被单击了！") },
            dblclick: function () { alert("网格 " + this.key + " 被双击了！") }
        },
        elements: [
            { key: "1", text: "1", width: 1, height: 2, dblclick: false, },
            { key: "2", text: "2", width: 2, height: 1, dblclick: false },
            { key: "3", text: "3", width: 1, height: 1, dblclick: false },
            { key: "4", text: "4", width: 1, height: 2, dblclick: false },
            { key: "5", text: "5", width: 1, height: 1, click: false },
            { key: "6", text: "6", width: 1, height: 1, click: false },
            { key: "7", text: "7", width: 1, height: 1, click: false }
        ]
    }
}];
