(function () {
    var breadcrumb = $('#main_breadcrumb');
    var baseUrl = $('#url_base').html();
    var filesApiUrl = $('#url_api_files').html() + "/";

    breadcrumb.on('pathChange', breadcrumbAndUrlUpdateEvent);
    breadcrumb.on('breadcrumbClick', breadcrumbAndUrlUpdateEvent);

    /* ------- function block ---------  */

    function breadcrumbAndUrlUpdateEvent() {
        changeBreadcrumbEvent();
        changeUrlEvent();
    }
    
    function changeUrlEvent() {
        window.history.pushState('page2', 'Title', baseUrl + 'user/' +  breadcrumb.data('path'));
    }

    function changeBreadcrumbEvent() {
        var breadcrumbHtmlArray = getHtmlArray();
        breadcrumb.html('');
        for (var i=0;i<breadcrumbHtmlArray.length;i++) {
            $(breadcrumbHtmlArray[i]).appendTo(breadcrumb);
        }
        breadcrumb.find('li').click(function () {
            breadcrumbClickEvent(this);
        });
    }

    function breadcrumbClickEvent(_this) {
        _this = $(_this);
        var a = _this.find('a');
        if (a) {
            breadcrumb.data('path', a.attr('data-path'));
            breadcrumb.trigger('breadcrumbClick');
        }
    }

    function getHtmlArray() {
        var pathArray = breadcrumb.data('path').split(':');
        pathArray.pop();
        var breadcrumbHtmlArray = pathArray.slice();
        for (var i=0;i<pathArray.length;i++) {
            if (i == pathArray.length-1) {
                breadcrumbHtmlArray[i] = '<li class="active">'+breadcrumbHtmlArray[i]+'</li>';
            } else {
                breadcrumbHtmlArray[i] = '<li><a data-path="' + getPath(pathArray, i) + '">'+breadcrumbHtmlArray[i]+'</a></li>';
            }
        }
        return breadcrumbHtmlArray;
    }

    function getPath(pathArray, index) {
        var path = '';
        for (var i=0;i<=index;i++) {
            path += pathArray[i] + ':';
        }
        return path;
    }

})();