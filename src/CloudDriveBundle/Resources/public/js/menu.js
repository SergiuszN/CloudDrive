(function () {
    var createMenuButton = $('.menu_add_dropdown_open');
    var createMenu = $('.menu_add_dropdown_content');

    createMenuButton.click(function () {
        createMenu.fadeToggle(300);
    });
})();