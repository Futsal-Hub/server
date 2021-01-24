user = {
  username: "",
  email: "",
  password: "",
  role: "Owener"|"player"
  if owner
    courts:[court]
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
  },
  owner:{}
}

Booking= {
  id,
  schedule: schedule,
  player: {_id:"klfjsdfjlsk",username: "ksfsjfkls"},
  players:[{_id: "skfjsklfjs", username:"skjfjkslf"}],
  court: {_id:"sfjsfjsl", owner:{_id: "sjflskfjs"}},
  status: "pending/accepted/rejectd"
}

"Request" = {
  origin: user,
  destination: user,
  status:"pending"|"accepted",
}

