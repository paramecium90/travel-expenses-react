import logo from './logo.svg';
import './App.css';
import { faHand } from '@fortawesome/free-regular-svg-icons';
import {useState} from 'react' 
import xmark from './img/cross-icon.svg'
import checkmark from './img/tick-green-icon.svg'


function computeDebt(activities,temppeople){
  console.log(activities)
    var temparray = [[]]
  for(let i=0;i<temppeople.length;i++){
      for(let j=0;j<temppeople.length;j++){
        temparray[i].push(0)

}
temparray.push([])
  }

  var people =[]
    for (let i=0 ; i<temppeople.length; i++) {
      people.push({name:temppeople[i].name,array:temparray[i]})

    }

 console.log("list1")
  
console.log(people)
for (let i=0 ; i<activities.length; i++){
  // gia kathe activity bres to name ston list of people akai prosthese to poso dia length
  for(let j=0; j< people.length;j++){
    if (activities[i].paidBy === people[j].name){
              console.log("true")
              // // console.log(activities[i].amount/listOfPeople.length)


        // listOfPeople[j].array.map(prev => { return (prev+ activities[i].amount/listOfPeople.length)})      
        for (let k = 0 ;k< people.length ;k++)

        { 

            people[j].array[k] = people[j].array[k] + activities[i].amount/people.length

        }  
    }
  }

}
// console.log("list2")
// console.log(listOfPeople)



//   var people = [ {
//   name:"geo",
//   array : [0,151, 151]
// },{
//   name:"nik",
//   array : [50,0,50]
// },{
//   name:"asdf",
//   array : [200,200,0]
// }]


// finding amount paid by each person
for(let i = 0 ; i<people.length; i++){
    var sum = 0 
    for (let j = 0 ; j<people[i].array.length; j++){
      sum =  sum + people[i].array[j]
    }
          people[i] = {...people[i],paid:sum}
  }

// finding amount owed by each person
    for(let i = 0 ; i<people[0].array.length; i++){
    sum = 0 
    for (let j = 0 ; j<people[i].array.length; j++){
      sum =  sum + people[j].array[i]

    }
    people[i] = {...people[i],owed:sum}
  }
// finding balance  for each person
  for (let i = 0 ; i<people.length;i++){
        people[i] = {...people[i],balance:(people[i].paid - people[i].owed)}
  }
console.log(people)
people.sort((a,b) => {
  return  a.balance - b.balance
})



var transactions = []
var start = 0 
var end  =  people.length- 1
while (start<end){
  if (people[start].balance + people[end].balance>0){

        console.log(`${people[start].name} pays ${people[end].name} ${Math.abs(people[start].balance)}`)
        transactions.push({from:people[start].name, amount:Math.abs(people[start].balance),to:people[end].name })
        people[end].balance = people[start].balance + people[end].balance
                people[start].balance = 0

        start++

    // thetiko ksexrewnei o start
  } 
  else if (people[start].balance + people[end].balance<0){


            console.log(`${people[start].name} pays ${people[end].name} ${Math.abs(people[start].balance)}`)
                    transactions.push({from:people[start].name, amount:Math.abs(people[start].balance),to:people[end].name })

            people[start].balance = people[start].balance + people[end].balance
                        people[end].balance = 0

            end--
    // arnitiko ksexrewnei o end
  }
  else {
                                console.log(`${people[start].name} pays ${people[end].name} ${Math.abs(people[start].balance)}`)
                                        transactions.push({from:people[start].name, amount:Math.abs(people[start].balance),to:people[end].name })
                people[start].balance = 0
                        people[end].balance = 0

    start++
    end--
    // 0 ksexrewnoun kai oi 2
  }

}

return transactions



}



  var personId = 0
  var activityId = 0


function App() {


  /////////////////////////////////////////FIRST FROM////////////////////////////////
  var [forms,setForms]  =useState({trip:true, activities:false, addActivity :false})

  var [people,setPeople] = useState([])

  var [trip,setTrip] =useState("")

  var [person,setPerson] = useState([])

  var [activities,setActivities] = useState([])
  
  var [results,setResults] = useState([])

function tripChange(e) {

  setTrip(e.target.value)
} 

function personChange(e) {

  setPerson(e.target.value)
  // setTrip(e.target.value)
}




function addPerson(){
  // var personId = people.length
  setPeople(prev=>[...prev,{name:person,id:personId}])
  personId++

  document.getElementById('addPerson').reset();
  setPerson("")

}


function deletePerson(e) {

  var newPeople = []
  people.map(person =>{ if (e.target.id != person.id) {

    newPeople.push(person)
  }
    
  })
  setPeople(newPeople)
  
}



  function formToggler (form){
    if(form ===1){
      setForms(prev=>{return {...prev,trip : !prev.trip}})
      setForms(prev=>{return {...prev,activities : !prev.activities}})
    }
    else if (form ===2){
      setForms(prev=>{return {...prev,activities : !prev.activities}})
      setForms(prev=>{return {...prev,results : !prev.results}})  
    }
  }
  
  function addActivity(activity,setActivity){


    setActivities(prev=>[...prev, {name:activity.name,paidBy:activity.paidBy,amount:activity.amount,id:activityId}])
    activityId++

            document.getElementById('activity-form').reset();
    setActivity([])


  }


  function deleteActivity(e) {

  var newActivities = []
  activities.map(activity =>{ if (e.target.id != activity.id) {

    newActivities.push(activity)
  }
    
  })
  setActivities(newActivities)

  
}


  // computeDebt()
  return (
    <body>
    <div className="App">
    {forms.trip && <Form toggler={formToggler} addPerson = {addPerson} deletePerson= {deletePerson} people = {people} personChange= {personChange} tripChange  ={tripChange} />}
    {forms.activities  && <Activities toggler={formToggler} trip = {trip} people = {people} activities = {activities}  addActivity = {addActivity} deleteActivity = {deleteActivity} />}
    {forms.results  && <Results people = {people} activities = {activities}/>}



    </div>
    </body>
  );
}




  /////////////////////////////////////////SECOND FROM////////////////////////////////

// add activities delete activities
function Activities (props){

   var [activity,setActivity] = useState({}) 


    var selectElements = props.people.map(person=>{
      return (<option value={person.name}> {person.name}</option>)
    })
    

    var activitiesElements = props.activities.map(activity=>{
      return (<div className='activity--container'>
        <div className='activity--info'>
        <div className='activity'>
            <div className='activity--name'>{activity.name}</div>
            <div className='activity--amount'>{activity.amount}</div>
        </div>
        <div className='activity--paidBy'>{`paid by ${activity.paidBy}`}</div>
        </div>
        <img className='delete-btn'src = {xmark} onClick = {props.deleteActivity} id = {activity.id} ></img>
      </div>)
    })
    selectElements.unshift(<option value="" disabled selected>paid by</option>)

function selectAmount(e){
  setActivity(prev=>{return {...prev,amount:e.target.value}})

}

function activityName(e){
  setActivity(prev=>{return {...prev,name:e.target.value}})

}




function selectHandler(e){
  setActivity(prev=>{return {...prev,paidBy:e.target.value}})
}





  return (<div >
    <h2>{props.trip}</h2>
    {activitiesElements}
    <form id = "activity-form">
      <h3>Add activities</h3>
      <div className='activity--form'>
    <input id = 'activity' onChange = {activityName}className='trip--name'
      type = "text"
      placeholder = "activity name"
/>
    <input id = "price" onChange={selectAmount} className='trip--name price'
      type = "number"
      placeholder = "price"
/>

  <select id="paidBy" onChange = {selectHandler} >
  {selectElements}
</select>
<div className='price add add-person' onClick = {()=>props.addActivity(activity,setActivity)}>

<img id = 'add-person' src = {checkmark}   ></img>

</div>
  </div>
  </form>
  <button  onClick = {()=>props.toggler(2) } className = "calculate"> calculate results</button>
  </div>)
}




function Results(props) {

  var transactions=computeDebt(props.activities,props.people)
  console.log(transactions)
  var transactionsElements  =  transactions.map(transaction =>{ return (
        <div className='activity--container'>
          <p> {`${transaction.from} pays to ${transaction.to} ${transaction.amount}`}</p>
        </div>
  )})
  return(<div>
    {transactionsElements}
  </div>)
}









































/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////FIRST FORM ////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function Form(props){




    var peopleElements = props.people.map (person=>{return(
      <div className = "person--container">

          <h3>{person.name}</h3>
              <img src = {xmark} id  = {person.id} onClick = {props.deletePerson} ></img>
          {/* <button id  = {person.id} onClick = {deletePerson} > delete</button> */}
    </div>)})



  return (<div><form>
    <input className='trip--name'
      type = "text"
      placeholder = "Trip name"
      onChange = {props.tripChange}/>


  </form>

  {peopleElements}
  <div className='person--container'>
  <form id = "addPerson">          <input className='new--person'
      type = "text"
      placeholder = "add person"
      onChange = {props.personChange}/>
</form>
      <div className='add-person' onClick = {props.addPerson} >
            <img id = 'add-person' src = {checkmark}  ></img></div>
</div >
<div className='person--container next' onClick={()=>props.toggler(1)}>Next . . .</div>
  </div>
  )

  }

export default App;
