(function () {
    var createMenuButton = $('.menu_add_dropdown_open');
    var createMenu = $('.menu_add_dropdown_content');

    createMenuButton.click(function () {
        createMenu.fadeToggle(300);
    });


    var createFolder = $('#create_folder_dialog');
    var createFolderModal = $('#create_folder');
    var createFolderInput = $('#create_folder_input');
    var createFolderSubmit = $('#create_folder_input_submit');
    var baseUrl = $('#url_base').html();
    var breadcrumb = $('#main_breadcrumb');


    createFolderSubmit.click(submitCreateFolderModal);
    createFolder.click(openCreateFolderModal);

    function openCreateFolderModal() {
        createFolderModal.modal();
    }

    function submitCreateFolderModal() {
        createFolderModal.modal('hide');
        var createFolderUrl = baseUrl + 'api/create/folder/' + breadcrumb.data('path') + '/' + createFolderInput.val();
        $.ajax({url: createFolderUrl, success: function(){
            breadcrumb.trigger('breadcrumbClick');
        }});
        console.log();
        createFolderInput.val('');
    }
})();