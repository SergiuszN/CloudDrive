(function () {
    var baseUrl = $('#url_base').html();
    var uploadUrl = baseUrl + 'api/upload';
    var form = $('#load_file_from_user_dialog_form');
    var breadcrumb = $('#main_breadcrumb');

    form.attr('action', uploadUrl);

    var inputFlag = false;

    form.submit(function (event) {
        if (!inputFlag) {
            event.preventDefault();
            getFileFromOpenFileDialog();
        } else {
            event.preventDefault();

            $.ajax({
                url: $(this).attr("action"),
                type: $(this).attr("method"),
                dataType: "JSON",
                data: new FormData(this),
                processData: false,
                contentType: false,
                success: function (data, status) {
                    breadcrumb.trigger('pathChange');
                },
                error: function (xhr, desc, err) {
                }
            });
        }
    });

    function getFileFromOpenFileDialog() {
        form.find('#load_file_from_user_dialog_form_input').on('change', function () {
            inputFlag = true;
            console.log('wahah');
            form.submit();
            inputFlag = false;
        }).click();
    }

    /*
    var form = $('<form action="'+uploadUrl+'" class="form_files_to_upload" style="display: none" method=post enctype=multipart/form-data>' +
        '<input type=file name=uploadfile id="temp_files_to_upload">' +
        '<input type="submit"></form>');
    form.appendTo('body');
    form = $('.form_files_to_upload');

    $('#load_file_from_user_dialog').click(getFileFromOpenFileDialog);

    function getFileFromOpenFileDialog() {
        form.find('#temp_files_to_upload').on('change', function () {
            formSubmit();
            console.log(this.files);
        }).click();
    }

    function  formSubmit() {
        console.log('wahahah!');
        form.unbind().submit(function (event) {
            event.preventDefault();
            $.ajax({
                url: $(this).attr("action"),
                type: $(this).attr("method"),
                dataType: "JSON",
                data: new FormData(this),
                processData: false,
                contentType: false,
                success: function (data, status)
                {
                    console.log('true!');
                },
                error: function (xhr, desc, err)
                {
                    console.log('false!');
                }
            });
            console.log('kuyjnia!');
        });
    }
    */
})();