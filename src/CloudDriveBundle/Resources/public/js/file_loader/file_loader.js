(function(){

    // get base variable
    var baseUrl = $('#url_base').html();
    var filesApiUrl = $('#url_api_files').html() + "/";
    var breadcrumb = $('#main_breadcrumb');

    setHomeDirectoryInBreadcrumbIfEmpty();
    var urlRequest = filesApiUrl + breadcrumb.data('path');
    $.ajax({url: urlRequest, success: function(result){
        console.log(result);
    }});


    

    /* -----------    Function Block    ----------- */

    function setHomeDirectoryInBreadcrumbIfEmpty() {
        if (! breadcrumb.data('path')) {
            breadcrumb.data('path', 'home:');
        }
    }
    
    function getFilesInCurrentDirectory() {
        $.ajax({url: filesApiUrl + breadcrumb.data('path'), success: function(result){
            console.log(result);
            return result;
        }, error: function () {
            return {};
        }});
    }
})();