function Event(date, note) //Konstruktorfunktion
{
  Event.getText = function()
  {
    return note;
  };
  
  Event.setText = function(_note)
  {
    note = _note;
  };
  
  Event.getDate = function()
  {
    return date;
  };
  
  Event.setDate = function(_date)
  {
    date = _date;
  };
  
  /*
   * läggas till vid tid. Tag-egenskap på event
   
   this.setTag = function(_tag)
   {
     tag = _tag;
   }
   
   this.getTag = function()
   {
     return tag;
   }
   */
   
   function insertEvent(e)
   {
     
   }
   
   function updateEvent(e)
   {
     
   }
   
   function deleteEvent(e)
   {
     
   }
   
   /*
   * Hämtar alla event. Returnerar en array.
   */
   function getAllEvents()
   {
     
   }
   
   /*
    * Hämtar de senaste eventen
    */
   function getLatestEvent()
   {
     
   }
   /*
   * häma event från ett specifikt datum
   */
   function getEventsFromDate(date)
   {
     
   }
}
