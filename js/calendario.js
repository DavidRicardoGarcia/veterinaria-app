
  let eventos=[
    {
      "id":"1",
      "text":"Cita 1",
      "start":"2021-09-12T10:30:00",
      "end":"2021-09-12T11:30:00"
    },
    {
      "id":"2",
      "text":"Cita 2",
      "start":"2021-09-13T10:30:00",
      "end":"2021-09-13T11:30:00"
    },
    {
      "id":"3",
      "text":"Cita 3",
      "start":"2021-09-14T10:30:00",
      "end":"2021-09-14T11:30:00"
    }
  ]

  
  const dp = new DayPilot.Calendar("dp");

  const nav = new DayPilot.Navigator("nav");



  function inicializar(){
    

  nav.showMonths = 2;
  nav.skipMonths = 2;
  nav.selectMode = "week";
  nav.init();

  dp.viewType = "Week";
  dp.init();
  dp.events.list = eventos;
  dp.update();
}
inicializar();

nav.onTimeRangeSelected = args => {
  dp.startDate = args.day;
  dp.update();
  
};