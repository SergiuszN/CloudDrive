(function () {
    var baseUrl = $('#url_base').html();
    var breadcrumb = $('#main_breadcrumb');

    breadcrumb.on('pathChange', function () {
        $('.files_name').click(fileNameClick);
        $('#open_file_download').click(download);
    });

    function download() {
        var modal = $('#open_file');
        var url = baseUrl + 'api/download/' + modal.attr('data-path') + '/' + modal.attr('data-type');
        $('body').append('<iframe src="' + url + '" style="display:none;" ></iframe>');
    }

    function fileNameClick() {
        var parent = $(this).parents('.files_row');
        var file = new FileReader(parent.data('path'), parent.data('name'), parent.data('type'));
        if (parent.data('type') != 'dir') {
            file.open();
        }
    }

    function FileReader(path, name, type) {
        this.path = path;
        this.name = name;
        this.type = type;
        this.modal = $('#open_file');

        this.open = function () {
            // test if img
            if (this.type == 'jpg' || this.type == 'png' || this.type == 'jpeg' || this.type == 'gif') {
                this.openImage();
                return;
            }

            if (this.type == 'php' || this.type == 'txt' || this.type == 'css' || this.type == 'js' ) {
                this.openFile();
                return;
            }

            $('#file_open_content').find('div').hide();
            var view = $('#other_view');
            $('.modal-title').html("Ooops... ");
            view.show();

            this.modal.attr('data-path', this.path);
            this.modal.attr('data-type', this.type);
            this.modal.modal();
        };

        this.openFile = function () {
            var url = baseUrl + 'api/open/image/' + this.path;
            // hide all content
            $('#file_open_content').find('div').hide();
            // set new image
            var view = $('#doc_view');
            $('.modal-title').html(this.name);
            view.show();

            var type = this.type;
            var code = view.find('code');
            code.html('');

            $.ajax({url: url, success: function(result){
                code.html(result);
                code.attr('class', type);
                $('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });
            }});

            this.modal.attr('data-path', this.path);
            this.modal.attr('data-type', this.type);
            this.modal.modal();
        };

        this.openImage = function () {
            var url = baseUrl + 'api/open/image/' + this.path;
            // hide all content
            $('#file_open_content').find('div').hide();
            // set new image
            var view = $('#image_view');
            view.find('img').attr('src', url);
            $('.modal-title').html(this.name);
            view.show();
            // open content

            this.modal.attr('data-path', this.path);
            this.modal.attr('data-type', this.type);

            this.modal.modal();
        };
    }


})();