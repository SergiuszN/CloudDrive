(function () {
    var baseUrl = $('#url_base').html();
    var breadcrumb = $('#main_breadcrumb');
    var favoritesCookie = new Cookie(30, 'favorites');

    breadcrumb.on('pathChange', function () {
        displayFavorites();
        $('.files_fav').click(favoritesClickEvent);
    });

    function displayFavorites() {
        var parents = $('.files_row');
        for (var i=0;i<parents.length;i++) {
            var item = $(parents[i]);
            var fav = item.find('.files_fav');
            var icon = fav.find('i');
            var path = item.data('path');

            if (favoritesCookie.check(path)) {
                changeIcon(icon, item, 'true');
            } else {
                changeIcon(icon, item, 'false');
            }
        }
        updateMenu();
    }

    function favoritesClickEvent() {
        var parent = $(this).parents('.files_row');
        var icon = $(this).find('i');

        var path = parent.data('path');

        if (icon.hasClass('fa-star')) {
            // already favorites
            changeIcon(icon, parent, 'false');
            favoritesCookie.delete(path);
        } else {
            // not favorites
            changeIcon(icon, parent, 'true');
            favoritesCookie.add(path);
        }

        updateMenu();
    }

    function changeIcon(icon, parent, state) {
        icon.removeClass((state == 'true') ? 'fa-star-o' : 'fa-star');
        icon.addClass((state == 'true') ? 'fa-star' : 'fa-star-o');
        parent.attr('data-fav', state);
    }

    var menuLinks = $('.menu_user_link');
    var baseLink = $('<a href=""><div class="menu_row"><i class="fa fa-star-o" aria-hidden="true"></i></div></a>');
    function updateMenu() {
        menuLinks.find('a').remove();
        var favorites = favoritesCookie.get();
        var length = Object.keys(favorites).length;

        for (var i=0;i<length;i++) {
            if (favorites[i].indexOf('.') != -1) {
                continue;
            }

            var name = favorites[i].split('::');
            name = name[name.length-1];


            var clone = baseLink.clone();
            clone.find('i').html(name);
            clone.attr('href', baseUrl + 'user/' + favorites[i]);
            clone.appendTo(menuLinks);
        }
    }

})();