function Ui()
{ 

}
  
/*
 * funktion får att gå igenom alla event
 * anropar printEvent för varje event den går igenom.  
 */
Ui.prototype.printEvents = function(eventarray)
{
  //Skapar upp postitlapparna
  var div = document.getElementById("calendar");
  var eDiv = document.getElementById("events");
  if(eDiv == null)
  {
      var eventDiv = document.createElement("div");
      eventDiv.setAttribute("id", "events");
      div.appendChild(eventDiv);
      for(var i=0; i < eventarray.length; i++)
      {
        Ui.prototype.printEvent(eventarray[i], eventDiv);
      }  
  }
  else
  {
      for(var i=0; i < eventarray.length; i++)
      {
        Ui.prototype.printEvent(eventarray[i], eDiv);
      }
    
  }
}

/* 
 * skriver ut html för ett event och hur det ska visas på sidan.
 */
Ui.prototype.printEvent = function(ev, eventDiv)
{
  var today = this.getDateFormat();
  if(ev.getDate() == today)
  {
    var postit = new Postitwidget(eventarray[i], i);
    var posDiv = postit.print();
    eventDiv.appendChild(posDiv);
  }
}

/*
 * skapa upp ett datum med ett visst format: yyyy-mm-dd
 * returnera datum
 */
Ui.prototype.getDateFormat = function()
{
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  
  if(month < 10)
  {
    month = "0" + month;
  }
  
  if(day < 10)
  {
    day = "0" + day;
  }
  
  today = year + "-" + day + "-" + month;
  return today;
},

/*
 * skriver ut vy för kalendern. Startsidan. 
 */
Ui.prototype.printCalendarView = function(eventarray)
{
	//Skapar upp menyn
	var div = document.getElementById("calendar");

  //Ui.prototype.printMenu(div);
	if($('#datepicker').length == 0)
	{
	   //skapar jquery datepicker objekt.
      var datepick = document.createElement("div");
      datepick.setAttribute("id", "datepicker");
      div.appendChild(datepick);
      var datepick = new Datepicker();
      datepick.print("datepicker");
	}


	//Skapar upp postitlapparna
	Ui.prototype.printEvents(eventarray);
},

/*
 * skriver ut vy för att lägga till en ny händelse. Ett fomrulär visas. 
 */
Ui.prototype.printFormView = function(title, txt)
{
	var div = document.getElementById("form");
	
	//Ui.prototype.printMenu(div);
	
	if($('#formAdd').length == 0)
	{
	  var heading = document.createElement("h3");
    heading.textContent = "Add Event";
    
  
    div.appendChild(heading);
    
    var form = document.createElement("form");
    form.setAttribute("id", "formAdd");
  
    var p1 = document.createElement("p");
    p1.textContent = "Date:";
    var date = document.createElement("input");
    date.setAttribute("type", "text");
    date.setAttribute("id", "addDate");
    
    /*var date = document.createElement("div");
    date.setAttribute("id", "dp");
    //date.setAttribute("type", "text");
    date.textContent = "specify your date:";
    div.appendChild(date);
    //date.setAttribute("type", "text");
    var datepicker2 = new Datepicker();
    datepicker2.print("dp");
    */
  
    var p2 = document.createElement("p");
    p2.textContent = "What happen?";
  
    var note = document.createElement("input");
    note.setAttribute("type", "text");
    note.setAttribute("id", "addText");
    
    var submit = document.createElement("input");
    submit.setAttribute("id", "save");
    submit.setAttribute("type", "button");
    submit.setAttribute("value", "Save");
    
    if(title != null)
    {
      alert(title);
      date.setAttribute("value", title);
      note.setAttribute("value", txt);
    }
    else
    {
      date.value = "yyyy-mm-dd";
    }
    
    div.appendChild(form);
    form.appendChild(p1);
    form.appendChild(date);
    form.appendChild(p2);
    form.appendChild(note);
    form.appendChild(submit);
	}
	
	
},

/*
 * skriver ut applikationens meny.
 */    
Ui.prototype.printMenu = function(div)
{
  var menuDiv = document.createElement("div");
  menuDiv.className = "menu";
  
  var startB = document.createElement("a");
  startB.setAttribute("href", "#");
  startB.setAttribute("id", "start");
  startB.textContent = "Start";
  

  
  var formB = document.createElement("a");
  formB.setAttribute("href", "#");
  formB.setAttribute("id", "add");
  formB.textContent = "Add";
  var loginB = document.createElement("a");
  loginB.setAttribute("href", "#");
  loginB.setAttribute("id", "login");
  loginB.textContent = "Login"; 
  
  
  div.appendChild(menuDiv);
  menuDiv.appendChild(startB);
  menuDiv.appendChild(formB);
  menuDiv.appendChild(loginB);
},    
    
Ui.prototype.printMessageBox = function(div, message, title)
{
    var dialog = document.createElement("div");
    dialog.setAttribute("id", "messDialog");
    dialog.setAttribute("title", title);
    dialog.innerHTML = message;
    div.appendChild(dialog);
    
    var d = new Dialog("saved", null);
    d.printDialog("messDialog");
},


    
/*
 * ritar ut en säkerhetsfråga angående borttagning, sparande osv.
 * skickar med vilken åtegärd som ska göras och event-objektet.
 */
Ui.prototype.printConfirmBox = function(opts)
{
    var div = document.getElementById("calendar");
    var dialog = document.createElement("div");
    dialog.setAttribute("id", "dialog1");
    dialog.setAttribute("title", "Deletemessage");
    dialog.innerHTML = "Do you really want to remove this event?";
    div.appendChild(dialog);
    var conf = new Dialog("text", null);

    conf.printConfirm("dialog1", opts.name);
};


