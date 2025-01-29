function waitForWebfonts(fonts, callback) {
    var loadedFonts = 0;
    for (var i = 0, l = fonts.length; i < l; ++i) {
        (function(font) {
            var node = document.createElement('span');
            // Characters that vary significantly among different fonts
            node.innerHTML = 'giItT1WQy@!-/#';
            // Visible - so we can measure it - but not on the screen
            node.style.position = 'absolute';
            node.style.left = '-10000px';
            node.style.top = '-10000px';
            // Large font size makes even subtle changes obvious
            node.style.fontSize = '300px';
            // Reset any font properties
            node.style.fontFamily = 'sans-serif';
            node.style.fontVariant = 'normal';
            node.style.fontStyle = 'normal';
            node.style.fontWeight = 'normal';
            node.style.letterSpacing = '0';
            document.body.appendChild(node);

            // Remember width with no applied web font
            var width = node.offsetWidth;

            node.style.fontFamily = font + ', sans-serif';

            var interval;

            function checkFont() {
                // Compare current width with original width
                if (node && node.offsetWidth != width) {
                    ++loadedFonts;
                    node.parentNode.removeChild(node);
                    node = null;
                }

                // If all fonts have been loaded
                if (loadedFonts >= fonts.length) {
                    if (interval) {
                        clearInterval(interval);
                    }
                    if (loadedFonts == fonts.length) {
                        callback();
                        return true;
                    }
                }
            };

            if (!checkFont()) {
                interval = setInterval(checkFont, 50);
            }
        })(fonts[i]);
    }
}

function OnScrollNavbarSticky(header, sticky) {
    if (window.pageYOffset >= sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}


function checkCheckbox(id) {
    if ($('input#' + id).prop('checked')) {
        return "yes";
    } else {
        return "no";
    }
}

function tabs(id) {
    $("#" + id + "_btn").click(function() {
        $(".tabs").removeClass("active");
        $(this).addClass("active");
        $(".tablet").addClass("d-none");
        $("." + id + "-container").removeClass("d-none");
    });
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

function textByContSize(a) {
    let text = $(a).val().replace(" ", '').length;

    let container = $(".mover");
    let i = 20;
    let value = i - parseFloat(text / 4);
    if (value > 0) {
        container.css("font-size", value + "px");
    } else {
        container.css("font-size", 20 + "px");
    }
}

function all_size_price_amount(txt, enter) {
    txt = parseInt(txt);
    let newlineamount = 35;
    $.ajax({
        type: "POST",
        url: "../../api/all_price.php",
        dataType: "json",
        success: function(result) {
            console.log((parseFloat(result[5].lengths) * parseFloat(txt)));
            if (txt <= 15) {
                $(".small-price").html("$" + parseInt(parseInt(result[0].price[0][txt - 1]) + parseInt((newlineamount * enter))));
                $(".small-length").html((parseFloat(result[0].lengths) * parseFloat(txt)).toFixed(2));
                $(".small-height").html(result[0].height);

                $(".medium-price").html("$" + parseInt(parseInt(result[1].price[0][txt - 1]) + parseInt((newlineamount * enter))));
                $(".medium-length").html((parseFloat(result[1].lengths) * parseFloat(txt)).toFixed(2));
                $(".medium-height").html(result[1].height);

                $(".large-price").html("$" + parseInt(parseInt(result[2].price[0][txt - 1]) + parseInt((newlineamount * enter))));
                $(".large-length").html((parseFloat(result[2].lengths) * parseFloat(txt)).toFixed(2));
                $(".large-height").html(result[2].height);

                $(".x-large-price").html("$" + parseInt(parseInt(result[3].price[0][txt - 1]) + parseInt((newlineamount * enter))));
                $(".x-large-length").html((parseFloat(result[3].lengths) * parseFloat(txt)).toFixed(2));
                $(".x-large-height").html(result[3].height);

                $(".xx-large-price").html("$" + parseInt(parseInt(result[4].price[0][txt - 1]) + parseInt((newlineamount * enter))));
                $(".xx-large-length").html((parseFloat(result[4].lengths) * parseFloat(txt)).toFixed(2));
                $(".xx-large-height").html(result[4].height);

                $(".collosal-price").html("$" + parseInt(parseInt(result[5].price[0][txt - 1]) + parseInt((newlineamount * enter))));
                $(".collosal-length").html((parseFloat(result[5].lengths) * parseFloat(txt)).toFixed(2));
                $(".collosal-height").html(result[5].height);
            } else {
                $(".small-price").html("$" + parseInt(parseInt(result[0].price[0][14]) + parseInt((newlineamount * enter)) + result[0].addon * (txt - 15)));
                $(".small-length").html((parseFloat(result[0].lengths) * parseFloat(txt)).toFixed(2));
                $(".small-height").html(result[0].height);

                $(".medium-price").html("$" + parseInt(parseInt(result[1].price[0][14]) + parseInt((newlineamount * enter)) + result[1].addon * (txt - 15)));
                $(".medium-length").html((parseFloat(result[1].lengths) * parseFloat(txt)).toFixed(2));
                $(".medium-height").html(result[1].height);

                $(".large-price").html("$" + parseInt(parseInt(result[2].price[0][14]) + parseInt((newlineamount * enter)) + result[2].addon * (txt - 15)));
                $(".large-length").html((parseFloat(result[2].lengths) * parseFloat(txt)).toFixed(2));
                $(".large-height").html(result[2].height);

                $(".x-large-price").html("$" + parseInt(parseInt(result[3].price[0][14]) + parseInt((newlineamount * enter)) + result[3].addon * (txt - 15)));
                $(".x-large-length").html((parseFloat(result[3].lengths) * parseFloat(txt)).toFixed(2));
                $(".x-large-height").html(result[3].height);

                $(".xx-large-price").html("$" + parseInt(parseInt(result[4].price[0][14]) + parseInt((newlineamount * enter)) + result[4].addon * (txt - 15)));
                $(".xx-large-length").html((parseFloat(result[4].lengths) * parseFloat(txt)).toFixed(2));
                $(".xx-large-height").html(result[4].height);

                $(".collosal-price").html("$" + parseInt(parseInt(result[5].price[0][14]) + parseInt((newlineamount * enter)) + result[5].addon * (txt - 15)));
                $(".collosal-length").html((parseFloat(result[5].lengths) * parseFloat(txt)).toFixed(2));
                $(".collosal-height").html(result[5].height);
            }
        }
    });
}

function size_handler(width, height) {
    if (height === 0 || width === 0) {
        $(".vertical").css("display", "none");
        $(".horizontal").css("display", "none");
        $(".vertical .text").html("");
        $(".horizontal .text").html("");
    } else {
        let element = $("#typed_text");
        let position = element.position();
        $(".vertical").css({
            "top": position.top + "px",
            "left": (position.left + element.width() + 20) + "px",
            "height": element.height() + "px"
        });
        let www = element.width();
        if (www < 25) {
            www = 54;
        }
        $(".horizontal").css({
            "top": (position.top + element.height() + 30) + "px",
            "left": (position.left) + "px",
            "width": www + "px"
        });
        $(".vertical .text").html(height);
        $(".horizontal .text").html(width);
        setTimeout(() => {
            $(".vertical").css("display", "flex");
            $(".horizontal").css("display", "flex");
        }, 2000);
    }
}

function priceDeclare() {
    var status = 100;
    let text = $("textarea").val().replace(" ", '');
    let size_code = $(".cont.size.active").attr("size-code");
    let text_length = text.length;
    if (text_length == 0 || text == '') {
        console.log("Please Enter Text");
        size_handler(0, 0);
    } else {
        let count_new_line = (text.split("\n").length - 1);
        let new_line_price = 35;
        let set_new_line_price = count_new_line * new_line_price;
        if (set_new_line_price == 0) {
            set_new_line_price = 0;
        }
        $.ajax({
            type: "POST",
            url: "../../api/priceDeclare.php",
            data: {
                "size_code": size_code
            },
            dataType: "json",
            success: function(result) {
                let w = 0;
                status = 200;
                let max_length = 15;
                let price = [];
                if (text_length <= max_length) {
                    price = parseInt(result.price[0][text_length - 1]) + parseInt(set_new_line_price);
                } else {
                    price = parseInt(result.price[0][max_length - 1]) + parseInt(set_new_line_price) + parseInt(parseInt(result.addon) * parseInt(parseInt(text_length) - max_length));
                }
                w = (text_length * result.length).toFixed(2);
                let h = result.height;
                let output = {
                    "text-length": text_length,
                    "count-new-line": count_new_line,
                    "width": w,
                    "height": h,
                    "price": price
                };
                $(".amount").html('$' + numberWithCommas(output.price));
                size_handler(output.width + '"', output.height + '"', "$" + output.price);
                all_size_price_amount(text_length, count_new_line);
            }
        });
    }
    return status
}

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        priceDeclare();
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function makeTimer() {

    //		var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");	
    var endTime = new Date("30 January 2030 9:56:00");
    endTime = (Date.parse(endTime) / 1000);

    var now = new Date();
    now = (Date.parse(now) / 1000);

    var timeLeft = endTime - now;

    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
    var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    if (hours < "10") {
        hours = "0" + hours;
    }
    if (minutes < "10") {
        minutes = "0" + minutes;
    }
    if (seconds < "10") {
        seconds = "0" + seconds;
    }

    $("#timerSale").html(" " + hours + ":" + minutes + ":" + seconds);

}

function openPreviewBox(data) {
    $("#tes_pre_bg").show();
    var base_URL = window.location.origin;
    if (data[0].image == "" || data[0].image == base_URL + "/#") {
        $("#tes_pre_bg").hide();
    }
    $("#testimonial_preview_container").css("display", "flex");
    $("#testimonial_preview_container").removeClass("close");
    $("#testimonial_preview_container").addClass("open");
    $("#tes_pre_star").empty();
    for (let i = 1; i < (data[0].stars + 1); i++) {
        $("#tes_pre_star").append('<i class="fa star fa-star checked"></i>');
    }
    $("#tes_pre_name").html(data[0].name);
    $("#tes_pre_message").html(data[0].message);
    $("#tes_pre_date").html(data[0].date);
    $("#tes_pre_bg").css("background-image", "url(" + data[0].image + ")");
}

function closePreviewBox() {
    $("#testimonial_preview_container").removeClass("open");
    $("#testimonial_preview_container").addClass("close");
    setTimeout(() => {
        $("#testimonial_preview_container").css("display", "none");
    }, 190);
}

function fontSize(a) {
    let size = a.value + "rem";
    let position = $(a).position();
    $(".text-preview")[0].style.fontSize = size;
    // $(".text-preview")[0].style.lineHeight = lineHeight;
    fontLineSizePreview(size);
}

function background_slider(ratio, timestamp) {
    $(".background-option .controller.right").click(function() {
        let old = $(".background-option .fluid-horizontal").scrollLeft();
        $("#bgscont").animate({
            scrollLeft: '+=' + ratio
        }, timestamp);
    });
    $(".background-option .controller.left").click(function() {
        let old = $(".background-option .fluid-horizontal").scrollLeft();
        $("#bgscont").animate({
            scrollLeft: '-=' + ratio
        }, timestamp);
    });
}

function pairofsix(a) {
    let x = a.length;
    return parseInt(x / 6);
}

function testimonialSizes() {
    let constrow = 4;
    let width = 245;
    let margin = 20;
    let margin_top = 7;
    let item_container = $("#testimonial_container");
    let items = $("#testimonial_container .items-container");
    let testimonial_object = [];
    for (var i = 0; i < items.length; i++) {
        let heights;
        if (items[i].children[0].currentSrc == "") {
            heights = items[i].children[1].offsetHeight;
        } else {
            heights = items[i].offsetHeight;
        }
        var obj = {
            "height": heights,
            "top": items[i].offsetTop,
            "left": items[i].offsetLeft,
            "image": items[i].children[0].currentSrc,
            "name": items[i].children[1].children[0].children[1].children[1].innerText,
            "message": items[i].children[1].children[0].children[0].innerText,
            "date": items[i].children[1].children[0].children[2].children[0].innerText
        };
        testimonial_object.push(obj);
    }
    item_container.empty();
    for (var i = 0; i < testimonial_object.length; i++) {
        if (i >= 0 && i < 4) {
            if (testimonial_object[i].image != undefined) {
                item_container.append(
                    '<div class="items-container" style="top: 0; left:' + ((i * width) + (i * margin)) + 'rem; ">' +
                    '<img src="' + testimonial_object[i].image + '" class="image w-100">' +
                    '<div class="message w-100">' +
                    '<div class="m-2">' +
                    '<p class="message-text">' + testimonial_object[i].message + '</p>' +
                    ' <div class="row">' +
                    '<p class="col-md-6"></p>' +
                    '<p class="col-md-6 message-name">' + testimonial_object[i].name + '</p>' +
                    ' </div>' +
                    '  <div class="row" style="font-size: 12px;">' +
                    ' <p class="col-md-5 pl-1">' + testimonial_object[i].date + '</p>' +
                    '  <p class="col-md-7 text-right">Verified Customer</p>' +
                    ' </div>' +
                    ' </div>' +
                    '</div>' +
                    '</div>');
            } else {
                item_container.append(
                    '<div class="items-container" style="top: 0; left:' + ((i * width) + (i * margin)) + 'rem; ">' +
                    '<div class="message w-100">' +
                    '<div class="m-2">' +
                    '<p class="message-text">' + testimonial_object[i].message + '</p>' +
                    ' <div class="row">' +
                    '<p class="col-md-6"></p>' +
                    '<p class="col-md-6 message-name">' + testimonial_object[i].name + '</p>' +
                    ' </div>' +
                    '  <div class="row" style="font-size: 12px;">' +
                    ' <p class="col-md-5 pl-1">' + testimonial_object[i].date + '</p>' +
                    '  <p class="col-md-7 text-right">Verified Customer</p>' +
                    ' </div>' +
                    ' </div>' +
                    '</div>' +
                    '</div>');
            }
        } else
        if (i >= 4 && i < 8) {
            if (testimonial_object[i].image != undefined) {
                item_container.append(
                    '<div class="items-container" style="top: ' + (testimonial_object[i - constrow].height + (margin_top * constrow)) + 'px; left:' + (((i - constrow) * width) + ((i - constrow) * margin)) + 'rem; ">' +
                    '<img src="' + testimonial_object[i].image + '" class="image w-100">' +
                    '<div class="message w-100">' +
                    '<div class="m-2">' +
                    '<p class="message-text">' + testimonial_object[i].message + '</p>' +
                    ' <div class="row">' +
                    '<p class="col-md-6"></p>' +
                    '<p class="col-md-6 message-name">' + testimonial_object[i].name + '</p>' +
                    ' </div>' +
                    '  <div class="row" style="font-size: 12px;">' +
                    ' <p class="col-md-5 pl-1">' + testimonial_object[i].date + '</p>' +
                    '  <p class="col-md-7 text-right">Verified Customer</p>' +
                    ' </div>' +
                    ' </div>' +
                    '</div>' +
                    '</div>');
            } else {
                item_container.append(
                    '<div class="items-container" style="top: ' + (testimonial_object[i - constrow].height + (margin_top * constrow)) + 'px; left:' + (((i - constrow) * width) + ((i - constrow) * margin)) + 'rem; ">' +
                    '<div class="message w-100">' +
                    '<div class="m-2">' +
                    '<p class="message-text">' + testimonial_object[i].message + '</p>' +
                    ' <div class="row">' +
                    '<p class="col-md-6"></p>' +
                    '<p class="col-md-6 message-name">' + testimonial_object[i].name + '</p>' +
                    ' </div>' +
                    '  <div class="row" style="font-size: 12px;">' +
                    ' <p class="col-md-5 pl-1">' + testimonial_object[i].date + '</p>' +
                    '  <p class="col-md-7 text-right">Verified Customer</p>' +
                    ' </div>' +
                    ' </div>' +
                    '</div>' +
                    '</div>');
            }
        }
    }
    $("#testimonial_container").height("100vh");
}

function add_cart(jsonObjCartItem) {
    $.ajax({
        type: "POST",
        url: "../../api/cartTosession.php",
        data: jsonObjCartItem,
        dataType: 'json',
        beforeSend: function() {
            $("#preloader").fadeIn();
        },
        success: function(result) {
            if (result == 200) {
                $("#preloader").fadeOut();
                window.location.href = "cart.php";
            }
        }
    });
}
$(".cont.image-message").click(function() {
    let bg = $(this).children("img")[0].currentSrc;
    let message = $(this).find(".message")[0].innerText;
    let checked_stars_count = $(this).find("i.checked").length;
    let username = $(this).find(".name")[0].innerText;
    let date = $(this).find(".date")[0].innerText;
    let data = Array({
        "name": username,
        "message": message,
        "stars": checked_stars_count,
        "image": bg,
        "date": date
    });
    openPreviewBox(data);
});

function preview_image(image) {
    $('#image_preview_conatiner').trigger('focus');
    $("#imagePreview").show();
    $("#imagePreview").attr("src", image);
}

function deleteProduct(productid) {
    $.ajax({
        type: "POST",
        url: "../../api/deleteProduct.php",
        data: {
            "productid": productid
        },
        success: function(result) {
            if (result == 200) {
                location.reload();
            }
        }
    });
}

function changeQuantity(a, b) {
    let value = $(a).val();
    $.ajax({
        type: "POST",
        url: "../../api/changeQuantity.php",
        data: {
            "product_id": b,
            "value": value
        },
        dataType: "json",
        success: function(result) {
            result = numberWithCommas(result);
            $("#overall_amount_cart").html("$ " + result);
        }
    });
}

function userShipping(xx) {
    $.ajax({
        type: "POST",
        url: "../../api/userShipping.php",
        data: xx,
        dataType: "json",
        contentType: false,
        cache: false,
        processData: false,
        success: function(result) {
            if (result == 200) {
                window.location.href = "../../checkout/3.php";
            }
        }
    });
}

function UserInformationFun(xxw) {
    $.ajax({
        type: "POST",
        url: "../../api/userInformation.php",
        data: xxw,
        dataType: "json",
        contentType: false,
        cache: false,
        processData: false,
        success: function(result) {
            if (result == 200) {
                window.location.href = "../../checkout/2.php";
            }
        }
    });
}

function bestseller_open(tag_code) {
    $("#bestsellers_container").empty();
    $.ajax({
        type: "POST",
        url: "../../api/bestselller.php",
        data: {
            "tag_code": tag_code
        },
        dataType: "json",
        success: function(result) {
            if (result[0].status == 200) {
                for (let i = 1; i < result.length; i++) {
                    $("#bestsellers_container").append(
                        '<div class="item-container">' +
                        '<div class="img-container"' +
                        ' style="background-image:url(&#x27;' + result[i].product_image + '&#x27;)">' +
                        ' </div>' +
                        '<div class="text-container d-flex flex-column align-items-center justify-content-center">' +
                        '<div>' + result[i].product_name + '</div>' +
                        '<p><span>$' + result[i].small_size + '</span><span' +
                        ' style="text-decoration: line-through;margin-left:10px;">$' + result[i].small_size + '</span>' +
                        '</p>' +
                        '</div>' +
                        '</div>'
                    );
                }
            } else {
                $("#bestsellers_container").html("<h1 class='no-data-found'>No data Found</h1>");
            }
        }
    });

}

function subscribeNow(you, e) {
    e.preventDefault();
    let data = new FormData(you);
    if (data.get("email") == "") {
        $("#subscribeUs .loading").hide();
        $("#subscribeUs i").show();
        $("#output_subscribe").html("Please Enter Email Id");
        $("#output_subscribe").css("color", "red");
    } else {
        $.ajax({
            type: "POST",
            url: "../../api/subscribeNow.php",
            data: data,
            dataType: "json",
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function() {
                $("#subscribeUs .loading").show();
                $("#subscribeUs i").hide();
            },
            success: function(result) {
                let promocode = "CNZ10";
                if (result == 100) {
                    $("#subscribeUs .loading").hide();
                    $("#subscribeUs i").show();
                    $("#output_subscribe").html("Please Enter Email Id.");
                    $("#output_subscribe").css("color", "red");
                    $(you).trigger("reset");
                } else if (result == 200) {
                    $("#subscribeUs .loading").hide();
                    $("#subscribeUs i").show();
                    $("#output_subscribe").html("Hurray! Here's yours discount code - <b>" + promocode + "</b>");
                    $("#output_subscribe").css("color", "green");
                    $(you).trigger("reset");
                } else if (result == 300) {
                    $("#subscribeUs .loading").hide();
                    $("#subscribeUs i").show();
                    $("#output_subscribe").html("Your Email is already registered please try another Email Id.");
                    $("#output_subscribe").css("color", "red");
                    $(you).trigger("reset");
                } else {
                    $("#subscribeUs .loading").hide();
                    $("#subscribeUs i").show();
                    $("#output_subscribe").html("Please try again.");
                    $("#output_subscribe").css("color", "red");
                    $(you).trigger("reset");
                }
            }
        });
    }
}

function bestseller_search_box(data) {
    $.ajax({
        type: "POST",
        url: "../../api/searchBestSeller.php",
        data: data,
        dataType: "json",
        contentType: false,
        cache: false,
        processData: false,
        success: function(result) {
            $("#bestsellers_search_output").empty();
            if (result[0].status == 200) {
                if (data.get("bestseller_price") == "ASC") {
                    result.sort(
                        function(a, b) {
                            if (a.small_size === b.small_size) {
                                // Price is only important when cities are the same
                                return b.small_size - a.small_size;
                            }
                            return a.small_size < b.small_size ? 1 : -1;
                        });
                } else {
                    result.sort(
                        function(a, b) {
                            if (a.small_size === b.small_size) {
                                // Price is only important when cities are the same
                                return b.small_size - a.small_size;
                            }
                            return a.small_size > b.small_size ? 1 : -1;
                        });
                }

                for (let i = 1; i < result.length; i++) {
                    if (result[i].status) {} else {
                        $("#bestsellers_search_output").append(
                            '<div class="item-container">' +
                            '<div class="img-container"' +
                            ' style="background-image:url(&#x27;' + result[i].product_image + '&#x27;)">' +
                            ' </div>' +
                            '<div class="text-container d-flex flex-column align-items-center justify-content-center">' +
                            '<div>' + result[i].product_name + '</div>' +
                            '<p><span>$' + result[i].small_size + '</span><span' +
                            ' style="text-decoration: line-through;margin-left:10px;">$' + result[i].small_size + '</span>' +
                            '</p>' +
                            '</div>' +
                            '</div>'
                        );
                    }
                }

            } else {
                $("#bestsellers_search_output").append(
                    '<h2 class="text-center m-auto">' +
                    'No Data Found!' +
                    '</h2>'
                );
            }
        }
    });
}

//Repel Effect
function createRipple(event) {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}