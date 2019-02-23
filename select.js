jQuery(function () {

    /**
     * Gestion de la selection des select
     * Info : blur prend le pas sur click, mousedown passe avant le blur
     */
    $(".select").on('mousedown', 'li', function () {
        var parentUL = $(this).parent('ul');
        var parentDIV = parentUL.parent('div');
        var selectID = parentUL.attr('class').split("select ")[1];
        parentDIV.prev('button').html($(this).html());
        parentDIV.toggle();
        $("#" + selectID).val($(this).attr('value'));
        $("#" + selectID).change();
    });

    // Cache le select quand on clique en dehors
    $(document.body).on('blur', '.select-head', function () {
        $(this).next('div').hide();
    });

    // Recherche, déplacement puis sélection de l'élément ayant la premiere lettre de la touche pressée dans le select
    $('.select-head').keypress(function (e) {
        var touche = String.fromCharCode(e.which);
        var DIV = $(this).next('div'); //selectblock
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

    // Select : Reset du CSS des éléments si on bouge la souris
    $('.select-container').on('mousemove', 'ul', function () {
        $(this).children('li').each(function () {
            $(this).removeClass('select-hover');
        });
    });

    // Select : Gestion du z-index de chaque select de la page
    $(document.body).on('click', '.select-head', function () {
        $(this).next('div').toggle();

        var zindex = 900;
        $(".select-container").each(function () {
            zindex = --zindex;
            $(this).css('z-index', zindex);
        });
    });
});