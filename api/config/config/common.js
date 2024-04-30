window.config = {};
window.config.info = [
    "公共配置对象（Common）",
    "可通过 ui.config.common.$key = $value 进行修改配置项 ",
    "可通过 ui.config.common.$key = $value 进行修改配置项 ",
];

window.config.fns = {
    header: { t1: "对象结构", t2: "类型", t3: "默认值", t4: "描述" },
    body: [
        { t1: "common.request", t2: "Object", t3: "-", t4: "提交请求配置对象。"},
        { t1: "common.request.type", t2: "String", t3: "POST", t4: "请求类型。"},
        { t1: "common.request.contentType", t2: "String", t3: "无", t4: "请求参数类型。"},
        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "common.paramsName", t2: "Object", t3: "-", t4: "提交参数的参数名配置对象。"},
        { t1: "common.paramsName.currPage", t2: "String", t3: "page", t4: "当前页参数名称。"},
        { t1: "common.paramsName.pageShowSize", t2: "String", t3: "pageSize", t4: "每页条数参数名称。"},
        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "common.resultPath.", t2: "Object", t3: "-", t4: "结果对象的数据结构配置对象。"},
        { t1: "common.resultPath.success", t2: "String", t3: "success", t4: "结果对象的成功标识参数结构。"},
        { t1: "common.resultPath.currPage", t2: "String", t3: "data.page", t4: "结果对象的当前页参数结构。"},
        { t1: "common.resultPath.maxPage", t2: "String", t3: "data.maxPage", t4: "结果对象的最大页参数结构。"},
        { t1: "common.resultPath.maxCount", t2: "String", t3: "data.maxCount", t4: "结果对象的数据最大条数参数结构。"},
        { t1: "common.resultPath.data", t2: "String", t3: "data", t4: "结果对象的对象数据参数结构。"},
        { t1: "common.resultPath.listData", t2: "String", t3: "data.data", t4: "结果对象的数组数据参数结构。"},
        { t1: "common.resultPath.msg", t2: "String", t3: "errMsg", t4: "结果对象的成功消息参数结构。"},
        { t1: "common.resultPath.errMsg", t2: "String", t3: "errMsg", t4: "结果对象的错误消息参数结构。"},
    ]
};


