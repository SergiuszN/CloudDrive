(function () {
    var baseUrl = $('#url_base').html();
    var modal = $('#share_file');
    var breadcrumb = $('#main_breadcrumb');

    console.log('load');

    breadcrumb.on('pathChange', function () {
        console.log('click');
        $('.files_share').click(fileShareClick);
    });

    function fileShareClick() {
        console.log('event');
        var parent = $(this).parents('.files_row');
        $.ajax({
            url: baseUrl + 'api/share/get/' + parent.data('path'),
            success: function (url) {
                var link = modal.find('#share_file_link');
                link.html(parent.data('name'));
                link.attr('href', baseUrl + 'api/download/' + url + '/' + parent.data('type'));
                modal.modal();
            }
        });
    }


})();