(function () {
    var form = $('#load_file_from_user_dialog_form');
    var progressBarWrapper = $('.progress_bar_wrapper');
    var label = progressBarWrapper.find('label');
    var progress = progressBarWrapper.find('progress');
    var breadcrumb = $('#main_breadcrumb');

    var baseUrl = $('#url_base').html();
    var uploadStateUrl = baseUrl + 'api/uploadprogress/';
    var _continue = true;

    form.on('startReceiveFile', startReceiveFileEvent);
    form.on('completeReceiveFile', completeReceiveFileEvent);

    function completeReceiveFileEvent() {
        _continue = false;
        label.html('complete!');
        progress.attr('value', 100);
        setTimeout(function () {
            progressBarWrapper.fadeOut(300);
            breadcrumb.trigger('breadcrumbClick');
        }, 3000);
    }

    function startReceiveFileEvent() {
        _continue = true;
        label.html('');
        progress.attr('value', 0);
        progressBarWrapper.fadeIn(300);
        setTimeout(tic, 3000);
    }

    function tic() {
        getResponse();
        if (_continue) {
            setTimeout(tic, 3000);
        }
    }

    function getResponse() {
        $.ajax({url: uploadStateUrl, success: function(result){
            if (result.start_time == '') {
                _continue = false;
                return '';
            } else {
                var percent = ((result.bytes_processed / result.content_length)*100).toFixed(0);
                label.html('File name: '+result.file+' progress: '+percent+'%');
                progress.attr('value', percent);
            }
        }});
    }
})();