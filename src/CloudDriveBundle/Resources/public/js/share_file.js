(function () {
    var baseUrl = $('#url_base').html();
    var modal = $('#share_file');
    var breadcrumb = $('#main_breadcrumb');


    breadcrumb.on('pathChange', function () {
        $('.files_share').click(fileShareClick);
    });

    function fileShareClick() {
        var parent = $(this).parents('.files_row');
        $.ajax({
            url: baseUrl + 'api/share/get/' + parent.data('path'),
            success: function (url) {
                var name = modal.find('.modal-title');
                name.html('Share '+parent.data('name'));
                var link = modal.find('#link');
                link.html(parent.data('name'));
                link.val(baseUrl + 'api/download/' + url + '/' + parent.data('type'));
                modal.modal();
            }
        });
    }
})();
