// window.onload = function () {
//
//     var btn1 = document.getElementById("register");
//
//     if (btn1.addEventListener)
//     {
//         btn1.addEventListener("click",
//             function () {
//                 var pattern = new RegExp("\d\d\d");
//                 var passwordString = document.getElementById("password").value;
//                 if (pattern.test(passwordString)) {
//
//                 }
//
//             },
//             false);
//     }
// }

function checker() {
    return checkLogin() && checkPassword();
}

function checkLogin() {
    var pattern1 = /@/;
    var pattern2 = /^[a-zA-Zа-яА-Я0-9-_.]{4,20}$/;
    var pattern3 = /^[0-9]+$/;
    var pattern4 = /[.]/;
    var pattern5 = /^[a-zA-Zа-яА-Я]{2,5}$/;

    var loginString = document.getElementById("login").value;
    var hiddenDiv = document.getElementById("errorStatus");
    var errorText = document.getElementById("errorText");

    loginString = loginString.replace(/\s+$/, '');
    document.getElementById("login").value = loginString;

    var elements = loginString.split(pattern1);
    if (elements.length == 2) {
        var email = elements[0];
        var domain = elements[1];

        if (pattern2.test(email)) {
            if (!pattern3.test(email)) {
                var domains = domain.split(pattern4);
                if (domains.length > 1) {
                    for (var i = 0; i < domains.length; i++) {
                        if (!pattern5.test(domains[i])) {
                            errorText.textContent = "Неправильный формат логина";
                            hiddenDiv.style = "display: block;";
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
    }
    errorText.textContent = "Неправильный формат логина";
    hiddenDiv.style = "display: block;";
    return false;
}

function checkPassword() {
    var pattern1 = /^.{8,20}$/;
    var pattern2_1 = /[a-z]+/;
    var pattern2_2 = /[A-Z]+/;
    var pattern3 = /[%^&*()_+-]+/;

    var passwordString = document.getElementById("password").value;
    var hiddenDiv = document.getElementById("errorStatus");
    var errorText = document.getElementById("errorText");

    if (pattern1.test(passwordString)) {
        if (pattern2_1.test(passwordString) && pattern2_2.test(passwordString)) {
            if (pattern3.test(passwordString)) {
                return true;
            } else {
                errorText.textContent = "В пароле должен быть как минимум один символ из: %^&*()_+-";
            }
        } else {
            errorText.textContent = "Пароль должен состоять из строчных и прописных букв";
        }
    } else {
        errorText.textContent = "Длина пароля должна быть в пределах 8-20 символов";
    }
    hiddenDiv.style = "display: block;";
    return false;
}