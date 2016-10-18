(function () {
    var baseUrl = $('#url_base').html();
    var breadcrumb = $('#main_breadcrumb');
    var renameModal = $('#rename_action');
    var renameInput = $('#rename_action_input');
    var renameSubmit = $('#rename_action_submit');

    breadcrumb.on('pathChange', function () {
        $('.files_menu_open_button').click(function(){filesMenuClickEventListener(this)});
        $('.files_drop_down').click(function()
        {filesMenuMobileClickEventListener(this)});
        $('.files_menu_download').click(function(){downloadEvent(this)});
        $('.files_menu_rename').click(function(){renameEvent(this)});
        $('.files_menu_delete').click(function(){deleteEvent(this)});
    });

    function filesMenuClickEventListener(_this) {
        var parent = $(_this).parents('.files_row');
        if (parent.data('name') == '..') {
            $('.files_menu_toggle').fadeOut(300);
            return;
        }

        var menu = $(_this).parent().find('.files_menu_toggle');
        if (menu.is(':visible')) {
            $('.files_menu_toggle').fadeOut(300);
        } else {
            $('.files_menu_toggle').fadeOut(300);
            menu.fadeIn(300);
        }
    }
    function filesMenuMobileClickEventListener(_this)
    {
        var parent = $(_this).parents('.files_row');
        if (parent.data('name') == '..') {
            $('.files_mobile_menu').slideUp();
            return;
        }

        var menu = $(_this).parent().find('.files_mobile_menu');
        console.log(menu);
        if (menu.is(':visible')) {
            $('.files_mobile_menu').slideUp();
        } else {
            $('.files_mobile_menu').slideUp;
            menu.slideDown();
          //  $('.files_mobile_menu').css('display','flex');
        }
    }

    function downloadEvent(_this) {
        var parent = $(_this).parents('.files_row');
        var path = parent.data('path');
        var name = parent.data('name');
        var type = parent.data('type');

        if (name == '..') {
            return;
        }
        $('.files_menu_toggle').fadeOut(300);
        var url = baseUrl + 'api/download/' + path + '/' + type;
        $('body').append('<iframe src="' + url + '" style="display:none;" ></iframe>');
    }

    function renameEvent(_this) {
        var parent = $(_this).parents('.files_row');
        var path = parent.data('path');

        $('.files_menu_toggle').fadeOut(300);
        renameModal.attr('data-path', path);
        renameInput.val(parent.data('name'));
        renameModal.modal();
    }

    renameSubmit.click(function () {
        var renameUrl = baseUrl + 'api/rename/' + renameModal.attr('data-path') + '/' + renameInput.val();
        $.ajax({url: renameUrl, success: function(){
            breadcrumb.trigger('breadcrumbClick');
        }});
        renameModal.modal('hide');
        renameInput.val('');
    });

    renameModal.on('hidden', function () {
        renameModal.attr('data-path', '');
    });

    function deleteEvent(_this) {
        var parent = $(_this).parents('.files_row');
        var path = parent.data('path');
        var name = parent.data('name');
        var type = parent.data('type');

        var url = baseUrl + 'api/delete/' + path;
        $('.files_menu_toggle').fadeOut(300);

        $.ajax({url: url, success: function(){
            breadcrumb.trigger('breadcrumbClick');
        }});
    }
})();