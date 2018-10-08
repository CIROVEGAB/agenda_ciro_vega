
$(() => {

    getEvents()

    initForm()

    $('#btn-add').click(() => {

        var formData = {
            titulo: $('#titulo').val(),
            start_date: $('#start_date').val(),
            end_date: $('#end_date').val(),
            start_hour: $('#start_hour').val(),
            end_hour: $('#end_hour').val(),
            allDay: $('#allDay').prop('checked')
        }

        addEvent(formData)

    })

    $('#logout').click(() => closeSession())

})

function getEvents(){

    $.ajax({
        url: '../server/get_events.php',
        type: 'GET',
        dataType: "json",
        success: data => {
            $('#nameUser').text(data.nombre)
            if(data.msg == 'OK'){
                poblarCalendario(data.eventos)
            } else alert(data.msg)
        },
        error: () => alert('Error en la comunicación con el servidor')
    })

}

function initForm(){

    $('#start_date, #titulo, #end_date').val('')

    $('#start_date, #end_date').datepicker({dateFormat: 'yy-mm-dd'})

    $('.timepicker').timepicker({
        timeFormat: 'HH:mm',
        interval: 30,
        minTime: '5',
        maxTime: '23:30',
        defaultTime: '7',
        startTime: '5:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    })

    $('#allDay').on('change', () => {
        if($('#allDay').prop('checked')){
            $('.timepicker, #end_date').attr('disabled', 'disabled')
        } else $('.timepicker, #end_date').removeAttr('disabled')
    })
    
}

function poblarCalendario(eventos){

    $('.calendario').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,basicDay'
        },
        defaultDate: '2018-06-20',
        navLinks: true,
        editable: true,
        eventLimit: true,
        droppable: true,
        dragRevertDuration: 0,
        timeFormat: 'H:mm',
        eventDrop: event => this.updateEvent(event),
        events: eventos,
        eventDragStart: (event, jsEvent) => {
            $('.delete-btn').find('img').attr('src', "img/trash-open.png")
            $('.delete-btn').css('background-color', '#a70f19')
        },
        eventDragStop: (event, jsEvent) => {
            var trashEl = $('.delete-btn')
            var ofs = trashEl.offset()
            var x1 = ofs.left
            var x2 = ofs.left + trashEl.outerWidth(true)
            var y1 = ofs.top
            var y2 = ofs.top + trashEl.outerHeight(true)
            if (jsEvent.pageX >= x1 && jsEvent.pageX <= x2 && jsEvent.pageY >= y1 && jsEvent.pageY <= y2){
                this.deleteEvent(event, jsEvent)
                $('.calendario').fullCalendar('removeEvents', event.id)
            }
        }
    })

}

function addEvent(dataObj){

    $.ajax({
        url: '../server/new_event.php',
        type: 'POST',
        dataType: 'json',
        data: dataObj,
        success: data => {
            if(data.msg == 'OK'){
                alert('Se ha añadido el evento exitosamente')
                location.reload()
            } else alert(data.msg)
        },
        error: () => alert('Error en la comunicación con el servidor')
    })

}

function updateEvent(event){

    let start, end, form_data

    if(event.allDay == true){
        start   = moment(event.start).format('YYYY-MM-DD')
        end     = moment(event.start).format('YYYY-MM-DD')
    } else{
        start   = moment(event.start).format('YYYY-MM-DD')
        end     = moment(event.end).format('YYYY-MM-DD')
    }

    form_data = {
        id: event.id,
        fecha_inicial: start,
        fecha_final: end
    }

    $.ajax({
        url: '../server/update_event.php',
        type: 'POST',
        dataType: "json",
        data: form_data,
        success: data => {
            if(data.msg == 'OK'){
                alert('Se ha actualizado el evento exitosamente')
            } else alert(data.msg)
        },
        error: () => alert('Error en la comunicación con el servidor')
    })

}

function deleteEvent(event, jsEvent){

    $.ajax({
        url: '../server/delete_event.php',
        type: 'POST',
        dataType: "json",
        data: {id: event.id},
        success: data => {
            if(data.msg == 'OK'){
                alert('Se ha eliminado el evento exitosamente')
            } else alert(data.msg)
        },
        error: () => alert('Error en la comunicación con el servidor')
    })

    $('.delete-btn').find('img').attr('src', "img/trash.png")
    $('.delete-btn').css('background-color', '#8B0913')

}

function closeSession(){

    $.ajax({
        url: '../server/logout.php',
        success: () => window.location.href = 'index.html',
        error: () => window.location.href = 'index.html'
    })

}