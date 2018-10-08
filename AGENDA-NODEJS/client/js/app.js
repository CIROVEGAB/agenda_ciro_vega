
$(() => {

    const Manager = new EventManager()

    $('.logout-container').on('click', () => Manager.cerrarSesion())

})

class EventManager {

    constructor(){

        this.urlBase = '/events'
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()

    }

    sessionError(){

        alert('Usuario no ha iniciado sesión')
        window.location.href = 'http://localhost:3000/'
        
    }

    obtenerDataInicial(){

        let url = `${this.urlBase}/all`

        $.get(url, response => {

            if(response == 'logout'){
                this.sessionError()
            } else this.inicializarCalendario(response)

        })

    }

    eliminarEvento(evento){

        let eventId = evento._id

        $.post(`/events/delete/${eventId}`, {id: eventId}, response => {
            if(response == 'logout'){
                this.sessionError()
            }else{
                $('.calendario').fullCalendar('removeEvents', eventId)
                alert(response)
            }
        })

    }

    guardarEvento(){

        $('.addButton').on('click', ev => {

            ev.preventDefault()

            let title = $('#titulo').val(),
                start = $('#start_date').val(),
                end = '',
                start_hour = '',
                end_hour = ''

            if(!$('#allDay').prop('checked')){

                if($('#start_hour').val() == '' || $('#end_hour').val() == '' || $('#end_date').val() == '' ){
                    alert('Complete los campos obligatorios para el evento')
                    return
                }

                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()

            }

            let url = `${this.urlBase}/new`

            if(title != '' && start != ''){

                let ev = {
                    title: title,
                    start: start,
                    end: end,
                    start_hour,
                    end_hour
                }
                
                $.post(url, ev, response => {

                    if(response != 'logout'){

                        let newEvent = {
                            _id:response,
                            title: title,
                            start: start,
                            end: end
                        }

                        $('.calendario').fullCalendar('renderEvent', newEvent)
                        alert('Evento guardado.')

                    } else this.sessionError()

                })

            } else alert('Complete los campos obligatorios para el evento')

        })

    }

    inicializarFormulario(){

        $('#start_date, #titulo, #end_date').val('')

        $('#start_date, #end_date').datepicker({dateFormat: 'yy-mm-dd'})

        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
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

    inicializarCalendario(eventos){

        let d = new Date()

        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: `${d.getFullYear()}-${(d.getMonth()+1)}-${d.getDate()}`,
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: event => this.actualizarEvento(event),
            events: eventos,
            eventDragStart: (event,jsEvent) => {
                $('.delete').find('img').attr('src', '/img/trash-open.png');
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                let trashEl = $('.delete')
                let ofs = trashEl.offset()
                let x1 = ofs.left
                let x2 = ofs.left + trashEl.outerWidth(true)
                let y1 = ofs.top
                let y2 = ofs.top + trashEl.outerHeight(true)
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 && jsEvent.pageY >= y1 && jsEvent.pageY <= y2){
                    this.eliminarEvento(event, jsEvent)
                }
                $('.delete').find('img').attr('src', '/img/delete.png')
            }
        })

    }

    actualizarEvento(evento){

        let start = moment(evento.start).format('YYYY-MM-DD'),
            end = moment(evento.end).format('YYYY-MM-DD HH:mm:ss'),
            url

        if(evento.end == null){
            url = `/events/update/${evento._id}&${start}&${start}`
            end = start
        } else url = `/events/update/${evento._id}&${start}&${end}`

        let data = {
            id: evento._id,
            start: start,
            end: end
        }

        $.post(url, data, response => {

            if(response == 'logout'){
                this.sessionError()
            } else alert(response)

        })

    }

    cerrarSesion(){

        let url = '/usuarios/logout',
            data = ''

        $.post(url, data, response => {

            if(response == 'logout'){
                window.location.href='http://localhost:3000/'
            } else alert('Error inesperado al cerrar sesión')

        })

    }

}