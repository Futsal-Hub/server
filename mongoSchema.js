user = {
  username: "",
  email: "",
  password: "",
  role: "Owener"|"player"
  if owner
    courts:[id]
  position: {
    lon,
    lat
  }
};

court = {
  name:"",
  type:"",
  price:2498,
  schedule:[
    {
      id:"",
      start: 90,
      end:893402,
    }
  ],
  address:'slkfjsafjkl',
  position: {
    lon:750859038,
    lat: 74530583905
  }

}

Booking= {
  id,
  schedule_id: schedule,
  player_id:user,
  players:[user],
  court_id: id,
  status: "pending/accepted/rejectd"
}

"Request" = {
  origin: user,
  destination: user,
  status:"pending"|"received",
  type: 1|2
}

