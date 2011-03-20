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
    //window.onhashchange = locationHashChanged;
  },
  
  /*
   * funktion som anropas då hash-tecknet ändras. 
   * Ska användas för att kunna gå fram och tillbak mellan sidor. 
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
  		$("#addDate").focus();
  		break;
  		
  		case "login":
  		//CalApp.inlogged = true;
  		//$('#add').show();
  		CalApp.login();
  		/*var link = document.getElementById("login");
      link.setAttribute("id", "logout");
      link.textContent = "Logout";*/
      break;
  		
  		case "logout":
  		CalApp.logout();
  		/*var link = document.getElementById("logout");
  		link.setAttribute("id", "login");
  		link.textContent = "Login";
  		*/
  		break;
  		
  		case "edit":
  		/*
  		obj = $('#edit').parent()[0].id;
  		var child = $('#'+obj).find("p");
  		var date = child[0].textContent;
  		var note = child[1].textContent;      */
  		//var obj = $('#edit').parent()[0].id;
      
      //var child = $('#'+obj).find("p");
      //var eventid = child[2].id;
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
   * tar emot en array met event som kalendervyn ska visas.
   */
  showView : function(view, eventid)
  {
    //events = []; 
    //CalApp.db.getAllEvents();
    //console.log(CalApp.eventarray);
  	var form = document.getElementById("form");
  	var calendar = document.getElementById("calendar");
    switch(view)
    {
      case "calendar":
	  	form.style.display = "none";
	  	//$("#start").focus();
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
          //$("#formAdd").remove();
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
    
    //Kolla om user finns i db - annars sätt in. 
    // sätt user varuebeln till facebook id:t. 
    
    var login = document.getElementById("login");
    
    FB.login(function(response) {
      // användaren lyckas logga in
      if (response.session) {
        CalApp.inlogged = true;
        login.textContent = "Logout";
        login.setAttribute("id", "logout")
        $("#add").show();
        $("#start").show();
        $("#start_img").hide();
        //CalApp.ui.printCalendarView(CalApp.eventarray);
        CalApp.showView("calendar", null);
        
        var user = new User(response.session.uid);
        //CalApp.userarray.push(user);
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
      //CalApp.showView("calendar", null);
      window.location.reload();
    });
    
  },

  validate : function(txt, date)
  {
    var correct;
    if(txt == "" || date == "yyyy-mm-dd" || date == "")
    {
        return false;
    }
    else
    {
      return true;
    }

    
  },


  getFromDb : function()
  {
    
    $.ajax({
    url: 'http://janina.couchone.com/calendar/event/?note=hej',
    type: 'put',
    dataType: 'image/jpg',
    success: function(data) {
    console.log(data);
    }
 });
      
   
    /*
    var xhr = new window.XMLHttpRequest();
    
    xhr.open("GET", "http://janina.couchone.com");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        alert(xhr);
        //document.getElementById("calendar").innerHTML = xhr.responseText;
      }
    };
    //xhr.setRequestHeader("Content-type", "application");
    xhr.send();
    */
    
    
    /*
    $.getJSON('http://janina.couchone.com/calendar/_design/event/_view/event', function(data) {

    //data = $.trim(data);
    alert(data);
    //var jsonObj = $.parseJSON(data);
    
    //var jsonObj = $.parseJSON('{"total_rows":2,"offset":0,"rows":[{"id":"event","key":{"_id":"event","_rev":"1-c077d0f6a179f98aeb7833b0be64f8cf","date":"2011-03-13","note":"Mamma fyller \u00e5r"},"value":null},{"id":"event_id","key":{"_id":"event_id","_rev":"4-c2b0c2723b677ccddef0b5147f5ab7ea","date":"2011-03-13","note":"Mamma fyller \u00e5r","eventid":1},"value":null}]}');

    
    }, "json");*/
  }
 
  /*
   * Om jag hinner, vilket jag hoppas.
   * funktioner så som att man kan ha flera calendrar och att man kan tagga sina event.
   */
   
};

window.onload = CalApp.start(); 