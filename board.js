var Board = {
  

  /* 
   * Funktionen anropas då sidan öppnas. 
   * Ritar ut allt som ska vara på sidan vid start. 
   */
  init: function() {
      
/*
    * Anropas när någon klickar på logga in-kanppen. 
    * Ska ta användaren till facebooks loginsida om man inte redan är inloggad.
    * Redan inloggad på fb - loggas in här också.  
    */
    $("#login").bind("click",function()
    {
      
    });
    
    /*
     * ska loggas ut från calendarboard genom facebook.
     */
    $("#logout").bind("click",function()
    {
      
    });
    
    /*
     * Anropas då användaren trycker på nytt event. 
     * Formulär visas. 
     */
    $("#newEvent").bind("click",function()
    {
      
    });
    
    
    /*
     * Anropas då anv trycker på spara event.
     * Värden sätts in i db. Nytt Event-objekt skapas. 
     */
    $("#saveEvent").bind("click",function()
    {
      
    });
    
    /*
     * Anropas då man trycker på ett datum i datepickern för visa event. 
     * Datum och datepicker-instansen som parametrar.
     * 
     */
    $("#datepicker").bind("onSelect",function(date, dp)
    {
      
    });
    
    /*
     * Anropas då man väljer datum i datepickern för spara event. 
     * sätter date till det valda datumet.
     */
    $("#newDate").bind("onSelect",function(date, dp)
    {
      
    });
  
  }
 
 
   /*
   * Gör ett formulär för nytt event.
   */
  form: function()
  {
    
  }
 
}

window.onload = Board.init;