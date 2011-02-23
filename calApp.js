var CalApp = {
  
  /*
   * använder event delegation. Dvs ha en onclick på hela sidan som sedan identifierar vad som klickats. 
   * Anropar sedan makeselection där jag skickar in det som anv klickade på. 
   */
  document:onclick = function reciveUI(event)
  {
 
  },
  
  /*
   * funktion som beroende på val väljer vad som ska utföras
   */
  makeSelection : function(opts, eventarray)
  {
    
  },
  
  /*
   * funktion för att välja vy och i sin tur även rita ut den, Anropar alltså printCalendarView eller PrintFormView beroende på val.
   * sätter den andra vyn till display:none. 
   * tar emot en array met event som kalendervyn ska visas.
   */
  showView : function(view, eventarray)
  {
     
  },
  
  /*
   * inloggninsfunktioner.
   */
  isLoggedIn : function()
  {
    if(inlogged === true)
    {
      return true;
    }
    else
    {
      return false;
    }
  },
  
  /*
   * ska Ev anropa fb för att loggas in.
   * spara fb's data till user. 
   * Kolla av om user finns i db.
   */
  login : function()
  {
    inlogged = true;
  },
  
  logout : function()
  {
    inlogged = false;
  }
  
  /*
   * Om jag hinner, vilket jag hoppas.
   * funktioner så som att man kan ha flera calendrar och att man kan tagga sina event.
   */
   
}

window.onload = CalApp.showView(calendar, null);