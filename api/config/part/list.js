window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"list_demo_0\",    【 该Part的ID，可通过 getConfig() 获取配置参数对象等 】",
    "click: true,    【 是否支持单击事件，公共配置，默认false 】",
    "edit: false,    【 是否默认进入编辑模式，默认true 】",
    "style: \"width:100%;\",    【 自定义样式，可选值：CSS格式样式 】",
    "itemStyle: \"width:100%;\",    【 列表项公共自定义样式，可选值：CSS格式样式 】",
    "col: 1,    【 列数，默认1 】",
    "items: [    【 列表项配置对象数组 】",
    "    { ",
    "        key: \"list_1\",    【 列表项Key值 】",
    "        click: \"list_1\",    【 是否支持单击事件，公共配置，默认使用公共配置 】",
    "        style: \"width:100%;\",    【 自定义样式，可选值：CSS格式样式 】",
    "        content: \"......\"    【 列表项内容，支持HTML 】",
    "        call: {      【 事件回调对象，优先级最高。注意：只会触发优先级高的回调函数 】",
    "            click:{      【 单击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "                fn: function(param){  ....  },      【 单击事件回调函数，可选值：函数|函数路径字符串。this：当前列表项配置对象 】",
    "                params: { val: \"test\" }      【 单击事件回调函数参数，可选值：所有类型 】",
    "            } ",
    "        } ",
    "    },",
    "    ...... ",
    "],",
    "call: {      【 公共事件回调对象，优先级最低。注意：只会触发优先级高的回调函数 】",
    "    click:{      【 单击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "        fn: function(param){  ....  },      【 单击事件回调函数，可选值：函数|函数路径字符串。this：当前列表项配置对象 】",
    "        params: { val: \"test\" }      【 单击事件回调函数参数，可选值：所有类型 】",
    "    } ",
    "} ",
    "",
    "<h2>○ 返回值：</h2>",
    "id: 该 Part 的 ID",
    "params: 该 Part 的配置对象（调用 build 函数传入的配置对象）",
    "config: CONF对象，需要使用 ui.build.buildModule(CONF) 函数转换成 HTML 代码",
    "items: 列表项集对象，包含列表中所有列表项配置对象，可通过 items.列表项Key 获得图形配置对象",
    "",
    "<h2>○ 使用方式：</h2>",
    "var partObj = ui.part.list.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.parts.list.getConfig(id);", t3: "列表ID", t4: "配置参数对象", t5: "获得指定 ID 的列表配置参数"},
        { t1: "empty", t2: "ui.parts.list.empty(id);", t3: "列表ID", t4: "无", t5: "清除指定 ID 的所有列表项"},
        { t1: "edit", t2: "ui.parts.list.edit(id, status);", t3: "列表ID，状态", t4: "无", t5: "开启/关闭指定 List 的编辑模式"},
        { t1: "getChecked", t2: "ui.parts.list.empty(id);", t3: "列表ID", t4: "无", t5: "获得指定 ID 的 List 所有选中项"},
        { t1: "removeChecked", t2: "ui.parts.list.empty(id);", t3: "列表ID", t4: "无", t5: "删除指定 ID 的 List 所有选中项"},
        { t1: "checkAll", t2: "ui.parts.list.empty(id);", t3: "列表ID", t4: "无", t5: "全选指定 ID 的 List 所有选中项"},
        { t1: "item.add", t2: "ui.parts.list.item.add(id, params);", t3: "列表ID，列表项参数", t4: "无", t5: "在指定 ID 的列表中添加一项内容"},
        { t1: "item.check", t2: "ui.parts.list.check(id);", t3: "列表ID，列表项ID", t4: "无", t5: "选择指定 List 的的 item 项"},
        { t1: "item.click", t2: "ui.parts.list.item.click(id, key);", t3: "列表ID，列表项ID", t4: "无", t5: "触发指定 ID 的列表项单击事件"}
    ]
};

window.config.demos = [{
    title: "基本示例",
    height: 250,
    config: {
        id: "list_demo_0",
        click: true,
        edit: true,
        itemStyle: "width:100%;",
        call: { 
            click: function () { alert(this.key + " 列表项被点击！") } ,
            check: function () { alert(this.key + " 列表项被选择！") }
        },
        items: [{
            key: "list_1",
            content: "<p style='background-color: orange;'>my_list 列表第一项</p>"
        }, {
            key: "list_2",
            content: "<p style='background-color: orange;'>my_list 列表第二项</p>"
        }]
    },

}];


