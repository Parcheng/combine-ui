window.config = {};
window.config.info = [
    "模块配置对象（Method）",
    "可通过 ui.config.method.$key = $value 进行修改配置项 ",
];

window.config.fns = {
    header: { t1: "对象结构", t2: "类型", t3: "默认值", t4: "描述" },
    body: [
        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "info.idPrefix", t2: "String", t3: "m_form_", t4: "ID前缀。"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "list.idPrefix", t2: "String", t3: "m_content_", t4: "ID前缀。"},
        { t1: "list.currPage", t2: "Number", t3: "1", t4: "默认初始页码。"},
        { t1: "list.pageSize", t2: "Number", t3: "10", t4: "默认每页显示条数。"},
        { t1: "list.paramsName", t2: "Object", t3: "common.paramsName", t4: "提交参数的参数名配置对象，默认使用公共配置。"},
        { t1: "list.resultPath", t2: "Object", t3: "common.resultPath", t4: "结果对象的数据结构配置对象，默认使用公共配置。"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "content.idPrefix", t2: "String", t3: "m_list_", t4: "ID前缀。"},
        { t1: "content.currPage", t2: "Number", t3: "1", t4: "默认初始页码。"},
        { t1: "content.pageSize", t2: "Number", t3: "10", t4: "默认每页显示条数。"},
        { t1: "content.paramsName", t2: "Object", t3: "common.paramsName", t4: "提交参数的参数名配置对象，默认使用公共配置。"},
        { t1: "content.resultPath", t2: "Object", t3: "common.resultPath", t4: "结果对象的数据结构配置对象，默认使用公共配置。"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "form.idPrefix", t2: "String", t3: "m_form_", t4: "ID前缀。"},
        { t1: "form.currPage", t2: "Number", t3: "1", t4: "默认初始页码。"},
        { t1: "form.pageSize", t2: "Number", t3: "10", t4: "默认每页显示条数。"},
        { t1: "form.paramsName", t2: "Object", t3: "common.paramsName", t4: "提交参数的参数名配置对象，默认使用公共配置。"},
        { t1: "form.resultPath", t2: "Object", t3: "common.resultPath", t4: "结果对象的数据结构配置对象，默认使用公共配置。"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "window.idPrefix", t2: "String", t3: "m_windows_", t4: "ID前缀。"},
        { t1: "window.currPage", t2: "Number", t3: "1", t4: "默认初始页码。"},
        { t1: "window.pageSize", t2: "Number", t3: "10", t4: "默认每页显示条数。"},
        { t1: "window.paramsName", t2: "Object", t3: "common.paramsName", t4: "提交参数的参数名配置对象，默认使用公共配置。"},
        { t1: "window.resultPath", t2: "Object", t3: "common.resultPath", t4: "结果对象的数据结构配置对象，默认使用公共配置。"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "table.idPrefix", t2: "String", t3: "m_table_", t4: "ID前缀。"},
        { t1: "table.addWindowName", t2: "String", t3: "add", t4: "默认新增数据的弹窗名称。"},
        { t1: "table.updateWindowName", t2: "String", t3: "update", t4: "默认修改数据的弹窗名称。"},
        { t1: "table.currPage", t2: "Number", t3: "1", t4: "默认初始页码。"},
        { t1: "table.pageSize", t2: "Number", t3: "10", t4: "默认每页显示条数。"},
        { t1: "table.paramsName", t2: "Object", t3: "common.paramsName", t4: "提交参数的参数名配置对象，默认使用公共配置。"},
        { t1: "table.resultPath", t2: "Object", t3: "common.resultPath", t4: "结果对象的数据结构配置对象，默认使用公共配置。"},
    ]
};