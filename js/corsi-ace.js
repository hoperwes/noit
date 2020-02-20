
function counterAce() {
    var counter = 10;
    $('.fancybox-overlay #count').html(counter);

    prevNowPlaying = setInterval(function () {
        //console.log(counter);
        counter--;
        if (counter >= 0) {
            $('.fancybox-overlay #count').html(counter);
            //span = document.getElementById("count");
            //span.innerHTML = counter;
        }
        // Display 'counter' wherever you want to display it.
        if (counter === 0) {
            if ($('body').hasClass('lang_1')) {
                window.location.href = "http://www.fradeanieducation.com/it/corsi/";
            } else {
                window.location.href = "http://www.fradeanieducation.com/en/courses/";
            }
            
            //alert('this is where it happens');
            clearInterval(counter);
            clearInterval(prevNowPlaying);
        }
    }, 1000);


}

function counterConference() {
    var counter = 10;
    $('.fancybox-overlay #count').html(counter);

    prevNowPlaying = setInterval(function () {
        //console.log(counter);
        counter--;
        if (counter >= 0) {
            $('.fancybox-overlay #count').html(counter);
            //span = document.getElementById("count");
            //span.innerHTML = counter;
        }
        // Display 'counter' wherever you want to display it.
        if (counter === 0) {
            if ($('body').hasClass('lang_1')) {
                window.location.href = "http://www.fradeanieducation.com/it/conferenze/";
            } else {
                window.location.href = "http://www.fradeanieducation.com/en/lectures/";
            }

            //alert('this is where it happens');
            clearInterval(counter);
            clearInterval(prevNowPlaying);
        }
    }, 1000);


}


/*--------------------------------------------------
DOC READY
--------------------------------------------------*/
$(document).ready(function () {

    $('#cont-alert-ace').width($('.container').outerWidth());

    $('.sottomenu.has-ace a').on('click', function () {
        $.fancybox({
            type: 'inline',
            content: $('#cont-alert-ace').html(),
            'autoSize': false,
            'width': 'auto',
            'height': 'auto',
            afterClose: function () {
                clearInterval(prevNowPlaying);
            }
        });

        counterAce();
        return false;
    });

    $('.has-conference').on('click', function () {
        var myHref = $('#alert-conferenze a').attr("href");
        if ($(this).hasClass('has-conference-2016')) {
            var str = $('#alert-conferenze a').attr("href");
            $('#alert-conferenze a').attr("href", str + "?anno=2016&relatore=dr-mauro-fradeani");
        }
        if ($(this).hasClass('has-conference-2017')) {
            var str = $('#alert-conferenze a').attr("href");
            $('#alert-conferenze a').attr("href", str + "?anno=2017&relatore=dr-mauro-fradeani");
        }

        

        $.fancybox({
            type: 'inline',
            content: $('#cont-alert-conferenze').html(),
            'autoSize': false,
            'width': 'auto',
            'height': 'auto',
            afterClose: function () {
                clearInterval(prevNowPlaying);
                $('#alert-conferenze a').attr("href", myHref );
            }
        });

        counterConference();
        return false;
    });
});


/*--------------------------------------------------
WINDOW LOAD
--------------------------------------------------*/
$(window).load(function () {
    //$('.sottomenu.has-ace a').click();
});

/*--------------------------------------------------
WINDOW RESIZE
--------------------------------------------------*/
$(window).resize(function () {

});