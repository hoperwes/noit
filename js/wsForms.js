$.validator.defaults.getDataToSend = function (form) {
    return { data: GetJsonData(form) };
};
$.validator.defaults.callbackHandler = function (data, form) { }

$.validator.defaults.submitHandler = function () {
    var validator = this,
        form = validator.currentForm;
    $('#' + form.id + ' .row').hide();
    $('#' + form.id + ' .form-group').hide();
    $('#' + form.id + ' .obbligatorio').hide();
    $('#' + form.id + ' .loading').show();
    $.ajax({
        type: "POST",
        url: $(form).attr('action'),
        cache: false,
        contentType: "application/json; charset=utf-8",
        data: JSON2.stringify(validator.settings.getDataToSend(form)),
        dataType: "json",
        success: function(data){
            validator.settings.callbackHandler(data, form);
            $('#' + form.id + ' .loading').hide();
            $("#" + form.id + " .thank_you").show();
			_gaq.push(['_trackPageview', document.location.pathname + '_ok']);

        },
        error: function (data) {
            $('#' + form.id + ' .loading').hide();
            $('#' + form.id + ' .row').show();
            $('#' + form.id + ' .form-group').show();
            $('#' + form.id + ' .obbligatorio').show();
        }
    });

    return false;
}

$.validator.defaults.ignore = ':hidden:not(select.selectpicker)';

$.validator.defaults.highlight_base = $.validator.defaults.highlight;
$.validator.defaults.highlight = function (element, errorClass, validClass) {
    $.validator.defaults.highlight_base.call(this, element, errorClass, validClass);

    var select = $(element).filter('select');
    if (select.size() && select.data('selectpicker'))
        select.data('selectpicker').button.removeClass(validClass).addClass(errorClass);
};

$.validator.defaults.unhighlight_base = $.validator.defaults.unhighlight;
$.validator.defaults.unhighlight = function (element, errorClass, validClass) {
    $.validator.defaults.unhighlight_base.call(this, element, errorClass, validClass);

    var select = $(element).filter('select');
    if (select.size() && select.data('selectpicker'))
        select.data('selectpicker').button.removeClass(errorClass).addClass(validClass);
};

function GetJsonData(formObj) {
    var d = {};
    var form = $(formObj);
  var fields = form.find("input[name][name!=][type!=submit][type!=reset]")/*.filter("[type=email], [type=text], [type=password], [type=checkbox], [type=radio], [type=hidden]")*/;

  fields.each(function () {
        var
            type = $(this).attr("type"),
            name = $(this).attr("name"),
            value;

        switch (type) {
            case "checkbox":
            case "radio":
        var list = fields.filter('[name=' + name + '][type=' + type + ']');
        if (list.size() == 1)
                value = $(this).is(':checked');
        else {
          if (d[name]) return;

          var values = [];
          list.each(function () { if ($(this).is(':checked')) values.push($(this).val()); });
          value = values.join(',');
        }
                break;

            default:
                value = $(this).val();
                value = $.trim(value);
                break;
        }

        d[name] = value;
    });

    form.find("select[name][name!=], textarea[name][name!=]").each(function () {
        var name = $(this).attr("name");
        d[name] = $(this).val();

    });

    return d;
}


/* showLoading
----------------*/
function showLoading(sender, frmId) {
    var defaultTxt;
    if ($("#hfLoadingText").size())
        defaultTxt = $("#hfLoadingText").val();
    else
        defaultTxt = "Registrazione in Corso ...";

    showLoadingText(sender, frmId, defaultTxt);
}

function showLoadingText(sender, frmId, txt) {
    $("#" + frmId + " .divNotify").html("<div id=\"contLoading\"> <img src='/img/loading.gif' /> <span class=\"red\"> " + txt + " </span> </div>");
    $("#" + frmId + " .divNotify").show();
    $(sender).fadeOut(350);
}

/* removeLoading
-----------------*/
function removeLoading(sender) {
    $("#contLoading").remove();
    $(sender).fadeIn(400);
}

/*  wsError
-------------*/
function wsError(jqXHR, textStatus, errorThrown) {
    var msg = textStatus;
    if (errorThrown != null && errorThrown != "")
        msg = textStatus + " (" + errorThrown + ")";
    alert(msg);
}


//$(function () {
//    $('.selectpicker')
//      .on('change', function () { $(this).trigger('click'); })
//      .selectpicker({});
//});

//$(function () {
//    $('.selectpicker')
//        .on('change', function () { $(this).trigger('click'); })
//        .selectpicker({});
//});


function logout() {
    // POST AJAX
    $.ajax({
        type: "POST",
        url: "/WS/wsUsers.asmx/Logout",
        cache: false,
        contentType: "application/json; charset=utf-8",
        data: '{"w":"s"}',
        dataType: "json",
        success: function (data) {
            if (data != null) {
                if (data.d.Status) {
                    document.location.reload();
                }
            }
        },
        error: function (data) {
            alert("Web-Service Error!!");
        }
    });
    return false;
}