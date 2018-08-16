var agreeEmail = '';
var agreeName = '';
var agreeINN = '';
var agreeOGRN = '';
var agreeAdres = '';
//--form
    var $popUpForm = $('.form_callBack');
    var $popUpBtn = $('.callback__button');
    var $form = $('.form');
    var $personalPopUp = $('.persPopUp');
    var $closeForm;

    agre = new AgreAddCompInfo(agreeName, agreeEmail);
    agre.addInnOgrn(agreeINN+agreeOGRN?','+agreeOGRN:'');
    agre.addAdres(agreeAdres);
    var checkbox;

    $('.form_check').on('click', function () {
        if ($('div').is('#agre')) {
            $('#agre').remove()
        }
        var id = $(this).data('id');
        agre.render(id);
        checkbox = id;
    });

    $form.on('click', '.btn_agre', function (e) {
        e.preventDefault();
        var id = $(this).attr('id');
        var check;
        if (id === 'agre_ok') {
            check = true;
        } else if (id === 'agre_no') {
            check = false;
        }
        $(checkbox + ' ' + '.form_check').prop('checked', check);
        $('#agre').remove()
    });

    $personalPopUp.on('click', function () {
        var openForm = $(this).data('action');
        $closeForm = $(openForm);
        $(openForm).show('fade', 400).addClass('panel-open');
        $('.page').addClass('panel-open');
    });
    $popUpBtn.on('click', function () {
        $closeForm = $popUpForm;
        $popUpForm.show('fade', 400).addClass('panel-open');
        $('.page').addClass('panel-open');
    });
    $('.close').on('click', function () {
        $closeForm.css('display', 'none');
        $('.page').removeClass('panel-open')
    });

    $(document).on('click', function (event) {
        if ($(event.target).closest(".noneClose").length
            || $(event.target).closest("#mess_block").length
            || !$(event.target).hasClass('panel-open')) {
            return;
        }
        $closeForm.find('.close').trigger('click');
        $('#ok').trigger('click');
        event.stopPropagation();
    });
//--ajax
    $.fn.runAjax = function () {
        var form_data = $(this).serialize();
        var $clear = $(this).find('.clear');
        $('.loadMask').css('display', 'flex');

        $.ajax({
            type: "POST",
            url: "send.php",
            data: form_data,
            dataType: 'json',
            error: function () {
                $('.loadMask').hide();
                popup = false;
                $('#mess').html('Что то пошло не так, попробуйте повторить позже');
                $('#mess_block').css('display', 'flex');
                $('.page').addClass('panel-open');
            },
            success: function (data) {
                $('.loadMask').hide();
                if (data.res) {
                    $clear.val('');
                    popup = false;
                } else if (close) {
                    $popUpBtn.trigger('click');
                }
                $('#mess').html(data.mess);
                $('#mess_block').css('display', 'flex');
                $('.page').addClass('panel-open')
            }
        })
    };

    var id;
    var close;
    var popup = false;

    function closeForm() {
        $('.close').trigger('click');
        load = false;
        popup = true;
    }

    $form.on('submit', function (event) {
        event.preventDefault();
        id = $(this).find('.btn_form').data('id');
        close = !!($(this).find('.btn_form').data('close'));
        checkbox = id;

        if ($(checkbox + ' ' + '.form_check').prop('checked')) {
            if (close) {
                closeForm();
            } else {
                popup = false;
            }
            $(this).runAjax();
        }
        else {
            agre.render(id);
            $('#agre_ok').addClass('preSubmit');
            $('.preSubmit').on('click', function () {
                $(this).removeClass('preSubmit');
                $(checkbox + ' ' + '.form_check').prop('checked', true);
                if (close) closeForm();
                $(id + '_form').runAjax();
            })
        }
    });

    $('.formStandart').on('submit', function (event) {
        event.preventDefault();
        close = !!($(this).find('.btn_form').data('close'));
        load = true;
        popup = false;
        form_data = $(this).serialize();
        $(this).runAjax();
    });

    $('#ok').click(function () {
        $('#mess_block').css('display', 'none');
        if (!popup) $('.page').removeClass('panel-open')
    });

$(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        $('#buttonUp').fadeIn().addClass('active');
    } else {
        $('#buttonUp').fadeOut().removeClass('active');
    }
});

$('#buttonUp').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
    return false;
});

//Галерея документов
// var popUpLink = jQuery('.image-popup-no-margins');

// popUpLink.each(function () {
//     var paths = (jQuery(this).attr('href'));
//     jQuery('<img />').attr("src", paths);
// });


// popUpLink.magnificPopup({
//     type: 'image',
//     closeOnContentClick: true,
//     closeBtnInside: false,
//     fixedContentPos: true,
//     mainClass: 'mfp-no-margins mfp-with-zoom',
//     image: {
//         verticalFit: true
//     },
//     zoom: {
//         enabled: true,
//         duration: 300
//     }
// });

// slide();

$('.comment__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,

    prevArrow: '<button class="navBtn prev slick-arrow" type="button"><svg \n' +
    ' xmlns="http://www.w3.org/2000/svg"\n' +
    ' xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
    ' width="12px" height="20px">\n' +
    '<path fill-rule="evenodd"  fill="rgb(255, 255, 255)"\n' +
    ' d="M0.298,9.286 L9.300,0.297 C9.695,-0.097 10.335,-0.097 10.731,0.297 C11.126,0.690 11.126,1.330 10.731,1.723 L2.443,9.999 L10.730,18.276 C11.125,18.669 11.125,19.308 10.730,19.703 C10.335,20.097 9.694,20.097 9.299,19.703 L0.297,10.714 C-0.092,10.324 -0.092,9.675 0.298,9.286 Z"/>\n' +
    '</svg></button>',

    nextArrow: '<button class="navBtn next slick-arrow" type="button"><svg \n' +
    ' xmlns="http://www.w3.org/2000/svg"\n' +
    ' xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
    ' width="11px" height="20px">\n' +
    '<path fill-rule="evenodd"  fill="rgb(255, 255, 255)"\n' +
    ' d="M10.702,9.286 L1.700,0.297 C1.305,-0.097 0.665,-0.097 0.269,0.297 C-0.126,0.690 -0.126,1.330 0.269,1.723 L8.557,9.999 L0.270,18.276 C-0.125,18.669 -0.125,19.308 0.270,19.703 C0.665,20.097 1.306,20.097 1.701,19.703 L10.703,10.714 C11.092,10.324 11.092,9.675 10.702,9.286 Z"/>\n' +
    '</svg></button>',
    // appendArrows: $('.newsNavWrap'),
});

$('#course_select').on('change', function () {
    $('.courseTiming').removeClass('active');
    $($('#course_select').val()).addClass('active')
});

//productSlider

$('.productSlider').each(function () {
    $(this).slick({
        slidesToShow: 4,
        slidesToScroll: 4,

        prevArrow: '<button class="slider__arrow prev">\n' +
        '                        <svg\n' +
        '                                xmlns="http://www.w3.org/2000/svg"\n' +
        '                                xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
        '                                width="6px" height="12px">\n' +
        '                            <path fill-rule="evenodd"  fill="rgb(126, 126, 126)"\n' +
        '                                  d="M5.820,10.954 L1.316,5.992 L5.821,1.029 C6.035,0.793 6.035,0.410 5.821,0.173 C5.606,-0.063 5.258,-0.063 5.043,0.173 L0.150,5.564 L0.150,5.564 L0.150,5.564 C-0.064,5.800 -0.064,6.183 0.150,6.419 L5.043,11.809 C5.258,12.045 5.606,12.045 5.821,11.809 C6.035,11.574 6.035,11.190 5.820,10.954 Z"/>\n' +
        '                        </svg>\n' +
        '                    </button>',

        nextArrow: '<button class="slider__arrow next">\n' +
        '                        <svg\n' +
        '                                xmlns="http://www.w3.org/2000/svg"\n' +
        '                                xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
        '                                width="6px" height="12px">\n' +
        '                            <path fill-rule="evenodd"  fill="rgb(126, 126, 126)"\n' +
        '                                  d="M0.180,10.954 L4.684,5.992 L0.179,1.029 C-0.035,0.793 -0.035,0.410 0.179,0.173 C0.394,-0.063 0.742,-0.063 0.956,0.173 L5.849,5.564 L5.849,5.564 L5.849,5.564 C6.064,5.800 6.064,6.183 5.849,6.419 L0.957,11.809 C0.742,12.045 0.393,12.045 0.179,11.809 C-0.035,11.574 -0.035,11.190 0.180,10.954 Z"/>\n' +
        '                        </svg>\n' +
        '                    </button>',
        appendArrows: $($(this).data('arrow')),
        responsive: [
            {
                breakpoint: 1199.98,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 991.98,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 575.98,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});
$('.productSlider').on('setPosition', function () {
    $(this).find('.slick-slide').height('auto');
    var slickTrack = $(this).find('.slick-track');
    var slickTrackHeight = $(slickTrack).height();
    $(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
});



