(function () {
    var baseUrl = $('#url_base').html();
    var uploadUrl = baseUrl + 'api/upload/';
    var form = $('#load_file_from_user_dialog_form');
    var breadcrumb = $('#main_breadcrumb');

    var inputFlag = false;

    form.submit(function (event) {
        if (!inputFlag) {
            event.preventDefault();
            getFileFromOpenFileDialog();
        } else {
            event.preventDefault();

            if ($(form.find('input')[1]).val() == '') {
                return false;
            }

            $.ajax({
                url: uploadUrl + breadcrumb.data('path'),
                type: $(this).attr("method"),
                dataType: "JSON",
                data: new FormData(this),
                processData: false,
                contentType: false,
                complete: function () {
                    form.trigger('completeReceiveFile');
                    return false;
                }
            });
            form.trigger('startReceiveFile');
        }

        $(form.find('input')[1]).val('');
        form[0].reset();
        return false;
    });

    function getFileFromOpenFileDialog() {
        form.find('#load_file_from_user_dialog_form_input').on('change', function () {
            inputFlag = true;
            form.submit();
            inputFlag = false;
        }).click();
    }
})();