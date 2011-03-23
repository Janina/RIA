var CalApp = {
  
  eventarray : [],
  userarray : [],
  ui : new Ui(),
  db : new CouchDB(),
  inlogged: false,
  user : null,
  
  
  /*
   * använder event delegation. Dvs ha en onclick på hela sidan som sedan identifierar vad som klickats. 
   * Anropar sedan makeselection där jag skickar in det som anv klickade på. 
   */
  document:onclick = function reciveUI(e)
  {
	e = e || window.event;  
  	CalApp.makeSelection(e.target || e.srcElement);
  },
  
  /*
   * anropas vid start. 
   */
  start : function()
  {
     var ev = new Event("2011-03-11", "fika", "674288357");

     ev.setId();
     var ev2 = new Event("2011-03-01", "Träna", "674288357");
     ev2.setId();
     var ev3 =new Event("2011-03-11", "plugga javascript och jquery!", "674288357");
     ev3.setId();
     var ev4 = new Event("2011-03-17", "optikern", "674288357");
     ev4.setId();
     CalApp.eventarray.push(ev);  
     CalApp.eventarray.push(ev2);
     CalApp.eventarray.push(ev3);
     CalApp.eventarray.push(ev4);
  },
  
  /*
   * funktion som anropas då hash-tecknet ändras. 
   * Ska användas för att kunna gå fram och tillbak mellan sidor. 
   * OBS! implementation ej klar. 
   */
  locationHashChanged : function(e)
  {
    //exempelkod
     if (location.hash === "#somecoolfeature") {
          somecoolfeature();
      }
  },
  
  /*
   * funktion som beroende på val väljer vad som ska utföras
   * @param elementet som användaren tryckt på. 
   */
  makeSelection : function(opts)
  {
  	
  	if(opts.className == "fb_button_text")
  	{
  	  CalApp.login();
  	}
  	
  	switch(opts.id)
  	{
  	  case "start":
  	  CalApp.showView("calendar", null);
  	  //CalApp.getFromDb();
  	  //window.location.reload();
  	  break;
  	  
  		case "add":
  		CalApp.showView("form", null);
  		$("#addDate").focus(function(){
  		  this.select();
  		});
  		break;
  		
  		
  		case "login":
  		//CalApp.inlogged = true;
  		//$('#add').show();
  		CalApp.login();
      break;
  		
  		case "logout":
  		CalApp.logout();
  		break;
  		
  		case "edit_img":
      var eventid = opts.name;
  		CalApp.showView("form", eventid);
  		break;
  		
  		case "delete_img":
  		if(CalApp.inlogged == true)
  		{
  		  CalApp.ui.printConfirmBox(opts)
  		}
  		else
  		{
  		  var div = document.getElementById("calendar");
  		  CalApp.ui.printMessageBox(div, "You have to logged in to delete a event", "Message");
  		}
  		break;
  		
  		case "save":
  		var hidden = document.getElementById("hidden");
  		var d = document.getElementById("addDate").value;
      var txt = document.getElementById("addText").value;
      var div = document.getElementById("form");
  		
  		if(hidden == null)
  		{
        var newEvent = new Event(d, txt, CalApp.user.getId());
        newEvent.setId();
        CalApp.addEvent(newEvent);
  		}
  		else
  		{
  		  var eventid = hidden.textContent;
  		  var ev = CalApp.getEventFromId(eventid);
  		  ev.setDate(d);
  		  ev.setText(txt);
  		}
  		
  		if(CalApp.validate(txt, d) == true)
  		{
  		  var message = "Your Event has been saved.";
        var title = "Saved!";
        CalApp.ui.printMessageBox(div, message, title);
  		}
  		else
  		{
  		  CalApp.showView("form", null);
  		  var error = document.getElementById("formerror");
        error.textContent = "Formuläret är inte korrekt ifyllt. Vänligen försök igen.";
  		}
      //CalApp.showView("calendar");
  		break;
  		
  		case "back":
  		CalApp.showView("calendar", null);
      break;
      
      case "start_text":
      CalApp.showView("calendar", null);
      break;
  		
  	}
  	
  },
  /*
   * Lägger till event i array.
   * @param event
   */
  addEvent : function(e)
  {
    for(var i = 0; i < CalApp.eventarray; i++)
    {
      if(CalApp.eventarray[i].getDate() == e.getDate())
      {
        if(CalApp.eventarray[i].getText() != e.getText())
        {
          CalApp.eventarray[i].setText(e.getText());
        }
      }
      
      if(CalApp.eventarray[i].getDate() != e.getDate())
      {
        CalApp.eventarray[i].setDate(e.getDate());
        if(CalApp.eventarray[i].getText() != e.getText())
        {
          CalApp.eventarray[i].setText(e.getText());
        }
      }
    }
    CalApp.eventarray.push(e);
  },
  
  /*
   * ta bort event från array.
   * @param eventID
   */
  deleteEvent : function(evid)
  {
    var div = document.getElementById("calendar");
    var events = document.getElementById("events");

    for(var i = 0; i < CalApp.eventarray.length; i++)
    {
      if(CalApp.eventarray[i].getId() == evid)
      {
        CalApp.eventarray.splice(i,1);
        $("#delete").parent().remove();
      }
    }
  },
  
  /*
   * Hämtar specifikt event. 
   * @param eventID
   */
  getEventFromId : function(evid)
  {
    for(var i = 0; i < CalApp.eventarray.length; i++)
    {      
      if(CalApp.eventarray[i].getId() == evid)
      {
        return CalApp.eventarray[i];
      }
    }
  },
  
  /*
   * funktion för att välja vy och i sin tur även rita ut den, Anropar alltså printCalendarView eller PrintFormView beroende på val.
   * sätter den andra vyn till display:none. 
   * @param vilken vy som ska visas.
   * @param eventID. Skickas med om editeringsformulär ska visas.
   */
  showView : function(view, eventid)
  {
  	var form = document.getElementById("form");
  	var calendar = document.getElementById("calendar");
    switch(view)
    {
      case "calendar":
	  	form.style.display = "none";
        calendar.style.display = "block";
        if(CalApp.inlogged == true)
        {
          $("#events").remove();
          CalApp.ui.printCalendarView(CalApp.eventarray);
        }
        break;
     
      case "form":
        calendar.style.display = "none";
        form.style.display = "block";
        if(eventid != null)
        {
          var ev = CalApp.getEventFromId(eventid);
          CalApp.ui.printFormView(ev);
        }
        else
        {
          CalApp.ui.printFormView(null);
        }   
        break;
    }
  },
  
  /*
   * inloggninsfunktioner.
   */
  isLoggedIn : function()
  {
    if(CalApp.inlogged === true)
    {
      return true;
    }
    else
    {
      return false;
    }
  },
  
  /*
   * Anropa facebook. Logga in där om man inte redan är inloggad. 
   * 
   */
  login : function()
  {
    var login = document.getElementById("login");
    
    FB.login(function(response) {
      // användaren lyckas logga in
      if (response.session) {
        CalApp.inlogged = true;
        login.textContent = "";
        var img = document.createElement("img");
        img.src = "image/delete_icon.png";
        login.appendChild(img);
        img.setAttribute("id", "logout")
        $("#add").show();
        $("#start").show();
        $("#start_img").hide();
        CalApp.showView("calendar", null);
        
        var user = new User(response.session.uid);
        if(CalApp.checkIfUserExist(user) == false)
        {
          CalApp.userarray.push(user);
        }
        CalApp.user = user;
         
      } else {
        // användaren lyckas ej logga in
        CalApp.inlogged = false;
        login.textContent = "Login";
        $('#add').hide();
        }
    });
  },
  
  logout : function()
  {
    var logout = document.getElementById("logout");
    
    FB.logout(function(response) {
      //användaren lyckas logga ut
      CalApp.inlogged = false;
      $('#add').hide();
      logout.textContent = "Login with Facebook";
      logout.setAttribute("id", "login");
      window.location.reload();
    });
    
  },

/*
 * kollar av om user redan finns i array
 */
 checkIfUserExist : function(user)
 {
   var exist;
   for(var i = 0; i < CalApp.userarray.length; i++)
   {
     if(CAlApp.userarray[i].getId() == user.getId())
     {
       exist = true;
     }
     else
     {
       exist = false;
     }
   }
   return exist;
 },


/*
 * Enkel validering.
 */
  validate : function(txt, date)
  {
    if(txt == "" || date == "yyyy-mm-dd" || date == "")
    {
        return false;
    }
    else
    {
      return true;
    }
  },

/*
 * testfunktion för kontakt till databas.
 */
  getFromDb : function()
  {
    $.ajax({
    url: 'http://janina.couchone.com/calendar/event/?note=hej',
    type: 'put',
    dataType: 'image/jpg',
    success: function(data) 
    {
      console.log(data);
    }
    });
  }
 
  /*
   * Om jag hinner, vilket jag hoppas.
   * funktioner så som att man kan ha flera calendrar och att man kan tagga sina event.
   */
   
};

window.onload = CalApp.start(); 