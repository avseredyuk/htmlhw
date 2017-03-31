function sort_table(tbodyid, col, asc) {
    var tbody = document.getElementById(tbodyid);
    var rows = tbody.rows,
        rlen = rows.length,
        arr = new Array(),
        i, j, cells, clen;
    // fill the array with values from the table
    for (i = 0; i < rlen; i++) {
        cells = rows[i].cells;
        clen = cells.length;
        arr[i] = new Array();
        for (j = 0; j < clen; j++) {
            arr[i][j] = cells[j].innerHTML;
        }
    }
    // sort the array by the specified column number (col) and order (asc)
    arr.sort(function (a, b) {
        return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? asc : -1 * asc);
    });
    // replace existing rows with new rows created from the sorted array
    for (i = 0; i < rlen; i++) {
        rows[i].innerHTML = "<td>" + arr[i].join("</td><td>") + "</td>";
    }
}

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