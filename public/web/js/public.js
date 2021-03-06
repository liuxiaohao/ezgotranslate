

$(document).ready(function () {
    ///////////////////////////
    // When this set to true, some operation will change
    // like U can go to translating.html without log in
    var DEBUG = false;
    ///////////////////////////

    //
    // This part for sign in or sign up
    //
    $(".container-signin .switch").click(function () {
        $(".container-signin").attr("style", "display:none;");
        $(".container-signup").attr("style", "display:block;");
    });
    $(".container-signup .switch").click(function () {
        $(".container-signup").attr("style", "display:none;");
        $(".container-signin").attr("style", "display:block;");
    });
    $(".close").click(function () {
        $(".container-signin").attr("style", "display:none;");
        $(".container-signup").attr("style", "display:none;");
    });
    $(".su").click(function () {
        $(".container-signup").attr("style", "display:block;");
    });
    $(".si").click(function () {
        $(".container-signin").attr("style", "display:block;");
    });

    //
    // When hover #personal, show personal-menu
    //
    $("#personal").hover(function () {
        $("#personal ul").show();
        $("#personal").css("background-color", "#3f87eb");
    },
    function () {
        $("#personal ul").hide();
        $("#personal").css("background-color", "#6babe9");
    });

    //
    //  For switch personal setting
    //
    $(".first-head").click(function () {
        $(".change-hp").css("display", "block");
        $(".change-inf").css("display", "none");
        $(".safety").css("display", "none");
        $(".first-head").css({
            "background-color": "#3f87eb",
            "color": "#fff"
        });
        $(".second-personal").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
        $(".last-safe").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
    });
    $(".second-personal").click(function () {
        $(".change-hp").css("display", "none");
        $(".change-inf").css("display", "block");
        $(".safety").css("display", "none");
        $(".second-personal").css({
            "background-color": "#3f87eb",
            "color": "#fff"
        });
        $(".first-head").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
        $(".last-safe").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
    });
    $(".last-safe").click(function () {
        $(".change-hp").css("display", "none");
        $(".change-inf").css("display", "none");
        $(".safety").css("display", "block");
        $(".last-safe").css({
            "background-color": "#3f87eb",
            "color": "#fff"
        });
        $(".second-personal").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
        $(".first-head").css({
            "background-color": "#fff",
            "color": "#3f87eb"
        });
    });

    //
    // This part is mainly for update user's related information
    //     - username|email|etc.
    //     - personal translating history
    //

    // Check whether login
    var getLoginCookie = SubCookieUtil.get("login", "state");
    if (getLoginCookie == null || getLoginCookie == "false") {
        console.log("Illegal login.");
        if (!DEBUG) {
            var pathname = window.location.pathname;
            if (pathname != "/" && pathname != "/index.html") {
                window.location.href = "/";
            }
        }
    }

    //
    // Display username in head
    //
    var username = undefined;
    if (username = SubCookieUtil.get("login", "username")) {
        $("#navigition #personal-head .username").html(username);
    }

    //
    // Display user email in personal-inf.html
    //
    var email = undefined;
    if (email = SubCookieUtil.get("login", "email")) {
        $("#personal-inf #setting .safety .emailAddress").html(email);
    }

    // Create formStatus Object to record the info. filled
    // IF info. wrong value = false
    // ELSE value = true
    //
    // Handle login event
    //
    $("#signin").click(function () {
        var login = $(".container-signin #signin-windows input");

        //function checkForm(){}
        var username = login[0].value;
        var password = login[1].value;

        $.ajax({
            url: '/user/login',
            type: 'POST',
            dataType: 'json',
            data: {
                username: username,
                password: password
            },
        })
        .done(function(data) {
            var errcode = data.errcode;
            if (errcode == 1) {
                $("#signin-remind").empty().html("登陆失败");
            } else if (errcode == 0) {
                // Get user info and save to session
                var user = {
                    username : username,
                    email : data.email,
                    translate : data.translate,
                    sex : data.sex,
                    location : data.location,
                    nickname: data.nickname,
                    state : "true"
                }
                SubCookieUtil.setAll("login", user, null, "/");
                // Jump to private page
                window.location.href = "/web/translating.html";
            }
        })
        .fail(function() {
            $("#signin-remind").empty().html("登陆失败");
            console.log("Login ajax problem.");
        })
        .always(function() {
            console.log("Login ajax complete.");
        });
    });

    // Handle register event
    //
    $("#signup").click(function () {
        var register = $(".container-signup #signin-windows input");

        //checkForm(){}
        var username = register[0].value;
        var email = register[1].value;
        //var name = register[2].value;
        var password = register[2].value;
        var confirmPas = register[3].value;    // Need confirm

        // Password confirm
        if (password !== confirmPas) {
            $("#signup-remind").empty().html("密码不一致");
            return false;
        }

        // Check whether hasuser
        $.ajax({
            url: '/user/hasuser',
            type: 'POST',
            dataType: 'json',
            data: {
                username: username
            }
        })
        .done(function(data) {
            var errcode = data.errcode;
            //
            // IF hasuser return false to stop excute $.post("user/register")
            //
            if(errcode == 1) {
                $("#signup-remind").empty().html("用户名已注册");

                console.log("Hasuser");
                return false;
            } else if (errcode == 0) {
                $.ajax({
                    url: '/user/register',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        username: username,
                        password: password,
                        email: email
                    }
                })
                .done(function(data) {
                    var errcode = data.errcode;

                    if (errcode == 1) {
                        $("#signup-remind").empty().html("注册失败");
                    } else if (errcode == 0) {
                        $("#signup-remind").empty().html("注册成功,请登陆");
                    }
                })
                .fail(function() {
                    $("#signup-remind").empty().html("注册失败");
                    console.log("Register ajax problem.");
                })
                .always(function() {
                    console.log("Register ajax complete");
                });
            }
        })
        .fail(function() {
            console.log("Hasuser ajax problem.");
        })
        .always(function() {
            console.log("Hasuser ajax complete.");
        });
    });

    // Handle logout event
    //
    $("#navigition .personal-nav-last").click(function () {

        $.ajax({
            url: '/user/logout',
            type: 'POST',
            dataType: 'json'
        })
        .done(function(data) {
            var errcode = data.errcode;
            if (errcode == 1) {
                alert("登出失败");
            } else {
                SubCookieUtil.unsetAll("Login", "/");
                window.location.href = "/";
            }
        })
        .fail(function() {
            console.log("Logout ajax problem.");
        })
        .always(function() {
            console.log("Logout ajax complete.");
        });
    });
});
