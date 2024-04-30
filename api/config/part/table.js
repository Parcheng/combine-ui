window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"table_demo_0\",    【 该Part的ID，可通过 getConfig() 获取配置参数对象等 】",
    "align: \"center\",    【 表头对其方式，默认center。可选值：left|center|right 】",
    "bodyAlign: \"left\",    【 表单内容对其方式，默认left。可选值：left|center|right 】",
    "dblclick: true,    【 表格行是否支持双击事件，默认false 】",
    "showIndex: true,    【 是否显示计数列，默认false 】",
    "showCheck: true,    【 是否显示多选，默认false 】",
    "header: {      【 表格列名定义 】",
    "    t1: \"TEST-1\", t2: \"TEST-2\", t3: \"TEST-3\", t4: \"TEST-4\" ",
    "},",
    "operations: {    【 操作栏配置对象，在表格每行末尾一列显示操作按钮 】",
    "    test: {    【 对象名称可自由定义 】",
    "        name: \"测试\",    【 操作项名称 】",
    "        fn: function(){ ... }    【 操作项单击事件，可选值：函数|函数路径字符串。this：{ tableId: 表格ID, index: 行索引, data: 当前行数据, operation: 当前operation配置对象 } 】",
    "        params: { ... }    【 操作项单击事件参数 】",
    "    },",
    "},",
    "body: [    【 表格数据定义，数组每一条数据表示一行。注意：每行属性名必须与header中配置的属性名相对应 】",
    "    { t1: \"ROW-1, COL-1\", t2: \"ROW-1, COL-2\", t3: \"ROW-1, COL-3\", t4: \"ROW-1, COL-4\" }, ",
    "    ...... ",
    "] ",
    "call: {      【 事件回调对象 】",
    "    dblclick:{      【 行双击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "        fn: function(param){  ....  },      【 行双击事件回调函数，可选值：函数|函数路径字符串。this：{ tableId: 表格ID, index: 行索引, data: 当前行数据 } 】",
    "        params: { val: \"test\" }      【 行双击事件回调函数参数，可选值：所有类型 】",
    "    } ",
    "} ",
    "",
    "<h2>○ 返回值：</h2>",
    "id: 该 Part 的 ID",
    "params: 该 Part 的配置对象（调用 build 函数传入的配置对象）",
    "config: CONF对象，需要使用 ui.build.buildModule(CONF) 函数转换成 HTML 代码",
    "",
    "<h2>○ 使用方式：</h2>",
    "var partObj = ui.part.table.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.parts.table.getConfig(id);", t3: "ID", t4: "配置参数对象", t5: "获得指定 ID 的 Table 配置参数" },
        { t1: "getChecked", t2: "ui.parts.table.getChecked(id);", t3: "ID", t4: "配置参数对象", t5: "获得指定 ID 的 Table 中所有选中行的数据" },
        { t1: "removeChecked", t2: "ui.parts.table.removeChecked(id);", t3: "ID", t4: "配置参数对象", t5: "删除指定 ID 的 Table 中所有选中行" },
        { t1: "col.add", t2: "ui.parts.table.col.add(id, arr, index);", t3: "ID，列索引，列数据，列索引", t4: "无", t5: "未实现，对指定 ID 的表格，在指定列索引位置插入一列" },
        { t1: "col.remove", t2: "ui.parts.table.col.remove(id, key);", t3: "ID，列Key值", t4: "无", t5: "对指定 ID 的表格，删除掉指定 Key 的列" },
        { t1: "row.click", t2: "ui.parts.table.row.click(id, index);", t3: "ID，行索引", t4: "无", t5: "对指定 ID 的表格，触发指定行索引的单击事件" },
        { t1: "row.check", t2: "ui.parts.table.row.check(id, status, index);", t3: "ID，选择状态，行索引", t4: "无", t5: "对指定 ID 的表格，修改指定行索引的选择状态（status:true,false,'auto'）" },
        { t1: "row.operation", t2: "ui.parts.table.row.operation(id, index, key);", t3: "ID，行索引，按钮Key", t4: "无", t5: "对指定 ID 的表格，触发指定操作按钮单击事件" },
        { t1: "row.add", t2: "ui.parts.table.row.add(id, data, index);", t3: "ID，要添加的数据，行索引", t4: "无", t5: "对指定 ID 的表格，在指定行索引位置插入一行，默认在首行插入" },
        { t1: "row.remove", t2: "ui.parts.table.row.remove(id, index);", t3: "ID，行索引", t4: "无", t5: "对指定 ID 的表格，删除指定行" },
        { t1: "row.getData", t2: "ui.parts.table.row.getData(id, index);", t3: "ID，行索引", t4: "无", t5: "对指定 ID 的表格，获得指定行的数据" },
        { t1: "row.setData", t2: "ui.parts.table.row.setData(id, data, index);", t3: "ID，要设置的数据（对象/对象数组），行索引", t4: "无", t5: "对指定 ID 的表格，修改/设置指定行的数据，不设置 index 则替换所有行的数据" }
    ]
};

window.config.demos = [{
    title: "基本示例",
    height: 350,
    config: {
        id: "table_demo_0",
        align: "left",
        bodyAlign: "left",
        dblclick: true,
        showIndex: true,
        showCheck: true,
        header: { t1: "TEST-1", t2: "TEST-2", t3: "TEST-3", t4: "TEST-4" },
        operations: {
            update: { name: "修改", fn: function(){ alert("编辑被点击！索引：" + this.index) } },
            del: { name: "删除", fn: function(){ alert("删除被点击！索引：" + this.index) } }
        },
        body: [
            { t1: "ROW-1, COL-1", t2: "ROW-1, COL-2", t3: "ROW-1, COL-3", t4: "ROW-1, COL-4" },
            { t1: "ROW-2, COL-1", t2: "ROW-2, COL-2", t3: "ROW-2, COL-3", t4: "ROW-2, COL-4" },
            { t1: "ROW-3, COL-1", t2: "ROW-3, COL-2", t3: "ROW-3, COL-3", t4: "ROW-3, COL-4" },
            { t1: "ROW-4, COL-1", t2: "ROW-4, COL-2", t3: "ROW-4, COL-3", t4: "ROW-4, COL-4" },
            { t1: "ROW-5, COL-1", t2: "ROW-5, COL-2", t3: "ROW-5, COL-3", t4: "ROW-5, COL-4" }
        ],
        call: {
            dblclick: {
                fn: function (params) { console.log(this) },
                params: { val: "test" }
            }
        }
    }
}];
