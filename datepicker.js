function Datepicker() //Konstruktorfunktion
{
   

   
   /*
    * Hämta valt datum 
    */
   function getSelectedDate()
   {
     
   }
   
   /*
    * För eventuella inställningar.
    */
   function setSettings()
   {
     
   }
   
 }
 	/*
	* funktion för att rita ut datepicker.
	*/
 Datepicker.prototype.print = function(id)
 {
   $('div#'+id).datepicker({
     
   dateFormat: 'yy-mm-dd',
   onSelect: function(dateText, inst) { 
     
     if(CalApp.inlogged == true)
     {
       var div = document.getElementById("calendar");
       var eventDiv = document.getElementById("events");
       var findEvent = false;
       for(var i=0; i < CalApp.eventarray.length; i++)
       {
  
         if(CalApp.eventarray[i].getDate() == dateText)
         {
           div.removeChild(eventDiv);
           var postit = new Postitwidget(CalApp.eventarray[i], i+20);
           var posDiv = postit.print();
           var newEventDiv = document.createElement("div");
           newEventDiv.setAttribute("id", "events");
           newEventDiv.appendChild(posDiv);
           div.appendChild(newEventDiv);
           findEvent = true;
         }
       }
  
       if(findEvent == false)
       {
           var dialog = document.createElement("div");
           dialog.setAttribute("id", "dialog");
           dialog.setAttribute("title", dateText)
           dialog.innerHTML = "Det finns inga händelser på angivet datum.";
           div.appendChild(dialog);
           
           var d = new Dialog("Det finns inga händelser på angivet datum", null);
           d.printDialog("dialog");
           var ui = new Ui();
        }
     }
     }
  });
	

 };
