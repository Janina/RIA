function Ui()
{ 

}
  
/*
 * funktion får att gå igenom alla event
 * anropar printEvent för varje event den går igenom.  
 * @param array
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
        Ui.prototype.printEvent(eventarray[i], eventDiv, i);
      }  
  }
  else
  {
      for(var i=0; i < eventarray.length; i++)
      {
        Ui.prototype.printEvent(eventarray[i], eDiv, i);
      }
  }
}

/* 
 * skriver ut html för ett event och hur det ska visas på sidan.
 * @param event, eventID, number
 */
Ui.prototype.printEvent = function(ev, eventDiv, i)
{
  var today = this.getDateFormat();
  if(ev.getDate() == today)
  {
     var postit = new Postitwidget(CalApp.eventarray[i], i);
    if(document.getElementById(postit.getDivname()) == undefined)
    {
      var posDiv = postit.print();
      eventDiv.appendChild(posDiv);
      $("#"+postit.getDivname()).draggable();
    }
  }
}

/*
 * skapa upp ett datum med ett visst format:t yyyy-mm-dd
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
  
  today = year + "-" + month + "-" + day;
  return today;
},

/*
 * skriver ut vy för kalendern. Startsidan. 
 * @param array
 */
Ui.prototype.printCalendarView = function(eventarray)
{
	var div = document.getElementById("calendar");

	if($('#datepicker').length == 0)
	{
	   //skapar jquery datepicker objekt.
      var datepick = document.createElement("div");
      datepick.setAttribute("id", "datepicker");
      div.appendChild(datepick);
      var datepick = new Datepicker();
      datepick.print("datepicker");
      $("#datepicker").draggable();
	}
	//Skapar upp postitlapparna
	Ui.prototype.printEvents(eventarray);
},

/*
 * skriver ut vy för att lägga till en ny händelse. Ett fomrulär visas. 
 * @param Event-objekt
 */
Ui.prototype.printFormView = function(e)
{
	var div = document.getElementById("form");

  $('#formAdd').remove();
	/*if($('#formAdd').length == 0 || e == null)
	{*/
	  /*
	  if(e == null)
	  {
	    $('#formAdd').remove();
	  }
	  */
	  var heading = document.createElement("h2");
    heading.textContent = "Add Event";

    var form = document.createElement("form");
    form.setAttribute("id", "formAdd");

    var errortxt = document.createElement("p");
    errortxt.setAttribute("id", "formerror");
  
    var p1 = document.createElement("p");
    p1.textContent = "Date";
    var date = document.createElement("input");
    date.setAttribute("type", "text");
    date.setAttribute("id", "addDate");
    date.setAttribute("name", "date");
    date.setAttribute("maxlength", "10");
  
    var p2 = document.createElement("p");
    p2.textContent = "What's happening?";
    pinfo = document.createElement("p");
    pinfo.setAttribute("id", "smalltext");
    pinfo.textContent = "(max 35 character)";
  
    var note = document.createElement("input");
    note.setAttribute("type", "text");
    note.setAttribute("id", "addText");
    note.setAttribute("name", "text");
    note.setAttribute("maxlength", "35");
    note.setAttribute("size", "30");
    
    var submit = document.createElement("input");
    submit.setAttribute("id", "save");

    submit.setAttribute("class", "saveB");
    submit.setAttribute("type", "button");
    submit.setAttribute("value", "Save");
    //$("button").button();

    var backB = document.createElement("a");
    backB.setAttribute("id", "back");
    backB.setAttribute("src", "#");
    backB.textContent = "<- back";
    
    var newline = document.createElement("br");
    
    if(e != null)
    {
      //ett edit-formulär har öppnts. Sätter in eventets värden i formuläret.
      date.setAttribute("value", e.getDate());
      note.setAttribute("value", e.getText());
      
      var hidden_id = document.createElement("p");
      hidden_id.textContent = e.getId();
      hidden_id.setAttribute("id", "hidden");
    }
    else
    {
      date.value = "yyyy-mm-dd";
      note.value = "";
    }
    
    div.appendChild(form);
    form.appendChild(heading);
    form.appendChild(errortxt);
    form.appendChild(p1);
    if(e != null)
    {
      form.appendChild(hidden_id);
    }
    form.appendChild(date);
    form.appendChild(p2);
    form.appendChild(pinfo);
    form.appendChild(note);
    form.appendChild(newline);
    form.appendChild(submit);
    form.appendChild(newline);
    form.appendChild(backB);
	//}
},

/*
 * skriver ut applikationens meny. OBS! Används ej nu.
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

/*
 * skriver ut meddelande-dialog
 * @param div(vart den ska skrivas ut), meddelande, title.
 */
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
 * @param element
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


