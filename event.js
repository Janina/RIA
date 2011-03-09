function Event(date, note, uid) //Konstruktorfunktion
{
  this.getDate = function()
  {
    return date;
  };
  
  this.getText = function()
  {
    return note;
  };
  
  this.getId = function()
  {
    return randomString();
  }
  
  this.getUid = function()
  {
    this.userId = uid;  
  }
  
  function randomString()
  {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i=0; i<string_length; i++) 
    {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring;
  } 
  

   
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

Event.prototype.insertEvent = function(e)
{
  
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


