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
	* funktion för att rita ut datepicker och dess onSelect-event.
	*/
 Datepicker.prototype.print = function(id)
 {
   $('div#'+id).datepicker({
     
   dateFormat: 'yy-mm-dd',
   beforeShowDay: function(date){
   var d = $.datepicker.formatDate('yy-mm-dd', new Date(date)); 
     for (var i = 0; i < CalApp.eventarray.length; i++) 
     {
        if (CalApp.eventarray[i].getDate() == d) 
        {
          //[disable/enable, class for styling appearance, tool tip]
            return [true, 'highlight'];
        }
     }
     return [true, ''];
    },
   
   onSelect: function(dateText, inst) { 
     
     if(CalApp.inlogged == true)
     {
       var div = document.getElementById("calendar");
       var eventDiv = document.getElementById("events");
       var newEventDiv = document.createElement("div");
       newEventDiv.setAttribute("id", "events");
       var findEvent = false;
       var todayarray = [];
       
       //Går igenom varje event i eventarrayen. Samma datum som vald i datepickern -> ska skrivas ut. 
       for(var i=0; i < CalApp.eventarray.length; i++)
       {
         if(CalApp.eventarray[i].getDate() == dateText)
         {
           todayarray.push(CalApp.eventarray[i]);
           findEvent = true;
         }
       }
       
       if(findEvent == true)
       {
         //skriver ut de event som finns på valt datum. 
         $('#events').remove();
         div.appendChild(newEventDiv);

         for(var y=0; y < todayarray.length; y++)
         {
           var postit = new Postitwidget(todayarray[y], y+20);
           var posDiv = postit.print();
           newEventDiv.appendChild(posDiv);
           $("#"+postit.getDivname()).draggable();

         }
       }
  
       if(findEvent == false)
       {
           //finns inga event på datum -> en dialog ruta visas.
           /*
           var dialog = document.createElement("div");
           dialog.setAttribute("id", "dialog");
           dialog.setAttribute("title", dateText)
           dialog.innerHTML = "Det finns inga händelser på angivet datum.";
           div.appendChild(dialog);
           
           var d = new Dialog("Det finns inga händelser på angivet datum", null);
           d.printDialog("dialog");
           var ui = new Ui();
           */
        }
     }
     }
  });
	

 };
