/* Custom Dragula JS */

function init() {

dragula([
  document.getElementById("to-do"),
  document.getElementById("doing"),
  document.getElementById("done"),
  document.getElementById("trash")
],{removeOnSpill: false,
	/*copy:function (el, source) {
	console.log(source.id);
    return "to-do" === source.id;
  }
  ,accepts: function (el, target) {
    return "to-do" !== target.id;
  }
*/
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
	localStorage.setItem("kanban-klassisch",  document.getElementById("main-container").innerHTML);
}

function readData(){
	console.log("Reading Data from localstorage");
	var data=localStorage.getItem("kanban-klassisch");
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
        <h4>To Do</h4>
      </div>
      <ul class="task-list" id="to-do">
       
		
      </ul>
    </li>

    <li class="column doing-column">
      <div class="column-header">
        <h4>Doing</h4>
      </div>
      <ul class="task-list" id="doing">
       
      </ul>
    </li>

    <li class="column done-column">
      <div class="column-header">
        <h4>Done</h4>
      </div>
      <ul class="task-list" id="done">
        
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
