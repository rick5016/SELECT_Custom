jQuery(function () {

    // Hide custom select
    $(document).click(function (event) {
        if (!$(event.target).closest('.select_custom').length) {
            $(".select-list-container").each(function () {
                hideSelectListContainer($(this));
            });
        }
    });

    // Toggle custom select container
    function toggleSelectListContainer(selectListContainer) {
        var visibility = selectListContainer.css('visibility');

        if (visibility === 'hidden') {
            selectListContainer.css('visibility', 'initial');
            selectListContainer.css('max-height', '420px');
        } else {
            hideSelectListContainer(selectListContainer);
        }
    }

    // Hide custom select container
    function hideSelectListContainer(selectListContainer) {
        selectListContainer.css('visibility', 'hidden');
        selectListContainer.css('max-height', '0px');
    }

    // Toggle custom select on click
    $(document.body).on('click', '.value-selected', function () {
        var selectListContainer = $(this).next('div');
        var selectList = selectListContainer.children('ul');
        var thisSelectID = selectList.attr('class').split("select-list ")[1];

        toggleSelectListContainer($(this).next('div'));

        // multiple select on page
        var zindex = 900;
        $(".select-bloc").each(function () {
            var selectListContainer = $(this).children('.select-list-container');
            var selectList = selectListContainer.children('ul');
            var selectID = selectList.attr('class').split("select-list ")[1];
            if (selectID !== thisSelectID) {
                hideSelectListContainer(selectListContainer);
            }
            zindex = --zindex;
            $(this).css('z-index', zindex);
        });
    });

    // select option in the custom select container
    $(document.body).on('mousedown', 'li', function () {
        var selectList = $(this).parent('ul');
        var selectListContainer = selectList.parent('div');
        var selectID = selectList.attr('class').split("select-list ")[1];
        selectListContainer.prev('button').html($(this).html());

        toggleSelectListContainer(selectListContainer);

        $("#" + selectID).val($(this).attr('value'));
        $("#" + selectID).change();
    });

    // Change custom select value with arrows on focus
    $(document.body).on('change', 'select', function () {
        var opt = $(this).children('option:selected');

        var selectBloc = $(this).next('div');
        var label = selectBloc.children('.value-selected');
        var selectListContainer = label.next('div');
        var selectList = selectListContainer.children('ul');
        var element = selectList.children('li[value="' + opt.val() + '"]');

        // Select value in custom select
        if (element !== 'undefined') {
            $(selectListContainer).scrollTop(0);
            $(selectListContainer).scrollTop(element.position().top - 44);
            $('li').removeClass('select-hover');
            element.addClass('select-hover');
        }

        label.html(opt.text());
    });

    // Close custom select when press enter
    $('select').keyup(function (e) {
        if (e.keyCode == 13) {
            var selectBloc = $(this).next('div');
            var label = selectBloc.children('.value-selected');
            var selectListContainer = label.next('div');
            hideSelectListContainer(selectListContainer);
        }
    });

});