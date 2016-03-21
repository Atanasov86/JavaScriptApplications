var app = app || {};

app.lectureViewBag = (function () {

    function showHomeMenu() {
        $.get('templates/menu-home.html', function (template) {
            $('#menu').html(template);
        });
    }

    function showAllLectures(selector, data) {
        showHomeMenu();
        $.get('templates/calendar.html', function (template) {
            $(selector).html(template);
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addLecture',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addLecture: {
                        text: 'Add Event',
                        click: function () {
                            //TODO: redirect to add event page
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/add/'});
                            });
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);

                        $('#editLecture').hide();
                        $('#deleteLecture').hide();
                    });
                    $('#events-modal').modal();
                }
            });

        })
    }

    function showMyLectures(selector, data) {
        showHomeMenu();
        $.get('templates/calendar.html', function (template) {
            $(selector).html(template);
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addLecture',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addLecture: {
                        text: 'Add Event',
                        click: function () {
                            //TODO: redirect to add event page
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/add/'});
                            });
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editLecture').on('click', function () {
                            var lectureId = calEvent._id;
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/edit/' + lectureId});
                                this.trigger('showEditLecture', calEvent);

                            });
                        });
                        $('#deleteLecture').on('click', function () {
                            //TODO: redirect to delete event page
                            var lectureId = calEvent._id;
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/delete/' + lectureId});
                                this.trigger('showDeleteLecture', calEvent);

                            })
                        })
                    });
                    $('#events-modal').modal();
                }
            });

        })
    }

    function showDeleteLecturePage(selector, data) {
        showHomeMenu();
        $('#events-modal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $.get('templates/delete-lecture.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            $('#deleteLecture').on('click', function () {
                var lectureId = $(this).attr('data-id');
                Sammy(function () {
                    this.trigger('delete-lecture', lectureId);
                })
            })
        })
    }


    function showEditLecturePage(selector, data) {
        showHomeMenu();
        $('#events-modal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $.get('templates/edit-lecture.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            $('#editLecture').on('click', function () {
                var title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val(),
                    id = $(this).attr('data-id'),
                    lecturer = sessionStorage['username'];

                Sammy(function () {
                    this.trigger('edit-lecture', {title: title, start: start, end: end, lecturer: lecturer, id: id});
                })
            })
        })
    }

    function showAddLecturePage(selector) {
        $.get('templates/add-lecture.html', function (template) {
            $(selector).html(template);
            $('#addLecture').on('click', function () {
                var title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val();

                Sammy(function () {
                    this.trigger('add-lecture', {title: title, start: start, end: end});
                    this.trigger('redirectUrl', {url: '#/calendar/my/'})
                })
            })
        })
    }


    return {
        load: function () {
            return {
                showAllLectures: showAllLectures,
                showEditLecturePage: showEditLecturePage,
                showAddLecturePage: showAddLecturePage,
                showMyLectures: showMyLectures,
                showDeleteLecturePage: showDeleteLecturePage
            }
        }
    }

})();
