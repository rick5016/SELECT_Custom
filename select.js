jQuery(function () {

    // Toggle custom select container
    function toggleSelectListContainer(selectListContainer) {
        var visibility = selectListContainer.css('visibility');

        if (visibility === 'hidden') {
            selectListContainer.css('visibility', 'initial');
            selectListContainer.css('height', '200px');
        } else {
            hideSelectListContainer(selectListContainer);
        }
    }

    // Hide custom select container
    function hideSelectListContainer(selectListContainer) {
        selectListContainer.css('visibility', 'hidden');
        selectListContainer.css('height', '0px');
    }

    // Toggle custom select on click
    $(document.body).on('click', '.value-selected', function () {
        toggleSelectListContainer($(this).next('div'));

        // multiple select on page
        var zindex = 900;
        $(".select-bloc").each(function () {
            zindex = --zindex;
            $(this).css('z-index', zindex);
        });
    });

    // select option in the custom select container
    $(".select-list").on('mousedown', 'li', function () {
        var selectList = $(this).parent('ul');
        var selectListContainer = selectList.parent('div');
        var selectID = selectList.attr('class').split("select-list ")[1];
        selectListContainer.prev('button').html($(this).html());

        toggleSelectListContainer(selectListContainer);

        $("#" + selectID).val($(this).attr('value'));
        $("#" + selectID).change();
    });

    // Hide custom select container on click outside
    $(document.body).on('blur', 'select', function () {
        var selectBloc = $(this).next('div');
        var selectContainer = selectBloc.children('div');
        var selectListContainer = selectContainer.children('div');

        hideSelectListContainer(selectListContainer);
    });

    // Change custom select value with arrows on focus
    $(document.body).on('change', 'select', function () {
        var opt = $(this).children('option:selected');

        var selectBloc = $(this).next('div');
        var selectContainer = selectBloc.children('div');
        var label = selectContainer.children('label');

        label.html(opt.text());
    });

    // TODO : select value whith enter
    $('.select-bloc').keyup(function (e)
    //$(".select-bloc").on('keyup', 'ul', function ()
    {
        console.log(e.keyCode);
        console.log(e.which);
        if (e.keyCode == 13) { // enter

        }
    });
    /*$('.select_custom').keypress(function(e){
    });*/









    // In progress : Recherche, déplacement puis sélection de l'élément ayant la premiere lettre de la touche pressée dans le select
    $('.value-selected').keypress(function (e) {
        var touche = String.fromCharCode(e.which);
        var DIV = $(this).next('div'); //select-list-container
        var UL = DIV.children('ul'); //select

        // Recherche de l'element par rapport à la lettre
        var elem = '';
        UL.children('li').each(function () {
            if (touche === $(this).attr('value').substr(0, 1).toLowerCase() && elem === '') {
                elem = $(this);
            }
            $(this).removeClass('select-hover'); // Au cas ou la souris n'aurai pas bougé
        });

        // Si on ne trouve rien
        if (elem === '')
            return 0;

        // Déplacement vers l'élément
        $(DIV).scrollTop(0);

        //$(DIV).scrollTop($('li[value="' + elem.attr('value') + '"]').position().top);
        $(DIV).scrollTop(elem.position().top);

        // Modification du CSS de l'élément
        elem.addClass('select-hover');

        // Sélection de l'élément
        var selectID = UL.attr('class').split("select ")[1];
        DIV.prev('button').html(elem.html());
        $("#" + selectID).val(elem.attr('value'));
        $("#" + selectID).change();
    });
});