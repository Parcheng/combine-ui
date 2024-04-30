window.config = {};
window.config.info = [
    "组件配置对象（Part）",
    "可通过 ui.config.part.$key = $value 进行修改配置项 ",
];

window.config.fns = {
    header: { t1: "对象结构", t2: "类型", t3: "默认值", t4: "描述" },
    body: [
        { t1: "window.idPrefix", t2: "String", t3: "p_window_", t4: "弹窗ID前缀。"},
        { t1: "window.bgIdPrefix", t2: "String", t3: "p_window_", t4: "弹窗灰色背景的Id前缀"},
        { t1: "window.bodyIdPrefix", t2: "String", t3: "p_window_", t4: "弹窗内容体的Id前缀"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "form.idPrefix", t2: "String", t3: "p_forms_", t4: "表单组ID前缀。"},
        { t1: "form.elementIdPrefix", t2: "String", t3: "p_form_", t4: "表单项ID前缀。"},
        { t1: "form.elementNamePrefix", t2: "String", t3: "p_element_", t4: "表单项Name前缀。"},
        { t1: "form.helpMsgName",t2:  "String", t3: "p_form_help_msg", t4: "表单帮助信息Name。"},
        { t1: "form.errorMsgName", t2: "String", t3: "p_form_error_msg", t4: "表单错误信息Name。"},
        { t1: "form.fileNameSuffix", t2: "String", t3: "File", t4: "表单文件上传项Name前缀。"},
        { t1: "form.fileReturnDataPath", t2: "String", t3: "data", t4: "表单文件上传项路径文本返回值路径。"},
        { t1: "form.filePathNameSuffix", t2: "String", t3: "Text", t4: "表单文件上传文本项Name前缀。"},
        { t1: "form.fileBrowseButtonName", t2: "String", t3: "浏览", t4: "表单文件上传项浏览按钮Name。"},
        { t1: "form.fileUploadButtonName", t2: "String", t3: "上传", t4: "表单文件上传项上次按钮Name。"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "grid.idPrefix", t2: "String", t3: "p_grid_", t4: "网格组ID前缀。"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "drawBoard.toolIdPrefix", t2: "String", t3: "p_draw_", t4: "画板工具栏ID前缀"},
        { t1: "drawBoard.drawIdPrefix", t2: "String", t3: "p_draw_shapes_", t4: "画板中图形画布ID前缀"},
        { t1: "drawBoard.shapeIdPrefix", t2: "String", t3: "p_draw_shape_", t4: "画板中图形ID前缀"},
        { t1: "drawBoard.connectIdPrefix", t2: "String", t3: "p_draw_connect_", t4: "画板中连接线ID前缀"},
        { t1: "drawBoard.connectLineIdPrefix", t2: "String", t3: "p_draw_connect_line_", t4: ""},
        { t1: "drawBoard.stratGap", t2: "Number", t3: "6", t4: "画板中图形右边的连接起始点与图形的间距。"},
        { t1: "drawBoard.endGap", t2: "Number", t3: "6", t4: "画板中图形左边的连接结束点与图形的间距。"},
        { t1: "drawBoard.allowNum", t2: "Number", t3: "15", t4: "画板中图形连接点在与连线连接时的判定范围。"},
        { t1: "drawBoard.connectPointText", t2: "String", t3: ">", t4: "画板中图形连接点的显示文本（图形）。"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "svg.idPrefix", t2: "String", t3: "p_svg_", t4: "SVG模块ID前缀。"},
        { t1: "svg.elementNamePrefix", t2: "String", t3: "p_svg_element_", t4: "SVG模块的子元素ID前缀。"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "buttons.idPrefix", t2: "String", t3: "p_button_", t4: "按钮组ID前缀。"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "lineMap.idPrefix", t2: "String", t3: "p_lineMap_", t4: ""},
        { t1: "lineMap.lineIdPrefix", t2: "String", t3: "p_lineMap_line_", t4: ""},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "custom.idPrefix", t2: "String", t3: "p_custom_", t4: "自定义模块的ID前缀。"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "table.idPrefix", t2: "String", t3: "p_custom_", t4: "表格模块的ID前缀。"},
        { t1: "table.checkIdPrefix", t2: "String", t3: "p_tr_check_", t4: "表格模块的选择框ID前缀。"},
        { t1: "table.checkAllIdPrefix", t2: "String", t3: "p_tr_checkAll_", t4: "表格模块的全选框ID前缀。"},
        { t1: "table.colNamePrefix", t2: "String", t3: "p_table_key_", t4: "表格模块的列标签ID前缀。"},
        { t1: "table.rowNamePrefix", t2: "String", t3: "p_table_row_", t4: "表格模块的行标签ID前缀。"},
        { t1: "table.defaultRowCount", t2: "Number", t3: "15", t4: "表格模块的默认数据最大显示条数。"},
        { t1: "table.defaultHeaderAlign", t2: "String", t3: "center", t4: "表格表头默认对其方式，默认居中。可选值：left|center|right。"},
        { t1: "table.defaultBodyAlign", t2: "String", t3: "left", t4: "表格内容默认对其方式，默认左对齐。可选值：left|center|right。"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "tabs.idPrefix", t2: "String", t3: "p_tabs_", t4: "Tab标签组的ID前缀。"},
        { t1: "tabs.tabNamePrefix", t2: "String", t3: "p_tab_", t4: "Tab标签的ID前缀。"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "page.idPrefix", t2: "String", t3: "p_page_", t4: "页码条的ID前缀。"},
        { t1: "page.lastText", t2: "String", t3: " < ", t4: "页码条的上一页标识文本。"},
        { t1: "page.nextText", t2: "String", t3: " > ", t4: "页码条的下一页的标识文本。"},
        { t1: "page.firstlyText", t2: "String", t3: "首页", t4: "页码条的首页标识文本。"},
        { t1: "page.finallyText", t2: "String", t3: "末页", t4: "页码条的末页的标识文本。"},
        { t1: "page.toText", t2: "String", t3: "跳转到", t4: "页码条的跳转页标识文本。"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "nav.idPrefix", t2: "String", t3: "p_nav_", t4: "导航模块ID前缀。"},        
        { t1: "nav.listIdPrefix", t2: "String", t3: "p_nav_list_", t4: "导航列表ID前缀。"},
        { t1: "nav.groupIdPrefix", t2: "String", t3: "p_nav_group_", t4: "导航组ID前缀。"},
        { t1: "nav.nodeIdPrefix", t2: "String", t3: "p_nav_node_", t4: "导航项的ID前缀。"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "content.idPrefix", t2: "String", t3: "p_content_", t4: "内容模块ID前缀。"},
        { t1: "content.operationNamePrefix", t2: "String", t2: "p_operation_", t4: "内容操作项的Name前缀。"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "list.idPrefix", t2: "String", t3: "p_list_", t4: "列表模块的ID前缀。"},
        { t1: "list.itemNamePrefix", t2: "String", t3: "p_list_item_", t4: "列表项的ID前缀。"},

        { t1: "", t2: "", t3: "", t4: ""},
        { t1: "tree.idPrefix", t2: "String", t3: "p_tree_", t4: "树形模块ID前缀。"},
        { t1: "tree.itemNamePrefix", t2: "String", t3: "p_tree_item_", t4: "树形模块的叶子节点Name前缀。"},
    ]
};