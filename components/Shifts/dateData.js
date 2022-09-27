var today = new Date();
const day = today.getDay()
var days=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]
const currentdate=days[day-1] + " "+ parseInt(today.getMonth()+1) +","+ today.getFullYear();
const date1=today.getDate() +1+ "-"+ parseInt(today.getMonth()+1) +"-"+ today.getFullYear();
const date2=today.getDate() +2+ "-"+ parseInt(today.getMonth()+1) +"-"+ today.getFullYear();
const date3=today.getDate() +3 + "-"+ parseInt(today.getMonth()+1) +"-"+ today.getFullYear();
const date4=today.getDate() +4+ "-"+ parseInt(today.getMonth()+1) +"-"+ today.getFullYear();
const alldays=[

  {
    id: 1,
    date: date1,
    shift: 0
  },
  {
    id: 2,
    date: date2,
    shift: 0
  },
  {
    id: 3,
    date: date3,
    shift: 0
  },{
    id: 4,
  date: date4,
    shift: 0
  }
]
export default alldays