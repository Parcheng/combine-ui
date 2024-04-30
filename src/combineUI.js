window.ui = (function (parts, modules, page, build, common, config) {

    var uiName = "ui";
    var config = new config();
    var commonUtil = new common();
    var buildUtil = new build(commonUtil);
    var parts = new parts(uiName, buildUtil, commonUtil, config);
    var modules = new modules(uiName, buildUtil, commonUtil, parts, config);
    var page = new page(buildUtil, commonUtil, parts, modules, config);
    var custom = {};

    return {
        build: buildUtil,
        parts: parts,
        modules: modules,
        page: page,
        common: commonUtil,
        config: config,
        custom: custom
    };
})(
    // parts obj ---------------------------------------------------------------------------------
    function (uiName, buildUtil, common, config) {

        var partIdPrefix = "P";
        var setting = config.part;
        var pageWidth = document.body.scrollWidth;
        var pageHeight = document.body.scrollHeight;
        var partCommon = {
            getCurr: function (id, partData) {
                var curr = partData["part" + id];
                if (curr) return curr;
            },
            getConfig: function (id, partData) {
                var curr = partData["part" + id];
                if (curr) return curr.params;
            },
            initCall: function (base, eventArr) {
                if (base) {
                    for (var eventIndex = 0; eventIndex < eventArr.length; eventIndex++) {
                        var eventName = eventArr[eventIndex];
                        var call = base.call;
                        if (!call) call = base.call = {};
                        var currEvent = call[eventName];
                        if (typeof currEvent === "function") call[eventName] = { fn: currEvent };
                        else if (common.is.Object(currEvent)) call[eventName] = { fn: currEvent.fn, params: currEvent.params };
                        else call[eventName] = {};
                    }
                }
            },
            initItemCall: function (base, defaultCall, eventArr) {
                if (base) {
                    for (var eventIndex = 0; eventIndex < eventArr.length; eventIndex++) {
                        var eventName = eventArr[eventIndex];
                        var call = base.call;
                        if (!call) call = base.call = {};
                        var currEvent = call[eventName] ? call[eventName] : defaultCall[eventName];
                        if (typeof currEvent === "function") call[eventName] = { fn: currEvent };
                        else if (common.is.Object(currEvent)) call[eventName] = { fn: currEvent.fn, params: currEvent.params };
                        else call[eventName] = {};

                    }
                }
            },
            buildBody: function (element, params) {
                if (common.is.Array(params)) element.children = params;
                else if (common.is.String(params)) element.text = params;
                else if (common.is.Object(params)) element.children = [params];
                else element.text = "";
            }
        }
        var commonStyle = {
            align: "p-align-",
            colorGread: "p-color-gread-",
            none: "p-none",
        }

        function windowObj() {

            var currSetting = setting.window;
            // var idPrefix = setting.window.idPrefix;
            // var bgIdPrefix = setting.window.bgIdPrefix;
            // var bodyIdPrefix = setting.window.bodyIdPrefix;

            var windowData = {}
            var windowConfig = {
                name: "div",
                properties: { class: "p-window" },
                children: [{
                    name: "div", properties: { class: "p-header" },
                    children: [
                        { name: "div", properties: { class: "p-left" }, text: "" },
                        { name: "div", properties: { class: "p-right" }, children: [{ name: "span", properties: {}, text: " x " }] }]
                }, { name: "div", properties: { class: "p-body" }, children: [] }]
            }
            var windowBgConfig = { name: "div", properties: { class: "p-window-bg" } };

            var windowFn = {
                getConfig: function (id) {
                    return partCommon.getConfig(id, windowData);
                },
                drag: function (id) {
                    var curr = windowData["part" + id];
                    if (curr) {
                        var event = window.event || arguments.callee.caller.arguments[0];
                        var pageX = event.pageX;
                        var pageY = event.pageY;

                        var curr = $("#" + currSetting.idPrefix + id);
                        var currMarginTop = parseInt(curr.css("top"));
                        var currMarginLeft = parseInt(curr.css("left"));
                        var currWidth = curr.width();
                        var currHeight = curr.height();

                        var lastNewMarginTop = undefined;
                        var lastNewMarginLeft = undefined
                        var mousemoveFn = function (e) {
                            var moveX = e.pageX;
                            var moveY = e.pageY;
                            var newMarginTop = currMarginTop + (moveY - pageY);
                            var newMarginLeft = currMarginLeft + (moveX - pageX);

                            lastNewMarginTop = newMarginTop;
                            lastNewMarginLeft = newMarginLeft;
                            curr.css("top", newMarginTop);
                            curr.css("left", newMarginLeft);
                        }
                        curr.bind("mousemove", mousemoveFn);

                        var mouseupFn = function (e) {
                            curr.unbind("mousemove mouseup");
                        }
                        curr.bind("mouseup", mouseupFn);
                    }
                },
                open: function (id) {
                    var curr = windowData["part" + id];
                    if (!curr) {
                        alert(id + " window is nonentity!");
                    } else {
                        var params = curr.params;
                        var openCallFn = params.call.open.fn;
                        var openCallFnParams = params.call.open.params;
                        $("#" + currSetting.idPrefix + id).css("display", "block");
                        $("#" + currSetting.bgIdPrefix).css("display", "block");
                        common.callFn(window.ui, openCallFn, openCallFnParams, curr);
                    }
                },
                verify: function (id) {
                    var returnObj = false;
                    var curr = windowData["part" + id];
                    if (curr) {
                        var params = curr.params;
                        var callFn = params.call.verify.fn;
                        var callFnParams = params.call.verify.params;
                        common.callFn(window.ui, callFn, callFnParams, curr);
                        returnObj = $("#" + currSetting.idPrefix + id);
                    }
                    return returnObj;
                },
                close: function (id) {
                    var curr = windowData["part" + id];
                    if (!curr) {
                        alert(id + " window is nonentity!");
                    } else {
                        var params = curr.params;
                        var callFn = params.call.close.fn;
                        var callFnParams = params.call.close.params;
                        $("#" + currSetting.idPrefix + id).css("display", "none");
                        $("#" + currSetting.bgIdPrefix).css("display", "none");
                        common.callFn(window.ui, callFn, callFnParams, curr);
                    }
                },
                change: function (id, properties, style, other) {
                    var curr = windowData["part" + id];
                    if (!curr) {
                        alert(id + " window is nonentity!");
                    } else {
                        var params = curr.params
                        if (!params.properties) params.properties = {};
                        if (!params.other) params.other = {};
                        var windowDom = $("#" + currSetting.idPrefix + params.id);
                        if (properties) {
                            for (var propertiesKey in properties) {
                                if (properties.hasOwnProperty(propertiesKey)) {
                                    var property = properties[propertiesKey];
                                    windowDom.attr(propertiesKey, property);
                                    params.properties[propertiesKey] = property;
                                }
                            }
                        }
                        if (other) {
                            for (var otherKey in other) {
                                if (other.hasOwnProperty(otherKey)) {
                                    var otherValue = other[otherKey];
                                    params.other[otherKey] = otherValue;
                                }
                            }
                        }
                        if (style && style.length > 0) {
                            style = style.replace(/(\s*$)/g, "");
                            var lastChar = style.charAt(style.length - 1);
                            if (lastChar != ";") style += ";";

                            var oldStyle = windowDom.attr("style");
                            oldStyle = oldStyle ? oldStyle : "";

                            windowDom.attr("style", style + oldStyle);
                        }
                    }
                },
                getConfig(id) {
                    var curr = windowData["part" + id];
                    if (curr) return curr.params;
                }
            }

            function build(params) {

                var id = params.id;
                var style = params.style;
                var title = params.title;
                var bodyConfig = params.body;

                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                if (common.isEmpty(title)) title = " ";
                partCommon.initCall(params, ["open", "close", "verify"]);

                var exterior = common.deepCopy(windowConfig);
                exterior.properties.id = currSetting.idPrefix + id;
                if (style) exterior.properties.style = style;

                var header = exterior.children[0];
                header.properties.onmousedown = uiName + ".parts.window.drag('" + id + "')";
                header.children[0].text = title;
                header.children[1].children[0].properties.onclick = uiName + ".parts.window.close('" + id + "')";

                var body = exterior.children[1];
                body.properties.id = currSetting.bodyIdPrefix + id;
                partCommon.buildBody(body, bodyConfig);

                if (!document.getElementById(currSetting.bgIdPrefix)) {
                    var windowBgElement = common.deepCopy(windowBgConfig);
                    windowBgElement.properties.id = currSetting.bgIdPrefix;
                    var windowBgHtml = buildUtil.buildModule(windowBgElement);
                    $(document.body).append(windowBgHtml);
                }

                return windowData["part" + id] = {
                    id: id,
                    params: params,
                    config: exterior
                }
            }

            return {
                build: build,
                drag: windowFn.drag,
                open: windowFn.open,
                verify: windowFn.verify,
                close: windowFn.close,
                change: windowFn.change,
                getConfig: windowFn.getConfig
            }
        }

        function formObj() {

            var currSetting = setting.form;
            // var helpMsgName = setting.form.helpMsgName;
            // var errorMsgName = setting.form.errorMsgName;
            // var idPrefix = setting.form.idPrefix;
            // var elementIdPrefix = setting.form.elementIdPrefix;
            // var elementNamePrefix = setting.form.elementNamePrefix;
            // var fileNameSuffix = setting.form.fileNameSuffix;
            // //var fileReturnDataPath = setting.form.fileReturnDataPath;
            // var filePathNameSuffix = setting.form.filePathNameSuffix;
            // var fileBrowseButtonName = setting.form.fileBrowseButtonName;
            // var fileUploadButtonName = setting.form.fileUploadButtonName;

            var formData = {};
            var formElementData = {};
            var formsConfig = { name: "form", properties: { class: "p-forms" }, children: [] };
            var formColConfig = { name: "div", properties: { class: "p-col" }, children: [] };
            var formConfig = {
                name: "div",
                properties: { class: "p-form" },
                children: [
                    { name: "div", properties: { class: "p-title" }, text: "" },
                    { name: "div", properties: { class: "p-element" }, children: [] },
                    { name: "div", properties: { class: "p-error-msg", name: currSetting.errorMsgName, style: "display:none" }, text: "" },
                    { name: "div", properties: { class: "p-help-msg", name: currSetting.helpMsgName, style: "display:none" }, text: "" }
                ]
            }
            var elementsConfig = {
                input: { name: "input", properties: {}, text: "" },
                select: { name: "select", properties: {}, children: [] },
                option: { name: "option", properties: {}, text: "" },
                textarea: { name: "textarea", properties: {}, text: "" },
                span: { name: "span", properties: {}, text: "" },
                file: {
                    name: "div", properties: { class: "p-element-file" }, children: [
                        { name: "input", properties: { type: "text" } },
                        { name: "input", properties: { type: "file", style: "display:none" } },
                        { name: "span", properties: {}, text: "" },
                        { name: "span", properties: {}, text: "" },
                    ]
                }
            }

            var formFn = {
                getConfig: function (id) {
                    return partCommon.getConfig(id, formData);
                },
                submit: function (id, properties) {
                    var formObj = formData["part" + id];
                    if (formObj) {
                        var dom = $("#" + currSetting.idPrefix + id);
                        if (properties) {
                            for (var propertyKey in properties)
                                if (properties.hasOwnProperty(propertyKey))
                                    dom.attr(propertyKey, properties[propertyKey]);
                        }
                        dom.submit();
                        common.callFn(window.ui, formObj.call.submit.fn, formObj.call.submit.params, curr);
                    }
                },
                setData: function (id, data) {
                    var formObj = formData["part" + id];
                    var elements = formObj.params.elements;
                    for (var index = 0; index < elements.length; index++) {
                        var element = elements[index];
                        setElementData(id, element, data[element.key]);
                    }
                },
                getData: function (id) {
                    var formObj = formData["part" + id];
                    var elements = formObj.params.elements;
                    var data = {};
                    for (var index = 0; index < elements.length; index++) {
                        var element = elements[index];
                        getElementData(id, element, data);
                    }
                    return data;
                },
                removeData: function (id) {
                    var formObj = formData["part" + id];
                    var elements = formObj.params.elements;
                    for (var index = 0; index < elements.length; index++) {
                        var element = elements[index];
                        removeElementData(id, element);
                    }
                },
                initData: function (id) {
                    var formObj = formData["part" + id];
                    var elements = formObj.params.elements;
                    for (var index = 0; index < elements.length; index++) {
                        var element = elements[index];
                        initElementData(id, element);
                    }
                },
                verifyData: function (id) {
                    var currData = this.getData(id);
                    var result = {
                        total: true,
                        data: currData,
                        verifys: {}
                    };
                    var formObj = formData["part" + id];
                    var elements = formObj.params.elements;
                    for (var index = 0; index < elements.length; index++) {
                        var element = elements[index];

                        var ifResult;
                        if (element.if) {
                            var ifResultData = ifCommandFn.getIfResult(id, element.key);
                            ifResult = ifResultData[element.key];
                        }

                        if (!common.isEmpty(element.verify) && (ifResult == undefined || ifResult == true)) {
                            var currResult = verify(element.verify, currData[element.key]);
                            if (currResult == false) result.total = false;
                            result.verifys[element.key] = currResult;

                            if (element.error) {
                                var tabName = currSetting.elementNamePrefix + id + "_" + element.key;
                                var errorDom = $("*[name='" + tabName + "']").parent().siblings("*[name='" + currSetting.errorMsgName + "']");
                                if (currResult == false) errorDom.css("display", "block");
                                else errorDom.css("display", "none");
                            }
                        }
                    }
                    return result;
                },
                showHelpMsg: function (id, operationType) {
                    var msgName = currSetting.helpMsgName;

                    var dom = $("#" + currSetting.idPrefix + id).find("*[name='" + msgName + "']");
                    if (operationType == true || operationType == "show") dom.css("display", "block");
                    else if (operationType == false || operationType == "hide") dom.css("display", "none");
                    else if (operationType == "auto") dom.css("display", dom.css("display") == "none" ? "block" : "none");
                    else console.log("Your operation type param is wrong, Plase put in 'show' or 'hide'!");
                },
                command: function (id, commandkeys) {
                    var formObj = formData["part" + id];
                    var elements = formObj.params.elements;

                    var results = ifCommandFn.getIfResult(id, commandkeys);
                    for (var key in results) {
                        if (results.hasOwnProperty(key)) {
                            var result = results[key];
                            var tabName = currSetting.elementNamePrefix + id + "_" + key;
                            if (result == true) $("*[name='" + tabName + "']").parents(".p-form").css("display", "inline-block");
                            else $("*[name='" + tabName + "']").parents(".p-form").css("display", "none");
                        }
                    }
                }
            }
            var formElementFn = {
                setDom: function (id, key, element) {
                    var formObj = formData["part" + id];
                    if (formObj) {
                        var oldElement = formObj.elements["element" + key];
                        if (oldElement) {
                            var title = element.title;
                            var helpMsg = element.help ? element.help : "";
                            var errorMsg = element.error ? element.error : "";

                            var formItemDom = $("[id='" + currSetting.elementIdPrefix + id + "_" + key + "']");
                            formItemDom.children(".p-title").html(title);
                            formItemDom.children(".p-element").html(buildUtil.buildModule(buildElement(id, element)));
                            formItemDom.children(".p-error-msg").html(errorMsg);
                            formItemDom.children(".p-help-msg").html(helpMsg);
                            formObj.elements["element" + key] = element;
                        }
                    }
                },
                setData: function (id, key, data) {
                    var formObj = formData["part" + id];
                    if (formObj) {
                        var element = formObj.elements["element" + key];
                        if (element && data) setElementData(id, element, data);
                    }
                },
                initData: function (id, key) {
                    var formObj = formData["part" + id];
                    if (formObj) {
                        var element = formObj.elements["element" + key];
                        if (element && data) initElementData(id, element);
                    }
                },
                getData: function (id, key) {
                    var formObj = formData["part" + id];
                    if (formObj) {
                        var data = {};
                        var element = formObj.elements["element" + key];
                        if (element && data) getElementData(id, element, data);
                        return data[key];
                    }
                },
                removeData: function (id, key) {
                    var formObj = formData["part" + id];
                    if (formObj) {
                        var data = {};
                        var element = formObj.elements["element" + key];
                        if (element && data) removeElementData(id, element);
                    }
                },
                file: {
                    checked: function (id, key) {
                        var tabName = currSetting.elementNamePrefix + id + "_" + key;
                        var fileTabName = tabName + currSetting.fileNameSuffix;
                        var filePathTabName = tabName + currSetting.filePathNameSuffix;
                        $("input[name='" + filePathTabName + "']").val($("#" + fileTabName).val());
                    },
                    browse: function (id, key) {
                        var tabName = currSetting.elementNamePrefix + id + "_" + key + currSetting.fileNameSuffix;
                        $("[id='" + tabName + "']").trigger("click");
                    },
                    upload: function (id, key, url, fileKey) {
                        var curr = formData["part" + id];
                        if (curr) {
                            var currElement = curr.elements["element" + key];
                            if (currElement) {
                                if (!fileKey) fileKey = key;
                                var tabName = currSetting.elementNamePrefix + id + "_" + key + currSetting.fileNameSuffix;
                                var fileDom = $("[id='" + tabName + "']");
                                fileDom.attr("id", fileKey);
                                fileDom.attr("name", fileKey);
                                common.ajaxFileUpload(fileKey, undefined, url,
                                    function (data) {
                                        if (!currElement.call) currElement.call = {};
                                        var uploadCall = currElement.call.upload
                                        if (currElement.upload) uploadCall = currElement.upload;
                                        if (uploadCall) {
                                            if (!currElement.formId) currElement.formId = id;
                                            console.log(currElement);
                                            common.callFn(window.ui, uploadCall, data, currElement);
                                        }
                                    },
                                    function () {
                                        console.log("FormID: " + id + " key: " + key + ": An error occurred while uploading.");
                                    }
                                )
                                fileDom = $("#" + fileKey);
                                fileDom.attr("id", tabName);
                                fileDom.attr("name", tabName);
                            }
                        }
                    },
                }
            }

            function verify(verify, data) {
                var result = false;
                var valueArr = verify.split("_");

                if (verify == "NO_NULL") {
                    result = !common.isEmpty(data);
                } else if (valueArr.length == 2) {
                    var type = valueArr[0];
                    var value = valueArr[1];
                    if (type == "GTE") result = parseInt(data) >= parseInt(value);
                    else if (type == "GT") result = parseInt(data) > parseInt(value);
                    else if (type == "LTE") result = parseInt(data) <= parseInt(value);
                    else if (type == "LT") result = parseInt(data) < parseInt(value);
                    else if (type == "E") result = data == value;
                } else if (valueArr.length == 3 && valueArr[0] == "LENGTH") {
                    var type = valueArr[1];
                    var value = valueArr[2];
                    if (type == "GTE") result = data.length >= parseInt(value);
                    else if (type == "GT") result = data.length > parseInt(value);
                    else if (type == "LTE") result = data.length <= parseInt(value);
                    else if (type == "LT") result = data.length < parseInt(value);
                    else if (type == "E") result = data.length == parseInt(value);
                }
                return result;
            }

            function setElementData(id, element, elementValue) {
                if (element.isSubmit != false) {
                    var tabName = currSetting.elementNamePrefix + id + "_" + element.key;
                    //var elementValue = data[element.key];

                    if (elementValue) {
                        if (element.type == "text" || element.type == "password" || element.type == "hidden")
                            $("input[name='" + tabName + "']").val(elementValue);
                        else if (element.type == "file")
                            $("input[name='" + tabName + currSetting.filePathNameSuffix + "']").val(elementValue);
                        else if (element.type == "date" || element.type == "datetime" || element.type == "time") {
                            if (isNumber(elementValue)) {
                                var formatStr = "yyyy-MM-dd";
                                if (element.type == "datetime") formatStr = "yyyy-MM-dd hh:mm:ss";
                                else if (element.type == "time") formatStr = "hh:mm:ss";
                                elementValue = dateFormat(new Date(elementValue), formatStr);
                            }
                            $("input[name='" + tabName + "']").val(elementValue);
                        }
                        else if (element.type == "radio") {
                            elementValue = elementValue + "";
                            $("input:radio[name='" + tabName + "']:checked").prop("checked", false);
                            $("input:radio[name='" + tabName + "']").each(function () {
                                if ($(this).val() == elementValue) {
                                    $(this).prop("checked", true);
                                    return;
                                }
                            });
                        }
                        else if (element.type == "checkbox") {
                            $("input:checkbox[name='" + tabName + "']:checked").prop("checked", false);
                            $("input:checkbox[name='" + tabName + "']").each(function () {
                                var checkboxValue = [];
                                if (elementValue instanceof Array) checkboxValue = elementValue;
                                else checkboxValue.push(elementValue.toString());
                                if (checkboxValue.length > 0 && checkboxValue.indexOf(thisValue) != -1)
                                    $(this).prop("checked", true);
                            });
                        }
                        else if (element.type == "select") {
                            // var selectKeyArr = element.key.split(",");
                            // elementValue = data[selectKeyArr[0]];
                            $("select[name='" + tabName + "'] option:first").prop("selected", 'selected');
                            $("select[name='" + tabName + "'] option").each(function () {
                                if ($(this).val() == elementValue) {
                                    console.log($(this).val(), elementValue)
                                    $(this).prop("selected", 'selected');
                                    return;
                                }
                            });
                            $("select[name='" + tabName + "']").trigger("change", []);
                        }
                        else if (element.type == "textarea")
                            $("textarea[name='" + tabName + "']").val(elementValue);
                        else
                            $("span[name='" + tabName + "']").text(elementValue);

                        if (element.commandOf) formFn.command(id, element.commandOf);
                    }
                }
            }

            function getElementData(id, element, data) {
                var addDataFn = common.addDataToObj;
                if (element.isSubmit != false) {
                    var dataValue = "";
                    var tabName = currSetting.elementNamePrefix + id + "_" + element.key;
                    if (element.type == "text" || element.type == "date" || element.type == "password"
                        || element.type == "datetime" || element.type == "time" || element.type == "hidden") {
                        addDataFn(element.key, $("input[name='" + tabName + "']").val(), data);
                        //data[element.key] = $("input[name='" + tabName + "']").val();
                    }
                    else if (element.type == "file") {
                        addDataFn(element.key, $("input[name='" + tabName + currSetting.filePathNameSuffix + "']").val(), data);
                        //data[element.key] = $("input[name='" + tabName + currSetting.filePathNameSuffix + "']").val();
                    }
                    else if (element.type == "radio") {
                        addDataFn(element.key, $("input:radio[name='" + tabName + "']:checked").val(), data);
                        //data[element.key] = $("input:radio[name='" + tabName + "']:checked").val();
                    }
                    else if (element.type == "checkbox") {
                        var dataValue = [];
                        $("input:checkbox[name='" + tabName + "']:checked").each(function () {
                            dataValue.push($(this).val());
                        });
                        addDataFn(element.key, dataValue, data);
                        //data[element.key] = dataValue;
                    }
                    else if (element.type == "select") {
                        var selectTabArr = element.key.split(",");
                        if (selectTabArr.length == 1) {
                            addDataFn(selectTabArr[0], $("select[name='" + tabName + "'] option:selected").val(), data);
                            //data[selectTabArr[0]] = $("select[name='" + tabName + "'] option:selected").val();
                        } else if (selectTabArr.length == 2) {
                            addDataFn(selectTabArr[0], $("select[name='" + tabName + "'] option:selected").val(), data);
                            addDataFn(selectTabArr[1], $("select[name='" + tabName + "'] option:selected").text(), data);
                            //data[selectTabArr[0]] = $("select[name='" + tabName + "'] option:selected").val();
                            //data[selectTabArr[1]] = $("select[name='" + tabName + "'] option:selected").text();
                        }
                    }
                    else if (element.type == "textarea") {
                        addDataFn(element.key, $("textarea[name='" + tabName + "']").val(), data);
                        //data[element.key] = $("textarea[name='" + tabName + "']").val();
                    }
                    else {
                        addDataFn(element.key, $("*[name='" + tabName + "']").text(), data);
                        //data[element.key] = $("*[name='" + tabName + "']").text();
                    }
                }
            }

            function removeElementData(id, element) {
                if (element.isSubmit != false) {
                    var tabName = currSetting.elementNamePrefix + id + "_" + element.key;

                    if (element.type == "text" || element.type == "date" || element.type == "password"
                        || element.type == "datetime" || element.type == "time")
                        $("input[name='" + tabName + "']").val("");
                    else if (element.type == "file") {
                        $("input[name='" + tabName + currSetting.filePathNameSuffix + "']").val("");
                        $("input[name='" + tabName + currSetting.fileNameSuffix + "']").val("");
                    }
                    else if (element.type == "radio")
                        $("input:radio[name='" + tabName + "']:checked").prop("checked", false);
                    else if (element.type == "checkbox") {
                        $("input:checkbox[name='" + tabName + "']:checked").each(function () {
                            $(this).prop("checked", false);
                        });
                    }
                    else if (element.type == "select")
                        $("select[name='" + tabName + "'] option:first").prop("selected", 'selected');
                    else if (element.type == "textarea")
                        $("textarea[name='" + tabName + "']").val("");
                    else
                        $("*[name='" + tabName + "']").text("");

                    if (element.commandOf) formFn.command(id, element.commandOf);
                }
            }

            function initElementData(id, element) {
                var value = element.value;
                if (value) setElementData(id, element, value);
                else removeElementData(id, element);
            }

            var ifCommandFn = {
                data: {},
                init: function (id, elements) {
                    var ifCommandObj = this.data["ifCommand" + id] = {};
                    var commandElement = ifCommandObj.commands = {};
                    var ifElement = ifCommandObj.ifs = {};
                    var commandArr = [];
                    for (var index = 0; index < elements.length; index++) {
                        var element = elements[index];
                        if (element.if) {
                            var elenemtIf = element.if = this.ifAnaly(element.if);
                            if (elenemtIf.left && elenemtIf.left.charAt(0) == "@") {
                                var left = elenemtIf.left.replace("@", "");
                                if (!commandArr[left]) commandArr[left] = [];
                                commandArr[left].push(element.key);
                            }
                            if (elenemtIf.right && elenemtIf.right.charAt(0) == "@") {
                                var right = elenemtIf.right.replace("@", "");
                                if (!commandArr[right]) commandArr[right] = [];
                                commandArr[right].push(element.key);
                            }
                            ifElement[element.key] = element;
                        }
                    }
                    for (var index = 0; index < elements.length; index++) {
                        var element = elements[index];
                        if (commandArr[element.key]) {
                            element.commandOf = commandArr[element.key];
                            commandElement[element.key] = element;
                        }
                    }
                },
                getIfResult: function (id, keys) {
                    var currObj = this.data["ifCommand" + id];
                    var results = {};
                    if (currObj) {
                        var ifElement = currObj.ifs;
                        var commandElement = currObj.commands;
                        if (!common.is.Array(keys)) keys = keys.split(",");
                        for (var index = 0; index < keys.length; index++) {
                            var key = keys[index];
                            var element = ifElement[key];

                            var left = element.if.left;
                            var condition = element.if.condition;
                            var right = element.if.right;
                            if (left.charAt(0) == "@") {
                                var leftKey = left.replace("@", "");
                                var leftElement = commandElement[leftKey];
                                var elementData = {};
                                getElementData(id, leftElement, elementData);
                                left = elementData[leftKey];
                            }
                            if (right.charAt(0) == "@") {
                                var rightKey = right.replace("@", "");
                                var rightElement = commandElement[rightKey];
                                var elementData = {};
                                getElementData(id, rightElement, elementData);
                                right = elementData[rightKey];
                            }

                            var resultFn = new Function("return ('" + left + "'" + condition + "'" + right + "');");
                            results[key] = resultFn();
                        }
                    }
                    return results;
                },
                ifAnaly: function (ifValue) {
                    var ifArr;
                    var currCondition, arg_1, arg_2;
                    var conditionArr = ["==", "!=", ">=", "<=", ">", "<", ":"];
                    for (var index = 0; index < conditionArr.length; index++) {
                        var condition = conditionArr[index];
                        if (ifValue.indexOf(condition) != -1) {
                            currCondition = condition;
                            ifArr = ifValue.split(condition);
                            break;
                        }
                    }
                    if (ifArr && ifArr.length > 0) {
                        arg_1 = ifArr[0];
                        if (ifArr.length > 1) arg_2 = ifArr[1];
                    }
                    return {
                        left: arg_1,
                        right: arg_2,
                        condition: currCondition
                    }
                }
            }

            function buildElement(id, params) {

                var key = currSetting.elementNamePrefix + id + "_" + params.key;
                var type = params.type;
                var value = params.value ? params.value : "";
                var defaultValue = params.default ? params.default : "";
                var children = params.children;
                var commandOf = params.commandOf;

                var elementArr = [];
                if (type == "text" || type == "password" || type == "hidden") {

                    var element = common.deepCopy(elementsConfig.input);
                    element.properties.name = key;
                    element.properties.type = type;
                    element.properties.value = value;
                    element.properties.placeholder = defaultValue;
                    if (commandOf) element.properties.onblur = uiName + ".parts.form.command('" + id + "','" + commandOf + "')";
                    elementArr.push(element);

                } else if (type == "file") {

                    var url = params.url;
                    var fileParamName = params.fileName;
                    var element = common.deepCopy(elementsConfig.file);
                    element.properties.name = key;
                    element.children[0].properties.name = key + currSetting.filePathNameSuffix;
                    element.children[0].properties.value = value;
                    element.children[0].properties.placeholder = defaultValue;
                    if (commandOf) element.children[0].properties.onblur = uiName + ".parts.from.command('" + id + "','" + commandOf + "')";
                    element.children[1].properties.id = key + currSetting.fileNameSuffix;
                    element.children[1].properties.name = key + currSetting.fileNameSuffix;
                    element.children[1].properties.onchange = uiName + ".parts.form.element.file.checked('" + id + "','" + params.key + "')";
                    element.children[2].properties.onclick = uiName + ".parts.form.element.file.browse('" + id + "','" + params.key + "')";
                    element.children[2].text = currSetting.fileBrowseButtonName;
                    element.children[3].properties.onclick = uiName + ".parts.form.element.file.upload('" + id + "','" + params.key + "','" + url + "','" + fileParamName + "')";
                    element.children[3].text = currSetting.fileUploadButtonName;
                    elementArr.push(element);

                } else if (type == "select") {

                    var element = common.deepCopy(elementsConfig.select);
                    element.properties.name = key;
                    if (commandOf) element.properties.onchange = uiName + ".parts.form.command('" + id + "','" + commandOf + "')";

                    var defaultOption = common.deepCopy(elementsConfig.option);
                    defaultOption.properties.value = defaultValue.value;
                    defaultOption.text = defaultValue.text;
                    element.children.push(defaultOption);
                    for (var childrenIndex = 0; childrenIndex < children.length; childrenIndex++) {
                        var child = children[childrenIndex];
                        var optionElement = common.deepCopy(elementsConfig.option);
                        optionElement.properties.value = child.value;
                        if (child.value == value) optionElement.properties.selected = "selected";
                        optionElement.text = child.text;
                        element.children.push(optionElement);
                    }
                    elementArr.push(element);

                } else if (type == "date" || type == "datetime" || type == "time") {

                    var element = common.deepCopy(elementsConfig.input);
                    element.properties.name = key;
                    element.properties.type = type;
                    element.properties.value = value;
                    if (commandOf) element.properties.onblur = uiName + ".parts.form.command('" + id + "','" + commandOf + "')";

                    elementArr.push(element);

                } else if (type == "radio" || type == "checkbox") {

                    for (var childrenIndex = 0; childrenIndex < children.length; childrenIndex++) {
                        var child = children[childrenIndex];
                        var element = common.deepCopy(elementsConfig.input);
                        element.properties.name = key;
                        element.properties.type = type;
                        if (commandOf) element.properties.onclick = uiName + ".parts.form.command('" + id + "','" + commandOf + "')";
                        if ((type == "radio" && child.value == value) || (type == "checkbox" && value.indexOf(child.value)))
                            element.properties.checked = "checked";

                        var child = children[childrenIndex];
                        element.properties.value = child.value;

                        var radioText = { name: "label", text: buildUtil.tags.nbsps(2) + child.text + buildUtil.tags.nbsps(3) }
                        elementArr.push(element);
                        elementArr.push(radioText);
                    }

                } else if (type == "textarea") {

                    var element = common.deepCopy(elementsConfig.textarea);
                    element.properties.name = key;
                    element.text = value;
                    if (commandOf) element.properties.onblur = uiName + ".parts.form.command('" + id + "','" + commandOf + "')";

                    elementArr.push(element);

                } else {

                    var element = common.deepCopy(elementsConfig.span);
                    element.properties.name = key;
                    element.text = value;
                    if (commandOf) element.properties.onblur = uiName + ".parts.form.command('" + id + "','" + commandOf + "')";

                    elementArr.push(element);
                }

                return elementArr;
            }

            function buildform(params) {
                var id = params.id;
                var style = params.style;
                var col = params.col ? parseInt(params.col) : 1;
                var elements = params.elements;
                if (!params.call) params.call = {};

                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                var commandArr = ifCommandFn.init(id, elements);

                var elementsData = {};
                var formColArr = new Array(col);
                var formColCurrIndex = 0;
                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];
                    var title = element.title;
                    var helpMsg = element.help ? element.help : "";
                    var errorMsg = element.error ? element.error : "";
                    var isShow = element.show == false ? false : true;

                    var currFormCol = formColArr[formColCurrIndex];
                    if (!currFormCol) {
                        var formColElement = common.deepCopy(formColConfig);
                        formColElement.properties.style = "width:" + parseInt(100 / col) + "%;";
                        currFormCol = formColArr[formColCurrIndex] = formColElement;
                    }
                    var currFormColElementArr = currFormCol.children;

                    if (formColCurrIndex == col - 1) formColCurrIndex = 0;
                    else formColCurrIndex++;

                    var formElement = common.deepCopy(formConfig);
                    formElement.properties.id = currSetting.elementIdPrefix + id + "_" + element.key;
                    if (!isShow || element.if) formElement.properties.style = "display:none;";
                    formElement.children[0].text = title;
                    formElement.children[1].children = buildElement(id, element);
                    formElement.children[2].text = errorMsg;
                    formElement.children[3].text = helpMsg;

                    elementsData["element" + element.key] = element;
                    currFormColElementArr.push(formElement);
                }

                var formsElement = common.deepCopy(formsConfig);
                formsElement.properties.id = currSetting.idPrefix + id;
                if (style) formsElement.properties.style = style;
                formsElement.children = formColArr;

                return formData["part" + id] = {
                    id: id,
                    params: params,
                    config: formsElement,
                    elements: elementsData
                }
            }

            return {
                build: buildform,
                getConfig: formFn.getConfig,
                submit: formFn.submit,
                setData: formFn.setData,
                getData: formFn.getData,
                removeData: formFn.removeData,
                verifyData: formFn.verifyData,
                initData: formFn.initData,
                showHelp: formFn.showHelpMsg,
                command: formFn.command,
                element: {
                    setDom: formElementFn.setDom,
                    setData: formElementFn.setData,
                    initData: formElementFn.initData,
                    getData: formElementFn.getData,
                    removeData: formElementFn.removeData,
                    file: {
                        checked: formElementFn.file.checked,
                        browse: formElementFn.file.browse,
                        upload: formElementFn.file.upload
                    }
                }
            }
        }

        function gridObj() {

            var currSetting = setting.grid;
            //var idPrefix = setting.grid.idPrefix;

            var gridData = {}
            var gridConfig = {
                name: "table",
                properties: { class: "p-grid" },
                children: []
            }

            var gridFn = {
                getConfig: function (id) {
                    return partCommon.getConfig(id, gridData);
                },
                click: function (id, index) {
                    var curr = gridData["part" + id];
                    if (!curr) {
                        alert("The call back function is nonentity!");
                    } else {
                        var elements = curr.params.elements;
                        common.callFn(window.ui, elements[index].call.click.fn, elements[index].call.click.params, elements[index]);
                    }
                },
                dblclick: function (id, index) {
                    var curr = gridData["part" + id];
                    if (!curr) {
                        alert("The call back function is nonentity!");
                    } else {
                        var elements = curr.params.elements;
                        common.callFn(window.ui, elements[index].call.dblclick.fn, elements[index].call.dblclick.params, elements[index]);
                    }
                }
            }

            function build(params) {

                var id = params.id;
                var col = parseInt(params.col);
                var elements = params.elements;
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                partCommon.initCall(params, ["click", "dblclick"]);

                var gridElement = common.deepCopy(gridConfig);
                var currCol = 0;
                var currRow = 0;
                var occupiedCol = [0, 0];
                var trConfig = { name: "tr", properties: { class: "first" }, children: [] };
                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];

                    var key = currSetting.idPrefix + id + "_" + element.key;
                    var text = element.text;
                    var style = element.style ? element.style : "";
                    var width = parseInt(element.width ? element.width : 1);
                    var height = parseInt(element.height ? element.height : 1);

                    var tdConfig = { name: "td", properties: {}, text: "" };
                    tdConfig.properties.id = key;
                    tdConfig.text = text;

                    partCommon.initItemCall(element, params.call, ["click", "dblclick"]);
                    if (element.call.click.fn && element.click != false)
                        tdConfig.properties.onclick = uiName + ".parts.grid.click('" + id + "','" + i + "')";
                    if (element.call.dblclick.fn && element.dblclick != false)
                        tdConfig.properties.ondblclick = uiName + ".parts.grid.dblclick('" + id + "','" + i + "')";

                    if (trConfig.properties) tdConfig.properties.style = "width:" + (100 / col * width) + "%" + style;
                    if (width > 1) tdConfig.properties.colspan = width;
                    if (height > 1) {
                        tdConfig.properties.rowspan = height;
                        for (var h = 1; h <= height - 1; h++) {
                            if (!occupiedCol[currRow + h]) occupiedCol[currRow + h] = 0;
                            occupiedCol[currRow + h] = occupiedCol[currRow + h] + width;
                        }
                    }

                    currCol = currCol + width;
                    trConfig.children.push(tdConfig);
                    if (!occupiedCol[currRow]) occupiedCol[currRow] = 0;
                    if ((col - occupiedCol[currRow]) <= currCol || i == elements.length - 1) {
                        gridElement.children.push(trConfig);
                        currCol = 0;
                        currRow = currRow + 1;
                        trConfig = { name: "tr", children: [] };
                    }
                }

                return gridData["part" + id] = {
                    id: id,
                    params: params,
                    config: gridElement
                }
            }

            return {
                build: build,
                click: gridFn.click,
                dblclick: gridFn.dblclick
            }
        }

        function drawBoardObj() {

            var connectSvgIdArr = [];
            var shapeName = "shape";
            var connectSvgName = "connect_svg";
            var tempToolDragId = "temp_tool_drag";

            var currSetting = setting.drawBoard;

            // var toolIdPrefix = setting.drawBoard.toolIdPrefix;
            // var drawIdPrefix = setting.drawBoard.drawIdPrefix;
            // var shapeIdPrefix = setting.drawBoard.shapeIdPrefix;

            // var stratGap = setting.drawBoard.stratGap;
            // var endGap = setting.drawBoard.endGap;
            // var allowNum = 0 - setting.drawBoard.allowNum;
            // var connectIdPrefix = setting.drawBoard.connectIdPrefix;
            // var connectLineIdPrefix = setting.drawBoard.connectLineIdPrefix;
            // var connectPointText = setting.drawBoard.connectPointText;

            var drawBoardData = {};
            var drawBoardConfig = {
                name: "div",
                properties: { class: "p-draw-board" },
                children: [{
                    name: "div", properties: { class: "p-toolbar" }, children: [
                        { name: "div", properties: { class: "p-head" }, text: "" },
                        { name: "div", properties: { class: "p-tool" }, children: [] }
                    ]
                }, { name: "div", properties: { class: "p-panel" }, children: [] }]
            }
            var shapeExteriorConfig = { name: "div", properties: { class: "p-draw-exterior" }, children: [] }
            var shapeConfig = { name: "div", properties: { class: "p-draw-shape" }, children: [] }
            var connectConfig = {
                marker: {
                    name: "div",
                    properties: { name: connectSvgName, class: "p-draw-connect" },
                    children: [{
                        name: "svg",
                        properties: { width: "100%", height: "100%", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
                        children: [{
                            name: "defs",
                            children: [{
                                name: "marker",
                                properties: { id: "dragArrow", markerWidth: "13", markerHeight: "13", refx: "4", refy: "4", orient: "auto" },
                                children: [{ name: "circle", properties: { cx: "4", cy: "4", r: "2", fill: "gray" }, text: "" }]
                            }, {
                                name: "marker",
                                properties: { id: "endArrow", markerWidth: "13", markerHeight: "13", refx: "4", refy: "4", orient: "auto" },
                                children: [{ name: "circle", properties: { cx: "4", cy: "4", r: "2", fill: "#990033" }, text: "" }]
                            }, {
                                name: "marker",
                                properties: { id: "checkedArrow", markerWidth: "13", markerHeight: "13", refx: "4", refy: "4", orient: "auto" },
                                children: [{ name: "circle", properties: { cx: "4", cy: "4", r: "2", fill: "gray" }, text: "" }]
                            }]
                        }]
                    }]
                },
                point: {
                    name: "div",
                    properties: { class: "" },
                    children: [{
                        name: "svg",
                        properties: { width: "100%", height: "100%", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
                        children: [
                            { name: "circle", properties: { cx: "5", cy: "50%", r: "7", fill: "#990033" }, text: "" },
                            { name: "text", properties: { x: "50%", y: "50%", dy: ".3em", fill: "white", "text-anchor": "middle", "font-size": "10px" }, text: "" }
                        ]
                    }]
                },
                line: {
                    name: "line",
                    properties: { x1: "0", y1: "0", x2: "100", y2: "100", stroke: "gray", "stroke-width": "4", "marker-end": "", tabindex: "0" },
                    text: ""
                }
            }
            var regionConfig = { name: "div", properties: { class: "p-draw-region" }, text: "" }

            var drawBoardFn = {
                click: function (id) {
                    shapeFn.uncheckAll(id);
                    connectFn.uncheckAll(id);
                },
                region: function (id) {
                    var drawBoard = drawBoardData["part" + id];
                    if (drawBoard) {
                        this.click(id);

                        var event = window.event || arguments.callee.caller.arguments[0];
                        var pageX = event.pageX;
                        var pageY = event.pageY;

                        var drawDom = $("#" + currSetting.drawIdPrefix + id);
                        var regionElement = common.deepCopy(regionConfig);
                        regionElement.properties.style = "left:" + pageX + "px;top:" + pageY + "px;width:0px;height:0px;";
                        drawDom.append(buildUtil.buildModule(regionElement));
                        var regionDom = drawDom.children(".p-draw-region");

                        drawDom.bind("mousemove", function (e) {
                            var moveX = parseInt(e.pageX);
                            var moveY = parseInt(e.pageY);
                            var regionX = Math.abs(moveX - pageX);
                            var regionY = Math.abs(moveY - pageY);
                            regionDom.css("width", regionX);
                            if (moveX < pageX) regionDom.css("left", moveX);
                            regionDom.css("height", regionY);
                            if (moveY < pageY) regionDom.css("top", moveY);
                        });
                        drawDom.bind("mouseup", function (e) {
                            var moveX = parseInt(e.pageX);
                            var moveY = parseInt(e.pageY);
                            regionDom.remove();

                            var regionLeft = parseInt(regionDom.css("left"));
                            var regionTop = parseInt(regionDom.css("top"));
                            var regionRight = regionLeft + parseInt(regionDom.css("width"));
                            var regionBottom = regionTop + parseInt(regionDom.css("height"));
                            var currShapes = drawBoard.shape;
                            for (var positionKey in currShapes) {
                                if (currShapes.hasOwnProperty(positionKey)) {
                                    var currShapeObj = currShapes[positionKey];
                                    var positionObj = currShapeObj.position;

                                    var left = positionObj.left;
                                    var right = positionObj.right;
                                    var top = positionObj.top;
                                    var bottom = positionObj.bottom;
                                    if (right > regionLeft && left < regionRight)
                                        if (bottom > regionTop && top < regionBottom)
                                            shapeFn.checked(id, currShapeObj.id);
                                }
                            }
                            drawDom.unbind("mousemove mouseup");
                        });
                    }
                },
                zoom: function (id, addWidth, addHeight) {
                    var drawBoard = drawBoardData["part" + id];
                    if (drawBoard) {
                        var dom = $("#" + currSetting.drawIdPrefix + id).parent();
                        var width = parseInt(dom.css("width"));
                        var height = parseInt(dom.css("height"));
                        var maxWidth = parseInt(dom.css("max-width"));
                        var maxHeight = parseInt(dom.css("max-height"));
                        var minWidth = parseInt(dom.css("min-width"));
                        var minHeight = parseInt(dom.css("min-height"));

                        if (addWidth.indexOf("%") != -1) addWidth = width * parseInt(addWidth) / 100;
                        else addWidth = parseInt(addWidth);
                        if (addHeight.indexOf("%") != -1) addHeight = height * parseInt(addHeight) / 100;
                        else addHeight = parseInt(addHeight);

                        var newWidth = width + addWidth;
                        var newHeight = height + addHeight;
                        if (newWidth < minWidth) newWidth = minWidth;
                        if (newWidth > maxWidth) newWidth = maxWidth;
                        if (newHeight < minHeight) newHeight = minHeight;
                        if (newHeight > maxHeight) newHeight = maxHeight;
                        dom.css("width", newWidth);
                        dom.css("height", newHeight);
                    }
                },
                getCurr: function (id) {
                    return partCommon.getCurr(id, drawBoardData);
                },
                getConfig: function (id) {
                    return partCommon.getConfig(id, drawBoardData);
                }
            }
            var toolFn = {
                click: function (id, barIndex, key) {
                    var drawBoard = drawBoardData["part" + id];
                    if (drawBoard) {
                        var params = drawBoard.params;
                        var tools = params.tool.bars[barIndex].elements;
                        for (var toolIndex = 0; toolIndex < tools.length; toolIndex++) {
                            var tool = tools[toolIndex];
                            if (tool.key == key) {
                                common.callFn(window.ui, tool.call.click.fn, tool.call.click.params, drawBoard);
                                break;
                            }
                        }
                    }
                },
                drag: function (id, barIndex, key) {
                    var drawBoard = drawBoardData["part" + id];
                    if (drawBoard) {
                        var params = drawBoard.params;
                        var tools = params.tool.bars[barIndex].elements;
                        for (var toolIndex = 0; toolIndex < tools.length; toolIndex++) {
                            var tool = tools[toolIndex];
                            if (tool.key == key) {
                                var event = window.event || arguments.callee.caller.arguments[0];
                                var pageX = event.pageX;
                                var pageY = event.pageY;

                                var panelDom = $("#" + currSetting.drawIdPrefix + id);
                                var panelWidth = panelDom.width();
                                var panelHeight = panelDom.height();
                                var panelMarginTop = parseInt(panelDom.css("marginTop"));
                                var panelMarginLeft = parseInt(panelDom.css("marginLeft"));
                                pageX = pageX - panelDom.offset().left;
                                pageY = pageY - panelDom.offset().top;

                                var toolDom = $("#" + currSetting.toolIdPrefix + id + "_" + tool.key);
                                var toolWidth = toolDom.width();
                                var toolHeight = toolDom.height();
                                var toolMarginTop = parseInt(toolDom.css("marginTop"));
                                var toolBody = toolDom.html();

                                var newToolConfig = { name: "div", properties: { id: tempToolDragId }, text: "" };
                                newToolConfig.properties.style = "margin-top:" + (pageY - toolHeight / 2) + "px; margin-left:" + (pageX - toolWidth / 2) + "px;"
                                    + "position: absolute; z-index:9999; width:" + toolWidth + "px; height:" + toolHeight + "px;"
                                    + "background-color:black;opacity:.5;";

                                panelDom.append(buildUtil.buildModule(newToolConfig));
                                var tempDargTool = $("#" + tempToolDragId);

                                panelDom.bind("mousemove", function (e) {
                                    var moveX = e.pageX;
                                    var moveY = e.pageY;
                                    moveX = moveX - panelDom.offset().left;
                                    moveY = moveY - panelDom.offset().top;

                                    var toolMarginTop = moveY - toolHeight / 2;
                                    var toolMarginLeft = moveX - toolWidth / 2;

                                    if (toolMarginTop < 0) toolMarginTop = 0;
                                    if (toolMarginTop > (panelHeight - toolHeight)) toolMarginTop = panelHeight - toolHeight;
                                    if (toolMarginLeft < 0) toolMarginLeft = 0;
                                    if (toolMarginLeft > (panelWidth - toolWidth)) toolMarginLeft = panelWidth - toolWidth;

                                    tempDargTool.css("marginTop", toolMarginTop);
                                    tempDargTool.css("marginLeft", toolMarginLeft);
                                });
                                panelDom.bind("mouseup", function (e) {
                                    if (!tool.call.drag.params) tool.call.drag.params = {};
                                    for (var key in tool) {
                                        if (tool.hasOwnProperty(key) && key != "call")
                                            tool.call.drag.params[key] = tool[key];
                                    }
                                    tool.call.drag.params.top = tempDargTool.css("marginTop");
                                    tool.call.drag.params.left = tempDargTool.css("marginLeft");
                                    tempDargTool.remove();
                                    panelDom.unbind("mousemove mouseup");
                                    common.callFn(window.ui, tool.call.drag.fn, tool.call.drag.params, drawBoard);
                                });
                                break;
                            }
                        }
                    }
                }
            }
            var shapeFn = {
                create: function (drawBoardId, params) {
                    var drawBoard = drawBoardData["part" + drawBoardId];
                    if (drawBoard) {
                        var shapeSet = drawBoard.params.shape;
                        var currNum = shapeSet.currNum;
                        var maxNum = parseInt(shapeSet.maxNum);
                        var keyMaxNum = shapeSet.keyMaxNum;
                        var keyCurrNum = shapeSet.keyCurrNum;

                        var type = params.type;
                        var currKeyNum, currKeyMaxNum;
                        if (!common.isEmpty(type)) {
                            if (keyMaxNum) currKeyMaxNum = parseInt(keyMaxNum[type]);
                            currKeyNum = keyCurrNum[type];
                            if (!currKeyNum) currKeyNum = keyCurrNum[type] = 0;
                        }
                        if ((!maxNum || currNum < maxNum) && (!currKeyMaxNum || currKeyNum < currKeyMaxNum)) {

                            var id = params.id;
                            var title = params.title ? params.title : "";
                            var base = params.base;
                            var body = params.body;
                            var style = params.style ? params.style : "";
                            var leftPoint = params.leftPoint != undefined ? params.leftPoint : currSetting.connectPointText;
                            var rightPoint = params.rightPoint != undefined ? params.rightPoint : currSetting.connectPointText;
                            var isChecked = params.checked == false ? false : true;
                            var isDblclick = params.dblclick == false ? false : true;
                            var isDrag = params.drag == false ? false : true;
                            var isConnect = params.connect == false ? false : true;
                            var isDelete = params.del == false ? false : true;
                            var isZoom = params.zoom == false ? false : true;
                            if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                            partCommon.initCall(params, ["dblclick", "drag", "change", "delete"]);

                            var top = base.top ? base.top : "0px";
                            var left = base.left ? base.left : "0px";
                            var width = base.width ? base.width : "50px";
                            var height = base.height ? base.height : "50px";
                            var border = base.border ? base.border : "0px";
                            var zIndex = base.zIndex ? base.zIndex : "1";

                            var shapeExteriorElement = common.deepCopy(shapeExteriorConfig);
                            shapeExteriorElement.properties.id = currSetting.shapeIdPrefix + id;
                            shapeExteriorElement.properties.tabindex = "0";
                            shapeExteriorElement.properties.style = "margin-top:" + top + ";margin-left:" + left + ";z-index:" + zIndex +
                                ";border:" + border + ";width:" + width + ";height:" + height + ";" + ";line-height:" + height + ";" + style;
                            if (isDelete == true) shapeExteriorElement.properties.onkeydown = uiName + ".parts.drawBoard.shape.delete('" + drawBoardId + "','" + id + "')";
                            shapeExteriorElement.properties.title = title;

                            if (isConnect == true) {
                                if (leftPoint !== false) {
                                    var leftPointElement = common.deepCopy(connectConfig.point);
                                    leftPointElement.properties.class = "p-point-left";
                                    leftPointElement.children[0].children[1].text = leftPoint;
                                    shapeExteriorElement.children.push(leftPointElement);
                                }
                                if (rightPoint !== false) {
                                    var rightPointElement = common.deepCopy(connectConfig.point);
                                    rightPointElement.properties.class = "p-point-right";
                                    rightPointElement.children[0].children[1].text = rightPoint;
                                    rightPointElement.properties.onmousedown = uiName + ".parts.drawBoard.connect.create('" + drawBoardId + "','" + id + "')";
                                    shapeExteriorElement.children.push(rightPointElement);
                                }
                            }

                            var shapeElement = common.deepCopy(shapeConfig);
                            if (isDblclick == true) shapeElement.properties.ondblclick = uiName + ".parts.drawBoard.shape.dblclick('" + drawBoardId + "','" + id + "')";
                            if (isDrag == true) shapeElement.properties.onmousedown = uiName + ".parts.drawBoard.shape.drag('" + drawBoardId + "','" + id + "')";
                            if (isChecked == true) shapeElement.properties.onclick = uiName + ".parts.drawBoard.shape.checked('" + drawBoardId + "','" + id + "')";
                            if (common.is.Array(body)) shapeElement.children = body;
                            else if (common.is.Object(body)) shapeElement.children.push(body);
                            else if (common.is.String(body)) shapeElement.text = body;
                            shapeExteriorElement.children.push(shapeElement);

                            drawBoard.shape["shape" + id] = {
                                id: id,
                                params: params,
                                config: shapeExteriorElement,
                                position: {
                                    id: id,
                                    in: (isConnect != true || leftPoint === false) ? false : true,
                                    out: (isConnect != true || rightPoint === false) ? false : true,
                                    top: parseInt(top),
                                    left: parseInt(left),
                                    right: parseInt(left) + parseInt(width),
                                    bottom: parseInt(top) + parseInt(height),
                                    zIndex: parseInt(zIndex)
                                }
                            }

                            shapeSet.currNum += 1;   // shape count + 1
                            if (type) keyCurrNum[type] += 1;  // curr key's shape count + 1
                            $("#" + currSetting.drawIdPrefix + drawBoardId).append(buildUtil.buildModule(shapeExteriorElement));
                        }
                    }
                },
                dblclick: function (drawBoardId, id) {
                    var drawBoard = drawBoardData["part" + drawBoardId];
                    if (drawBoard) {
                        var curr = drawBoard.shape["shape" + id];
                        var params = curr.params;
                        common.callFn(window.ui, params.call.dblclick.fn, params.call.dblclick.params, curr);
                    }
                },
                getConfig: function (drawBoardId, id) {
                    var drawBoard = drawBoardData["part" + drawBoardId];
                    if (drawBoard) {
                        var curr = drawBoard.shape["shape" + id];
                        if (curr) return curr.params;
                    }
                },
                change: function (drawBoardId, id, properties, style) {
                    // var curr = shapeData["shape" + id];
                    // var params = curr.params;

                    // var shapeDom = $("#" + currSetting.shapeIdPrefix + id + " *[name='" + shapeName + "']");
                    // if (properties) {
                    //     for (var propertiesKey in properties) {
                    //         if (properties.hasOwnProperty(propertiesKey)) {
                    //             var property = properties[propertiesKey];
                    //             shapeDom.attr(propertiesKey, property);
                    //         }
                    //     }
                    // }
                    // if (style && style.length > 0) {
                    //     style = style.replace(/(\s*$)/g, "");
                    //     var lastChar = style.charAt(style.length - 1);
                    //     if (lastChar != ";") style += ";";

                    //     var oldStyle = shapeDom.attr("style");
                    //     oldStyle = oldStyle ? oldStyle : "";

                    //     shapeDom.attr("style", style + oldStyle);
                    // }
                },
                drag: function (drawBoardId, id) {
                    var drawBoard = drawBoardData["part" + drawBoardId];
                    if (drawBoard) {
                        var currShapeObj = drawBoard.shape["shape" + id];

                        var event = window.event || arguments.callee.caller.arguments[0];
                        var pageX = event.pageX;
                        var pageY = event.pageY;

                        var curr = $("#" + currSetting.shapeIdPrefix + id);
                        var currWidth = curr.width();
                        var currHeight = curr.height();
                        var currMarginTop = parseInt(curr.css("marginTop"));
                        var currMarginLeft = parseInt(curr.css("marginLeft"));

                        var currParent = curr.parent();
                        var parentWidth = currParent.width();
                        var parentHeight = currParent.height();

                        event.stopPropagation();

                        var lastNewMarginTop = undefined;
                        var lastNewMarginLeft = undefined

                        currParent.bind("mousemove", function (e) {
                            var moveX = e.pageX;
                            var moveY = e.pageY;
                            var newMarginTop = currMarginTop + (moveY - pageY);
                            var newMarginLeft = currMarginLeft + (moveX - pageX);

                            if (newMarginTop < 0) newMarginTop = 0;
                            if (newMarginTop > (parentHeight - currHeight)) newMarginTop = parentHeight - currHeight;
                            if (newMarginLeft < 0) newMarginLeft = 0;
                            if (newMarginLeft > (parentWidth - currWidth)) newMarginLeft = parentWidth - currWidth;

                            lastNewMarginTop = newMarginTop;
                            lastNewMarginLeft = newMarginLeft;
                            curr.css("marginTop", newMarginTop);
                            curr.css("marginLeft", newMarginLeft);

                            connectFn.moveShape(drawBoardId, id, newMarginTop, newMarginLeft, currWidth, currHeight);
                        });
                        currParent.bind("mouseup", function (e) {
                            if (lastNewMarginTop && lastNewMarginLeft) {
                                var shapePositionObj = currShapeObj.position;
                                shapePositionObj.top = lastNewMarginTop;
                                shapePositionObj.left = lastNewMarginLeft;
                                shapePositionObj.right = lastNewMarginLeft + currWidth;
                                shapePositionObj.bottom = lastNewMarginTop + currHeight;
                            }

                            currParent.unbind("mousemove mouseup");
                        });
                    }
                },
                checked: function (drawBoardId, id) {
                    var event = window.event || arguments.callee.caller.arguments[0];
                    var shapeDom = $("#" + currSetting.shapeIdPrefix + id);
                    var status = shapeDom.attr("status");
                    if (status == "1") {
                        shapeDom.removeClass("p-draw-shape-focus");
                        shapeDom.attr("status", "0");
                    } else {
                        shapeDom.addClass("p-draw-shape-focus");
                        shapeDom.attr("status", "1");
                    }
                    event.stopPropagation();
                },
                uncheckAll: function (drawBoardId) {
                    var shapeDom = $("#" + currSetting.drawIdPrefix + drawBoardId).children(".p-draw-exterior");
                    shapeDom.attr("status", "0");
                    shapeDom.removeClass("p-draw-shape-focus");
                },
                delete: function (drawBoardId, id) {
                    var drawBoard = drawBoardData["part" + drawBoardId];
                    if (drawBoard) {
                        var curr = drawBoard.shape["shape" + id];
                        var params = curr.params;
                        var event = window.event || arguments.callee.caller.arguments[0];
                        if (event.keyCode == 8) {  // 删除键
                            if (confirm("确认删除吗？")) {
                                if (id) {
                                    $("#" + currSetting.shapeIdPrefix + id).remove();
                                    connectFn.removeShape(drawBoardId, id);
                                    delete drawBoard.shape["shape" + id];
                                    drawBoard.params.shape.keyCurrNum[params.type] -= 1;
                                    drawBoard.params.shape.currNum -= 1;
                                }
                                common.callFn(window.ui, params.call.delete.fn, params.call.delete.params, curr);
                            }
                        }
                    }
                },
                deleteAll: function (drawBoardId) {
                    var drawBoard = drawBoardData["part" + drawBoardId];
                    if (drawBoard && drawBoard.shape) {
                        var shapes = drawBoard.shape;
                        for (var shapeKey in shapes) {
                            if (shapes.hasOwnProperty(shapeKey)) {
                                var shape = shapes[shapeKey];
                                var shapeDom = $("#" + currSetting.shapeIdPrefix + shape.id);
                                if (shapeDom.attr("status") == "1") {
                                    shapeDom.remove();
                                    connectFn.removeShape(drawBoardId, shape.id);
                                    delete shapes["shape" + shape.id];
                                }
                            }
                        }
                    }
                }
            }
            var connectFn = {
                create: function (drawBoardId, shapeId) {
                    var drawBoard = drawBoardData["part" + drawBoardId];
                    if (drawBoard) {
                        var event = window.event || arguments.callee.caller.arguments[0];
                        event.stopPropagation();

                        var pageX = event.pageX;
                        var pageY = event.pageY;

                        var connectSvgIndex = drawBoardId;
                        var connectElement = common.deepCopy(connectConfig.line);

                        var curr = $("#" + currSetting.shapeIdPrefix + shapeId);
                        var currWidth = parseInt(curr.width());
                        var currHeight = parseInt(curr.height());
                        var currMarginTop = parseInt(curr.css("marginTop"));
                        var currMarginLeft = parseInt(curr.css("marginLeft"));

                        var currParent = curr.parent();
                        var parentWidth = currParent.width();
                        var parentHeight = currParent.height();
                        pageX = pageX - currParent.offset().left;
                        pageY = pageY - currParent.offset().top;

                        var connectIndex = common.getUuid(partIdPrefix);
                        var strokeWidth = parseInt(connectElement.properties["stroke-width"]) / 2;  // 上下居中偏移量
                        connectElement.properties.id = currSetting.connectLineIdPrefix + connectIndex;
                        connectElement.properties.x1 = currMarginLeft + currWidth + currSetting.stratGap;
                        connectElement.properties.y1 = currMarginTop + currHeight / 2 + strokeWidth;
                        connectElement.properties.x2 = currMarginLeft + currWidth + currSetting.stratGap;
                        connectElement.properties.y2 = currMarginTop + currHeight / 2 + strokeWidth;
                        //connectElement.properties["marker-end"] = "url(#dragArrow)";
                        connectElement.properties.onmousedown = uiName + ".parts.drawBoard.connect.checked('" + drawBoardId + "','" + connectIndex + "', true)";
                        connectElement.properties.onkeydown = uiName + ".parts.drawBoard.connect.delete('" + drawBoardId + "','" + connectIndex + "')";

                        if (connectSvgIdArr.length == 0 || connectSvgIdArr.indexOf(connectSvgIndex) == -1) {
                            connectSvgIdArr.push(connectSvgIndex);
                            var connectSvgElement = common.deepCopy(connectConfig.marker);
                            connectSvgElement.properties.id = currSetting.connectIdPrefix + connectSvgIndex;
                            //connectSvgElement.properties.onclick = uiName + ".parts.drawBoard.connect.uncheckAll('" + connectSvgIndex + "')";
                            currParent.append(buildUtil.buildModule(connectSvgElement));
                        }
                        var connectSvgObj = currParent.children("*[name='" + connectSvgName + "']").children("svg");
                        connectSvgObj.html(connectSvgObj.html() + buildUtil.buildModule(connectElement));

                        currParent.bind("mousemove", function (e) {
                            var moveX = parseInt(e.pageX);
                            var moveY = parseInt(e.pageY);
                            moveX = moveX - currParent.offset().left;
                            moveY = moveY - currParent.offset().top;

                            var currParentMarginTop = parseInt(currParent.css("marginTop"));
                            var currParentMarginLeft = parseInt(currParent.css("marginLeft"));

                            var connect = $("#" + currSetting.connectLineIdPrefix + connectIndex);
                            connect.attr("x2", moveX);
                            connect.attr("y2", moveY);
                        });
                        currParent.bind("mouseup", function (e) {
                            var moveX = parseInt(e.pageX);
                            var moveY = parseInt(e.pageY);
                            moveX = moveX - currParent.offset().left;
                            moveY = moveY - currParent.offset().top;

                            var endMinDistance = undefined;
                            var endShapePositionObj = undefined;
                            var currShapes = drawBoard.shape;
                            for (var positionKey in currShapes) {
                                if (currShapes.hasOwnProperty(positionKey)) {
                                    var currShapeObj = currShapes[positionKey];
                                    var positionObj = currShapeObj.position;

                                    if (positionObj.in == true) {
                                        var leftDistance = moveX - positionObj.left;
                                        var rightDistance = positionObj.right - moveX;
                                        var topDistance = moveY - positionObj.top;
                                        var bottomDistance = positionObj.bottom - moveY;

                                        var allowNum = 0 - currSetting.allowNum;
                                        if (leftDistance > allowNum && rightDistance > allowNum && topDistance > allowNum && bottomDistance > allowNum) {
                                            var minDistance = Math.min(Math.abs(leftDistance), Math.abs(rightDistance), Math.abs(topDistance), Math.abs(bottomDistance));
                                            if (endMinDistance == undefined || endShapePositionObj == undefined || endMinDistance > minDistance) {
                                                endMinDistance = minDistance;
                                                endShapePositionObj = positionObj;
                                            }
                                        }
                                    }
                                }
                            }

                            var isAllow = false;
                            if (!drawBoard.params.connect.verify) isAllow = true;
                            else if (endMinDistance != undefined && endShapePositionObj != undefined)
                                isAllow = connectFn.verify(drawBoardId, shapeId, endShapePositionObj.id);
                            if (isAllow != true || shapeId == endShapePositionObj.id) { // 防止连接自己
                                $("#" + currSetting.connectLineIdPrefix + connectIndex).remove();
                            } else {
                                var connect = $("#" + currSetting.connectLineIdPrefix + connectIndex);
                                connect.attr("x2", endShapePositionObj.left - currSetting.endGap);
                                connect.attr("y2", endShapePositionObj.top + (endShapePositionObj.bottom - endShapePositionObj.top) / 2 + strokeWidth);
                                connect.attr("stroke", "#990033");
                                //connect.attr("marker-end", "url(#endArrow)");

                                var connectsObj = drawBoardData["part" + drawBoardId].connects;
                                connectsObj["connect" + connectIndex] = {
                                    id: connectIndex,
                                    shapes: [
                                        { shapeId: shapeId, type: "start" },
                                        { shapeId: endShapePositionObj.id, type: "end" },
                                    ]
                                }
                            }

                            currParent.unbind("mousemove mouseup");
                        });
                    }
                },
                add: function (drawBoardId, fromId, toId, connectId) {
                    var drawBoard = drawBoardData["part" + drawBoardId];
                    if (drawBoard) {
                        var fromShape = drawBoard.shape["shape" + fromId];
                        var toShape = drawBoard.shape["shape" + toId];
                        var connectsObj = drawBoardData["part" + drawBoardId].connects;

                        if (fromShape && toShape) {
                            if (!connectId) {
                                connectId = currSetting.connectLineIdPrefix + connectIndex;
                                connectIndex++;
                            }
                            if (!connectsObj["connect" + connectId]) {
                                var connectSvgIndex = drawBoardId;
                                var connectElement = common.deepCopy(connectConfig.line);

                                var from = $("#" + currSetting.shapeIdPrefix + fromId);
                                var fromWidth = parseInt(from.width());
                                var fromHeight = parseInt(from.height());
                                var fromMarginTop = parseInt(from.css("marginTop"));
                                var fromMarginLeft = parseInt(from.css("marginLeft"));

                                var to = $("#" + currSetting.shapeIdPrefix + toId);
                                var toWidth = parseInt(to.width());
                                var toHeight = parseInt(to.height());
                                var toMarginTop = parseInt(to.css("marginTop"));
                                var toMarginLeft = parseInt(to.css("marginLeft"));

                                var parentDom = from.parent();


                                var strokeWidth = parseInt(connectElement.properties["stroke-width"]) / 2;  // 上下居中偏移量
                                connectElement.properties.id = currSetting.connectLineIdPrefix + connectId;
                                connectElement.properties.x1 = fromMarginLeft + fromWidth + currSetting.stratGap;
                                connectElement.properties.y1 = fromMarginTop + fromHeight / 2 + strokeWidth;
                                connectElement.properties.x2 = toMarginLeft - currSetting.endGap;
                                connectElement.properties.y2 = toMarginTop + toHeight / 2 + strokeWidth;
                                connectElement.properties.stroke = "#990033";
                                connectElement.properties.onmousedown = uiName + ".parts.drawBoard.connect.checked('" + drawBoardId + "','" + connectId + "', true)";
                                connectElement.properties.onkeydown = uiName + ".parts.drawBoard.connect.delete('" + drawBoardId + "','" + connectId + "')";

                                if (connectSvgIdArr.length == 0 || connectSvgIdArr.indexOf(connectSvgIndex) == -1) {
                                    connectSvgIdArr.push(connectSvgIndex);
                                    var connectSvgElement = common.deepCopy(connectConfig.marker);
                                    connectSvgElement.properties.id = currSetting.connectIdPrefix + connectSvgIndex;
                                    parentDom.append(buildUtil.buildModule(connectSvgElement));
                                }
                                var connectSvgObj = parentDom.children("*[name='" + connectSvgName + "']").children("svg");
                                connectSvgObj.html(connectSvgObj.html() + buildUtil.buildModule(connectElement));

                                connectsObj["connect" + connectId] = {
                                    id: connectId,
                                    shapes: [{ shapeId: fromId, type: "start" }, { shapeId: toId, type: "end" }]
                                }
                            }
                        }
                    }
                },
                moveShape: function (drawBoardId, shapeId, top, left, width, height) {
                    var drawBoard = drawBoardData["part" + drawBoardId];
                    if (drawBoard) {
                        var connects = drawBoard.connects;
                        for (var connectsKey in connects) {
                            if (connects.hasOwnProperty(connectsKey)) {
                                var connect = connects[connectsKey];
                                var connectDom = $("#" + currSetting.connectLineIdPrefix + connect.id);
                                var strokeWidth = parseInt(connectDom.attr("stroke-width")) / 2;
                                if (connect.shapes[0].shapeId == shapeId) {   // start
                                    connectDom.attr("x1", parseInt(left) + parseInt(width) + currSetting.stratGap);
                                    connectDom.attr("y1", parseInt(top) + parseInt(width) / 2 + strokeWidth);
                                }
                                if (connect.shapes[1].shapeId == shapeId) {    // end
                                    connectDom.attr("x2", parseInt(left) - currSetting.endGap);
                                    connectDom.attr("y2", parseInt(top) + parseInt(width) / 2 + strokeWidth);
                                }
                            }
                        }
                    }
                },
                checked: function (drawBoardId, connectLineId) {
                    var event = window.event || arguments.callee.caller.arguments[0];
                    var connectDom = $("#" + currSetting.connectLineIdPrefix + connectLineId);
                    var status = connectDom.attr("status");
                    if (status == "1") {
                        connectDom.attr("stroke", "#990033");
                        connectDom.attr("status", "0");
                    } else {
                        connectDom.attr("stroke", "gray");
                        connectDom.attr("status", "1");
                    }
                    event.stopPropagation();
                },
                uncheckAll: function (drawBoardId) {
                    $("#" + currSetting.connectIdPrefix + drawBoardId + " svg").children().each(function () {
                        if ($(this).attr("status") == 1) {
                            $(this).attr("stroke", "#990033");
                            $(this).attr("status", "0");
                        }
                    });
                },
                delete: function (drawBoardId, connectLineId, verifyDeleteKey) {
                    var event = window.event || arguments.callee.caller.arguments[0];
                    var drawBoard = drawBoardData["part" + drawBoardId];
                    if (drawBoard && (verifyDeleteKey != true || event.keyCode == 8)) {
                        $("#" + currSetting.connectLineIdPrefix + connectLineId).remove();
                        // update connect verify data
                        if (drawBoard.params.connect.verify) {
                            var connectObj = drawBoard.connects["connect" + connectLineId];
                            if (connectObj) {
                                var connectShapes = connectObj.shapes;
                                var connectStartShape, connectEndShape;
                                for (var i = 0; i < connectShapes.length; i++) {
                                    var connectShape = connectShapes[i];
                                    if (connectShape.type == "start") connectStartShape = connectShape;
                                    else connectEndShape = connectShape;
                                }
                                var startShape = drawBoard.shape["shape" + connectStartShape.shapeId];
                                var endShape = drawBoard.shape["shape" + connectEndShape.shapeId];
                                if (startShape && startShape.params.connect) {
                                    startShape.params.connect.currOut -= 1;
                                    if (startShape.params.connect.currTo[endShape.params.type] != undefined)
                                        startShape.params.connect.currTo[endShape.params.type] -= 1;
                                }
                                if (endShape && endShape.params.connect) {
                                    endShape.params.connect.currIn -= 1;
                                    if (endShape.params.connect.currFrom[startShape.type] != undefined)
                                        endShape.params.connect.currFrom[startShape.type] -= 1;
                                }
                            }
                        }
                        delete drawBoard.connects["connect" + connectLineId];
                    }
                },
                deleteAll: function (drawBoardId) {
                    var drawBoard = drawBoardData["part" + drawBoardId];
                    if (drawBoard) {
                        var connects = drawBoard.connects;
                        for (var connectsKey in connects) {
                            if (connects.hasOwnProperty(connectsKey)) {
                                var connect = connects[connectsKey];
                                var connectDom = $("#" + currSetting.connectLineIdPrefix + connect.id);
                                if (connectDom.attr("status") == "1") {
                                    this.delete(drawBoardId, connect.id);
                                }
                            }
                        }
                    }
                },
                removeShape: function (drawBoardId, shapeId) {
                    var drawBoard = drawBoardData["part" + drawBoardId];
                    if (drawBoard) {
                        var connects = drawBoard.connects;
                        for (var connectsKey in connects) {
                            if (connects.hasOwnProperty(connectsKey)) {
                                var connect = connects[connectsKey];
                                if (connect.shapes[0].shapeId == shapeId || connect.shapes[1].shapeId == shapeId) {
                                    this.delete(drawBoardId, connect.id);
                                }
                            }
                        }
                    }
                },
                verify: function (drawBoardId, fromShapeId, toShapeId) {
                    var drawBoard = drawBoardData["part" + drawBoardId];
                    if (drawBoard) {
                        var shapes = drawBoard.shape;
                        var connectVerify = drawBoard.params.connect.verify;
                        var fromShape = shapes["shape" + fromShapeId].params;
                        var toShape = shapes["shape" + toShapeId].params;

                        if (fromShape && toShape) {
                            if (connectVerify) {
                                if (connectVerify[fromShape.type]) {
                                    if (!fromShape.connect) fromShape.connect = {};
                                    if (!fromShape.connect.currOut) fromShape.connect.currOut = 0;
                                    if (!fromShape.connect.currTo) fromShape.connect.currTo = {};

                                    var fromShapeConnect = connectVerify[fromShape.type];
                                    if (fromShapeConnect.maxOut) {
                                        if (fromShape.connect.currOut >= fromShapeConnect.maxOut) return false;
                                    }
                                    if (fromShapeConnect.to) {
                                        if (common.is.String(fromShapeConnect.to)) {
                                            if (fromShapeConnect.to != toShape.type) return false;
                                        } else if (common.is.Array(fromShapeConnect.to)) {
                                            if (fromShapeConnect.to.indexOf(toShape.type) == -1) return false;
                                        } else if (common.is.Object(fromShapeConnect.to)) {
                                            if (!fromShapeConnect.to[toShape.type]) return false;
                                            else {
                                                var fromShapeConnectCurrTo = fromShape.connect.currTo;
                                                var fromShapeConnectCurrToCount = fromShapeConnectCurrTo[toShape.type];
                                                if (!fromShapeConnectCurrToCount) fromShapeConnectCurrToCount = fromShapeConnectCurrTo[toShape.type] = 0;
                                                if (parseInt(fromShapeConnect.to[toShape.type]) <= fromShapeConnectCurrToCount) return false;
                                            }
                                        }
                                    }
                                }
                                if (connectVerify[toShape.type]) {
                                    if (!toShape.connect) toShape.connect = {};
                                    if (!toShape.connect.currIn) toShape.connect.currIn = 0;
                                    if (!toShape.connect.currFrom) toShape.connect.currFrom = {};

                                    var toShapeConnect = connectVerify[toShape.type];
                                    if (toShapeConnect.maxIn) {
                                        if (toShape.connect.currIn >= toShapeConnect.maxIn) return false;
                                    }
                                    if (toShapeConnect.from) {
                                        if (common.is.String(toShapeConnect.from)) {
                                            if (toShapeConnect.from != fromShape.type) return false;
                                        } else if (common.is.Array(toShapeConnect.from)) {
                                            if (toShapeConnect.from.indexOf(fromShape.type) == -1) return false;
                                        } else if (common.is.Object(toShapeConnect.from)) {
                                            if (!toShapeConnect.from[fromShape.type]) return false;
                                            else {
                                                var toShapeConnectCurrFrom = toShape.connect.currFrom;
                                                var toShapeConnectCurrFromCount = toShapeConnectCurrFrom[fromShape.type];
                                                if (!toShapeConnectCurrFromCount) toShapeConnectCurrFromCount = toShapeConnectCurrFrom[fromShape.type] = 0;
                                                if (parseInt(toShapeConnect.from[fromShape.type]) <= toShapeConnectCurrFromCount) return false;
                                            }
                                        }
                                    }
                                }

                                if (toShape.connect) {
                                    toShape.connect.currIn += 1;
                                    if (toShape.connect.currFrom[fromShape.type] != undefined) toShape.connect.currFrom[fromShape.type] += 1;
                                }
                                if (fromShape.connect) {
                                    fromShape.connect.currOut += 1;
                                    if (fromShape.connect.currTo[toShape.type] != undefined) fromShape.connect.currTo[toShape.type] += 1;
                                }
                            }
                            return true;
                        }
                    }
                    return false;
                }
            }

            function build(params) {

                var id = params.id;
                var style = params.style;
                var tools = params.tool;
                var region = params.region == true ? true : false;
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);

                // connect call
                var connect = params.connect;
                if (!connect) connect = params.connect = {};
                if (!connect.call) connect.call = {};
                if (!connect.call.create) connect.call.create = {};
                if (!connect.call.checked) connect.call.delete = {};
                if (!connect.call.delete) connect.call.delete = {};

                // shape config
                if (!params.shape) params.shape = {};
                params.shape.currNum = 0;
                params.shape.keyCurrNum = {};

                // build tool
                var toolsTitle = tools.title ? tools.title : "";
                var toolsStyle = tools.style ? tools.style : "";
                // var toolsDrag = tools.drag == false ? false : true;
                // var toolsDivide = tools.divide;
                // var toolsDirection = tools.direction;
                var toolsBars = tools.bars;

                var drawBoardElement = common.deepCopy(drawBoardConfig);
                var toolsElements = drawBoardElement.children[0].children[1].children;
                drawBoardElement.children[0].children[0].text = toolsTitle;   // title
                if (!common.isEmpty(style)) drawBoardElement.properties.style = style;
                if (!common.isEmpty(toolsStyle)) drawBoardElement.children[0].properties.style = toolsStyle;

                partCommon.initCall(tools, ["click", "drag"]);
                for (var toolsBarsIndex = 0; toolsBarsIndex < toolsBars.length; toolsBarsIndex++) {
                    var toolBar = toolsBars[toolsBarsIndex];

                    var barCol = parseInt(toolBar.col ? toolBar.col : 2);
                    var barStyle = toolBar.style;
                    var barElements = toolBar.elements;
                    partCommon.initItemCall(toolBar, tools.call, ["click", "drag"]);

                    // 计算宽度和 margin
                    var toolWidthStyle;
                    if (barCol == 1) toolWidthStyle = "width:80%;margin: 8px 10%;";
                    else if (barCol == 2) toolWidthStyle = "width:40%;margin:8px 5%;";
                    else if (barCol == 3) toolWidthStyle = "width:27%;margin:8px 3%;";
                    else if (barCol > 3 && barCol <= 5) toolWidthStyle = "width:" + ((100 - barCol * 4) / barCol) + "%;margin:6px 2%;";
                    else if (barCol > 5 && barCol <= 10) toolWidthStyle = "width:" + ((100 - barCol * 2) / barCol) + "%;margin:6px 1%;";
                    else if (barCol > 10) toolWidthStyle = "width:" + ((100 - barCol) / barCol) + "%;margin:5px 0.5%;";
                    else toolWidthStyle = "width:40%;margin:5%;";

                    for (var barIndex = 0; barIndex < barElements.length; barIndex++) {
                        var tool = barElements[barIndex];

                        var toolKey = currSetting.toolIdPrefix + id + "_" + tool.key;
                        var toolText = tool.text;
                        var toolTitle = tool.title ? tool.title : "";
                        var toolIcon = tool.icon;
                        var toolBgColor = tool.bgColor;
                        var toolIsClick = tool.click == false ? false : true;
                        var toolIsDrag = tool.drag == true ? true : false;
                        partCommon.initItemCall(tool, toolBar.call, ["click", "drag"]);

                        var bgStyle = "";
                        if (!common.isEmpty(toolBgColor)) bgStyle = bgStyle + "background-color:" + toolBgColor + ";";
                        var toolElement = { name: "span", properties: { id: toolKey, style: toolWidthStyle + bgStyle + barStyle, title: toolTitle } }

                        if (toolIsDrag) toolElement.properties.onmousedown = uiName + ".parts.drawBoard.tool.drag('" + id + "','" + toolsBarsIndex + "','" + tool.key + "')";
                        else if (toolIsClick) toolElement.properties.onclick = uiName + ".parts.drawBoard.tool.click('" + id + "','" + toolsBarsIndex + "','" + tool.key + "')";

                        if (!common.isEmpty(toolIcon)) toolElement.children = [{ name: "img", properties: { src: toolIcon, width: "100%", height: "100%" } }];
                        else toolElement.text = toolText;
                        toolsElements.push(toolElement);
                    }

                    if (toolsBarsIndex != toolsBars.length - 1) {
                        toolsElements.push(buildUtil.tags.brConfig[0]);
                        toolsElements.push({ name: "div", properties: { class: "p-divide-line" }, text: "" });
                    }
                }

                var panelElement = drawBoardElement.children[1];
                panelElement.properties.id = currSetting.drawIdPrefix + id;
                if (region) panelElement.properties.onmousedown = uiName + ".parts.drawBoard.region('" + id + "')";
                else panelElement.properties.onclick = uiName + ".parts.drawBoard.click('" + id + "')";

                return drawBoardData["part" + id] = {
                    id: id,
                    params: params,
                    config: drawBoardElement,
                    shape: {}, connects: {},
                }
            }

            return {
                build: build,
                getCurr: drawBoardFn.getCurr,
                getConfig: drawBoardFn.getConfig,
                click: drawBoardFn.click,
                region: drawBoardFn.region,
                zoom: drawBoardFn.zoom,
                tool: {
                    click: toolFn.click,
                    drag: toolFn.drag
                },
                shape: {
                    create: shapeFn.create,
                    dblclick: shapeFn.dblclick,
                    getConfig: shapeFn.getConfig,
                    change: shapeFn.change,
                    drag: shapeFn.drag,
                    checked: shapeFn.checked,
                    uncheckAll: shapeFn.uncheckAll,
                    delete: shapeFn.delete,
                    deleteAll: shapeFn.deleteAll
                },
                connect: {
                    create: connectFn.create,
                    add: connectFn.add,
                    checked: connectFn.checked,
                    uncheckAll: connectFn.uncheckAll,
                    delete: connectFn.delete,
                    deleteAll: connectFn.deleteAll,
                }
            }
        }

        function svgObj() {

            var currSetting = setting.svg;
            // var idPrefix = setting.svg.idPrefix;
            // var elementNamePrefix = setting.svg.elementNamePrefix;

            var svgData = {};
            var svgElementData = {};
            var svgConfig = {
                name: "svg",
                properties: { width: "100%", height: "100%", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
                children: []
            }
            var svgShapeConfig = {
                rect: { name: "rect", properties: { x: "0", y: "0", width: "50px", height: "50px", fill: "black", stroke: "black", "stroke-width": "2" }, text: "" },
                circle: { name: "circle", properties: { cx: "0", cy: "0", r: "", fill: "black", stroke: "black", "stroke-width": "2" }, text: "" },
                image: { name: "image", properties: { "xlink:href": "", x: "0", y: "0", height: "100%", width: "100%" }, text: "" },
                text: { name: "text", properties: { x: "50%", y: "50%", dy: ".3em", fill: "red", "text-anchor": "middle", "font-size": "12px" }, text: "" }
            }

            var svgFn = {
                getConfig: function (id) {
                    return partCommon.getConfig(id, svgData);
                },
                click: function (id) {
                    var curr = svgData["part" + id];
                    if (curr) {
                        var params = curr.params;
                        common.callFn(window.ui, params.call.click.fn, params.call.click.params, curr);
                    }

                },
                dblclick: function (id) {
                    var curr = svgData["part" + id];
                    if (curr) {
                        var params = curr.params;
                        common.callFn(window.ui, params.call.dblclick.fn, params.call.dblclick.params, curr);
                    }
                }
            }
            var svgElementFn = {
                click: function (id, elementId) {
                    var svgElementObj = svgElementData["svg" + id];
                    if (svgElementObj) {
                        var elementObj = svgElementObj["element" + elementId];
                        if (elementObj) {
                            var params = elementObj.params
                            common.callFn(window.ui, params.call.click.fn, params.call.click.params, elementObj.params);
                        }
                    }
                },
                dblclick: function (id, elementId) {
                    var svgElementObj = svgElementData["svg" + id];
                    if (svgElementObj) {
                        var elementObj = svgElementObj["element" + elementId];
                        if (elementObj) {
                            var params = elementObj.params
                            common.callFn(window.ui, params.call.dblclick.fn, params.call.dblclick.params, elementObj.params);
                        }
                    }
                },
                get: function (id, elementId) {
                    var params = undefined;
                    var svgElementObj = svgElementData["svg" + id];
                    if (svgElementObj) {
                        if (elementId) {
                            var elementObj = svgElementObj["element" + elementId];
                            if (elementObj) params = elementObj.params
                        } else {
                            params = svgElementObj;
                        }
                    }
                    return params;
                },
                add: function (id, params) {
                    var elementObj = buildElement(id, params);
                    var elementHtml = ui.build.buildModule(elementObj.config);
                    $("#" + currSetting.idPrefix + id).html($("#" + currSetting.idPrefix + id).html() + elementHtml);
                },
                change: function (id, elementId, properties, style, other) {
                    var svgElementObj = svgElementData["svg" + id];
                    if (svgElementObj) {
                        var elementObj = svgElementObj["element" + elementId];
                        if (elementObj) {
                            var params = elementObj.params
                            if (!params.properties) params.properties = {};
                            if (!params.other) params.other = {};
                            var shapeDom = $("#" + currSetting.elementNamePrefix + elementId);
                            if (properties) {
                                for (var propertiesKey in properties) {
                                    if (properties.hasOwnProperty(propertiesKey)) {
                                        var property = properties[propertiesKey];
                                        shapeDom.attr(propertiesKey, property);
                                        params.properties[propertiesKey] = property;
                                    }
                                }
                            }
                            if (other) {
                                for (var otherKey in other) {
                                    if (other.hasOwnProperty(otherKey)) {
                                        var otherValue = other[otherKey];
                                        params.other[otherKey] = otherValue;
                                    }
                                }
                            }
                            if (style && style.length > 0) {
                                style = style.replace(/(\s*$)/g, "");
                                var lastChar = style.charAt(style.length - 1);
                                if (lastChar != ";") style += ";";

                                var oldStyle = shapeDom.attr("style");
                                oldStyle = oldStyle ? oldStyle : "";

                                shapeDom.attr("style", style + oldStyle);
                            }
                        }
                    }
                },
                remove: function (id, elementId) {
                    $("#" + currSetting.elementNamePrefix + elementId).remove();
                    var svgElementObj = svgElementData["svg" + id];
                    if (svgElementObj) {
                        var elementObj = svgElementObj["element" + elementId];
                        if (elementObj) {
                            var params = elementObj.params;
                            delete svgElementObj["element" + elementId];
                        }
                    }
                }
            }

            function buildElement(id, element) {

                var elementId = element.id;
                var elementTitle = element.title ? element.title : "";
                var elementText = element.text;
                var elementType = element.type;
                var elementproperties = element.properties ? element.properties : {};
                var elementIsClick = element.click == true ? true : false;
                var elementIsDblclick = element.dblclick == true ? true : false;
                if (common.isEmpty(elementId)) elementId = element.id = common.getUuid(partIdPrefix);

                if (!element.call) element.call = {};
                if (!element.call.click) element.call.click = {};
                if (!element.call.dblclick) element.call.dblclick = {};
                partCommon.initCall(element, ["click", "dblclick"]);

                var svgshapeExteriorElement = common.deepCopy(svgShapeConfig[elementType]);
                svgshapeExteriorElement.properties.id = currSetting.elementNamePrefix + elementId;
                svgshapeExteriorElement.properties.title = elementTitle;
                if (elementText) svgshapeExteriorElement.text = elementText;
                if (element.call.click && elementIsClick != false)
                    svgshapeExteriorElement.properties.onclick = uiName + ".parts.svg.element.click('" + id + "','" + elementId + "')";
                if (element.call.dblclick && elementIsDblclick != false)
                    svgshapeExteriorElement.properties.ondblclick = uiName + ".parts.svg.element.dblclick('" + id + "','" + elementId + "')";

                for (var key in elementproperties)
                    if (elementproperties.hasOwnProperty(key))
                        svgshapeExteriorElement.properties[key] = elementproperties[key];

                var elementData = svgElementData["svg" + id];
                if (!elementData) elementData = svgElementData["svg" + id] = {};
                elementData["element" + elementId] = { id: elementId, params: element };

                return {
                    id: elementId,
                    params: element,
                    config: svgshapeExteriorElement
                }
            }

            function build(params) {

                var id = params.id;
                var style = params.style;
                var elements = params.elements;
                var isClick = params.click == true ? true : false;
                var isDblclick = params.dblclick == true ? true : false;
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                partCommon.initCall(params, ["click", "dblclick"]);

                var svgElement = common.deepCopy(svgConfig);
                svgElement.properties.id = currSetting.idPrefix + id;
                svgElement.properties.style = style;
                if (params.call.click && isClick != false) svgElement.properties.onclick = uiName + ".parts.svg.click('" + id + "')";
                if (params.call.dblclick && isDblclick != false) svgElement.properties.ondblclick = uiName + ".parts.svg.dblclick('" + id + "')";

                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];
                    var elementObj = buildElement(id, element);
                    svgElement.children.push(elementObj.config);
                }

                return svgData["part" + id] = {
                    id: id,
                    params: params,
                    config: svgElement
                }
            }

            return {
                build: build,
                getConfig: svgFn.getConfig,
                click: svgFn.click,
                dblclick: svgFn.dblclick,
                element: {
                    click: svgElementFn.click,
                    dblclick: svgElementFn.dblclick,
                    get: svgElementFn.get,
                    add: svgElementFn.add,
                    change: svgElementFn.change,
                    remove: svgElementFn.remove
                }
            }
        }

        function buttonsObj() {

            var currSetting = setting.buttons;
            //var idPrefix = setting.buttons.idPrefix;

            var buttonsData = {};
            var buttonsDivConfig = { name: "div", properties: { class: "p-buttons" }, children: [] }
            var buttonConfig = { name: "div", properties: { class: "p-button" }, text: "" }

            var buttonsFn = {
                getConfig: function (id) {
                    return partCommon.getConfig(id, buttonsData);
                },
                click: function (id, buttonId) {
                    var buttonsObj = buttonsData["part" + id];
                    var buttons = buttonsObj.params.buttons;

                    for (var index = 0; index < buttons.length; index++) {
                        var button = buttons[index];
                        if (button.id == buttonId) {
                            common.callFn(window.ui, button.call.click.fn, button.call.click.params, button);
                            return;
                        }
                    }
                }
            }

            function build(params) {
                var id = params.id;
                var align = params.align;
                var style = params.style;
                var buttons = params.buttons;
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);

                var buttonsElement = common.deepCopy(buttonsDivConfig);
                buttonsElement.properties.id = currSetting.idPrefix + id
                if (align && align == "left") buttonsElement.properties.class += " p-left";
                else if (align && align == "right") buttonsElement.properties.class += " p-right";
                if (style) buttonsElement.properties.style = style;

                for (var buttonIndex = 0; buttonIndex < buttons.length; buttonIndex++) {
                    var button = buttons[buttonIndex];
                    var buttonElement = common.deepCopy(buttonConfig);

                    var buttonId = button.id;
                    var buttonIsClick = button.click == false ? false : true;
                    var buttonText = button.text;
                    if (common.isEmpty(buttonId)) button.id = buttonId = common.getUuid(partIdPrefix);
                    partCommon.initCall(button, ["click", "dblclick"]);

                    if (!button.call) button.call = {};
                    if (button.call.click && buttonIsClick != false)
                        buttonElement.properties.onclick = uiName + ".parts.buttons.click('" + id + "','" + buttonId + "')";
                    buttonElement.properties.id = currSetting.idPrefix + id + "_" + buttonId;
                    buttonElement.text = buttonText;

                    buttonsElement.children.push(buttonElement);
                }

                params.id = id;
                return buttonsData["part" + id] = {
                    id: id,
                    params: params,
                    config: buttonsElement
                }
            }

            return {
                build: build,
                getConfig: buttonsFn.getConfig,
                click: buttonsFn.click
            }
        }

        function lineMapObj() {

            var currSetting = setting.lineMap;
            // var idPrefix = setting.lineMap.idPrefix;
            // var lineIdPrefix = setting.lineMap.lineIdPrefix;

            var positionData = {};
            var lineMapData = {};
            var lineMapConfig = {
                name: "div",
                properties: { style: "width:100%;height:100%;" },
                children: [{
                    name: "svg",
                    properties: { width: "100%", height: "100%", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
                    children: []
                }]
            }
            var lineConfig = {
                line: { name: "line", properties: { x1: "0", y1: "0", x2: "0", y2: "0", stroke: "black", "stroke-width": "2" }, text: "" },
                polyline: { name: "polyline", properties: { points: "0,0 0,0", stroke: "black", "stroke-width": "2" }, text: "" },
                path: { name: "path", properties: { d: "", stroke: "black", "stroke-width": "2" }, text: "" }
            }

            var positionsFn = {
                set: function (id, lineId, params) {

                    var zIndex = params.z;
                    var points = params.points;
                    var direction = params.direction ? params.direction : {};
                    var directionX = direction.x ? direction.x : "auto";
                    var directionY = direction.y ? direction.y : "auto";

                    var positionDataObj = positionData["position_" + id];
                    if (!positionDataObj) {
                        positionDataObj = positionData["position_" + id] = {
                            id: id, xData: {}, yData: {}, lines: {}
                        }
                    }

                    var positionLines = positionDataObj.lines;
                    var positionLineObj = positionLines["line_" + lineId] = {
                        id: lineId, z: zIndex, points: [], next: function (x, y) {
                            var position = x + "," + y;
                            var points = this.points;
                            var positionIndex = points.indexOf(position);
                            if (positionIndex > -1 && positionIndex < points.length - 1) {
                                var point = points[positionIndex + 1];
                                var pointArr = point.split(",")
                                return {
                                    x: pointArr[0],
                                    y: pointArr[1]
                                };
                            }
                            else return undefined;
                        }
                    };
                    var positionLinePoints = positionLineObj.points;

                    var pointArr = points.split(" ");
                    for (var i = 0; i < pointArr.length - 1; i++) {
                        var startPoint = pointArr[i];
                        var endPoint = pointArr[i + 1];

                        var startXYArr = startPoint.split(",");
                        var endXYArr = endPoint.split(",");

                        if (startXYArr.length == 2 && endXYArr.length == 2) {
                            var startX = parseInt(startXYArr[0]);
                            var startY = parseInt(startXYArr[1]);
                            var endX = parseInt(endXYArr[0]);
                            var endY = parseInt(endXYArr[1]);

                            var positionXDataObj = positionDataObj.xData;
                            var positionYDataObj = positionDataObj.yData;

                            var positionStartXObj = positionXDataObj["X" + startX];
                            var positionEndXObj = positionXDataObj["X" + endX];
                            if (!positionStartXObj)
                                positionStartXObj = positionXDataObj["X" + startX] = { value: startX, yData: {} }
                            if (!positionEndXObj)
                                positionEndXObj = positionXDataObj["X" + endX] = { value: endX, yData: {} }

                            var positionStartXYObj = positionStartXObj.yData["Y" + startY];
                            var positionEndXYObj = positionEndXObj.yData["Y" + endY];
                            if (!positionStartXYObj)
                                positionStartXYObj = positionStartXObj.yData["Y" + startY] = { value: startY }
                            if (!positionEndXYObj)
                                positionEndXYObj = positionEndXObj.yData["Y" + endY] = { value: endY }
                            positionStartXYObj["line" + lineId] = { id: lineId, type: "start", z: zIndex }
                            positionEndXYObj["line" + lineId] = { id: lineId, type: "end", z: zIndex }

                            if (directionX == "auto") {
                                if (startX > endX) directionX = -1; else directionX = 1;
                            }
                            if (directionY == "auto") {
                                if (startY > endY) directionY = -1; else directionY = 1;
                            }
                            var absDistanceX = Math.abs(endX - startX);
                            var absDistanceY = Math.abs(endY - startY);
                            var distance = absDistanceX >= absDistanceY ? absDistanceX : absDistanceY;
                            for (var j = 0; j <= distance; j++) {
                                var x = absDistanceX >= absDistanceY ? j : Math.round(absDistanceX * j / absDistanceY);
                                var y = absDistanceX >= absDistanceY ? Math.round(absDistanceY * j / absDistanceX) : j;
                                var fullX = startX + directionX * x;
                                var fullY = startY + directionY * y;
                                positionLinePoints.push(fullX + "," + fullY);
                            }
                        }
                    }
                },
                get: function (id, params) {

                    // var x = params.x;
                    // var y = params.y;
                    // var z = params.z;
                    // var direction = params.direction ? params.direction : {};
                    // var directionX = direction.x ? direction.x : 0;
                    // var directionY = direction.y ? direction.y : 0;

                    var positionObj = positionData["position_" + id];
                    console.log("positionObj:", positionObj);
                },
                getNextPoints(id, currLineId, params, range) {
                    var x = parseInt(params.x);
                    var y = parseInt(params.y);
                    var z = params.z ? parseInt(params.z) : undefined;
                    range = range ? range : 1;

                    var positionObj = positionData["position_" + id];
                    var nextPosition = [];

                    if (positionObj) {
                        var includeCurrLineId = false;
                        var currLines = positionObj.lines;
                        var currXObj = positionObj.xData["X" + x];
                        if (currXObj) {
                            var currXYObj = currXObj.yData["Y" + y];
                            if (currXYObj) {
                                for (var currXYKey in currXYObj) {
                                    if (currXYObj.hasOwnProperty(currXYKey) && currXYKey != "value") {
                                        var currXYLine = currXYObj[currXYKey];
                                        var currLineObj = currLines["line_" + currXYLine.id];
                                        if (currXYLine.id == currLineId) includeCurrLineId = true;
                                        if (currLineObj) {
                                            if (currXYLine.type == "start" || currXYLine.type == "all") {
                                                var next = currLineObj.next(currXObj.value, currXYObj.value);
                                                if (next) nextPosition.push({ id: currXYLine.id, x: next.x, y: next.y, z: currXYLine.z });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (currLineId && !includeCurrLineId) {
                            var lineObj = currLines["line_" + currLineId];
                            var next = lineObj.next(x, y);
                            if (next) nextPosition.push({ id: lineObj.id, x: next.x, y: next.y, z: lineObj.z });
                        }
                    }
                    return nextPosition;
                }
            }

            function build(params) {

                var id = params.id;
                var style = params.style;
                var elements = params.elements;
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);

                var lineMapElement = common.deepCopy(lineMapConfig);

                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];

                    var elementId = element.id;
                    var elementType = element.type ? element.type : "line";
                    var elementZ = element.z;
                    var elementDirection = element.direction;
                    var elementproperties = element.properties;
                    if (common.isEmpty(elementId)) lelementId = element.id = common.getUuid(partIdPrefix);

                    var lineElement = common.deepCopy(lineConfig[elementType]);
                    lineElement.properties.id = currSetting.lineIdPrefix + elementId;
                    for (var key in elementproperties)
                        if (elementproperties.hasOwnProperty(key))
                            lineElement.properties[key] = elementproperties[key];
                    lineMapElement.children[0].children.push(lineElement);

                    if ("line" == elementType)
                        positionsFn.set(id, elementId, {
                            points: elementproperties.x1 + "," + elementproperties.y1 + " " + elementproperties.x2 + "," + elementproperties.y2,
                            direction: elementDirection,
                            z: elementZ
                        });
                    else if ("polyline" == elementType)
                        positionsFn.set(id, elementId, {
                            points: elementproperties.points,
                            direction: elementDirection,
                            z: elementZ
                        });
                }

                return lineMapData["part" + id] = {
                    id: id,
                    params: params,
                    config: lineMapElement
                }
            }

            return {
                build: build,
                position: {
                    get: positionsFn.get,
                    getNextPoints: positionsFn.getNextPoints
                }
            }
        }

        function customObj() {

            var currSetting = setting.custom;
            //var idPrefix = setting.custom.idPrefix;

            var customData = {};
            var customConfig = {
                div: { name: "div", properties: { style: "width:100%;height:100%;" } },
                iframe: { name: "iframe", properties: { frameborder: "0", width: "100%", height: "100%", src: "" }, text: "" }
            }

            customFn = {
                getConfig: function (id) {
                    return partCommon.getConfig(id, customData);
                }
            }

            function build(params) {
                var id = params.id;
                var type = params.type;
                var content = params.content;
                var properties = params.properties;
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);

                var customElement;
                if (type == "iframe") {
                    customElement = common.deepCopy(customConfig.iframe);
                } else if (type == "include") {
                    customElement = common.deepCopy(customConfig.div);
                    common.ajax({
                        method: 'GET', url: content, async: false,
                        success: function (tempText) { customElement.text = tempText; }
                    });
                } else { // type == "temp"
                    customElement = common.deepCopy(customConfig.div);
                    if (common.is.Object(content)) customElement.children = [content];
                    else if (common.is.Array(content)) customElement.children = content;
                    else customElement.text = content;
                }

                customElement.properties.id = currSetting.idPrefix + id
                for (var key in properties)
                    if (properties.hasOwnProperty(key))
                        customElement.properties[key] = properties[key];

                return customData["part" + id] = {
                    id: id,
                    params: params,
                    config: customElement
                };
            }

            return {
                build: build,
                getConfig: customFn.getConfig
            }
        }

        function tableObj() {

            var currSetting = setting.table;
            // var idPrefix = setting.table.idPrefix;
            // var checkIdPrefix = setting.table.checkIdPrefix;
            // var checkAllIdPrefix = setting.table.checkAllIdPrefix;
            // //var rowNamePrefix = setting.table.rowNamePrefix;
            // var colNamePrefix = setting.table.colNamePrefix;
            // var defaultRowCount = setting.table.defaultRowCount;

            var tableData = {};
            var tableConfig = {
                name: "div", properties: { class: "p-table" }, children: [{
                    name: "table", properties: {}, children: [
                        { name: "thead", properties: {}, children: [] },
                        { name: "tbody", properties: {}, children: [] },
                    ]
                }]
            };
            var tableElementConfig = {
                tr: { name: "tr", properties: {}, children: [] },
                th: { name: "th", properties: {} },
                td: { name: "td", properties: {} },
                check: { name: "input", properties: { type: "checkbox" } },
                operation: { name: "span", properties: { class: "p-table-operation" } }
            }

            tableFn = {
                getConfig: function (id) {
                    return partCommon.getConfig(id, tableData);
                },
                getChecked: function (id) {
                    var tbodyDom = $("#" + currSetting.idPrefix + id).children("tbody");
                    var domIndex = 0;
                    var checkData = [];
                    tbodyDom.find("input[name='" + currSetting.checkIdPrefix + id + "']").each(function () {
                        if ($(this).prop("checked")) checkData.push(data[domIndex]);
                        domIndex++;
                    });
                    return checkData;
                },
                removeChecked: function (id) {
                    var curr = partCommon.getConfig(id, tableData);
                    var currData = curr.body;

                    var tbodyDom = $("#" + currSetting.idPrefix + id).children("tbody");
                    var domIndex = 0;
                    var removeData = [];
                    tbodyDom.find("input[name='" + currSetting.checkIdPrefix + id + "']").each(function () {
                        if ($(this).prop("checked")) {
                            removeData.push(currData[domIndex]);
                            $(this).parents("tr").remove();
                            currData.splice(domIndex, 1);
                        } else {
                            domIndex++;
                        }
                    });
                    return removeData;
                }
            }
            colFn = {
                add: function (tableId, arr, index) {
                    // arr string function
                },
                remove: function (tableId, key) {
                    var curr = tableData["part" + tableId];
                    if (curr) {
                        var header = curr.params.header;
                        var keyIndex = header.indexOf(5);
                        if (keyIndex > 0) {
                            header.splice(keyIndex, 1);
                            $("#" + currSetting.idPrefix + tableId).find(td["name='" + currSetting.colNamePrefix + key + "'"]).remove();
                        }
                    }
                },
                edit: function (tableId, newHeader, data) {
                    var curr = tableData["part" + tableId];
                    if (curr && data) {
                        var params = curr.params;
                        params.header = newHeader;
                        params.body = data;
                        console.log(newHeader)
                        var tableObj = build(params);
                        var tableHtml = buildUtil.buildModule(tableObj.config);
                        //console.log($("#" + currSetting.idPrefix + tableId).html());
                        $("#" + currSetting.idPrefix + tableId).parent().html(tableHtml);
                    }
                },
            }
            rowFn = {
                dblclick: function (tableId, index) {
                    var curr = tableData["part" + tableId];
                    if (curr) {
                        var call = curr.params.call;
                        var currData = curr.params.body[index];
                        common.callFn(window.ui, call.dblclick.fn, call.dblclick.params, { tableId: tableId, index: index, data: currData });
                    }
                },
                check: function (tableId, status, index) {
                    if (status == undefined) status = "auto";
                    var tbodyDom = $("#" + currSetting.idPrefix + tableId).children("tbody");
                    if (index) {
                        var willCheck = tbodyDom.find("input[name='" + currSetting.checkIdPrefix + tableId + "']:eq('" + index + "')");
                        if (status == true) willCheck.prop("checked", true);
                        else if (status == false) willCheck.prop("checked", false);
                        else willCheck.prop("checked", willCheck.prop("checked") == true ? false : true);
                    } else {
                        tbodyDom.find("input[name='" + currSetting.checkIdPrefix + tableId + "']").each(function () {
                            if (status == true) $(this).prop("checked", true);
                            else if (status == false) $(this).prop("checked", false);
                            else $(this).prop("checked", $(this).prop("checked") == true ? false : true);
                        });
                    }
                },
                operation: function (tableId, index, key) {
                    var curr = tableData["part" + tableId];
                    if (curr) {
                        var currData = curr.params.body[index];
                        var currOperation = curr.params.operations[key];
                        var callBind = { tableId: tableId, index: index, data: currData, operation: currOperation };
                        common.callFn(window.ui, currOperation.fn, currOperation.params, callBind);
                    }
                },
                add: function (tableId, data, index) {
                    var curr = tableData["part" + tableId];
                    if (curr) {
                        if (!index || index < 0) index = 0;
                        var header = curr.params.header;
                        var showIndex = curr.params.showIndex;
                        var showCheck = curr.params.showCheck;
                        var operations = curr.params.operations;
                        var trConfig = buildBody(tableId, header, data, showIndex, showCheck, operations);
                        var indexTr = $("#" + currSetting.idPrefix + tableId).children("tbody").children("tr:eq(" + index + ")");
                        indexTr.before(buildUtil.buildModule([trConfig]));
                        curr.params.body.splice(index, 0, data);
                    }
                },
                remove: function (tableId, index) {
                    var curr = tableData["part" + tableId];
                    if (curr) {
                        if (index) {
                            var data = curr.params.body;
                            data.splice(index, 1);
                            $("#" + currSetting.idPrefix + tableId).children("tbody").children("tr:eq(" + index + ")").remove();
                        } else {
                            curr.params.body = [];
                            $("#" + currSetting.idPrefix + tableId).children("tbody").children("tr").remove();
                        }

                    }
                },
                getData: function (tableId, index) {
                    var curr = tableData["part" + tableId];
                    if (curr) {
                        var data = curr.params.body;
                        return data[index];
                    }
                },
                setData: function (tableId, data, index) {
                    var curr = tableData["part" + tableId];
                    if (curr) {
                        var header = curr.params.header;
                        var showIndex = curr.params.showIndex;
                        var showCheck = curr.params.showCheck;
                        var operations = curr.params.operations;
                        if (!index) {
                            curr.params.body = data;
                            var trConfig = [];
                            for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {
                                var currRowData = data[dataIndex];
                                currRowData.$index = dataIndex + 1 + "";
                                var dataTr = buildBody(tableId, header, currRowData, showIndex, showCheck, operations);
                                trConfig.push(dataTr);
                            }
                            if (currSetting.defaultRowCount > data.length) {
                                var defaultRowLength = currSetting.defaultRowCount - data.length;
                                for (var dRowIndex = 0; dRowIndex < defaultRowLength; dRowIndex++) {
                                    var nullTr = buildBody(tableId, header, undefined, showIndex, showCheck, operations);
                                    trConfig.push(nullTr);
                                }
                            }
                            var newDataHtml = buildUtil.buildModule(trConfig);
                            $("#" + currSetting.idPrefix + tableId).children("tbody").html(newDataHtml);
                        } else {
                            data.$index = index + 1 + "";
                            var newDataHtml = buildBody(tableId, header, data, showIndex, showCheck, operations);
                            $("#" + currSetting.idPrefix + tableId).children("tbody").children("tr:eq(" + index + ")").html(newDataHtml);
                            curr.params.body.splice(index, 0, data);
                        }
                    }
                }
            }

            function buildBody(id, header, data, showIndex, showCheck, operations) {
                var dataTr = common.deepCopy(tableElementConfig.tr);
                if (showCheck == true) {
                    var colTd = common.deepCopy(tableElementConfig.td);
                    if (data) {
                        var checkElement = common.deepCopy(tableElementConfig.check);
                        checkElement.properties.name = currSetting.checkIdPrefix + id;
                        colTd.children = [checkElement];
                    } else {
                        colTd.text = "";
                    }
                    dataTr.children.push(colTd);
                }
                if (showIndex == true) {
                    var colTd = common.deepCopy(tableElementConfig.td);
                    colTd.text = data && data.$index ? data.$index : "";
                    dataTr.children.push(colTd);
                }
                for (var headerKey in header) {
                    if (header.hasOwnProperty(headerKey)) {
                        var colTd = common.deepCopy(tableElementConfig.td);
                        var dataKey = headerKey;
                        colTd.properties.name = currSetting.colNamePrefix + dataKey;
                        colTd.text = data ? data[dataKey] : "";
                        dataTr.children.push(colTd);
                    }
                }
                if (operations) {
                    var colTd = common.deepCopy(tableElementConfig.td);
                    if (data) {
                        colTd.children = [];
                        for (var operationKey in operations) {
                            if (operations.hasOwnProperty(operationKey)) {
                                var operation = operations[operationKey];
                                operation.key = operationKey;
                                var operationSpan = common.deepCopy(tableElementConfig.operation);
                                operationSpan.text = operation.name;
                                operationSpan.properties.onclick = uiName + ".parts.table.row.operation('" + id + "','" + (parseInt(data.$index) - 1) + "','" + operationKey + "')";
                                colTd.children.push(operationSpan);
                            }
                        }
                    } else {
                        colTd.text = "";
                    }
                    dataTr.children.push(colTd);
                }
                return dataTr;
            }

            function build(params) {
                var id = params.id;
                var align = params.align;
                var bodyAlign = params.bodyAlign;
                var isDblclick = params.dblclick == true ? true : false;
                var showIndex = params.showIndex == true ? true : false;
                var showCheck = params.showCheck == true ? true : false;
                var header = params.header ? params.header : {};
                var operations = params.operations;
                var body = params.body;
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                partCommon.initCall(params, ["dblclick"]);

                tableDivElement = common.deepCopy(tableConfig);
                tableElement = tableDivElement.children[0];
                tableElement.properties.id = currSetting.idPrefix + id;

                if (!align || (align != "center" && align != "left" && align != "right"))
                    align = currSetting.defaultHeaderAlign;
                if (!bodyAlign || (bodyAlign != "center" && bodyAlign != "left" && bodyAlign != "right"))
                    bodyAlign = currSetting.defaultBodyAlign;
                tableElement.children[0].properties.class = commonStyle.align + align;
                tableElement.children[1].properties.class = commonStyle.align + bodyAlign;

                var headerTr = common.deepCopy(tableElementConfig.tr);
                if (showCheck == true) {
                    var colTh = common.deepCopy(tableElementConfig.th);
                    var checkElement = common.deepCopy(tableElementConfig.check);
                    checkElement.properties.name = currSetting.checkAllIdPrefix + id;
                    checkElement.properties.onclick = uiName + ".parts.table.row.check('" + id + "', this.checked)";
                    colTh.children = [checkElement];
                    headerTr.children.push(colTh);
                }
                if (showIndex == true) {
                    var colTh = common.deepCopy(tableElementConfig.th);
                    colTh.text = "INDEX";
                    headerTr.children.push(colTh);
                }
                for (var headerKey in header) {
                    if (header.hasOwnProperty(headerKey)) {
                        var colTh = common.deepCopy(tableElementConfig.th);
                        var colText = header[headerKey]
                        colTh.properties.name = currSetting.colNamePrefix + colText;
                        colTh.text = colText;
                        headerTr.children.push(colTh);
                    }
                }
                if (operations) {
                    var colTh = common.deepCopy(tableElementConfig.th);
                    colTh.text = "操作";
                    headerTr.children.push(colTh);
                }
                tableElement.children[0].children.push(headerTr);

                for (var rowIndex = 0; rowIndex < body.length; rowIndex++) {
                    var data = body[rowIndex];
                    data.$index = (rowIndex + 1) + "";
                    var dataTr = buildBody(id, header, data, showIndex, showCheck, operations);
                    if (isDblclick == true && params.call.dblclick) {
                        dataTr.properties.ondblclick = uiName + ".parts.table.row.dblclick('" + id + "', '" + (parseInt(data.$index) - 1) + "')";
                    }
                    tableElement.children[1].children.push(dataTr);
                }
                if (currSetting.defaultRowCount > body.length) {
                    var defaultRowLength = currSetting.defaultRowCount - body.length;
                    for (var dRowIndex = 0; dRowIndex < defaultRowLength; dRowIndex++) {
                        var dataTr = buildBody(id, header, undefined, showIndex, showCheck, operations);
                        tableElement.children[1].children.push(dataTr);
                    }
                }

                return tableData["part" + id] = {
                    id: id,
                    params: params,
                    config: tableDivElement
                };
            }

            return {
                build: build,
                getConfig: tableFn.getConfig,
                getChecked: tableFn.getChecked,
                removeChecked: tableFn.removeChecked,
                col: {
                    add: colFn.add,
                    remove: colFn.remove,
                    edit: colFn.edit
                },
                row: {
                    dblclick: rowFn.dblclick,
                    check: rowFn.check,
                    operation: rowFn.operation,
                    add: rowFn.add,
                    remove: rowFn.remove,
                    getData: rowFn.getData,
                    setData: rowFn.setData
                }
            }
        }

        function tabsObj() {

            var currSetting = setting.tabs;
            // var idPrefix = setting.tabs.idPrefix;
            // var tabNamePrefix = setting.tabs.tabNamePrefix;

            var tabsData = {}
            var tabsConfig = {
                name: "div", properties: { class: "p-tabs" }, children: [
                    { name: "ul", properties: { class: "p-tabs-title" }, children: [] },
                    { name: "div", properties: { class: "p-tabs-body" }, children: [] },
                ]
            };
            var tabConfig = {
                title: {
                    name: "li", properties: {}, children: [
                        { name: "span", properties: { class: "p-left" }, text: "" },
                        { name: "span", properties: { class: "p-right" }, text: "x" }
                    ]
                },
                body: { name: "div", properties: { class: "p-tabs-tab" } }
            }

            tabsFn = {
                getConfig: function (id) {
                    return partCommon.getConfig(id, tabsData);
                }
            }
            tabFn = {
                open: function (id, params) {
                    var currTabs = tabsData["part" + id];
                    if (currTabs) {
                        var tabObj = buildTab(id, params, currTabs.params.call);
                        $("#" + currSetting.idPrefix + id).children("ul").append(buildUtil.buildModule(tabObj.config.title));
                        $("#" + currSetting.idPrefix + id).children("div").append(buildUtil.buildModule(tabObj.config.body));
                        currTabs.tabs["tab" + tabObj.id] = tabObj;
                        tabFn.checked(id, tabObj.id);
                        if (currTabs.params.call.open.fn)
                            common.callFn(window.ui, currTabs.params.call.open.fn, currTabs.params.call.open.params, params);
                    }
                },
                checked: function (id, elementId) {
                    var currTabs = tabsData["part" + id];
                    if (currTabs) {
                        if (!elementId) for (var key in currTabs.tabs) if (currTabs.tabs.hasOwnProperty(key)) {
                            elementId = currTabs.tabs[key].id;
                            break;
                        }
                        var currTab = currTabs.tabs["tab" + elementId];
                        if (currTab) {
                            var titleDom = $("#" + currSetting.idPrefix + id).children("ul").children("li[name='" + currSetting.tabNamePrefix + elementId + "']");
                            titleDom.addClass("p-checked");
                            titleDom.siblings("li").removeClass("p-checked");
                            var bodyDom = $("#" + currSetting.idPrefix + id).children("div").children("div[name='" + currSetting.tabNamePrefix + elementId + "']");
                            bodyDom.addClass("p-checked");
                            bodyDom.siblings("div").removeClass("p-checked");
                            if (currTab.params.call.checked.fn)
                                common.callFn(window.ui, currTab.params.call.checked.fn, currTab.params.call.checked.params, currTab);
                        }
                    }
                },
                close: function (id, elementId) {
                    var currTabs = tabsData["part" + id];
                    if (currTabs) {
                        var currTab = currTabs.tabs["tab" + elementId];
                        if (currTab) {
                            var titleDom = $("#" + currSetting.idPrefix + id).children("ul").children("li[name='" + currSetting.tabNamePrefix + elementId + "']");
                            var bodyDom = $("#" + currSetting.idPrefix + id).children("div").children("div[name='" + currSetting.tabNamePrefix + elementId + "']");
                            titleDom.remove();
                            bodyDom.remove();
                            delete currTabs.tabs["tab" + elementId];

                            var checkedLi = $("#" + currSetting.idPrefix + id).children("ul").children(".p-checked");
                            if (checkedLi.length == 0) this.checked(id);
                            if (currTab.params.call.close.fn)
                                common.callFn(window.ui, currTab.params.call.close.fn, currTab.params.call.close.params, currTab);

                            var event = window.event || arguments.callee.caller.arguments[0];
                            event.stopPropagation();
                        }
                    }
                }
            }

            function buildTab(tabsId, params, call) {
                var id = params.id;
                var isDefault = params.default;
                var title = params.title;
                var body = params.body;
                var isClose = params.close == false ? false : true;
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                partCommon.initItemCall(params, call, ["checked", "close"]);

                var titleElement = common.deepCopy(tabConfig.title);
                if (title.style) titleElement.properties.style = title.style;
                titleElement.properties.onclick = uiName + ".parts.tabs.tab.checked('" + tabsId + "','" + id + "')";
                titleElement.properties.name = currSetting.tabNamePrefix + id;
                titleElement.children[0].text = title.text ? title.text : "";
                titleElement.children[1].properties.onclick = uiName + ".parts.tabs.tab.close('" + tabsId + "','" + id + "')";
                if (isDefault) titleElement.properties.class = "p-checked";
                if (!isClose) titleElement.children.splice(1, 1);  // 删除关闭按钮

                var bodyElement = common.deepCopy(tabConfig.body);
                if (isDefault) bodyElement.properties.class += " p-checked";
                if (body.style) bodyElement.properties.style = body.style;
                bodyElement.properties.name = currSetting.tabNamePrefix + id;
                partCommon.buildBody(bodyElement, body.content);

                return {
                    id: id,
                    params: params,
                    config: { title: titleElement, body: bodyElement }
                }
            }

            function build(params) {
                var id = params.id;
                var elements = params.elements;
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                partCommon.initCall(params, ["checked", "open", "close"]);

                var isHasDefault = false;
                tabsElement = common.deepCopy(tabsConfig);
                tabsElement.properties.id = currSetting.idPrefix + id;

                var tabs = {};
                for (var index = 0; index < elements.length; index++) {
                    var element = elements[index];
                    // 只允许一个被选择
                    if (element.default == true && isHasDefault == true) element.default = false;
                    if (element.default == true) isHasDefault = true;

                    var tabObj = buildTab(id, element, params.call);
                    tabsElement.children[0].children.push(tabObj.config.title);
                    tabsElement.children[1].children.push(tabObj.config.body);
                    tabs["tab" + tabObj.id] = tabObj;
                }

                return tabsData["part" + id] = {
                    id: id,
                    params: params,
                    config: tabsElement,
                    tabs: tabs
                };
            }

            return {
                build: build,
                getConfig: tabsFn.getConfig,
                tab: {
                    checked: tabFn.checked,
                    open: tabFn.open,
                    close: tabFn.close
                }
            }
        }

        function pageObj() {

            var currSetting = setting.page;
            // var idPrefix = setting.page.idPrefix;
            // var lastText = setting.page.lastText;
            // var nextText = setting.page.nextText;
            // var firstlyText = setting.page.firstlyText;
            // var finallyText = setting.page.finallyText;
            // var toText = setting.page.toText;

            var pageData = {}
            var pageConfig = { name: "div", properties: { class: "p-page" }, children: [] };
            var pageChildConfig = {
                page: { name: "span", properties: {}, text: "" },
                next: { name: "span", properties: {}, text: "" },
                last: { name: "span", properties: {}, text: "" },
                input: {
                    name: "span", properties: {}, children: [
                        { name: "span", properties: {}, text: "" },
                        { name: "input", properties: { type: "text" } },
                    ]
                },
                firstly: { name: "span", properties: {}, text: "" },
                finally: { name: "span", properties: {}, text: "" },
            }

            pageFn = {
                getConfig: function (id) {
                    return partCommon.getConfig(id, pageData);
                },
                getCurr: function (id) {
                    var currPage = pageData["part" + id];
                    return partCommon.getCurr(id, pageData);
                },
                click: function (id, page) {
                    var currPage = pageData["part" + id];
                    if (currPage) {
                        var params = currPage.params;
                        params.curr = page ? parseInt(page) : 1;
                        if (page.isFlush != false) {
                            var childrenHtml = buildUtil.buildModule(getPageChildren(id, params));
                            $("#" + currSetting.idPrefix + id).html(childrenHtml);
                        }
                        common.callFn(window.ui, params.call.click.fn, params.call.click.params, params);
                    }
                },
                flush: function (id) {
                    var currPage = pageData["part" + id];
                    if (currPage) {
                        var childrenHtml = buildUtil.buildModule(getPageChildren(id, currPage.params));
                        $("#" + currSetting.idPrefix + id).html(childrenHtml);
                    }
                }
            }

            function getPageChildren(id, params) {
                var pageChildren = [];
                var curr = params.curr ? parseInt(params.curr) : 1;
                var maxPage = params.maxPage;
                var showSize = params.showSize ? parseInt(params.showSize) : 10;
                var flushType = params.flushType == "manual"
                var isLast = params.last = params.last == false ? false : true;
                var isNext = params.next = params.next == false ? false : true;
                var isInput = params.input = params.input == false ? false : true;
                var isFirstly = params.firstly = params.firstly == false ? false : true;
                var isFinally = params.finally = params.finally == false ? false : true;

                if (curr < 1) curr = 1;
                if (isFirstly) {
                    var firstlyElement = common.deepCopy(pageChildConfig.firstly);
                    firstlyElement.text = currSetting.firstlyText;
                    if (curr == 1) firstlyElement.properties.class = "p-forbid";
                    else firstlyElement.properties.onclick = uiName + ".parts.page.click('" + id + "', '1')";
                    pageChildren.push(firstlyElement);
                }

                if (isLast) {
                    var lastPage = curr == 1 ? 1 : (curr - 1);
                    var lastElement = common.deepCopy(pageChildConfig.last);
                    lastElement.text = currSetting.lastText;
                    if (curr == 1) lastElement.properties.class = "p-forbid";
                    else lastElement.properties.onclick = uiName + ".parts.page.click('" + id + "', '" + lastPage + "')";
                    pageChildren.push(lastElement);
                }

                if (showSize > maxPage) showSize = maxPage;
                var isOdd = showSize % 2 == 1 ? true : false;
                var middleShowSize = parseInt(showSize / 2);
                var pageNum, maxPageSizeNum;
                if (curr <= middleShowSize) {
                    pageNum = 1;
                    maxPageSizeNum = showSize;
                } else if (curr > (maxPage - middleShowSize)) {
                    pageNum = maxPage - showSize + 1;
                    maxPageSizeNum = maxPage;
                } else {
                    pageNum = curr - middleShowSize;
                    if (!isOdd) pageNum = pageNum + 1;
                    maxPageSizeNum = curr + middleShowSize;
                }
                for (; pageNum <= maxPageSizeNum; pageNum++) {
                    var pageElement = common.deepCopy(pageChildConfig.page);
                    if (curr == pageNum) pageElement.properties.class = "p-checked";
                    else pageElement.properties.onclick = uiName + ".parts.page.click('" + id + "', '" + pageNum + "')";
                    pageElement.text = pageNum;
                    pageChildren.push(pageElement);
                }

                if (isInput) {
                    var inputElement = common.deepCopy(pageChildConfig.input);
                    inputElement.children[0].text = currSetting.toText + " ";
                    inputElement.children[1].properties.onblur = uiName + ".parts.page.click('" + id + "', this.value)";
                    pageChildren.push(inputElement);
                }

                if (isNext) {
                    var nextPage = curr >= maxPage ? maxPage : (curr + 1);
                    var nextElement = common.deepCopy(pageChildConfig.next);
                    nextElement.text = currSetting.nextText;
                    if (curr == maxPage) nextElement.properties.class = "p-forbid";
                    else nextElement.properties.onclick = uiName + ".parts.page.click('" + id + "', '" + nextPage + "')";
                    pageChildren.push(nextElement);
                }

                if (isFinally) {
                    var finallyElement = common.deepCopy(pageChildConfig.finally);
                    finallyElement.text = currSetting.finallyText;
                    if (curr == maxPage) finallyElement.properties.class = "p-forbid";
                    else finallyElement.properties.onclick = uiName + ".parts.page.click('" + id + "', '" + maxPage + "')";
                    pageChildren.push(finallyElement);
                }

                return pageChildren;
            }

            function build(params) {
                var id = params.id;
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                if (!params.call) params.call = {};
                if (!params.call.click) params.call.click = {};

                pageElement = common.deepCopy(pageConfig);
                pageElement.properties.id = currSetting.idPrefix + id;
                pageElement.children = getPageChildren(id, params);

                return pageData["part" + id] = {
                    id: id,
                    params: params,
                    config: pageElement,
                };
            }

            return {
                build: build,
                getConfig: pageFn.getConfig,
                getCurr: pageFn.getCurr,
                flush: pageFn.flush,
                click: pageFn.click,
            }
        }

        function navObj() {

            var currSetting = setting.nav;
            // var idPrefix = setting.nav.idPrefix;
            // var listIdPrefix = setting.nav.listIdPrefix;
            // var groupIdPrefix = setting.nav.groupIdPrefix;
            // var nodeIdPrefix = setting.nav.nodeIdPrefix;

            var navData = {};
            var navConfig = {
                name: "div", properties: { class: "p-nav" }, children: [
                    {
                        name: "div", properties: { class: "p-nav-bar" }, children: [
                            {
                                name: "div", properties: { class: "p-nav-img" }, children: [
                                    { name: "img", properties: { height: "100%" } }
                                ]
                            },
                            { name: "div", properties: { class: "p-nav-title" }, text: "" },
                            { name: "div", properties: { class: "p-nav-main" }, children: [] },
                            { name: "div", properties: { class: "p-nav-tool" }, text: "" },
                        ]
                    },
                    { name: "div", properties: { class: "p-nav-children" }, children: [] }
                ]
            };
            var navListConfig = {
                name: "div", properties: { class: "p-nav-list" }, children: []
            };
            var navGroupConfig = {
                name: "div", properties: { class: "p-nav-group" }, children: [
                    { name: "div", properties: { class: "p-title" }, text: "" },
                    { name: "div", properties: { class: "p-children" }, children: [] }
                ]
            };
            var navNodeConfig = { name: "span", properties: { class: "p-nav-node" }, text: "" };

            navFn = {
                getConfig: function (id) {
                    return partCommon.getConfig(id, navData);
                },
                init: function (id, nodeIds) { },
                checked: function (id, currListId, nodeId) {
                    var currNav = navData["part" + id];
                    if (currNav) {
                        var currList = currNav.list["list" + currListId];
                        if (currList) {
                            var currNode = currList.nodes["node" + nodeId];
                            if (currNode) {
                                if (currNode.to && currNav.list["list" + currNode.to]) {
                                    var currGread = currList.params.gread;
                                    var toListDom = $("#" + currSetting.listIdPrefix + id + "_" + currNode.to);
                                    toListDom.css("display", "block");
                                    toListDom.siblings().each(function () {
                                        var gread = $(this).attr("gread");
                                        if (gread == currGread + 1) $(this).css("display", "none");
                                    });
                                }
                                setActive(id, currListId, nodeId);
                                if (currNode.call) common.callFn(window.ui, currNode.call.click.fn, currNode.call.click.params, currNode);
                            }
                        }
                    }
                },
                unCheckedAll: function (id) {
                    var currNav = navData["part" + id];
                    if (currNav) $("#" + currSetting.idPrefix + id + " .p-nav-children").children().css("display", "none");
                }
            }

            function setActive(id, currListId, nodeId) {
                var currNav = navData["part" + id];
                if (currNav) {
                    var currList = currNav.list["list" + currListId];
                    var gread = currList.params.gread ? currList.params.gread : 0;
                    if (currList) {
                        var currNode = currList.nodes["node" + nodeId];
                        var currListDom = $("#" + currSetting.listIdPrefix + id + "_" + currNode.to);
                        if (nodeId && currNode) {
                            if (!currNav.curr) currNav.curr = [];
                            currNav.curr[gread] = { listId: currListId, nodeId: currNode.id };
                            var currNodeDom = $("#" + currSetting.listIdPrefix + id + "_" + currListId);

                            // uncheck all children nav node
                            var currGread = currList.params.gread;
                            $("#" + currSetting.idPrefix + id).find(".p-nav-list").each(function () {
                                var gread = $(this).attr("gread");
                                if (gread >= currGread) {
                                    $(this).find(".p-nav-active").removeClass("p-nav-active");
                                }
                            });
                            currNodeDom.find("*[name='" + currSetting.nodeIdPrefix + nodeId + "']").addClass("p-nav-active");
                        }
                    }
                }
            }

            function buildElement(id, element, parentCall) {
                var listId = element.id;
                var listStyle = element.style;
                var listGread = element.gread;
                var groups = element.groups;
                if (common.isEmpty(listId)) element.id = listId = common.getUuid(partIdPrefix);
                partCommon.initItemCall(element, parentCall, ["click"]);

                var navListElement = common.deepCopy(navListConfig);
                navListElement.properties.id = currSetting.listIdPrefix + id + "_" + listId;
                navListElement.properties.gread = listGread;
                if (listStyle) navListElement.properties.style = listStyle;

                // init groups params
                if (!groups) {
                    groups = [];
                    nodes = element.nodes;
                    for (var nodeI = 0; nodeI < nodes.length; nodeI++) {
                        var node = nodes[nodeI];
                        groups.push(node);
                    }
                }

                var nodesObj = {};
                for (var groupI = 0; groupI < groups.length; groupI++) {
                    var group = groups[groupI];

                    var groupId = group.id;
                    var groupTitle = group.title;
                    var nodes = group.nodes;
                    if (common.isEmpty(groupId)) groupId = group.id = common.getUuid(partIdPrefix);
                    partCommon.initItemCall(group, element.call, ["click"]);

                    // init nodes params
                    if (!nodes) nodes = [group];
                    else if (!common.is.Array(nodes)) nodes = [nodes];

                    var navGroupElement = common.deepCopy(navGroupConfig);
                    navGroupElement.properties.name = currSetting.groupIdPrefix + groupId;
                    if (groupTitle) navGroupElement.children[0].text = groupTitle;
                    else navGroupElement.children.splice(0, 1);

                    var groupChildren = navGroupElement.children[navGroupElement.children.length - 1];

                    for (var nodeI = 0; nodeI < nodes.length; nodeI++) {
                        var node = nodes[nodeI];
                        var nodeId = node.id;
                        var nodeText = node.text;
                        if (common.isEmpty(nodeId)) nodeId = node.id = common.getUuid(partIdPrefix);
                        partCommon.initItemCall(node, group.call, ["click"]);

                        var navNodeElement = common.deepCopy(navNodeConfig);
                        navNodeElement.properties.name = currSetting.nodeIdPrefix + nodeId;
                        navNodeElement.properties.onclick = uiName + ".parts.nav.checked('" + id + "','" + listId + "','" + nodeId + "')";
                        navNodeElement.text = nodeText;

                        groupChildren.children.push(navNodeElement);
                        nodesObj["node" + nodeId] = node;
                    }
                    navListElement.children.push(navGroupElement);
                }

                return {
                    id: listId,
                    params: element,
                    config: navListElement,
                    nodes: nodesObj
                };
            }

            function build(params) {
                var id = params.id;
                var align = params.align ? params.align : "center";
                var img = params.img;
                var title = params.title;
                var tool = params.tool;
                var main = params.main;
                var list = params.list;
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                partCommon.initCall(params, ["click"]);

                if (common.is.Array(main)) main = { id: "main", gread: 0, groups: main }
                else if (!main.gread) main.gread = 0;
                navElement = common.deepCopy(navConfig);

                navElement.properties.id = currSetting.idPrefix + id;
                navElement.properties.onmouseleave = uiName + ".parts.nav.unCheckedAll('" + id + "')";

                var imgwidth = 0, titleWidth = 0, toolWidth = 0;
                if (img) {
                    imgwidth = img.width ? img.width : 5;
                    var navImg = navElement.children[0].children[0];
                    navImg.properties.style = "width:" + imgwidth + "%;";
                    navImg.children[0].properties.src = img.src;
                }
                if (title) {
                    titleWidth = title.width ? title.width : 15;
                    var navTitle = navElement.children[0].children[1];
                    navTitle.properties.style = "width:" + titleWidth + "%;";
                    navTitle.text = title.text;
                }
                if (tool) {
                    toolWidth = tool.width ? tool.width : 20;
                    var navTool = navElement.children[0].children[3];
                    navTool.properties.style = "width:" + toolWidth + "%;";
                }

                var mainWidth = 100 - imgwidth - titleWidth - toolWidth;
                var navMainElement = navElement.children[0].children[2];
                navMainElement.properties.style = "width:" + mainWidth + "%;";
                navMainElement.properties.class += (" " + commonStyle.align + align);

                var listObj = {};
                var navMainObj = buildElement(id, main, params.call);
                navMainElement.children.push(navMainObj.config);
                listObj["list" + navMainObj.id] = navMainObj;

                if (list) {
                    var navChildrenElement = navElement.children[1];
                    for (var i = 0; i < list.length; i++) {
                        var listItem = list[i];
                        var navChildObj = buildElement(id, listItem, params.call);
                        navChildrenElement.children.push(navChildObj.config);
                        listObj["list" + navChildObj.id] = navChildObj;
                    }
                }

                return navData["part" + id] = {
                    id: id,
                    params: params,
                    config: navElement,
                    list: listObj
                };
            }

            return {
                build: build,
                getConfig: navFn.getConfig,
                checked: navFn.checked,
                unCheckedAll: navFn.unCheckedAll
            }
        }

        function contentObj() {

            var currSetting = setting.content;
            // var idPrefix = setting.content.idPrefix;
            // var operationNamePrefix = setting.content.operationNamePrefix;

            var contentData = {};
            var contentConfig = { name: "div", properties: { class: "p-content" }, children: [] };
            var contentChildrenConfig = {
                img: { name: "div", properties: { class: "p-content-img" }, children: [] },
                title: { name: "div", properties: { class: "p-content-title" }, children: [] },
                text: { name: "div", properties: { class: "p-content-text" }, children: [] },
                operations: { name: "div", properties: { class: "p-content-operations" }, children: [] },
                spanTab: { name: "span", properties: {}, children: [] },
                imgTab: { name: "img", properties: { src: "", width: "100%", height: "100%" } }
            };

            var contentFn = {
                getConfig: function (id) {
                    return partCommon.getConfig(id, contentData);
                }
            }
            var titleFn = {
                click: function (id) {
                    var currcontent = contentData["part" + id];
                    if (currcontent) {
                        var title = currcontent.params.title;
                        common.callFn(window.ui, title.call.click.fn, title.params, currcontent.params);
                    }
                }
            };
            var operationFn = {
                click: function (id, key) {
                    var currcontent = contentData["part" + id];
                    if (currcontent && key) {
                        var operations = currcontent.params.operations;
                        var elements = operations.elements;
                        for (var operationIndex = 0; operationIndex < elements.length; operationIndex++) {
                            var operation = elements[operationIndex];
                            if (operation.key == key) {
                                var callBind = { operation: operation, content: currcontent.params };
                                common.callFn(window.ui, operation.call.click.fn, operation.call.click.params, callBind);
                                break;
                            }
                        }
                    }
                    event.stopPropagation();
                }
            }

            function build(params) {
                var id = params.id;
                var type = params.type == "L" ? "L" : "H";
                var col = params.col ? params.col : 1;
                // var img = params.img;
                // var title = params.title;
                // var text = params.text;
                // var operations = params.operations;
                var style = params.style ? params.style : "";
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);

                var contentElement = common.deepCopy(contentConfig);
                contentElement.properties.id = currSetting.idPrefix + id;
                if (col > 1) style = "width:" + parseInt(100 / col - 2) + "%;" + style
                if (style && style != "") contentElement.properties.style = style;

                var imgWidthClass = " p-content-w28";
                var otherWidthClass = " p-content-w68";
                if (type == "L" || !params.img) imgWidthClass = otherWidthClass = " p-content-w100";
                for (var paramKey in params) {
                    if (params.hasOwnProperty(paramKey)) {
                        var paramObj = params[paramKey];
                        if (paramKey == "img") {
                            var img = paramObj;
                            var imgUrl = img.url ? img.url : "";
                            var imgStyle = img.style;

                            var imgElement = common.deepCopy(contentChildrenConfig.img);
                            imgElement.properties.name = "content_img";
                            imgElement.properties.class += imgWidthClass;
                            if (imgStyle) imgElement.properties.style = imgStyle;

                            var imgTabElement = common.deepCopy(contentChildrenConfig.imgTab);
                            imgTabElement.properties.src = imgUrl;
                            imgElement.children.push(imgTabElement);

                            contentElement.children.push(imgElement);
                        } else if (paramKey == "title") {
                            var title = paramObj;
                            var titleText = title.text ? title.text : "";
                            var titleStyle = title.style;
                            partCommon.initCall(title, ["click"]);

                            var titleElement = common.deepCopy(contentChildrenConfig.title);
                            titleElement.properties.name = "content_title";
                            titleElement.properties.class += otherWidthClass;
                            if (title.call.click && title.click != false)
                                titleElement.properties.onclick = uiName + ".parts.content.title.click('" + id + "')";
                            if (titleStyle) titleElement.properties.style = titleStyle;
                            titleElement.text = titleText;

                            contentElement.children.push(titleElement);
                        } else if (paramKey == "operations") {
                            var operations = paramObj;
                            var operationsStyle = operations.style;
                            var operationsElements = operations.elements ? operations.elements : [];
                            partCommon.initCall(operations, ["click"]);

                            var operationsElement = common.deepCopy(contentChildrenConfig.operations);
                            operationsElement.properties.name = "content_operations";
                            operationsElement.properties.class += otherWidthClass;
                            if (operationsStyle) operationsElement.properties.style = operationsStyle;

                            for (var operationIndex = 0; operationIndex < operationsElements.length; operationIndex++) {
                                var operation = operationsElements[operationIndex];
                                var operationKey = operation.key;
                                var operationPosition = operation.position;
                                var operationText = operation.text;
                                var operationImg = operation.img;
                                partCommon.initItemCall(operation, operations.call, ["click"]);

                                var operationElement = common.deepCopy(contentChildrenConfig.spanTab);
                                operationElement.properties.name = currSetting.operationNamePrefix + operationKey;
                                if (operation.call.click && operation.click != false)
                                    operationElement.properties.onclick = uiName + ".parts.content.operation.click('" + id + "','" + operationKey + "')";
                                if (operationPosition == "right") operationElement.properties.class = "p-operation p-right";
                                else operationElement.properties.class = "p-operation p-left";
                                if (operationImg) {
                                    var operationImgElement = common.deepCopy(contentChildrenConfig.imgTab);
                                    operationImgElement.properties.src = operationImg;
                                    operationElement.children.push(operationImgElement);
                                }
                                if (operationText) {
                                    var operationSpanElement = common.deepCopy(contentChildrenConfig.spanTab);
                                    operationSpanElement.text = operationText;
                                    operationElement.children.push(operationSpanElement);
                                }
                                operationsElement.children.push(operationElement);
                            }
                            contentElement.children.push(operationsElement);
                        } else if (paramKey == "text") {
                            var text = paramObj;
                            var textStyle = text.style;
                            var textText = text.text;
                            var textElements = text.elements;

                            var textElement = common.deepCopy(contentChildrenConfig.text);
                            textElement.properties.name = "content_text";
                            textElement.properties.class += otherWidthClass;
                            if (textStyle) textElement.properties.style = textStyle;

                            if (!common.isEmpty(textText)) textElements = [textText];
                            for (var textIndex = 0; textIndex < textElements.length; textIndex++) {
                                var textSpanElement = common.deepCopy(contentChildrenConfig.spanTab);
                                textSpanElement.text = textElements[textIndex];
                                textElement.children.push(textSpanElement);
                            }
                            contentElement.children.push(textElement);
                        }
                    }
                }


                return contentData["part" + id] = {
                    id: id,
                    params: params,
                    config: contentElement,
                };
            }

            return {
                build: build,
                getConfig: contentFn.getConfig,
                title: {
                    click: titleFn.click
                },
                operation: {
                    click: operationFn.click
                }
            }
        }

        function listObj() {

            var currSetting = setting.list;
            // var idPrefix = setting.list.idPrefix;
            // var itemNamePrefix = setting.list.itemNamePrefix;

            var listData = {};
            var listConfig = { name: "div", properties: { class: "p-list" }, children: [] };
            var listItemConfig = {
                name: "div", properties: { class: "p-list-item" }, children: [
                    { name: "div", properties: { class: "p-item-check" } },
                    { name: "div", properties: { class: "p-item-content" } }
                ]
            };
            var noneConfig = {
                name: "div", properties: { class: "p-list-none" }, children: [{ name: "span", text: "暂无数据" }]
            };

            var listFn = {
                getConfig: function (id) {
                    return partCommon.getConfig(id, listData);
                },
                empty: function (id) {
                    var currList = listData["part" + id];
                    if (currList) {
                        var items = currList.items
                        $("#" + currSetting.idPrefix + id).html("");
                        currList.items = {};
                        $("#" + currSetting.idPrefix + id).children(".p-list-none").css("display", "inline-block");
                        return items;
                    }
                },
                edit: function (id, status) {
                    var currList = listData["part" + id];
                    if (currList) {
                        var listDom = $("#" + currSetting.idPrefix + id);
                        if (status != true && status != false) {
                            if (listDom.is('.p-list-edit')) status = false;
                            else status = true;
                        }
                        if (status) {
                            listDom.addClass("p-list-edit");
                            var itemDom = listDom.children(".p-list-item:first");
                            listDom.find(".p-item-check").width(itemDom.width()).height(itemDom.height());
                        } else {
                            listDom.removeClass("p-list-edit");
                            listDom.find(".p-item-check").width(0).height(0);
                            listDom.find(".p-item-check").removeClass("p-item-active");
                        }
                    }
                },
                getChecked: function (id) {
                    var currList = listData["part" + id];
                    if (currList) {
                        var data = [];
                        var items = currList.items;
                        var itemDom = $("#" + currSetting.idPrefix + id).find(".p-item-active");
                        itemDom.each(function () {
                            var itemName = $(this).parent(".p-list-item").attr("name");
                            itemName = itemName.replace(currSetting.itemNamePrefix, "");
                            data.push(items["item" + itemName]);
                        });
                        return data;
                    }
                },
                removeChecked: function (id) {
                    var currList = listData["part" + id];
                    if (currList) {
                        var data = [];
                        var items = currList.items;
                        var itemDom = $("#" + currSetting.idPrefix + id).find(".p-item-active");
                        itemDom.each(function () {
                            var itemDom = $(this).parent(".p-list-item");
                            var itemName = itemDom.attr("name");
                            itemName = itemName.replace(currSetting.itemNamePrefix, "");

                            var itemObj = items["item" + itemName];
                            data.push(itemObj);

                            itemDom.remove();
                            delete items["item" + itemName];
                        });

                        var currItemDoms = $("#" + currSetting.idPrefix + id).children(".p-list-item");
                        if (currItemDoms.length == 0) $("#" + currSetting.idPrefix + id).children(".p-list-none").css("display", "inline-block");

                        return data;
                    }
                },
                checkAll: function (id, key, checked) {
                    var currList = listData["part" + id];
                    if (currList) {
                        var itemDom = $("#" + currSetting.idPrefix + id).find(".p-item-check");
                        if (checked != true && checked != false) {
                            checked = true;
                            itemDom.each(function () {
                                if (!$(this).is('.p-item-active')) {
                                    checked = false;
                                    return;
                                }
                            })
                        }
                        if (checked == true) itemDom.removeClass("p-item-active");
                        else itemDom.addClass("p-item-active");
                    }
                },
            }
            var itemFn = {
                add: function (id, params) {
                    var currList = listData["part" + id];
                    if (currList) {
                        var col = currList.params.col;
                        var itemStyle = currList.params.itemStyle;
                        var isClick = currList.params.click == true ? true : false;

                        var itemWidth = undefined;
                        if (col > 1) itemWidth = "width:" + parseInt(100 / col) + "%;";
                        if (!params.style) params.style = itemStyle;
                        if (itemWidth != undefined) params.style = itemWidth + (params.style ? params.style : "");

                        if (params.click == undefined) params.click = isClick;
                        var itemConfig = buildItem(id, params, currList.params.call);
                        if (itemConfig) {
                            $("#" + currSetting.idPrefix + id).children(".p-list-none").css("display", "none");
                            var itemHtml = buildUtil.buildModule(itemConfig);
                            $("#" + currSetting.idPrefix + id).append(itemHtml);
                            currList.items["item" + params.key] = params;
                        }
                    }
                },
                remove: function (id, key) {
                    var currList = listData["part" + id];
                    if (currList) {
                        var itemDom = $("#" + currSetting.idPrefix + id).children("*[name='" + currSetting.itemNamePrefix + key + "']");
                        itemDom.remove();
                        delete currList.items["item" + key];

                        var currItemDoms = $("#" + currSetting.idPrefix + id).children(".p-list-item");
                        if (currItemDoms.length == 0) $("#" + currSetting.idPrefix + id).children(".p-list-none").css("display", "inline-block");
                    }
                },
                check: function (id, key, checked) {
                    var currList = listData["part" + id];
                    if (currList) {
                        var itemDom = $("#" + currSetting.idPrefix + id).children("*[name='" + currSetting.itemNamePrefix + key + "']").children(".p-item-check");
                        if (checked != true && checked != false) {
                            if (itemDom.is('.p-item-active')) checked = false;
                            else checked = true;
                        }
                        if (checked) itemDom.addClass("p-item-active");
                        else itemDom.removeClass("p-item-active");
                    }
                },
                click: function (id, key) {
                    var currList = listData["part" + id];
                    if (currList) {
                        var items = currList.items;
                        var item = items["item" + key];
                        var call = item.call;
                        if (item) common.callFn(window.ui, call.click.fn, call.click.params, item);
                    }
                }
            };

            function buildItem(id, item, call) {
                var itemKey = item.key;
                var itemContent = item.content;
                var itemIsClick = item.click == true ? true : false;
                var itemStyle = item.style;
                if (common.isEmpty(itemKey)) item.key = itemKey = common.getUuid(partIdPrefix);
                partCommon.initItemCall(item, call, ["click"]);

                var listItemTotalElement = common.deepCopy(listItemConfig);
                listItemTotalElement.properties.name = currSetting.itemNamePrefix + itemKey;
                if (itemStyle && itemStyle != "") listItemTotalElement.properties.style = itemStyle;

                var listItemCheckedElement = listItemTotalElement.children[0];
                listItemCheckedElement.properties.onclick = uiName + ".parts.list.item.check('" + id + "','" + itemKey + "')";

                var listItemElement = listItemTotalElement.children[1];
                if (call.click && itemIsClick != false)
                    listItemElement.properties.onclick = uiName + ".parts.list.item.click('" + id + "','" + itemKey + "')";
                if (itemContent) partCommon.buildBody(listItemElement, itemContent);

                return listItemTotalElement;
            }

            function build(params) {
                var id = params.id;
                var items = params.items ? params.items : [];
                var isClick = params.click == true ? true : false;
                var isEdit = params.edit == true ? true : false;
                var col = params.col ? params.col : 1;
                var style = params.style;
                var publicItemStyle = params.itemStyle;
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                partCommon.initCall(params, ["click"]);

                var listElement = common.deepCopy(listConfig);
                listElement.properties.id = currSetting.idPrefix + id;
                if (isEdit == true) listElement.properties.class += " p-list-edit";
                if (style) listElement.properties.style = style;

                var itemsData = {};
                var itemWidth = undefined;
                if (col > 1) itemWidth = "width:" + parseInt(100 / col) + "%;";
                for (var itemI = 0; itemI < items.length; itemI++) {
                    var item = items[itemI];
                    if (!item.style) item.style = publicItemStyle;
                    if (itemWidth != undefined) item.style = itemWidth + (item.style ? item.style : "");
                    if (item.click == undefined) item.click = isClick;
                    listElement.children.push(buildItem(id, item, params.call));
                    itemsData["item" + item.key] = item;
                }
                var noneElement = common.deepCopy(noneConfig);
                if (!items || items.length == 0)
                    noneElement.properties.style = "display:inline-block;";
                else noneElement.properties.style = "display:none;";
                listElement.children.push(noneElement);

                return listData["part" + id] = {
                    id: id,
                    params: params,
                    config: listElement,
                    items: itemsData
                };
            }

            return {
                build: build,
                getConfig: listFn.getConfig,
                empty: listFn.empty,
                edit: listFn.edit,
                getChecked: listFn.getChecked,
                removeChecked: listFn.removeChecked,
                checkAll: listFn.checkAll,
                item: {
                    add: itemFn.add,
                    remove: itemFn.remove,
                    check: itemFn.check,
                    click: itemFn.click
                }
            }
        }

        function treeObj() {

            var currSetting = setting.tree;
            // var idPrefix = setting.tree.idPrefix;
            // var itemNamePrefix = setting.tree.itemNamePrefix;

            var treeData = {};
            var treeConfig = { name: "div", properties: { class: "p-tree" }, children: [] };
            var treeItemConfig = {
                ul: { name: "div", properties: { class: "p-tree-ul" }, children: [] },
                li: { name: "div", properties: { class: "p-tree-li" }, children: [] },
                span: { name: "span", properties: {}, text: "" },
            }

            var treeFn = {
                getConfig: function (id) {
                    return partCommon.getConfig(id, listData);
                },
                getCheckedPath: function(id){
                    //$("#" + currSetting.idPrefix + id)
                }
            }
            var itemFn = {
                setItems: function (id, itemId, items) {
                    var currTree = treeData["part" + id];
                    if (currTree) {
                        var itemsData = currTree.items;
                        var currItem = itemsData["item" + itemId];
                        if (currItem) {
                            if (currItem.items) {
                                for (var index = 0; index < currItem.items.length; index++) {
                                    delete itemsData["item" + currItem.items[index].id];
                                }
                            }

                            var itemsElement = [];
                            currItem.items = items;
                            for (var index = 0; index < currItem.items.length; index++) {
                                var item = currItem.items[index];
                                itemsElement.push(buildItem(id, item, itemsData, currItem.gread + 1));
                            }
                            var ulElement = common.deepCopy(treeItemConfig.ul);
                            ulElement.children = itemsElement;

                            var currUlDom = $("#" + currSetting.idPrefix + id).find("div[name='" + currSetting.itemNamePrefix + itemId + "']");
                            currUlDom.children(".p-tree-ul").remove();
                            currUlDom.html(currUlDom.html() + buildUtil.buildModule(ulElement));
                        }
                    }
                },
                check: function (id, key) {
                    var currTree = treeData["part" + id];
                    if (currTree) {
                        var items = currTree.items;
                        var item = items["item" + key];
                        if (item) {
                            var currLiDom = $("#" + currSetting.idPrefix + id).find("div[name='" + currSetting.itemNamePrefix + key + "']");
                            currLiDom.siblings(".p-tree-li").find(".p-tree-ul").css("display", "none");
                            // currLiDom.siblings(".p-tree-li").find("span").removeClass("p-tree-active");
                            // currLiDom.children("span").addClass("p-tree-active");
                            if (item.items && item.items.length > 0) {
                                var ulDom = currLiDom.children(".p-tree-ul");
                                var status = ulDom.css("display");
                                ulDom.css("display", status == "none" ? "block" : "none");
                            } else {
                                $("#" + currSetting.idPrefix + id).find("span").removeClass("p-tree-active");
                                currLiDom.children("span").addClass("p-tree-active");
                            }
                            if (!item.call || !item.call.click || !item.call.click.fn) {
                                var params = currTree.params;
                                common.callFn(window.ui, params.call.click.fn, params.call.click.params, item);
                            }
                            else common.callFn(window.ui, item.call.click.fn, item.call.click.params, item);
                        }
                        else console.log("Tree error: ID :" + id + ", key:" + key + " is undefined!");
                    }
                    else console.log("Tree error: ID :" + id + " is undefined!");
                }
            }

            function buildItem(treeId, params, itemsData, gread) {
                var itemColor = " " + commonStyle.colorGread;
                if (!gread) gread = 0;
                if (common.is.String(params)) params = { text: params };
                else if (common.is.Array(params)) params = { show: true, items: params };
                var id = params.id;
                var text = params.text;
                var isShow = params.show == true ? true : false;
                var items = params.items;
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                params.gread = gread;

                var itemElement = common.deepCopy(treeItemConfig.li);
                itemElement.properties.name = currSetting.itemNamePrefix + id;
                itemElement.properties.class += (itemColor + gread);

                if (text && common.is.String(text)) {
                    var spanElement = common.deepCopy(treeItemConfig.span);
                    spanElement.properties.onclick = uiName + ".parts.tree.item.check('" + treeId + "','" + id + "')";
                    spanElement.text = text;
                    itemElement.children.push(spanElement);
                }
                if (items && common.is.Array(items) && items.length > 0) {
                    var ulElement = common.deepCopy(treeItemConfig.ul);
                    if (isShow == false) ulElement.properties.style = "display:none;"
                    for (var itemI = 0; itemI < items.length; itemI++) {
                        var item = items[itemI];
                        ulElement.children.push(buildItem(treeId, item, itemsData, gread + 1));
                    }
                    itemElement.children.push(ulElement)
                }
                itemsData["item" + id] = params;

                return itemElement;
            }

            function build(params) {
                var id = params.id;
                var items = params.items ? params.items : [];
                var isClick = params.click == true ? true : false;
                var style = params.style;
                var publicItemStyle = params.itemStyle;
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                partCommon.initCall(params, ["click"]);

                var treeElement = common.deepCopy(treeConfig);
                treeElement.properties.id = currSetting.idPrefix + id;
                if (style) treeElement.properties.style = style;

                var itemsData = {};
                var liElement = buildItem(id, items, itemsData, 0);
                if (liElement) treeElement.children = liElement.children;

                return treeData["part" + id] = {
                    id: id,
                    params: params,
                    config: treeElement,
                    items: itemsData
                };
            }

            return {
                build: build,
                getConfig: treeFn.getConfig,
                item: {
                    setItems: itemFn.setItems,
                    check: itemFn.check
                }
            }
        }

        function accordionsObj() {
            var currSetting = setting.accordion;

            var accordionData = {};
            var accordionConfig = { name: "div", properties: { class: "p-accordions" }, children: [] };
            var accordionItemConfig = {
                name: "div", properties: { class: "p-accordion" }, children: [
                    { name: "div", properties: { class: "p-accordion-title" }, text: "" },
                    { name: "div", properties: { class: "p-accordion-body" }, children: [] }
                ]
            };

            var accordionFn = {
                getConfig: function (id) {
                    return partCommon.getConfig(id, accordionData);
                }
            }
            var itemFn = {
                switch: function (id, itemId) {
                    var curr = accordionData["part" + id];
                    if (curr) {
                        var items = curr.items;
                        var item = items["item" + itemId];
                        if (item) {
                            var currBody = $("#" + currSetting.itemIdPrefix + itemId).children(".p-accordion-body");
                            if (currBody.hasClass(commonStyle.none)) {
                                currBody.removeClass(commonStyle.none);
                                item.show = true;
                            } else {
                                currBody.addClass(commonStyle.none);
                                item.show = false;
                            }
                            common.callFn(window.ui, item.call.switch.fn, item.call.switch.params, item);
                        }
                        else console.log("Accordion error: ID:" + id + ", itemId:" + itemId + " is undefined!");
                    }
                    else console.log("Accordion error: ID:" + id + " is undefined!");
                }
            }

            function buildItem(accordionsId, params, itemsData, call) {
                var id = params.id;
                var title = params.title;
                var body = params.body;
                var isShow = params.show == true ? true : false;
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                partCommon.initItemCall(params, call, ["switch"]);

                var itemElement = common.deepCopy(accordionItemConfig);
                itemElement.properties.id = currSetting.itemIdPrefix + id;

                var titleElement = itemElement.children[0];
                if (title) {
                    titleElement.properties.onclick = uiName + ".parts.accordions.item.switch('" + accordionsId + "','" + id + "')";
                    if (common.is.String(title)) {
                        titleElement.text = title;
                    } else {
                        if (title.style) titleElement.properties.style = title.style;
                        if (title.text) titleElement.text = title.text;
                    }
                }

                var bodyElement = itemElement.children[1];
                if (isShow == false) bodyElement.properties.class += (" " + commonStyle.none);
                if (body) {
                    if (body.style) bodyElement.properties.style = body.style;
                    partCommon.buildBody(bodyElement, body.content);
                }

                itemsData["item" + id] = params;

                return itemElement;
            }

            function build(params) {
                var id = params.id;
                var style = params.style;
                var items = params.items ? params.items : [];
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                partCommon.initCall(params, ["switch"]);

                var accordionElement = common.deepCopy(accordionConfig);
                accordionElement.properties.id = currSetting.idPrefix + id;
                if (style) accordionElement.properties.style = style;

                var itemsData = {};
                for (var index = 0; index < items.length; index++) {
                    var item = items[index];
                    var itemElement = buildItem(id, item, itemsData, params.call);
                    accordionElement.children.push(itemElement);
                }

                return accordionData["part" + id] = {
                    id: id,
                    params: params,
                    config: accordionElement,
                    items: itemsData
                };
            }

            return {
                build: build,
                getConfig: accordionFn.getConfig,
                item: {
                    switch: itemFn.switch,
                }
            }
        }

        function screenObj() {
            var currSetting = setting.screen;

            var screenData = {};
            var screenConfig = {
                name: "div", properties: { class: "p-screen" }, children: [
                    { name: "div", properties: { class: "p-screen-data" }, text: "" },
                    { name: "div", properties: { class: "p-screen-select" }, children: [] }
                ]
            };
            var screengGroupConfig = {
                name: "div", properties: { class: "p-screen-group" }, children: [
                    { name: "div", properties: { class: "p-screen-title" }, text: "" },
                    { name: "div", properties: { class: "p-screen-items" }, children: [] }
                ]
            };
            var screengItemConfig = { name: "div", properties: { class: "p-screen-item" }, text: "" };
            var screengDataItemConfig = {
                name: "div", properties: { class: "p-screen-item" }, children: [
                    { name: "div", properties: { class: "p-screen-move" }, text: "<" },
                    { name: "div", properties: { class: "p-screen-text" }, text: "" },
                    { name: "div", properties: { class: "p-screen-delete" }, text: "X" },
                ]
            };

            var screenFn = {
                getConfig: function (id) {
                    return partCommon.getConfig(id, screenData);
                },
                getData: function (id) {
                    var curr = screenData["part" + id];
                    if (curr) {
                        var data = {};
                        var groupDom = $("#" + currSetting.idPrefix + id).children(".p-screen-data").children(".p-screen-group");
                        groupDom.each(function () {
                            var groupKey = $(this).attr("key");
                            data[groupKey] = [];
                            $(this).children(".p-screen-items").children(".p-screen-item").each(function () {
                                var itemKey = $(this).attr("key");
                                var itemText = $(this).children(".p-screen-text").text();
                                data[groupKey].push({ key: itemKey, text: itemText });
                            });
                        });
                        return data;
                    }
                }
            }
            var itemFn = {
                check: function (id, groupKey, itemKey) {
                    var curr = screenData["part" + id];
                    if (curr) {
                        var isShow = curr.params.show;
                        var checkedClass = "p-screen-checked";

                        var currDom = $("#" + currSetting.idPrefix + id);
                        var groupDom = currDom.children(".p-screen-select").children("div[name='" + currSetting.groupIdPrefix + groupKey + "']");
                        var itemDom = groupDom.children(".p-screen-items").children("div[name='" + currSetting.itemIdPrefix + itemKey + "']");

                        if (itemDom.hasClass(checkedClass)) itemDom.removeClass(checkedClass);
                        else itemDom.addClass(checkedClass);

                        if (isShow != false) {
                            var dataDom = currDom.children(".p-screen-data");
                            var dataGroupDom = dataDom.children("div[name='" + currSetting.groupIdPrefix + groupKey + "']");
                            // add item
                            if (itemDom.hasClass(checkedClass)) {
                                if (dataGroupDom.length == 0) {
                                    var titleDom = groupDom.children(".p-screen-title");
                                    var titleText = titleDom.text();

                                    var groupConf = buildGroup(id, { key: groupKey, title: titleText });
                                    dataDom.append(buildUtil.buildModule(groupConf));

                                    dataGroupDom = dataDom.children("div[name='" + currSetting.groupIdPrefix + groupKey + "']");
                                }

                                var itemText = itemDom.text();
                                var itemConf = buildDataItem(id, groupKey, { key: itemKey, text: itemText });
                                dataGroupDom.children(".p-screen-items").append(buildUtil.buildModule(itemConf));
                            }
                            // remove item
                            else {
                                var dataGroupItemsDom = dataGroupDom.children(".p-screen-items");
                                if (dataGroupItemsDom.children(".p-screen-item").length == 1) {
                                    dataGroupDom.remove();
                                } else {
                                    dataGroupItemsDom.children("div[name='" + currSetting.itemIdPrefix + itemKey + "']").remove();
                                }
                            }
                        }
                    }
                },
                delete: function (id, groupKey, itemKey) {
                    var currDom = $("#" + currSetting.idPrefix + id);
                    var dataDom = currDom.children(".p-screen-data");
                    var dataGroupDom = dataDom.children("div[name='" + currSetting.groupIdPrefix + groupKey + "']");
                    var dataGroupItemsDom = dataGroupDom.children(".p-screen-items");
                    if (dataGroupItemsDom.children(".p-screen-item").length == 1) {
                        dataGroupDom.remove();
                    } else {
                        dataGroupItemsDom.children("div[name='" + currSetting.itemIdPrefix + itemKey + "']").remove();
                    }

                    var selectItemDom = currDom.children(".p-screen-select")
                        .children("div[name='" + currSetting.groupIdPrefix + groupKey + "']")
                        .children(".p-screen-items")
                        .children("div[name='" + currSetting.itemIdPrefix + itemKey + "']");
                    selectItemDom.removeClass("p-screen-checked");
                },
                move: function (id, groupKey, itemKey) {
                    var currDom = $("#" + currSetting.idPrefix + id);
                    var itemsDom = currDom.children(".p-screen-data")
                        .children("div[name='" + currSetting.groupIdPrefix + groupKey + "']")
                        .children(".p-screen-items")
                    var currItemsDom = itemsDom.children("div[name='" + currSetting.itemIdPrefix + itemKey + "']");
                    var lastItemsDom = currItemsDom.prev();
                    if (lastItemsDom.length == 1) {
                        currItemsDom.insertBefore(lastItemsDom);
                    }
                }
            }

            function buildDataItem(id, groupKey, params) {
                var key = params.key;
                var text = params.text;

                var itemElement = common.deepCopy(screengDataItemConfig);
                itemElement.properties.name = currSetting.itemIdPrefix + key;
                itemElement.properties.key = key;

                var moveElement = itemElement.children[0];
                moveElement.properties.onclick = uiName + ".parts.screen.item.move('" + id + "','" + groupKey + "','" + key + "')";

                var textElement = itemElement.children[1];
                textElement.text = text;

                var deleteElement = itemElement.children[2];
                deleteElement.properties.onclick = uiName + ".parts.screen.item.delete('" + id + "','" + groupKey + "','" + key + "')";

                return itemElement;
            }

            function buildItem(id, groupKey, params) {
                var key = params.key;
                var text = params.text;

                var itemElement = common.deepCopy(screengItemConfig);
                itemElement.properties.onclick = uiName + ".parts.screen.item.check('" + id + "','" + groupKey + "','" + key + "')";
                itemElement.properties.name = currSetting.itemIdPrefix + key;
                itemElement.properties.key = key;
                itemElement.text = text;

                return itemElement;
            }

            function buildGroup(id, params) {
                var key = params.key;
                var title = params.title;
                var items = params.items ? params.items : [];

                var groupElement = common.deepCopy(screengGroupConfig);
                groupElement.properties.name = currSetting.groupIdPrefix + key;
                groupElement.properties.key = key;

                var titleElement = groupElement.children[0];
                if (title) titleElement.text = title;

                var itemsElement = groupElement.children[1];
                for (var index = 0; index < items.length; index++) {
                    var item = items[index];
                    var itemElement = buildItem(id, key, item);
                    itemsElement.children.push(itemElement);
                }

                return groupElement;
            }

            function build(params) {
                var id = params.id;
                var style = params.style;
                //titleWidth
                var groups = params.groups ? params.groups : [];
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                //partCommon.initCall(params, ["check","delete"]);

                var screenElement = common.deepCopy(screenConfig);
                screenElement.properties.id = currSetting.idPrefix + id;

                var screenSelectElement = screenElement.children[1];
                if (style) screenSelectElement.properties.style = style;

                for (var index = 0; index < groups.length; index++) {
                    var group = groups[index];
                    var groupElement = buildGroup(id, group);
                    screenSelectElement.children.push(groupElement);
                }

                return screenData["part" + id] = {
                    id: id,
                    params: params,
                    config: screenElement,
                };
            }

            return {
                build: build,
                getConfig: screenFn.getConfig,
                getData: screenFn.getData,
                item: {
                    check: itemFn.check,
                    delete: itemFn.delete,
                    move: itemFn.move,
                }
            }
        }

        function rotateObj() {
            var currSetting = setting.rotate;

            var rotateData = {};
            var rotateConfig = {
                name: "div", properties: { class: "p-rotate" }, children: [
                    { name: "div", properties: { class: "p-rotate-left" }, text: "<" },
                    { name: "div", properties: { class: "p-rotate-right" }, text: ">" },
                    { name: "div", properties: { class: "p-rotate-select" }, children: [] },
                    { name: "div", properties: { class: "p-rotate-items" }, children: [] }
                ]
            };
            var rotateSelectItemConfig = { name: "div", properties: { class: "p-rotate-select-item" }, text: "" };
            var rotateItemConfig = {
                name: "div", properties: { class: "p-rotate-item" }, children: [
                    { name: "div", properties: { class: "p-rotate-text" }, text: "" },
                    { name: "div", properties: { class: "p-rotate-img" }, children: [{ name: "img", properties: {} }] }
                ]
            };

            var rotateFn = {
                getConfig: function (id) {
                    return partCommon.getConfig(id, rotateData);
                },
                check: function (id, index) {
                    var curr = rotateData["part" + id];
                    if (curr) {
                        var itemsDom = $("#" + currSetting.idPrefix + id).children(".p-rotate-items");
                        var itemDom;
                        if (index == "L") {
                            var endIndex = curr.params.items.length - 1;
                            itemDom = itemsDom.children(".p-rotate-item").not(".p-none").prev(".p-rotate-item");
                            if (itemDom.length == 0) itemDom = itemsDom.children(".p-rotate-item").eq(endIndex);
                        } else if (index == "R") {
                            itemDom = itemsDom.children(".p-rotate-item").not(".p-none").next(".p-rotate-item");
                            if (itemDom.length == 0) itemDom = itemsDom.children(".p-rotate-item").eq(0);
                        } else {
                            itemDom = itemsDom.children(".p-rotate-item").eq(index);
                        }
                        itemDom.siblings().addClass(commonStyle.none);
                        itemDom.removeClass(commonStyle.none);
                    }
                }
            }
            var itemFn = {
                click: function (id, index) {
                    var curr = rotateData["part" + id];
                    if (curr) {
                        var item = curr.params.items[index];
                        if (item) common.callFn(window.ui, item.call.click.fn, item.call.click.params, item);
                    }
                }
            }

            function buildItem(id, index, width, height, leftAndRightWidth, params, call) {
                var img = params.img;
                var text = params.text;
                partCommon.initItemCall(params, call, ["click"]);

                var itemElement = common.deepCopy(rotateItemConfig);
                if (img) {
                    var imgElement = itemElement.children[1];
                    imgElement.properties.onclick = uiName + ".parts.rotate.item.click('" + id + "','" + index + "')";
                    imgElement.children[0].properties.src = img;
                    imgElement.children[0].properties.width = width;
                    imgElement.children[0].properties.height = height;
                }
                if (text) {
                    var textMarginLeft = Math.ceil(leftAndRightWidth * 1.1);
                    var textElement = itemElement.children[0];
                    textElement.properties.style = "width:" + (width - 2 * textMarginLeft) + "px;height:" + (height * 0.9) + "px;"
                        + "margin-left:" + textMarginLeft + "px;";
                    textElement.text = text
                }

                return itemElement;
            }

            function build(params) {
                var id = params.id;
                var width = parseInt(params.width);
                var height = parseInt(params.height);
                var show = params.show ? params.show : 1;
                var items = params.items ? params.items : [];
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                partCommon.initCall(params, ["click"]);

                if (isNaN(width) || width < 200) width = 200;
                if (isNaN(height) || height < 100) height = 100;
                var rotateElement = common.deepCopy(rotateConfig);
                rotateElement.properties.id = currSetting.idPrefix + id;
                rotateElement.properties.style = "width:" + width + "px;height:" + height + "px";

                var leftAndRightWidth = width / 15 > 35 ? Math.ceil(width / 15) : 35;
                var leftElement = rotateElement.children[0];
                leftElement.properties.onclick = uiName + ".parts.rotate.check('" + id + "','L')";
                leftElement.properties.style = "width:" + leftAndRightWidth + "px;height:" + height + "px;line-height:" + height + "px;";

                var rightElement = rotateElement.children[1];
                rightElement.properties.onclick = uiName + ".parts.rotate.check('" + id + "','R')";
                rightElement.properties.style = "width:" + leftAndRightWidth + "px;height:" + height + "px;line-height:" + height + "px;"
                    + "margin-left:" + (width - leftAndRightWidth) + "px;";

                var screenSelectElement = rotateElement.children[2];
                screenSelectElement.properties.style = "margin-left:" + Math.ceil(leftAndRightWidth * 1.5) + "px;margin-top:" + (height * 0.9) + "px";

                var screenItemsElement = rotateElement.children[3];
                for (var index = 0; index < items.length; index++) {
                    var item = items[index];

                    var selectItemElement = common.deepCopy(rotateSelectItemConfig);
                    selectItemElement.properties.onclick = uiName + ".parts.rotate.check('" + id + "','" + index + "')";
                    selectItemElement.text = index + 1;
                    screenSelectElement.children.push(selectItemElement);

                    var itemElement = buildItem(id, index, width, height, leftAndRightWidth, item, params.call);
                    if (show != (index + 1)) itemElement.properties.class += (" " + commonStyle.none);
                    screenItemsElement.children.push(itemElement);
                }

                return rotateData["part" + id] = {
                    id: id,
                    params: params,
                    config: rotateElement,
                };
            }

            return {
                build: build,
                getConfig: rotateFn.getConfig,
                check: rotateFn.check,
                item: {
                    click: itemFn.click,
                }
            }
        }

        function docObj(){
            var currSetting = setting.doc;

            var docData = {};
            var docConfig = {
                name: "div", properties: { class: "p-doc" }, children: [
                    { name: "div", properties: { class: "p-doc-tool" }, children: [
                        { name: "span", text:"添加文本" },
                        { name: "span", text:"添加图片" },
                        { name: "span", text:"添加代码" }
                    ] },
                    { name: "div", properties: { class: "p-doc-content", contenteditable: "true" }, children: [
                        { name: "p", text:"请输入内容......" }
                    ] }
                ]
            };
            var docItemConfig = {
                text: { name: "div", properties: { class: "p-doc-content-text" }, text: "" },
                img: { name: "img", properties: { class: "p-doc-content-img" }, text: "" },
                code: { name: "div", properties: { class: "p-doc-content-code" }, text: "" },
                none: { name: "div", properties:{}, text:"请输入内容......" }
            };

            var docFn = {
                getConfig: function (id) {
                    return partCommon.getConfig(id, docData);
                },
                setData: function (id, data) {
                    var contentDom = $("#" + currSetting.idPrefix + id).children(".p-doc-content");
                    var itemArr = buildData(id, data);
                    var itemHtml = buildUtil.buildModule(itemArr);
                    contentDom.html(itemHtml);
                },
                getData: function (id, itemId) {
                
                }
            }
            // tab 

            function buildData(id, list){
                if (!list) list = [];
                if (!common.is.Array(list)) list.push(list);

                var elementArr = [];
                for(var i=0; i< list.length; i++){
                    var dataItem = list[i];
                    var itemId = dataItem.id;
                    var type = dataItem.type;
                    var manner = dataItem.class;
                    var content = dataItem.content;
                    if (common.isEmpty(itemId)) dataItem.id = itemId = common.getUuid(partIdPrefix);

                    var itemElement = common.deepCopy(docItemConfig.none);
                    if(type == "TEXT"){
                        itemElement = common.deepCopy(docItemConfig.text);
                        if(manner) itemElement.properties.class = manner;
                        itemElement.text = content;  

                    }
                    else if(type == "IMG"){
                        itemElement = common.deepCopy(docItemConfig.img);
                        if(manner) itemElement.properties.class = manner;
                        if(dataItem.width) itemElement.properties.width = dataItem.width;
                        if(dataItem.height) itemElement.properties.height = dataItem.height;
                        itemElement.src = content;

                    }
                    else if(type == "CODE"){
                        itemElement = common.deepCopy(docItemConfig.code);
                        if(manner) itemElement.properties.class = manner;
                        itemElement.text = content;
                        
                    }
                    itemElement.properties.id = itemId;
                    elementArr.push(itemElement);
                }

                return elementArr;
            }

            function build(params) {
                var id = params.id;
                var tool = params.tool;
                var list = params.list;
                if (common.isEmpty(id)) params.id = id = common.getUuid(partIdPrefix);
                //partCommon.initCall(params, ["click"]);

                var docElement = common.deepCopy(docConfig);

                var contentElement = docElement.children[1];
                contentElement.children = buildData(id, list);
                
                return docData["part" + id] = {
                    id: id,
                    params: params,
                    config: docElement,
                };
            }

            return {
                build: build,
                getConfig: docFn.getConfig
            }
        }

        return {
            window: new windowObj(),
            form: new formObj(),
            buttons: new buttonsObj(),
            grid: new gridObj(),
            drawBoard: new drawBoardObj(),
            svg: new svgObj(),
            lineMap: new lineMapObj(),
            custom: new customObj(),
            table: new tableObj(),
            tabs: new tabsObj(),
            page: new pageObj(),
            nav: new navObj(),
            content: new contentObj(),
            list: new listObj(),
            tree: new treeObj(),
            accordions: new accordionsObj(),
            screen: new screenObj(),
            rotate: new rotateObj(),
            doc: new docObj()
        }
    },

    // modules obj -----------------------------------------------------------------------------------
    function (uiName, buildUtil, common, parts, config) {

        var modules;
        var setting = config.module;
        var commonStyle = {
            none: "p-none",
        }
        var dictData = {};
        var moduleCommon = {
            ids: {
                form: "01",
                page: "02",
                tool: "03",
                list: "04",
                search: "05",
                table: "06",
                content: "07",
                tree: "08",
                windows: "09"
            },
            ajax: function (load, page, currSetting) {
                if (!load.type) load.type = "POST";
                if (!load.params) load.params = {};
                if (page) {
                    var paramsNameSetting = currSetting.paramsName;
                    load.params[paramsNameSetting.currPage] = page.curr;
                    load.params[paramsNameSetting.pageShowSize] = page.showSize;
                }
                console.log("Module load url: ", load.url, "; data:", load.params);
                $.ajax({
                    url: load.url,
                    type: load.type,
                    data: load.params,
                    success: function (result) {
                        var resultSetting = currSetting.resultPath;
                        if (common.getByPath(result, resultSetting.success) == true) {
                            var msg = common.getByPath(result, resultSetting.msg);
                            var data = common.getByPath(result, (page ? resultSetting.listData : resultSetting.data));
                            if (msg) alert(msg);
                            if (page && page != null) {
                                var resultCurrPage = common.getByPath(result, resultSetting.currPage);
                                var resultMaxPage = common.getByPath(result, resultSetting.maxPage);
                                var resultMaxCount = common.getByPath(result, resultSetting.maxCount);
                                if (resultCurrPage) page.curr = parseInt(resultCurrPage);
                                page.maxPage = common.isEmpty(resultMaxPage) ? -1 : resultMaxPage;
                                if (common.isEmpty(resultMaxPage) && !common.isEmpty(resultMaxCount)) page.maxCount = resultMaxCount;
                                parts.page.flush(page.id);
                            }

                            var dataFormatFn = load.dataFormat;
                            if (dataFormatFn && typeof dataFormatFn == "function") {
                                var formatNewData = dataFormat(data);
                                if (formatNewData) data = formatNewData;
                            }
                            if (load.success) common.callFn(load, "success", data, load.bind);
                        } else {
                            var errMsg = common.getByPath(result, resultSetting.errMsg);
                            if (errMsg) alert(errMsg);
                        }
                    }
                });
            },
            tool: {
                replace: function (temp, data) {
                    var paramReg = "@{(.*?)}";
                    return common.replace(temp, data, paramReg);
                },
                getModule: function (params, thisModule) {
                    var moduleId = params.moduleId;
                    var moduleObj = params.module;
                    if (!moduleObj) moduleObj = thisModule["module" + moduleId];
                    return moduleObj;
                },
                loadFormOptions: function (moduleParams, moduleSetting) {
                    var formConfigs = [];
                    if (moduleParams.form) formConfigs.push(moduleParams.form);
                    if (moduleParams.search) formConfigs.push(moduleParams.search.form);
                    if (moduleParams.windows) {
                        var windowsObj = moduleParams.windows;
                        for (var windowKey in windowsObj) {
                            if (windowsObj.hasOwnProperty(windowKey)) {
                                var windowObj = windowsObj[windowKey];
                                formConfigs.push(windowObj.form);
                            }
                        }
                    }

                    for (var formIndex = 0; formIndex < formConfigs.length; formIndex++) {
                        var formConfig = formConfigs[formIndex];
                        var id = formConfig.id;
                        var elements = formConfig.elements;
                        for (var index = 0; index < elements.length; index++) {
                            var element = elements[index];
                            if (element.load) {
                                var elementLoad = element.load;
                                var ref = elementLoad.ref;
                                var isRefresh = elementLoad.refresh == true ? true : false;
                                var optionTextKey = elementLoad.text;
                                var optionValueKey = elementLoad.value ? elementLoad.value : optionTextKey

                                var isQuery = false;
                                var loadDictFn = function (data) {
                                    if (ref) dictData[ref].data = data;
                                    var elementChildren = element.children = [];
                                    for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {
                                        var item = data[dataIndex];
                                        elementChildren.push({ text: item[optionTextKey], value: item[optionValueKey] });
                                    }
                                    parts.form.element.setDom(id, element.key, element);
                                };
                                var loadObj = {
                                    id: common.getUuid("L"),
                                    success: loadDictFn,
                                    type: elementLoad.type ? elementLoad.type : "GET",
                                    url: elementLoad.url,
                                    params: elementLoad.params
                                };

                                if (ref) {
                                    var dictObj = dictData[ref];
                                    if (!dictObj) {
                                        dictObj = dictData[ref] = {
                                            url: elementLoad.url,
                                            params: elementLoad.params
                                        };
                                    }
                                    if (!dictObj.data || isRefresh == true) {
                                        if (!loadObj.url) {
                                            loadObj.url = dictObj.url;
                                            loadObj.params = dictObj.params;
                                            loadObj.type = dictObj.type ? dictObj.type : "GET";
                                        }
                                        moduleCommon.ajax(loadObj, undefined, moduleSetting);
                                    } else {
                                        loadDictFn(dictObj.data);
                                    }
                                } else {
                                    moduleCommon.ajax(loadObj, undefined, moduleSetting);
                                }
                            }
                        }
                    }
                }
            },
            fns: {
                form: function (_modules, _setting) {
                    var _this;
                    var fnId = moduleCommon.ids.form;
                    var getModuleFn = moduleCommon.tool.getModule;

                    function build(moduleId, params) {
                        var id = params.id = moduleId + "_" + fnId;
                        var form = params.form;
                        var buttons = params.buttons;

                        var elementArr = [];
                        if (form) {
                            form.id = id;
                            var formsObj = parts.form.build(form);
                            params.form = formsObj.params;
                            elementArr.push(formsObj.config);
                        }
                        if (buttons) {
                            if (common.is.Array(buttons)) buttons = { buttons: buttons };
                            buttons.id = id;
                            for (var buttonIndex = 0; buttonIndex < buttons.buttons.length; buttonIndex++) {
                                var button = buttons.buttons[buttonIndex];
                                button.call = {};
                                button.call.click = {};
                                button.call.click.fn = _this.click;
                                button.call.click.params = { moduleId: moduleId };
                            }
                            var buttonsObj = parts.buttons.build(buttons);
                            params.buttons = buttonsObj.params;
                            elementArr.push(buttonsObj.config);
                        }

                        return {
                            id: moduleId,
                            params: params,
                            config: elementArr
                        }
                    }

                    function loadData(params) {
                        var moduleObj = getModuleFn(params, _modules);
                        if (moduleObj && moduleObj.params.form) {
                            var moduleParams = moduleObj.params;
                            var dataLoad = moduleObj.params.form.load;
                            dataLoad.success = function (data) {
                                parts.form.setData(moduleParams.form.id, data);
                            }
                            if (params.first == true) moduleCommon.tool.loadFormOptions(moduleParams, _setting);
                            moduleCommon.call.query(moduleObj, "form", _setting);
                        }
                    }

                    function initData(params) {
                        var moduleObj = getModuleFn(params, _modules);
                        if (moduleObj && moduleObj.params.form) {
                            var data = params.data;
                            var moduleParams = moduleObj.params;
                            if (moduleParams.form) {
                                var formId = moduleParams.form.id;
                                if (common.is.Array(moduleParams.form)) formId = moduleId;
                                if (data) ui.parts.form.setData(formId, data);
                                else ui.parts.form.initData(moduleParams.form.id);
                            }
                        }
                    }

                    function getData(params) {
                        var moduleObj = getModuleFn(params, _modules);
                        if (moduleObj && moduleObj.params.form) {
                            var moduleParams = moduleObj.params;
                            if (moduleParams.form)
                                return ui.parts.form.getData(moduleParams.form.id);
                        }
                    }

                    function removeData(params) {
                        var moduleObj = getModuleFn(params, _modules);
                        if (moduleObj && moduleObj.params.form) {
                            var moduleParams = moduleObj.params;
                            if (moduleParams.form) ui.parts.form.removeData(moduleParams.form.id);
                        }
                    }

                    function help(params) {
                        var moduleObj = getModuleFn(params, _modules);
                        if (moduleObj && moduleObj.params.form) {
                            var moduleParams = moduleObj.params;
                            parts.form.showHelp(moduleParams.form.id, "auto");
                        }
                    }

                    function click(params) {
                        var call = this.fn;
                        if (call) {
                            var moduleObj = getModuleFn(params, _modules);
                            if (moduleObj) {
                                var callBind = { button: this, module: moduleObj.params };
                                common.callFn(_this.call, call, undefined, callBind);
                            }
                        }
                    }

                    var call = {
                        linkTo: function () {
                            var currButton = this.button;
                            var currModule = this.module;
                            var currData = parts.form.getData(currModule.form.id);
                            moduleCommon.call.linkTo(currButton, currData);
                        },
                        save: function () {
                            var currButton = this.button;
                            var currModule = this.module;
                            if (currButton.url) {
                                var saveData = parts.form.getData(currModule.form.id);
                                currButton.success = function () {
                                    loadData({ moduleId: currModule.id });
                                }
                                moduleCommon.call.save(currButton, saveData, _setting);
                            }
                        }
                    }

                    return _this = {
                        build: build,
                        loadData: loadData,
                        initData: initData,
                        getData: getData,
                        removeData: removeData,
                        help: help,
                        click: click,
                        call: call
                    }
                },
                page: function (_modules, _loadFn, _setting) {
                    var _this;
                    var fnId = moduleCommon.ids.page;
                    var getModuleFn = moduleCommon.tool.getModule;

                    function build(moduleId, params) {
                        params.id = moduleId + "_" + fnId;
                        params.moduleId = moduleId;
                        params.call = {
                            click: {
                                fn: _this.check,
                                params: { moduleId: moduleId }
                            }
                        };
                        var pageObj = parts.page.build(params);
                        return pageObj;
                    }

                    function check(params) {
                        _loadFn({ moduleId: params.moduleId });
                    }

                    return _this = {
                        build: build,
                        check: check
                    }
                },
                tool: function (_modules, _loadFn, _setting) {
                    var _this;
                    var fnId = moduleCommon.ids.tool;
                    var getModuleFn = moduleCommon.tool.getModule;

                    function build(moduleId, params) {
                        if (common.is.Array(params)) params = { id: moduleId, buttons: params };
                        params.moduleId = moduleId;
                        params.align = "left";
                        var id = params.id = moduleId + "_" + fnId;
                        var buttons = params.buttons;
                        for (var buttonIndex = 0; buttonIndex < buttons.length; buttonIndex++) {
                            var button = buttons[buttonIndex];
                            button.moduleId = moduleId;
                            button.call = {};
                            button.call.click = {};
                            button.call.click.fn = _this.click;
                            button.call.click.params = { moduleId: moduleId };
                        }
                        var buttonsObj = parts.buttons.build(params);
                        return buttonsObj;
                    }

                    function click(params) {
                        var call = this.fn;
                        if (call) {
                            var moduleObj = getModuleFn(params, _modules);
                            if (moduleObj) {
                                var callBind = { button: this, module: moduleObj.params };
                                common.callFn(_this.call, call, undefined, callBind);
                            }
                        }
                    }

                    var call = {
                        openWindow: function () {
                            var button = this.button;
                            moduleCommon.call.openWindow(button);
                        },
                        edit: function () {
                            var currButton = this.button;
                            var currModule = this.module;
                            if (currModule) parts.list.edit(currModule.list.id);
                        },
                        isCheckAll: false,
                        checkAll: function () {
                            var currButton = this.button;
                            var currModule = this.module;
                            if (currModule.list) {
                                parts.list.edit(currModule.list.id, true);
                                parts.list.checkAll(currModule.list.id);
                            } else if (currModule.table) {
                                parts.table.row.check(currModule.table.id, !call.isCheckAll);
                                call.isCheckAll = !call.isCheckAll;
                            }
                        },
                        dels: function () {
                            var currButton = this.button;
                            var currModule = this.module;
                            if (currModule) {
                                var data = [];
                                if (currModule.list) {
                                    var removeObjs = ui.parts.list.removeChecked(currModule.list.id);
                                    for (var removeIndex = 0; removeIndex < removeObjs.length; removeIndex++) {
                                        var removeObj = removeObjs[removeIndex];
                                        if (removeObj.data) data.push(removeObj.data);
                                    }
                                } else if (currModule.table) {
                                    data = ui.parts.table.removeChecked(currModule.table.id);
                                }
                                currButton.success = function () { _loadFn({ moduleId: currModule.id }); }
                                moduleCommon.call.dels(currButton, data, _setting);
                            }
                        }
                    }

                    return _this = {
                        build: build,
                        click: click,
                        call: call
                    }
                },
                list: function (_modules, _setting) {
                    var _this;
                    var fnId = moduleCommon.ids.list;
                    var getModuleFn = moduleCommon.tool.getModule;

                    function build(moduleId, params) {
                        var id = params.id = moduleId + "_" + fnId;
                        var items = params.items = [];
                        var contents = params.contents ? params.contents : [];
                        params.call = { click: { fn: _this.click, params: { moduleId: moduleId } } };

                        for (var contentIndex = 0; contentIndex < contents.length; contentIndex++) {
                            var content = contents[contentIndex];
                            if (content.operations)
                                content.operations.call = { click: { fn: _this.operation, params: { moduleId: moduleId } } }
                            var contentObj = parts.content.build(content);
                            items.push({ content: contentObj.config });
                        }
                        var listObj = parts.list.build(params);
                        delete params.items;
                        return listObj;
                    }

                    function loadData(params) {
                        var moduleObj = getModuleFn(params, _modules);
                        var moduleParams = moduleObj.params;
                        if (moduleParams.list && moduleParams.list.load) {
                            var moduleId = moduleObj.id;
                            var dataLoad = moduleObj.params.list.load;
                            dataLoad.success = function (data) {
                                var listElement = [];
                                parts.list.empty(moduleId);
                                for (var index = 0; index < data.length; index++) {
                                    var item = data[index];
                                    var itemConfig = moduleCommon.tool.replace(dataLoad.temp, item);
                                    itemConfig.data = item;
                                    if (itemConfig.operations)
                                        itemConfig.operations.call = { click: { fn: _this.operation, params: { moduleId: moduleId } } }
                                    var contentObj = parts.content.build(itemConfig);
                                    if (contentObj)
                                        parts.list.item.add(moduleParams.list.id, { data: item, content: [contentObj.config] });
                                }
                            }
                            if (params.first == true) moduleCommon.tool.loadFormOptions(moduleParams, _setting);
                            moduleCommon.call.query(moduleObj, "list", _setting);
                        }
                    }

                    function click(params) {
                        var moduleObj = getModuleFn(params, _modules);
                        if (moduleObj) {
                            var call = moduleObj.params.list.fn;
                            var callBind = {
                                content: this,
                                module: moduleObj.params
                            };
                            if (call) common.callFn(_this.call, call, undefined, callBind);
                        }
                    }

                    function operation(params) {
                        var call = this.operation.fn;
                        if (call) {
                            var moduleObj = getModuleFn(params, _modules);
                            if (moduleObj) {
                                var callBind = { operation: this.operation, content: this.content, module: moduleObj.params };
                                common.callFn(_this.call, call, undefined, callBind);
                            }
                        }
                        event.stopPropagation();
                    }

                    var call = {
                        openWindow: function () {
                            var operation = this.operation;
                            operation.moduleId = this.module.id;
                            moduleCommon.call.openWindow(operation, this.content.data);
                        },
                        del: function () {
                            var operationObj = this.operation;
                            var currModule = this.module;
                            operationObj.success = function () { _this.loadData({ moduleId: currModule.id }); }
                            moduleCommon.call.del(operationObj, this.content.data, _setting);
                        },
                        linkTo: function () {
                            var operationObj = this.operation;
                            var currData = this.content.data;
                            moduleCommon.call.linkTo(operationObj, currData);
                        }
                    }

                    return _this = {
                        build: build,
                        loadData: loadData,
                        click: click,
                        operation: operation,
                        call: call
                    }
                },
                search: function (_modules, _loadFn, _setting) {
                    var _this;
                    var fnId = moduleCommon.ids.search;
                    var getModuleFn = moduleCommon.tool.getModule;

                    function build(moduleId, params) {
                        var id = params.id = moduleId + "_" + fnId;
                        var show = params.show == false ? false : true;
                        var form = params.form;
                        var buttons = params.buttons;

                        var elementArr = [];
                        if (form) {
                            form.id = id;
                            var formsObj = parts.form.build(form);
                            params.form = formsObj.params;
                            elementArr.push(formsObj.config);
                        }
                        if (buttons) {
                            if (common.is.Array(buttons)) buttons = { buttons: buttons };
                            buttons.id = id;
                            for (var buttonIndex = 0; buttonIndex < buttons.buttons.length; buttonIndex++) {
                                var button = buttons.buttons[buttonIndex];
                                button.call = {};
                                button.call.click = {};
                                button.call.click.fn = _this.click;
                                button.call.click.params = { moduleId: moduleId };
                            }
                            var buttonsObj = parts.buttons.build(buttons);
                            params.buttons = buttonsObj.params;
                            elementArr.push(buttonsObj.config);
                        }

                        var accordionsObj = parts.accordions.build({
                            id: id,
                            items: [{
                                show: show,
                                title: "【显示/隐藏】查询条件",
                                body: { style: "border:0px;", content: elementArr }
                            }]
                        });

                        return {
                            id: moduleId,
                            params: params,
                            config: [accordionsObj.config]
                        }
                    }

                    function setData(params) {
                        var moduleObj = getModuleFn(params, _modules);
                        if (moduleObj && moduleObj.params.search) {
                            var data = params.data;
                            parts.form.setData(moduleObj.params.search.form.id, data);
                        }
                    }

                    function click(params) {
                        var call = this.fn;
                        if (call) {
                            var moduleObj = getModuleFn(params, _modules);
                            if (moduleObj) {
                                var callBind = { button: this, module: moduleObj.params };
                                common.callFn(_this.call, call, undefined, callBind);
                            }
                        }
                    }

                    var call = {
                        query: function () {
                            var currButton = this.button;
                            var currModule = this.module;
                            _loadFn({ moduleId: currModule.id });
                        }
                    }

                    return _this = {
                        build: build,
                        setData: setData,
                        click: click,
                        call: call
                    }
                },
                table: function (_modules, _setting) {
                    var _this;
                    var fnId = moduleCommon.ids.table;
                    var getModuleFn = moduleCommon.tool.getModule;

                    function build(moduleId, params) {
                        params.moduleId = moduleId;
                        var id = params.id = moduleId + "_" + fnId;
                        var screen = params.screen;
                        var operations = params.operations;
                        if (operations) {
                            for (var operationKey in operations) {
                                if (operations.hasOwnProperty(operationKey)) {
                                    var operation = operations[operationKey];
                                    operation.moduleId = moduleId;
                                    operation.params = { moduleId: moduleId, fn: operation.fn }
                                    operation.fn = _this.operation;
                                }
                            }
                        }

                        var elementArr = [];
                        if (screen) {
                            var screenObj = buildScreen(id, screen);
                            elementArr.push(screenObj.config);
                        }
                        var tableObj = parts.table.build(params);
                        elementArr.push(tableObj.config);

                        return {
                            id: moduleId,
                            params: params,
                            config: elementArr
                        };
                    }

                    function buildScreen(id, screen) {
                        var screenItems = [];
                        for (var key in screen) {
                            if (screen.hasOwnProperty(key)) {
                                var screenItemText = screen[key];
                                screenItems.push({ key: key, text: screenItemText });
                            }
                        }
                        var screenParams = { id: id, groups: [{ key: "colEdit", title: "自定义列", items: screenItems }] };
                        var screenObj = parts.screen.build(screenParams);

                        var accordionParams = {
                            id: id,
                            items: [{
                                title: "表格自定义列",
                                body: { style: "border:0px", content: screenObj.config },
                                call: {
                                    switch: function () {
                                        if (this.show == false) {
                                            var screenData = parts.screen.getData(id);
                                            if (screenData.colEdit) {
                                                var newHeaderArr = screenData.colEdit;
                                                var newHeader = {};
                                                for (var i = 0; i < newHeaderArr.length; i++) {
                                                    var headerItem = newHeaderArr[i];
                                                    newHeader[headerItem.key] = headerItem.text;
                                                }
                                                var tableParams = parts.table.getConfig(id);
                                                parts.table.col.edit(id, newHeader, tableParams.$data);
                                            }
                                        }
                                    }
                                }
                            }]
                        };
                        var accordionObj = parts.accordions.build(accordionParams);

                        return accordionObj;
                    }

                    function loadData(params) {
                        var moduleObj = getModuleFn(params, _modules);
                        var moduleParams = moduleObj.params;
                        if (moduleParams.table && moduleParams.table.load) {
                            var dataLoad = moduleObj.params.table.load;
                            dataLoad.success = function (data) {
                                moduleParams.table.$data = data;
                                parts.table.row.setData(moduleParams.table.id, data);
                            }
                            if (params.first == true) moduleCommon.tool.loadFormOptions(moduleParams, _setting);
                            moduleCommon.call.query(moduleObj, "table", _setting);
                        }
                    }

                    function operation(params) {
                        var call = params.fn;
                        if (call) {
                            var moduleObj = getModuleFn(params, _modules);
                            if (moduleObj) {
                                var callBind = {
                                    operation: this.operation,
                                    data: this.data,
                                    module: moduleObj.params
                                };
                                common.callFn(_this.call, call, undefined, callBind);
                            }
                        }
                    }

                    var call = {
                        openWindow: function () {
                            var operation = this.operation;
                            var data = this.data;
                            var moduleObj = this.module;
                            moduleCommon.call.openWindow(operation, data);
                        },
                        del: function () {
                            var operationObj = this.operation;
                            var currModule = this.module;
                            operationObj.success = function () { _this.loadData({ moduleId: currModule.id }); }
                            moduleCommon.call.del(operationObj, this.data, _setting);
                        },
                        linkTo: function () {
                            var currModule = this.module;
                            var operationObj = this.operation;
                            var currData = parts.table.row.getData(currModule.table.id, operationObj.index);
                            moduleCommon.call.linkTo(operationObj, currData);
                        }
                    }

                    return _this = {
                        build: build,
                        loadData: loadData,
                        operation: operation,
                        call: call
                    }
                },
                content: function (_modules, _setting) {
                    var _this;
                    var fnId = moduleCommon.ids.content;
                    var getModuleFn = moduleCommon.tool.getModule;

                    function build(moduleId, params) {
                        if (params) {
                            var id = params.id = moduleId + "_" + fnId;
                            if (params.operations) {
                                params.operations.moduleId = moduleId;
                                params.operations.call = { click: { fn: _this.operation, params: { moduleId: moduleId } } }
                            }
                            var contentObj = parts.content.build(params);
                            return contentObj;
                        }
                    }

                    function operation(params) {
                        var call = this.operation.fn;
                        if (call) {
                            var moduleObj = getModuleFn(params, _modules);
                            if (moduleObj) {
                                var callBind = { operation: this.operation, content: this.content, module: moduleObj.params };
                                common.callFn(_this.call, call, undefined, callBind);
                            }
                        }
                    }

                    function loadData(params) {
                        var moduleObj = getModuleFn(params, _modules);
                        if (moduleObj && moduleObj.params.load) {
                            var moduleId = moduleObj.id;
                            var loadParams = moduleObj.params.load;
                            if (loadParams && loadParams.url && loadParams.temp) {
                                if (!loadParams.success)
                                    loadParams.success = function (data) {
                                        var contentConfig = moduleCommon.tool.replace(loadParams.temp, data);
                                        if (contentConfig.operations)
                                            contentConfig.operations.call = { click: { fn: _this.operation, params: { moduleId: moduleId } } }
                                        contentConfig.data = data;
                                        var contentObj = parts.content.build(contentConfig);
                                        var contentHtml = ui.build.buildModule([contentObj.config]);
                                        $("#" + _setting.idPrefix + moduleId).find("div[part='content']").html(contentHtml);
                                    };
                                moduleCommon.ajax(loadParams, moduleObj.params.page, _setting);
                            }
                        }
                    }

                    var call = {
                        openWindow: function () {
                            var operation = this.operation;
                            operation.moduleId = this.module.id;
                            moduleCommon.call.openWindow(operation, this.content.data);
                        },
                        linkTo: function () {
                            var operationObj = this.operation;
                            var currData = this.content.data;
                            moduleCommon.call.linkTo(operationObj, currData);
                        }
                    }

                    return _this = {
                        build: build,
                        loadData: loadData,
                        operation: operation,
                        call: call
                    }
                },
                tree: function (_modules, _setting) {
                    var _this;
                    var fnId = moduleCommon.ids.tree;
                    var getModuleFn = moduleCommon.tool.getModule;

                    function build(moduleId, params) {
                        if (!params.id) params.id = moduleId;
                        //var id = params.id = moduleId + "_" + fnId;
                        var treeObj = parts.tree.build(params);
                        return treeObj;
                    }

                    function loadData(params) {
                        var moduleObj = getModuleFn(params, _modules);
                        var moduleParams = moduleObj.params;
                        if (moduleParams.tree && moduleParams.tree.load) {
                            var dataLoad = moduleObj.params.tree.load;
                            var temp = dataLoad.temp;
                            var formatFn = dataLoad.format;
                            var replaceFn = function (itemTemp, itemConfig) {
                                if (itemConfig.items && common.is.Array(itemConfig.items)) {
                                    var itemsData = itemConfig.items;
                                    var childItemsConfig = []
                                    for (var index = 0; index < itemsData.length; index++) {
                                        var childItemConfig = moduleCommon.tool.replace(itemTemp, itemsData[index]);
                                        replaceFn(itemTemp, childItemConfig);
                                        childItemsConfig.push(childItemConfig);
                                    }
                                    itemConfig.items = childItemsConfig;
                                } else {
                                    itemConfig.items = undefined;
                                }
                            };
                            dataLoad.success = function (data) {
                                var treeElement = [];
                                for (var index = 0; index < data.length; index++) {
                                    var dataItem = data[index];
                                    var itemConfig = moduleCommon.tool.replace(temp, dataItem);
                                    replaceFn(temp, itemConfig);
                                }
                                ui.parts.tree.item.setItems(treeElement);
                            }
                            moduleCommon.call.query(moduleObj, "tree", _setting);
                        }
                    }

                    return _this = {
                        build: build,
                        loadData: loadData
                    };
                },
                windows: function (_modules, _loadFn, _setting) {
                    var _this;
                    var fnId = moduleCommon.ids.windows;
                    var getModuleFn = moduleCommon.tool.getModule;

                    function build(moduleId, params) {
                        var windows = params ? params : [];
                        var windowsParams = [];
                        var windowsConfig = [];
                        for (var index = 0; index < windows.length; index++) {
                            var window = windows[index];
                            if (!window.id) window.id = "w" + index;
                            var windowObj = buildWindow(moduleId, window);
                            windowsParams.push(windowObj.params);
                            windowsConfig.push(windowObj.config);
                        }
                        return {
                            id: moduleId,
                            params: params,
                            config: windowsConfig
                        };
                    }

                    function buildWindow(moduleId, params) {
                        var id = params.id = getWindowId(moduleId, params.id);

                        if (params.form) params.type = "form";
                        else if (params.screen) params.type = "screen";
                        else if (params.table) params.type = "table";
                        else params.type = undefined;

                        var type = params.type;
                        if (type != undefined) {
                            var bodyConfig = [];
                            bodyConfig.push(ui.build.tags.brConfig[0]); // 添加换行
                            var buildFn = buildBody[type];
                            buildFn(id, params, bodyConfig);
                            bodyConfig.push(ui.build.tags.brConfig[0]); // 添加换行
                            params.body = bodyConfig;

                            return parts.window.build(params);
                        }
                        else console.log("window's type is undefined");
                    }

                    var buildBody = {
                        form: function (moduleId, params, bodyConfig) {
                            var id = params.id;
                            var formConfig = params.form;
                            var buttonsConfig = params.buttons;

                            if (formConfig) {
                                if (common.is.Array(formConfig)) formConfig = { id: id, elements: formConfig };
                                else formConfig.id = id;
                                var formElement = parts.form.build(formConfig);
                                params.form = formElement.params;
                                bodyConfig.push(formElement.config);
                            }
                            if (buttonsConfig) {
                                if (common.is.Array(buttonsConfig)) buttonsConfig = { id: id, buttons: buttonsConfig };
                                else buttonsConfig.id = id;
                                for (var buttonIndex = 0; buttonIndex < buttonsConfig.buttons.length; buttonIndex++) {
                                    var button = buttonsConfig.buttons[buttonIndex];
                                    button.call = {};
                                    button.call.click = {};
                                    button.call.click.fn = _this.click;
                                    button.call.click.params = { moduleId: moduleId, window: params };
                                }
                                var buttonElement = parts.buttons.build(buttonsConfig);
                                params.buttons = buttonElement.params;
                                bodyConfig.push(buttonElement.config);
                            }
                        },
                        table: function (moduleId, params, bodyConfig) {
                            var id = params.id;
                            var searchConfig = params.search;
                            var toolConfig = params.tool;
                            var tableConfig = params.table;
                            var pageConfig = params.page;


                        },
                        screen: function (moduleId, params, bodyConfig) {
                            var id = params.id;
                            var screenConfig = params.screen;
                            var buttonsConfig = params.buttons;

                            if (screenConfig) {
                                if (common.is.Array(screenConfig)) screenConfig = { id: id, groups: screenConfig };
                                else screenConfig.id = id;
                                var screenElement = parts.screen.build(screenConfig);
                                params.screen = screenElement.params;
                                bodyConfig.push(screenElement.config);
                            }
                            if (buttonsConfig) {
                                if (common.is.Array(buttonsConfig)) buttonsConfig = { id: id, buttons: buttonsConfig };
                                else buttonsConfig.id = id;
                                for (var buttonIndex = 0; buttonIndex < buttonsConfig.buttons.length; buttonIndex++) {
                                    var button = buttonsConfig.buttons[buttonIndex];
                                    button.call = {};
                                    button.call.click = {};
                                    button.call.click.fn = _this.click;
                                    button.call.click.params = { moduleId: moduleId, window: params };
                                }
                                var buttonElement = parts.buttons.build(buttonsConfig);
                                params.buttons = buttonElement.params;
                                bodyConfig.push(buttonElement.config);
                            }
                        }
                    }

                    function open(moduleId, windowId) {
                        ui.parts.window.open(getWindowId(moduleId, windowId));
                    }

                    function close(moduleId, windowId) {
                        ui.parts.window.close(getWindowId(moduleId, windowId));
                    }

                    function getWindowId(moduleId, windowId) {
                        return moduleId + "_" + fnId + "_" + windowId;
                    }

                    function init(params) {
                        var windowId = getWindowId(params.moduleId, params.windowId);
                        var currWindow = ui.parts.window.getConfig(windowId);
                        if (currWindow) {
                            var formId = currWindow.form.id;
                            var data = params.data;
                            if (data) ui.parts.form.setData(formId, data);
                            else ui.parts.form.initData(formId);
                        }
                    }

                    function click(params) {
                        var call = this.fn;
                        if (call) {
                            var moduleObj = getModuleFn(params, _modules);
                            if (moduleObj) {
                                var currWindow = params.window;
                                var callBind = { button: this, window: currWindow, module: moduleObj.params };
                                common.callFn(_this.call, call, undefined, callBind);
                            }
                        }
                    }

                    var call = {
                        save: function () {
                            var currButton = this.button;
                            var currWindow = this.window;
                            var currModule = this.module;
                            if (currButton.url) {
                                var saveData = ui.parts.form.getData(currWindow.form.id);
                                currButton.success = function () {
                                    _loadFn({ moduleId: currModule.id });
                                }
                                ui.parts.window.close(currWindow.id);
                                moduleCommon.call.save(currButton, saveData, _setting);
                            }
                        }
                    }

                    return _this = {
                        build: build,
                        init: init,
                        getWindowId: getWindowId,
                        open: open,
                        close: close,
                        click: click,
                        call: call
                    }
                }
            },
            call: {
                openWindow: function (_this, data) {
                    var obj = _this
                    var toWindowId = obj.to;
                    if (toWindowId) {
                        var isInit = obj.init == false ? false : true;
                        if (isInit && data) {
                            modules.window.init({
                                moduleId: obj.moduleId,
                                windowId: toWindowId,
                                data: data
                            });
                        }
                        modules.window.open(obj.moduleId, toWindowId);
                    }
                },
                save: function (_this, data, moduleSetting) {
                    var curr = _this;
                    if (curr.url) {
                        var submitParams = curr.params;
                        var saveData = data ? data : {};
                        if (submitParams) {
                            for (var paramKey in submitParams) {
                                if (submitParams.hasOwnProperty(paramKey)) {
                                    var paramValue = submitParams[paramKey];
                                    saveData[paramKey] = paramValue;
                                }
                            }
                        }
                        moduleCommon.ajax({
                            url: curr.url,
                            type: curr.type,
                            params: saveData,
                            success: curr.success,
                        }, undefined, moduleSetting);
                    }
                },
                del: function (_this, data, moduleSetting) {
                    var operationObj = _this;
                    if (operationObj.url) {
                        if (confirm("确认删除吗？")) {
                            var submitParamKeys = operationObj.paramKeys;
                            var submitParams = operationObj.urlParams ? operationObj.urlParams : {};
                            var delData = data;
                            if (submitParamKeys) {
                                for (var submitParamIndex = 0; submitParamIndex < submitParamKeys.length; submitParamIndex++) {
                                    var submitKey = submitParamKeys[submitParamIndex];
                                    submitParams[submitKey] = delData[submitKey];
                                }
                            } else {
                                for (var delDataKey in delData) {
                                    if (delData.hasOwnProperty(delDataKey))
                                        if (!submitParams[delDataKey])
                                            submitParams[delDataKey] = delData[delDataKey];
                                }
                            }
                            moduleCommon.ajax({
                                url: operationObj.url,
                                type: operationObj.type,
                                params: submitParams,
                                success: operationObj.success,
                            }, undefined, moduleSetting);
                        }
                    }
                },
                dels: function (_this, data, moduleSetting) {
                    var operationObj = _this;
                    if (operationObj.url) {
                        if (confirm("确认删除吗？")) {
                            var submitParamKeys = operationObj.paramKeys;
                            var submitData = operationObj.urlParams ? operationObj.submitParams : {};
                            var delDatas = data ? data : [];

                            if (common.is.String(submitParamKeys)) {
                                submitData[submitParamKeys] = delData;
                            }
                            else if (common.is.Array(submitParamKeys)) {
                                for (var submitParamIndex = 0; submitParamIndex < submitParamKeys.length; submitParamIndex++) {
                                    var submitParam = submitParamKeys[submitParamIndex];
                                    if (common.is.String(submitParam)) submitParam = { key: submitParam };

                                    var submitParamKeyName = submitParam.key;
                                    if (!common.isEmpty(submitParamKeyName)) {
                                        var submitParamName = submitParam.name ? submitParam.name : (submitParamKeyName + "s");
                                        var submitParamSplit = submitParam.split == undefined ? "," : submitParam.split;

                                        var submitParam = submitData[submitParamName];
                                        for (var delIndex = 0; delIndex < delDatas.length; delIndex++) {
                                            var delData = delDatas[delIndex];
                                            for (var delDataKey in delData) {
                                                if (delData.hasOwnProperty(delDataKey) && delDataKey == submitParamKeyName) {
                                                    var delDataVal = delData[delDataKey];
                                                    if (submitParamSplit == false) {
                                                        if (!submitParam) submitParam = submitData[submitParamName] = []
                                                        submitParam.push(delDataVal);
                                                    } else {
                                                        if (!submitParam) submitParam = submitData[submitParamName] = delDataVal;
                                                        else submitParam = submitData[submitParamName] += (submitParamSplit + delDataVal);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            moduleCommon.ajax({
                                url: operationObj.url,
                                type: operationObj.type,
                                params: submitData,
                                success: operationObj.success,
                            }, undefined, moduleSetting);
                        }
                    }
                },
                query: function (_this, type, moduleSetting) {
                    var moduleObj = _this;
                    if (moduleObj) {
                        var moduleParams = moduleObj.params;
                        var dataLoad = moduleParams[type].load;
                        var submitData = dataLoad.params ? dataLoad.params : {};
                        var search;
                        if (moduleParams.search) search = parts.form.getData(moduleParams.search.form.id);
                        if (search) {
                            for (var searchKey in search) {
                                if (search.hasOwnProperty(searchKey)) {
                                    var searchVal = search[searchKey];
                                    submitData[searchKey] = searchVal;
                                }
                            }
                        }
                        moduleCommon.ajax({
                            url: dataLoad.url,
                            type: dataLoad.type,
                            temp: dataLoad.temp,
                            params: submitData,
                            success: dataLoad.success,
                        }, moduleParams.page, moduleSetting);
                    } else console.log("Module error: load params is undefined.");

                },
                linkTo: function (_this, data) {
                    var obj = _this;
                    if (obj.url) {
                        var linkToParams = obj.urlParams;
                        var urlParams = "";
                        if (linkToParams) {
                            var currData = data ? data : {};
                            if (!common.is.Array(linkToParams)) linkToParams = [linkToParams];
                            for (var linkToParamIndex = 0; linkToParamIndex < linkToParams.length; linkToParamIndex++) {
                                var dataPropertyKey = linkToParams[linkToParamIndex];
                                if (common.is.String(dataPropertyKey))
                                    urlParams += ("&" + dataPropertyKey + "=" + currData[dataPropertyKey]);
                                else if (common.is.Object(dataPropertyKey))
                                    urlParams += ("&" + dataPropertyKey.name + "=" + currData[dataPropertyKey.key]);
                                else console.log("This linkTo's 'params' param must 'String' or 'Object{name,key}'.");
                            }
                            if (obj.url.indexOf("?") == -1) urlParams = "?" + urlParams.substring(1, urlParams.length);
                        }
                        window.location.href = obj.url + urlParams;
                    }
                }
            }
        }

        var treeModule = function () {
            var moduleSetting = setting.form;
            var treeModuleObj = {};
            var moduleConfig = {
                name: "div", properties: {},
                children: [{ name: "div", properties: { part: "tree" } }]
            }

            var treeFn = new moduleCommon.fns.tree(treeModuleObj, moduleSetting);

            function build(params) {
                var id = params.id;
                var treeConfig = params.tree;

                var moduleElement = common.deepCopy(moduleConfig);
                if (treeConfig) {
                    var treeElement = treeFn.build(id, treeConfig);
                    moduleElement.children[0] = treeElement;
                }

                return treeModuleObj["module" + id] = {
                    id: id,
                    params: params,
                    config: moduleElement
                }
            }

            return {
                build: build,
                tree: treeFn,
                setting: moduleSetting
            }
        }

        var listModule = function () {
            var moduleSetting = setting.list;
            var listModuleObj = {};
            var moduleConfig = {
                name: "div", properties: {},
                children: [
                    { name: "div", properties: { part: "search" } },
                    { name: "div", properties: { part: "tool" } },
                    { name: "div", properties: { part: "list" } },
                    { name: "div", properties: { part: "page" } },
                    { name: "div", properties: { part: "windows" } }
                ]
            }

            var moduleFn = {
                getConfig: function (moduleId) {
                    var moduleObj = contentModuleObj["module" + moduleId];
                    if (moduleObj) return moduleObj.params;
                }
            };
            var listFn = new moduleCommon.fns.list(listModuleObj, moduleSetting);
            var searchFn = new moduleCommon.fns.search(listModuleObj, listFn.loadData, moduleSetting);
            var toolFn = new moduleCommon.fns.tool(listModuleObj, listFn.loadData, moduleSetting);
            var pageFn = new moduleCommon.fns.page(listModuleObj, listFn.loadData, moduleSetting);
            var windowsFn = new moduleCommon.fns.windows(listModuleObj, listFn.loadData, moduleSetting);

            function build(config) {
                var id = config.id;
                var listConfig = config.list;
                var pageConfig = config.page;
                var searchConfig = config.search;
                var toolConfig = config.tool;
                var windowsConfig = config.windows;
                var listModuleElement = common.deepCopy(moduleConfig);
                listModuleElement.properties.id = moduleSetting.idPrefix + id;

                if (searchConfig) {
                    var searchObj = searchFn.build(id, searchConfig);
                    if (searchObj) {
                        listModuleElement.children[0].properties.style = "text-align: center;";
                        config.search = searchObj.params;
                        listModuleElement.children[0].children = searchObj.config;
                    }
                }
                if (toolConfig) {
                    var toolObj = toolFn.build(id, toolConfig);
                    if (toolObj) {
                        config.tool = toolObj.params;
                        listModuleElement.children[1].children = [toolObj.config];
                    }
                }
                if (listConfig) {
                    var listObj = listFn.build(id, listConfig);
                    if (listObj) {
                        config.list = listObj.params;
                        listModuleElement.children[2].children = [listObj.config];
                    }
                }
                if (pageConfig) {
                    var pageObj = pageFn.build(id, pageConfig);
                    if (pageObj) {
                        config.page = pageObj.params;
                        var pageElement = [pageObj.config];
                        pageElement.push(buildUtil.tags.brConfig[0]);
                        listModuleElement.children[3].children = pageElement;
                    }
                }
                if (windowsConfig) {
                    var windowsObj = windowsFn.build(id, windowsConfig);
                    if (windowsObj) {
                        config.windows = windowsObj.params;
                        listModuleElement.children[4].children = windowsObj.config;
                    }
                }

                return listModuleObj["module" + id] = {
                    id: id,
                    params: config,
                    config: listModuleElement
                }
            }

            return {
                build: build,
                getConfig: moduleFn.getConfig,
                search: searchFn,
                list: listFn,
                page: pageFn,
                setting: moduleSetting
            }
        }

        var contentModule = function () {
            var moduleSetting = setting.content;
            var contentModuleObj = {};
            var moduleConfig = {
                name: "div", properties: {},
                children: [
                    { name: "div", properties: { part: "content" } },
                    { name: "div", properties: { part: "page" } },
                    { name: "div", properties: { part: "windows" } }
                ]
            }

            var moduleFn = {
                getConfig: function (moduleId) {
                    var moduleObj = contentModuleObj["module" + moduleId];
                    if (moduleObj) return moduleObj.params;
                }
            };
            var contentFn = new moduleCommon.fns.content(contentModuleObj, moduleSetting);
            var pageFn = new moduleCommon.fns.page(contentModuleObj, contentFn.loadData, moduleSetting);
            var windowsFn = new moduleCommon.fns.windows(contentModuleObj, contentFn.loadData, moduleSetting);

            function build(config) {
                var id = config.id;
                var contentConfig = config.content;
                var pageConfig = config.page;
                var windowsConfig = config.windows;

                var contentModuleElement = common.deepCopy(moduleConfig);
                contentModuleElement.properties.id = moduleSetting.idPrefix + id;

                var contentObj = contentFn.build(id, contentConfig);
                if (contentObj) {
                    config.content = contentObj.params;
                    contentModuleElement.children[0].children = [contentObj.config];
                }
                if (pageConfig) {
                    var pageObj = pageFn.build(id, pageConfig);
                    if (pageObj) {
                        config.page = pageObj.params;
                        var pageElement = [pageObj.config];
                        pageElement.push(buildUtil.tags.brConfig[0]);
                        contentModuleElement.children[1].children = pageElement;
                    }
                }
                if (windowsConfig) {
                    var windowsObj = windowsFn.build(id, windowsConfig);
                    if (windowsObj) {
                        config.windows = windowsObj.params;
                        contentModuleElement.children[2].children = windowsObj.config;
                    }
                }

                return contentModuleObj["module" + id] = {
                    id: id,
                    params: config,
                    config: contentModuleElement
                }
            }

            return {
                build: build,
                getConfig: moduleFn.getConfig,
                content: contentFn,
                page: pageFn,
                window: windowsFn,
                setting: moduleSetting
            }
        }

        var formModule = function () {
            var moduleSetting = setting.form;
            var formModuleObj = {};
            var moduleConfig = {
                name: "div", properties: {},
                children: []
            }

            var moduleFn = {
                getConfig: function (moduleId) {
                    var moduleObj = contentModuleObj["module" + moduleId];
                    if (moduleObj) return moduleObj.params;
                }
            };
            var formFn = new moduleCommon.fns.form(formModuleObj, moduleSetting);

            function build(config) {
                var id = config.id;
                var display = config.display ? config.display : "block";
                var formConfig = config.form;
                var buttonsConfig = config.buttons;

                var formModuleElement = common.deepCopy(moduleConfig);
                formModuleElement.properties.id = moduleSetting.idPrefix + id;

                var formObj = formFn.build(id, config);
                if (formObj) {
                    formModuleElement.properties.style = "display:" + display;
                    formModuleElement.children = formObj.config;
                }

                return formModuleObj["module" + id] = {
                    id: id,
                    params: formObj.params,
                    config: formModuleElement
                }
            }

            return {
                build: build,
                getConfig: moduleFn.getConfig,
                form: formFn,
                setting: moduleSetting
            }
        }

        var windowModule = function () {
            var moduleSetting = setting.window;
            var windowModuleObj = {};

            var windowFn = new moduleCommon.fns.windows(windowModuleObj, function () { }, moduleSetting);

            function build(params) {
                var id = params.id;
                var windowElement = params.windows ? params.windows : [];
                var windowObj = windowFn.build(id, windowElement);

                return windowModuleObj["module" + id] = {
                    id: id,
                    params: windowObj.params,
                    config: windowObj.config
                }
            }

            return {
                build: build,
                init: windowFn.init,
                getWindowId: windowFn.getWindowId,
                open: windowFn.open,
                close: windowFn.close,
                setting: moduleSetting
            }
        }

        var tableModule = function () {
            var moduleSetting = setting.table;
            var tableModuleObj = {};
            var moduleConfig = {
                name: "div", properties: {},
                children: [
                    { name: "div", properties: { part: "search" }, children: [] },
                    { name: "div", properties: { part: "tool" }, children: [] },
                    { name: "div", properties: { part: "table" }, children: [] },
                    { name: "div", properties: { part: "page" }, children: [] },
                    { name: "div", properties: { part: "windows" }, children: [] }
                ]
            }

            var moduleFn = {
                getConfig: function (moduleId) {
                    var moduleObj = tableModuleObj["module" + moduleId];
                    if (moduleObj) return moduleObj.params;
                }
            };
            var tableFn = new moduleCommon.fns.table(tableModuleObj, moduleSetting);
            var searchFn = new moduleCommon.fns.search(tableModuleObj, tableFn.loadData, moduleSetting);
            var toolFn = new moduleCommon.fns.tool(tableModuleObj, tableFn.loadData, moduleSetting);
            var pageFn = new moduleCommon.fns.page(tableModuleObj, tableFn.loadData, moduleSetting);
            var windowsFn = new moduleCommon.fns.windows(tableModuleObj, tableFn.loadData, moduleSetting);

            function build(config) {
                var id = config.id;
                var searchConfig = config.search;
                var toolConfig = config.tool;
                var tableConfig = config.table;
                var pageConfig = config.page;
                var windowsConfig = config.windows;

                var tableModuleElement = common.deepCopy(moduleConfig);
                tableModuleElement.properties.id = moduleSetting.idPrefix + id;

                if (searchConfig) {
                    var searchObj = searchFn.build(id, searchConfig);
                    if (searchObj) {
                        tableModuleElement.children[0].properties.style = "text-align: center;";
                        config.search = searchObj.params;
                        tableModuleElement.children[0].children = searchObj.config;
                    }
                }
                if (toolConfig) {
                    var toolObj = toolFn.build(id, toolConfig);
                    if (toolObj) {
                        config.tool = toolObj.params;
                        tableModuleElement.children[1].children = [toolObj.config];
                    }
                }
                if (tableConfig) {
                    var tableObj = tableFn.build(id, tableConfig);
                    if (tableObj) {
                        var tableElement = tableObj.config;
                        tableElement.push(buildUtil.tags.brConfig[0]);
                        config.table = tableObj.params;
                        tableModuleElement.children[2].children = tableElement;
                    }
                }
                if (pageConfig) {
                    var pageObj = pageFn.build(id, pageConfig);
                    if (pageObj) {
                        config.page = pageObj.params;
                        var pageElement = [pageObj.config];
                        pageElement.push(buildUtil.tags.brConfig[0]);
                        tableModuleElement.children[3].children = pageElement;
                    }
                }
                if (windowsConfig) {
                    var windowsObj = windowsFn.build(id, windowsConfig);
                    if (windowsObj) {
                        config.windows = windowsObj.params;
                        tableModuleElement.children[4].children = windowsObj.config;
                    }
                }

                return tableModuleObj["module" + id] = {
                    id: id,
                    params: config,
                    config: tableModuleElement
                }
            }

            return {
                build: build,
                getConfig: moduleFn.getConfig,
                search: searchFn,
                tool: toolFn,
                table: tableFn,
                page: pageFn,
                windows: windowsFn,
                setting: moduleSetting
            };
        }

        return modules = {
            $dict: dictData,
            tree: new treeModule(),
            table: new tableModule(),
            content: new contentModule(),
            list: new listModule(),
            form: new formModule(),
            window: new windowModule()
        };
    },

    // pages obj -----------------------------------------------------------------------------------
    function (buildUtil, common, parts, modules, config) {

        var urlParams = common.getQueryString();

        function buildDom(params) {
            var id = params.id;
            var style = params.style;
            var properties = params.properties;
            var children = params.children;

            var element = { name: "div", properties: {}, children: [] };
            if (id) element.properties.id = id;
            if (style) element.properties.style = style;
            if (properties) {
                for (var propertyKey in properties) {
                    if (properties.hasOwnProperty(propertyKey)) {
                        var propertyVal = properties[propertyKey];
                        element.properties[propertyKey] = propertyVal;
                    }
                }
            }
            element.children = children;
            return element;
        }

        function build(params) {
            if (common.is.Array(params)) params = { isBody: true, children: params };
            var domId = params.id;
            var isBody = params.isBody == true ? true : false;
            var initFn = params.init;
            var beforeFn = params.before;
            var children = params.children;

            if (beforeFn) beforeFn();

            var elementConfig = [];
            for (var childIndex = 0; childIndex < children.length; childIndex++) {
                var child = children[childIndex];
                if (!child.config) child = { config: child };

                var childDomId = child.domId;
                var childType = child.type;
                var childConfig = child.config;
                if (childType) {
                    var childTypeArr = childType.split(".");
                    if (childTypeArr.length == 2) {
                        var childType_1 = childTypeArr[0];
                        var childType_2 = childTypeArr[1];
                        var childObj = (childType_1 == "part") ? parts[childType_2].build(childConfig) : modules[childType_2].build(childConfig);

                        var childElementConfig = childObj.config;
                        if (!common.is.Array(childElementConfig)) childElementConfig = [childElementConfig];
                        if (!childDomId) {
                            child.children = childElementConfig;
                            elementConfig.push(buildDom(child));
                        } else {
                            var childHtml = buildUtil.buildModule(childElementConfig);
                            $("#" + childDomId).html(childHtml);
                        }
                    }
                    else if (childTypeArr.length == 1) {
                        var childHtml = "";
                        if (childType == "html") {
                            childHtml = childConfig;
                        } else if (childType == "config") {
                            if (!common.is.Array(childConfig)) childConfig = [childConfig];
                            childHtml = buildUtil.buildModule(childConfig);
                        }

                        if (!childDomId) elementConfig.push({ name: "div", properties: {}, text: childHtml });
                        else $("#" + childDomId).html(childHtml);
                    }
                }
            }

            var pageHtml;
            if (isBody == true) {
                pageHtml = buildUtil.buildModule(elementConfig);
                $(document.body).html(pageHtml);
            } else if (domId) {
                var domObj = document.getElementById(domId);
                if (domObj) {
                    pageHtml = buildUtil.buildModule(elementConfig);
                    $("#" + domId).html(pageHtml);
                } else {
                    params.children = elementConfig;
                    pageHtml = buildUtil.buildModule(buildDom(params));
                    $(document.body).append(pageHtml);
                }
            }

            if (initFn) initFn();
        }

        return {
            build: build,
            params: urlParams
        }
    },

    // build obj -----------------------------------------------------------------------------------
    function (common) {

        var symbol = { properties: "{properties}", html: "{html}" };

        function getTagTemp(tagName, tagType) {
            if (tagType == 1) return "<" + tagName + " " + symbol.properties + " />";
            else return "<" + tagName + " " + symbol.properties + " >" + symbol.html + "</" + tagName + ">";
        }

        function getTagType(tagName) {
            if (tagName == "input" || tagName == "br" || tagName == "hr") {
                return 1;
            }
            return 2;
        }

        function setSymbolText(tagTemp, content, symbol) {
            if (tagTemp.indexOf(symbol) != -1) {
                return tagTemp.replace(symbol, content);
            }
            return tagTemp;
        }

        function objToStr(obj) {
            var str = "";
            for (var key in obj) {
                str += key + "=\"" + obj[key] + "\" ";
            }
            return str;
        }

        function styleFormat(style) {
            if (common.is.Object(style)) {
                var styleStr = "";
                for (var styleKey in style) {
                    if (style.hasOwnProperty(styleKey)) {
                        var styleVal = style[styleKey];
                        styleStr += styleKey + ":" + styleVal + ";";
                    }
                }
                return styleStr;
            } else { return style; }
        }

        function buildTag(tag) {
            if (!tag.name) throw "tag's name is undefined.";

            var tagType = getTagType(tag.name);
            var tagText = getTagTemp(tag.name, tagType);

            if (!tag.properties) tag.properties = {};
            if (!tag.html) tag.html = "";
            if (tag.properties.style) tag.properties.style = styleFormat(tag.properties.style);

            tagText = setSymbolText(tagText, objToStr(tag.properties), symbol["properties"]);
            if (tagType == 2) tagText = setSymbolText(tagText, tag.html, symbol["html"]);

            return tagText;
        }

        function buildModule(modules, html) {

            if (!html) html = "";
            if (common.is.Object(modules)) {
                modules = [modules];
            }
            if (common.is.Array(modules)) {
                for (var i = 0; i < modules.length; i++) {
                    var childModule = modules[i];
                    if (childModule) {
                        var childHtml = "";
                        if (childModule.children && childModule.children.length > 0) {
                            childHtml = buildModule(childModule.children);
                        } else if (childModule.text) {
                            childHtml = childModule.text;
                        }
                        html += buildTag({ name: childModule.name, properties: childModule.properties, html: childHtml });
                    } else {
                        console.log("The Child Module is undefined!");
                    }
                }
            }

            return html;
        };

        return {
            buildTag: buildTag,
            buildModule: buildModule,
            tags: {
                brConfig: [{ name: "br" }],
                hrConfig: [{ name: "hr" }],
                nbsps: function (num) {
                    if (!num) num = 6;
                    var nbsps = "";
                    for (var i = 0; i < num; i++) nbsps += "&nbsp";
                    return nbsps;
                },
            },
            modules: {
                br: function () {
                    return buildTag({ name: "br" });
                }
            }
        }
    },

    // common obj -----------------------------------------------------------------------------------
    function () {

        function getJSON(path) {
            var json;
            if (isEmpty(path)) {
                throw "Load json error: json path is null! ";
            } else {
                path = getBasePath() + "/" + path;
                $.ajax({
                    type: "get",
                    url: path,
                    async: false,
                    dataType: "json",
                    context: document.body,
                    success: function (data) { json = data; },
                    error: function () { throw "Load json error: json path " + path; }
                });
            }
            return json;
        }

        function jqAjax(params) {
            console.log("Request url: ", params.url, ", data:", params.data + ".");
            if (!params.error) error = function () { console.log("Function jqAjax request " + url + " is error!"); }
            $.ajax(params);
        }

        function ajax(opt) {
            opt = opt || {};
            opt.method = opt.method.toUpperCase() || 'POST';
            opt.url = opt.url || '';
            opt.async = opt.async || true;
            opt.data = opt.data || null;
            opt.success = opt.success || function () { };

            var xmlHttp = null;
            if (XMLHttpRequest) {
                xmlHttp = new XMLHttpRequest();
            } else {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }

            var params = [];
            for (var key in opt.data) {
                params.push(key + '=' + opt.data[key]);
            }
            var postData = params.join('&');
            if (opt.method.toUpperCase() === 'POST') {
                xmlHttp.open(opt.method, opt.url, opt.async);
                xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                xmlHttp.send(postData);
            } else if (opt.method.toUpperCase() === 'GET') {
                xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
                xmlHttp.send(null);
            }
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    opt.success(xmlHttp.responseText);
                }
            };
        }

        function ajaxFileUpload(fileId, suffixs, url, success, error) {
            var filePath = $("#" + fileId).val();
            var suffix = filePath.substring(filePath.length - 3).toLowerCase();

            //if (suffix == "rar") {
            jQuery.ajaxSettings.traditional = true;
            $.ajaxFileUpload({
                url: url,
                secureuri: false,
                fileElementId: fileId,
                type: 'POST',
                dataType: "multipart/form-data;charset=utf-8",
                success: success ? success : function () { },
                error: error ? error : function () { }
            });
            //} else {
            //    alert('请上传 rar 格式文件!')
            //}
        }

        function getBasePath() {
            var strFullPath = window.document.location.href;
            var strPath = window.document.location.pathname;
            var pos = strFullPath.indexOf(strPath);
            var basePath = strFullPath.substring(0, pos) + strPath.substring(0, strPath.substr(1).indexOf('/') + 1)
            return basePath;
        }

        function dateFromat(dateObj, fromat) {
            var o = {
                "M+": dateObj.getMonth() + 1, //month 
                "d+": dateObj.getDate(), //day 
                "h+": dateObj.getHours(), //hour 
                "m+": dateObj.getMinutes(), //minute 
                "s+": dateObj.getSeconds(), //second 
                "q+": Math.floor((dateObj.getMonth() + 3) / 3), //quarter 
                "S": dateObj.getMilliseconds() //millisecond 
            }
            if (/(y+)/.test(fromat)) {
                fromat = fromat.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fromat)) {
                    fromat = fromat.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return fromat;
        }

        function isEmpty(obj) {
            if (obj == undefined || obj == null || obj.toString() == "") return true;
            else return false;
        }

        var is = (function () {
            var isObj = {
                types: ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"]
            };
            for (var i = 0, c; c = isObj.types[i++];) {
                isObj[c] = (function (type) {
                    return function (param) {
                        return Object.prototype.toString.call(param) == "[object " + type + "]";
                    }
                })(c);
            }
            return isObj;
        })();

        function deepCopy(p, c) {
            c = c ? c : {};
            for (var i in p) {
                if (typeof p[i] === 'object') {
                    c[i] = (p[i].constructor === Array) ? [] : {};
                    deepCopy(p[i], c[i]);
                } else {
                    c[i] = p[i];
                }
            }
            return c;
        }

        function callFn(obj, fn, params, bindThis) {
            if (fn) {
                var result;
                if (typeof fn == 'function') {
                    if (bindThis) result = fn.call(bindThis, params);
                    else result = fn(params);
                } else if (typeof fn == 'string') {
                    var arr = fn.split(".");
                    for (var i = 0; i < arr.length; i++) obj = obj[arr[i]];
                    if (bindThis) result = obj.call(bindThis, params);
                    else result = obj(params);
                }
                return result;
            }
        }

        function getByPath(base, path) {
            if (base && path) {
                var obj = base;
                var arr = path.split(".");
                for (var i = 0; i < arr.length; i++) {
                    if (!obj) return undefined;
                    obj = obj[arr[i]];
                }
                return obj;
            }
        }

        function getQueryString(name) {
            if (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            } else {
                var queryData = {};
                var r = window.location.search.substr(1);
                if (r) {
                    var paramArr = r.split("&");
                    for (var paramIndex = 0; paramIndex < paramArr.length; paramIndex++) {
                        var paramVal = paramArr[paramIndex];
                        var paramValArr = paramVal.split("=");
                        if (paramValArr.length == 2) queryData[paramValArr[0]] = paramValArr[1];
                    }
                }
                return queryData;
            }
        }

        function replace(temp, data, regStr, format) {
            var result = temp;
            if (is.Object(temp)) {
                result = {};
                for (var tempKey in temp) {
                    if (temp.hasOwnProperty(tempKey)) {
                        var tempVal = temp[tempKey];
                        result[tempKey] = replace(tempVal, data, regStr, format);
                    }
                }
            } else if (is.String(temp)) {
                var params = temp.match(new RegExp(regStr, "g"));
                if (is.Array(params)) {
                    for (var paramIndex = 0; paramIndex < params.length; paramIndex++) {
                        var paramPathKey = params[paramIndex];
                        var paramPath = paramPathKey.match(new RegExp(regStr, "i"));
                        result = result.replace(paramPathKey, getByPath(data, paramPath[1]));
                    }
                }
            } else if (is.Array(temp)) {
                var tempArray = [];
                for (var tempIndex = 0; tempIndex < temp.length; tempIndex++) {
                    var tempItem = temp[tempIndex];
                    var tempVal = replace(tempItem, data, regStr, format);
                    tempArray.push(tempVal);
                }
                result = tempArray;
            }
            return result;
        }

        function getUuid(prefix, suffix) {
            if (!prefix || prefix == null) prefix = "";
            if (!suffix || suffix == null) suffix = "";
            var randomNum = parseInt(Math.random() * 100000);
            return prefix + randomNum + (new Date().getTime()) + suffix;
        }

        function addDataToObj(key, data, obj) {
            var currObj = obj;
            var KeyArr = key.split(".");
            if (KeyArr.length == 1) {
                currObj[key] = data;
            } else {
                for (var index = 0; index < KeyArr.length; index++) {
                    var currKey = KeyArr[index];
                    if (index == KeyArr.length - 1) currObj[currKey] = data;
                    else currObj = currObj[currKey] = {};
                }
            }
        }

        return {
            ajax: ajax,
            jqAjax: jqAjax,
            getJSON: getJSON,
            ajaxFileUpload: ajaxFileUpload,
            getBasePath: getBasePath,
            is: is,
            isEmpty: isEmpty,
            dateFromat: dateFromat,
            deepCopy: deepCopy,
            callFn: callFn,
            getByPath: getByPath,
            getQueryString: getQueryString,
            replace: replace,
            getUuid: getUuid,
            addDataToObj: addDataToObj,
        }
    },

    // config obj -----------------------------------------------------------------------------------
    function () {
        var commonConfig = {
            paramsName: {
                currPage: "page",
                pageShowSize: "pageSize",
            },
            resultPath: {
                success: "success",
                currPage: "data.page",
                maxPage: "data.maxPage",
                maxCount: "data.maxCount",
                data: "data",
                listData: "data.data",
                msg: "errMsg",
                errMsg: "errMsg"
            }
        }
        var partConfig = {
            window: {
                idPrefix: "p_window_",
                bgIdPrefix: "p_window_bg",
                bodyIdPrefix: "p_window_body_"
            },
            form: {
                idPrefix: "p_forms_",
                elementIdPrefix: "p_form_",
                elementNamePrefix: "p_element_",
                helpMsgName: "p_form_help_msg",
                errorMsgName: "p_form_error_msg",
                fileNameSuffix: "File",
                fileReturnDataPath: "data",
                filePathNameSuffix: "Text",
                fileBrowseButtonName: "浏览",
                fileUploadButtonName: "上传"
            },
            grid: {
                idPrefix: "p_grid_"
            },
            drawBoard: {
                toolIdPrefix: "p_draw_",
                drawIdPrefix: "p_draw_shapes_",
                shapeIdPrefix: "p_draw_shape_",
                connectIdPrefix: "p_draw_connect_",
                connectLineIdPrefix: "p_draw_connect_line_",
                stratGap: 6,
                endGap: 6,
                allowNum: 15,
                connectPointText: ">"
            },
            svg: {
                idPrefix: "p_svg_",
                elementNamePrefix: "p_svg_element_"
            },
            buttons: {
                idPrefix: "p_button_"
            },
            lineMap: {
                idPrefix: "p_lineMap_",
                lineIdPrefix: "p_lineMap_line_"
            },
            custom: {
                idPrefix: "p_custom_"
            },
            table: {
                idPrefix: "p_table_",
                checkIdPrefix: "p_tr_check_",
                checkAllIdPrefix: "p_tr_checkAll_",
                colNamePrefix: "p_table_key_",
                rowNamePrefix: "p_table_row_",
                defaultRowCount: 15,
                defaultHeaderAlign: "left",
                defaultBodyAlign: "left",
            },
            tabs: {
                idPrefix: "p_tabs_",
                tabNamePrefix: "p_tab_"
            },
            page: {
                idPrefix: "p_page_",
                lastText: " < ",
                nextText: " > ",
                firstlyText: "首页",
                finallyText: "末页",
                toText: "跳转到",
            },
            nav: {
                idPrefix: "p_nav_",
                listIdPrefix: "p_nav_list_",
                groupIdPrefix: "p_nav_group_",
                nodeIdPrefix: "p_nav_node_",
            },
            content: {
                idPrefix: "p_content_",
                operationNamePrefix: "p_operation_"
            },
            list: {
                idPrefix: "p_list_",
                itemNamePrefix: "p_list_item_"
            },
            tree: {
                idPrefix: "p_tree_",
                itemNamePrefix: "p_tree_item_"
            },
            accordion: {
                idPrefix: "p_accordions_",
                itemIdPrefix: "p_accordion_"
            },
            screen: {
                idPrefix: "p_screen_",
                groupIdPrefix: "p_screen_group_",
                itemIdPrefix: "p_screen_item_"
            },
            rotate: {
                idPrefix: "p_rotate_",
                itemIdPrefix: "p_rotate_item_"
            },
            doc: {
                idPrefix: "p_doc_",
                itemIdPrefix: "p_doc_item_"
            }
        }
        var moduleConfig = {
            info: {
                idPrefix: "m_form_",
            },
            list: {
                idPrefix: "m_list_",
                currPage: 1,
                pageSize: 10,
                paramsName: {
                    currPage: commonConfig.paramsName.currPage,
                    pageShowSize: commonConfig.paramsName.pageShowSize
                },
                resultPath: {
                    success: commonConfig.resultPath.success,
                    currPage: commonConfig.resultPath.currPage,
                    maxPage: commonConfig.resultPath.maxPage,
                    maxCount: commonConfig.resultPath.maxCount,
                    data: commonConfig.resultPath.data,
                    listData: commonConfig.resultPath.listData,
                    msg: commonConfig.resultPath.msg,
                    errMsg: commonConfig.resultPath.errMsg
                }
            },
            content: {
                idPrefix: "m_content_",
                currPage: 1,
                pageSize: 10,
                paramsName: {
                    currPage: commonConfig.paramsName.currPage,
                    pageShowSize: commonConfig.paramsName.pageShowSize
                },
                resultPath: {
                    success: commonConfig.resultPath.success,
                    currPage: commonConfig.resultPath.currPage,
                    maxPage: commonConfig.resultPath.maxPage,
                    maxCount: commonConfig.resultPath.maxCount,
                    data: commonConfig.resultPath.data,
                    listData: commonConfig.resultPath.listData,
                    msg: commonConfig.resultPath.msg,
                    errMsg: commonConfig.resultPath.errMsg
                }
            },
            form: {
                idPrefix: "m_form_",
                currPage: 1,
                pageSize: 10,
                paramsName: {
                    currPage: commonConfig.paramsName.currPage,
                    pageShowSize: commonConfig.paramsName.pageShowSize
                },
                resultPath: {
                    success: commonConfig.resultPath.success,
                    currPage: commonConfig.resultPath.currPage,
                    maxPage: commonConfig.resultPath.maxPage,
                    maxCount: commonConfig.resultPath.maxCount,
                    data: commonConfig.resultPath.data,
                    listData: commonConfig.resultPath.listData,
                    msg: commonConfig.resultPath.msg,
                    errMsg: commonConfig.resultPath.errMsg
                }
            },
            window: {
                idPrefix: "m_windows_",
                currPage: 1,
                pageSize: 10,
                paramsName: {
                    currPage: commonConfig.paramsName.currPage,
                    pageShowSize: commonConfig.paramsName.pageShowSize
                },
                resultPath: {
                    success: commonConfig.resultPath.success,
                    currPage: commonConfig.resultPath.currPage,
                    maxPage: commonConfig.resultPath.maxPage,
                    maxCount: commonConfig.resultPath.maxCount,
                    data: commonConfig.resultPath.data,
                    listData: commonConfig.resultPath.listData,
                    msg: commonConfig.resultPath.msg,
                    errMsg: commonConfig.resultPath.errMsg
                }
            },
            table: {
                idPrefix: "m_table_",
                addWindowName: "add",
                updateWindowName: "update",
                currPage: 1,
                pageSize: 10,
                paramsName: {
                    currPage: commonConfig.paramsName.currPage,
                    pageShowSize: commonConfig.paramsName.pageShowSize
                },
                resultPath: {
                    success: commonConfig.resultPath.success,
                    currPage: commonConfig.resultPath.currPage,
                    maxPage: commonConfig.resultPath.maxPage,
                    maxCount: commonConfig.resultPath.maxCount,
                    data: commonConfig.resultPath.data,
                    listData: commonConfig.resultPath.listData,
                    msg: commonConfig.resultPath.msg,
                    errMsg: commonConfig.resultPath.errMsg
                }
            }
        }
        var pageConfig = {}

        return {
            common: commonConfig,
            part: partConfig,
            module: moduleConfig,
            page: pageConfig
        }
    }
    );


