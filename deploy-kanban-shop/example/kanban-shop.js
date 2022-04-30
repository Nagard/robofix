/* Custom Dragula JS */

function init() {

dragula([
  /*document.getElementById("category"),*/
  document.getElementById("products"),
  document.getElementById("busket"),
  document.getElementById("trash")
],{removeOnSpill: false,
	copy:function (el, source) {
	console.log(source.id);
    return "products" === source.id;
  }
  ,accepts: function (el, target) {
    return "products" !== target.id;
  }

}



)
  .on("drag", function(el) {
    el.className.replace("ex-moved", "");
  })
   
  .on("drop", function(el) {
    el.className += "ex-moved";
	saveData();
  })
  .on("over", function(el, container) {
   // container.className += "ex-over";
  })
  .on("out", function(el, container) {
	console.log("out");  
    container.className.replace("ex-over", "");
  });
  
  
}
  

/* Vanilla JS to add a new task */
function addTask() {
  
  /* Get task text from input */
  var inputTask = document.getElementById("taskText").value;
  
  /* Add task to the 'To Do' column */
  document.getElementById("to-do").innerHTML +=
    "<li class='task'><p>" + inputTask + "</p></li>";
  
  /* Clear task text from input after adding task */
  document.getElementById("taskText").value = "";

  saveData(); 

}

/* Vanilla JS to delete tasks in 'Trash' column */
function emptyTrash() {
  /* Clear tasks from 'Trash' column */
  document.getElementById("trash").innerHTML = "";

  saveData();
}


function saveData(){
	console.log("Saving Data to localstorage");
	localStorage.setItem("kanban-shop",  document.getElementById("main-container").innerHTML);
}

function readData(){
	console.log("Reading Data from localstorage");
	var data=localStorage.getItem("kanban-shop");
    if ( data==undefined){
           data=getDefault();
	}		
    document.getElementById("main-container").innerHTML=data; 
    init(); 
}
init();
readData();

function getDefault(){

defaultData=`
<ul class="columns">

   <li class="column to-do-column">
      <div class="column-header">
        <h4>Category</h4>
      </div>
      <ul  class="task-list" id="category">
        <li style="cursor:default" id="Vorspeise" class="task">
          <p>Vorspeise</p>
        </li>
        <li style="cursor:default" id="Hauptgericht" class="task">
          <p>Hauptgericht</p>
        </li>
        <li style="cursor:default" id="Nachspeise" class="task">
          <p>Nachspeise</p>
        </li>
        <li style="cursor:default" id="Getränke" class="task">
          <p>Getränke</p>
        </li>
      </ul>
    </li>

   
   
   <li class="column doing-column">
      <div class="column-header">
        <h4>Products</h4>
      </div>
      <ul class="task-list" id="products">
        <li class="task">
          <p>Suppe</p>
        </li>
        <li class="task">
          <p>Salat</p>
        </li>
      
      </ul>
    </li>
   
      
   

    <li class="column done-column">
      <div class="column-header">
        <h4>Busket</h4>
      </div>
      <ul class="task-list" id="busket">
        
      </ul>
    </li>

    <li class="column trash-column">
      <div class="column-header">
        <h4>Trash</h4>
      </div>
      <ul class="task-list" id="trash">
       

      </ul>
      <div class="column-button">
        <button class="button delete-button" onclick="emptyTrash()">Delete</button>
      </div>
    </li>

  </ul>
`
return defaultData;

	
}



var Vorspeise=`
 <li class="task">
          <p>Suppe</p>
        </li>
        <li class="task">
          <p>Salat</p>
        </li>
` 

var Hauptgericht=`
 <li class="task">
          <p>Schnitzel</p>
        </li>
        <li class="task">
          <p>Bratwurst</p>
        </li>
` 

var Nachspeise=`
 <li class="task">
          <p>Eis</p>
        </li>
        <li class="task">
          <p>Käsekuchen</p>
        </li>
` 

var Getränke=`
 <li class="task">
          <p>Coce</p>
        </li>
        <li class="task">
          <p>Bier</p>
        </li>
		<li class="task">
          <p>Wein</p>
</li>
` 




var gerichte = new Map();
gerichte.set("Vorspeise",Vorspeise);
gerichte.set("Hauptgericht",Hauptgericht);
gerichte.set("Nachspeise",Nachspeise);
gerichte.set("Getränke",Getränke);



function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement; 
    }
	
function changeColorOfColumn(clickedName){
// set all on whiteSpace
names=['Vorspeise','Hauptgericht','Nachspeise','Getränke'];
var li 
names.forEach(function(name){
			 li =  document.getElementById(name);
			console.log("name :"+name);
			console.log("li id :"+li.getAttribute("id"));
			console.log("li class :"+li.getAttribute("class"));
			li.setAttribute('class', 'task');
		});

// strip html from clickedName
var html = clickedName;
var div = document.createElement("div");
div.innerHTML = html;
clickedName=div.innerText; 

clickedName=clickedName.trim();

//set clicked with yellow
li =  document.getElementById(clickedName);
console.log("clickedName :"+clickedName);
li.setAttribute('class', 'taskclicked');

// change Products-Content
document.getElementById("products").innerHTML=gerichte.get(clickedName);

}	




var ul = document.getElementById('category');
    ul.onclick = function(event) {
        var target = getEventTarget(event);
		changeColorOfColumn(target.innerHTML) 
       
    };