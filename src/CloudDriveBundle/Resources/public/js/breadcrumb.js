(function () {
    var filesBlock = $('.files_block');
    var breadcrumb = $('#main_breadcrumb');
    var filesApiUrl = $('#url_api_files').html() + "/";
    var pathArray;

    filesBlock.bind("DOMSubtreeModified",function(){
        if (filesBlock.html() == '') {
            // event watcher
            changeBreadcrumbEvent();
        }
    });

    /* ------- function block ---------  */

    function changeBreadcrumbEvent() {
        var breadcrumbHtmlArray = getHtmlArray();
        breadcrumb.html('');
        for (var i=0;i<breadcrumbHtmlArray.length;i++) {
            $(breadcrumbHtmlArray[i]).appendTo(breadcrumb);
        }
    }

    function getHtmlArray() {
        pathArray = breadcrumb.data('path').split(':');
        pathArray.pop();
        var breadcrumbHtmlArray = pathArray.slice();
        for (var i=0;i<pathArray.length;i++) {
            if (i == pathArray.length-1) {
                breadcrumbHtmlArray[i] = '<li class="active">'+breadcrumbHtmlArray[i]+'</li>';
            } else {
                breadcrumbHtmlArray[i] = '<li><a href="' + getLink(pathArray, i) + '">'+breadcrumbHtmlArray[i]+'</a></li>';
            }
        }
        return breadcrumbHtmlArray;
    }

    function getLink(pathArray, index) {
        var path = filesApiUrl;
        for (var i=0;i<=index;i++) {
            path += pathArray[i] + ':';
        }
        console.log(path);
        return path;
    }

})();