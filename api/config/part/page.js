window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"page_demo_0\",    【 该Part的ID，可通过 getConfig() 获取配置参数对象等 】",
    "curr: 1,    【 当前页码，默认1 】",
    "maxPage: 10,    【 最大页 】",
    "maxCount: 100,    【 数据总条数，如果未设置 maxPage 参数，可根据该参数来计算 maxPage 】",
    "showSize: 5,    【 展示页码栏目的数量，默认10  】",
    "isLast: true,    【 是否显示上一页栏目，默认true  】",
    "isNext: true,    【 是否显示下一页栏目，默认true  】",
    "isInput: true,    【 是否显示'跳转到...页栏目，默认true  】",
    "isFirstly: true,    【 是否显示首页栏目，默认true  】",
    "isFinally: true,    【 是否显示栏目栏目，默认true 】",
    "call: ｛    【 事件回调函数对象 】",
    "    click: ｛    【 单击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "        fn: function(){  ....  }      【 单击事件回调函数，可选值：函数|函数路径字符串。this：当前。this：该配置对象 】",
    "        params: {}      【 单击事件回调函数参数，可选值：所有类型 】",
    "    }",
    "}",
    "",
    "<h2>○ 返回值：</h2>",
    "id: 该 Part 的 ID",
    "params: 该 Part 的配置对象（调用 build 函数传入的配置对象）",
    "config: CONF对象，需要使用 ui.build.buildModule(CONF) 函数转换成 HTML 代码",
    "",
    "<h2>○ 使用方式：</h2>",
    "var partObj = ui.part.page.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.parts.table.getConfig(id);", t3: "ID", t4: "配置参数对象", t5: "获得指定 ID 的分页零件配置参数" },
        { t1: "getCurr", t2: "ui.parts.table.getCurr(id);", t3: "ID", t4: "无", t5: "获得指定 ID 的 Page 零件对象" },
        { t1: "flush", t2: "ui.parts.table.flush(id);", t3: "ID", t4: "无", t5: "刷新（重新生成 HTML）指定 ID 的分页零件" },
        { t1: "click", t2: "ui.parts.table.click(id, page);", t3: "ID，页数", t4: "无", t5: "触发指定 ID 的分页零件的单击事件（效果：选择到指定页码）" }
    ]
};

window.config.demos = [{
    title: "基本示例",
    height: 200,
    config: {
        id: "page_demo_0",
        curr: 88,
        maxPage: 109,
        showSize: 10,
        call: {
            click: {
                fn: function () { alert("我选择了" + this.curr + "页！"); },
                params: {}
            }
        }
    }
}];


