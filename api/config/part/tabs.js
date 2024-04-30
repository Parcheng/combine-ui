window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"tabs_demo_0\",    【 该Part的ID，可通过 getConfig() 获取配置参数对象等 】",
    "elements: [    【 标签配置对象数组 】",
    "    { ",
    "        id: \"tab_1\",    【 标签项ID 】", 
    "        default: true,    【 是否为默认显示项，默认值false，注意：默认显示项只能有一个 】",
    "        close: false,    【 是否允许关闭，默认true 】", 
    "        title: {    【 标签标题配置对象 】", 
    "            style: \"width:150px;\",    【 自定义样式，可选值：CSS格式样式 】",
    "            text: \"标签-1\"    【 标签标题显示文本 】", 
    "        }, ", 
    "        body: {     【 标签内容配置对象 】",
    "            style: \"height:200px;\",     【 自定义样式，可选值：CSS格式样式 】",
    "            content: \"...\"    【 显示的内容。支持类型：HTML代码|CONF配置对象（如：ui.parts.form.build(conf).config得到的对象） 】", 
    "        }, ",
    "        call: {      【 事件回调对象，优先级最高。注意：只会触发优先级高的回调函数 】",
    "            checked:{      【 选择事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "                fn: function(param){  ....  },      【 选择事件回调函数，可选值：函数|函数路径字符串 】",
    "                params: { val: \"test\" }      【 选择事件回调函数参数，可选值：所有类型 】",
    "            } ",
    "            open:{      【 打开事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "                fn: function(param){  ....  },      【 打开事件回调函数，可选值：函数|函数路径字符串 】",
    "                params: { val: \"test\" }      【 打开事件回调函数参数，可选值：所有类型 】",
    "            } ",
    "            close:{      【 关闭事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "                fn: function(param){  ....  },      【 关闭事件回调函数，可选值：函数|函数路径字符串 】",
    "                params: { val: \"test\" }      【 关闭事件回调函数参数，可选值：所有类型 】",
    "            } ",
    "        } ",
    "    },",
    "    ......",
    "]",
    "call: {      【 公共事件回调对象，优先级最低。注意：只会触发优先级高的回调函数 】",
    "    checked:{      【 选择事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "        fn: function(param){  ....  },      【 选择事件回调函数，可选值：函数|函数路径字符串。this：当前tab配置对象 】",
    "        params: { val: \"test\" }      【 选择事件回调函数参数，可选值：所有类型 】",
    "    } ",
    "    open:{      【 打开事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "        fn: function(param){  ....  },      【 打开事件回调函数，可选值：函数|函数路径字符串。this：当前tab配置对象 】",
    "        params: { val: \"test\" }      【 打开事件回调函数参数，可选值：所有类型 】",
    "    } ",
    "    close:{      【 关闭事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "        fn: function(param){  ....  },      【 关闭事件回调函数，可选值：函数|函数路径字符串。this：当前tab配置对象 】",
    "        params: { val: \"test\" }      【 关闭事件回调函数参数，可选值：所有类型 】",
    "    } ",
    "} ",
    "",
    "<h2>○ 返回值：</h2>",
    "id: 该 Part 的 ID",
    "params: 该 Part 的配置对象（调用 build 函数传入的配置对象）",
    "config: CONF对象，需要使用 ui.build.buildModule(CONF) 函数转换成 HTML 代码",
    "tabs: Tab集对象，包含所有Tab配置对象，可通过 tabs.tabID 获得该导航项配置对象",
    "",
    "<h2>○ 使用方式：</h2>",
    "var partObj = ui.part.tabs.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.parts.tabs.getConfig(id);", t3: "标签组ID", t4: "配置参数对象", t5: "获得指定 ID 的标签组配置参数"},
        { t1: "checked", t2: "ui.parts.tabs.tab.checked(id, tabId);", t3: "标签组ID，标签ID", t4: "无", t5: "选择指定 ID 的标签页"},
        { t1: "open", t2: "ui.parts.tabs.tab.open(id, params);", t3: "标签组ID，标签配置参数", t4: "无", t5: "打开（创建）一个新的标签页"},
        { t1: "close", t2: "ui.parts.tabs.tab.close(id, tabId);", t3: "标签组ID，标签ID", t4: "无", t5: "关闭（删除）指定 ID 的标签页"}
    ]
};

window.config.demos = [{
    title: "基础示例",
    height: 350,
    config: {
        id: "tabs_demo_0",
        elements: [
            { id: "my_tab_1", default: true, close: false, title: { text: "标签-1" }, body: { style: "height:200px;", content: "标签-1 页内容！" } },
            { id: "my_tab_2", title: { text: "标签-2" }, body: { style: "height:200px;", content: "标签-2 页内容！" } },
            { id: "my_tab_3", title: { text: "标签-3" }, body: { style: "height:200px;", content: "标签-3 页内容！" } },
            { id: "my_tab_4", title: { text: "标签-4" }, body: { style: "height:200px;", content: "标签-4 页内容！" } },
            { id: "my_tab_5", title: { text: "标签-5" }, body: { style: "height:200px;", content: "标签-5 页内容！" } },
            { id: "my_tab_6", title: { text: "标签-6" }, body: { style: "height:200px;", content: "标签-6 页内容！" } },
            { id: "my_tab_7", title: { text: "标签-7" }, body: { style: "height:200px;", content: "标签-7 页内容！" } }
        ]
    }
}];
