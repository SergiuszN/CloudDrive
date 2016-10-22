function Cookie(exdays, name) {
    this.exdays = exdays;
    this.name = name;

    var setCookie = function (cname, cvalue) {
        var d = new Date();
        d.setTime(d.getTime() + (this.exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };

    var getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "{}";
    };

    var fineSlice = function(array, index) {
        var newArray = {};
        var newIndex = 0;
        var length = Object.keys(array).length;

        for (var i=0;i<length;i++) {
            if (i == index) {
                continue;
            }
            newArray[newIndex] = array[i];
            newIndex += 1;
        }
        return newArray;
    };

    this.add = function (value) {
        if (this.check(value) == true) {
            return;
        }

        var cookie = JSON.parse(getCookie(this.name));
        var newIndex = Object.keys(cookie).length;
        cookie[newIndex] = value;
        setCookie(this.name, JSON.stringify(cookie));
    };

    this.get = function () {
        return JSON.parse(getCookie(this.name));
    };

    this.check = function (value) {
        var cookie = JSON.parse(getCookie(this.name));
        var length = Object.keys(cookie).length;
        for (var i=0;i<length;i++) {
            if (cookie[i] == value) {
                return true;
            }
        }
        return false;
    };

    this.delete = function (value) {
        var index = -1;
        var cookie = JSON.parse(getCookie(this.name));
        var length = Object.keys(cookie).length;
        for (var i=0;i<length;i++) {
            if (cookie[i] == value) {
                index = i;
            }
        }

        if (index != -1) {
            cookie = fineSlice(cookie, index);
        }

        setCookie(this.name, JSON.stringify(cookie));
    };
}