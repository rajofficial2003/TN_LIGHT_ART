function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function allotEachTextAmount() {
    let textarea = document.getElementById("type_text");
    const EachTextAmount = 220;
    let textPending = textarea.value.replace(/\s/g, '');
    let texts = textPending.replace(/\n/g, '').length;

    let amount = texts * EachTextAmount;
    let amount_Final = amount + 150;
    $(".amount").html('₹ ' + numberWithCommas(amount_Final));
}

function text_enter_preview() {
    let textarea = document.getElementById("type_text");
    let main_container = document.getElementById("typed_text");
    let output = textarea.value.replace(/\n/g, "<br/>");
    if (textarea.value == "") {
        main_container.innerHTML = "Type Text";
    } else {
        main_container.innerHTML = output;
    }
}