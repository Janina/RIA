var CalApp = {
  
  eventarray : [],
  userarray : [],
  ui : new Ui(),
  inlogged: false,
  
  
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
   * funktion som beroende på val väljer vad som ska utföras
   */
  makeSelection : function(opts)
  {
  	//alert(opts);
  	
  	switch(opts.id)
  	{
  	  case "start":
  	  CalApp.showView("calendar", null, null);
  	  CalApp.getFromDb();
  	  //window.location.reload();
  	  break;
  	  
  		case "add":
  		CalApp.showView("form", null, null);
  		break;
  		
  		case "login":
  		CalApp.inlogged = true;
  		$('#add').show();
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
  		obj = $('#edit').parent()[0].id;
  		var child = $('#'+obj).find("p");
  		var date = child[0].textContent;
  		var note = child[1].textContent;
  		alert(note);
  		CalApp.showView("form", date, note);
  		break;
  		
  		case "delete":
  		CalApp.ui.printConfirmBox(opts)
  		break;
  		
  		case "save":
  		var d = document.getElementById("addDate").value;
  		var txt = document.getElementById("addText").value;
  		var newEvent = new Event(d, txt);
  		CalApp.addEvent(newEvent);
      var div = document.getElementById("form");
      var message = "Your Event has been saved.";
      var title = "Saved!";
      CalApp.ui.printMessageBox(div, message, title);
  		break;
  	}
  	
  },
  
  addEvent : function(e)
  {
    CalApp.eventarray.push(e);
  },
  
  deleteEvent : function(evid)
  {
    var div = document.getElementById("calendar");
    var events = document.getElementById("events");

    for(var i = 0; i < CalApp.eventarray.length; i++)
    {
      
      if(CalApp.eventarray[i].id == evid)
      {
        CalApp.eventarray.splice(i,1);
        $("#delete").parent().remove();
      }
    }
    alert(CalApp.eventarray.length);
  },
  
  /*
   * funktion för att välja vy och i sin tur även rita ut den, Anropar alltså printCalendarView eller PrintFormView beroende på val.
   * sätter den andra vyn till display:none. 
   * tar emot en array met event som kalendervyn ska visas.
   */
  showView : function(view, date, note)
  {
     var ev = new Event("2011-02-26", "fika", "674288357");
     var ev2 = new Event("2011-03-01", "Träna", "674288357");
     var ev3 =new Event("2011-03-03", "plugga javascript och jquery!", "674288357");
     var ev4 = new Event("2011-03-07", "optikern", "674288357");
     CalApp.eventarray.push(ev);  
     CalApp.eventarray.push(ev2);
     CalApp.eventarray.push(ev3);
     CalApp.eventarray.push(ev4);
     
  	var form = document.getElementById("form");
  	var calendar = document.getElementById("calendar");
    switch(view)
    {
      case "calendar":
	  	form.style.display = "none";
        calendar.style.display = "block";
        CalApp.ui.printCalendarView(CalApp.eventarray);
        break;
     
      case "form":
        calendar.style.display = "none";
        form.style.display = "block";
        if(date != null && note != null)
        {
          CalApp.ui.printFormView(date, note);
        }
        else
        {
          CalApp.ui.printFormView(null, null);
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
        login.textContent = "Logout";
        login.setAttribute("id", "logout")
        $('#add').show();
        CalApp.showView("calendar");
        
        var user = new User(response.session.uid);
        CalApp.userarray.push(user);

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
      logout.textContent = "Login";
      logout.setAttribute("id", "login");
      CalApp.showView("calendar");
    });
    
  },
  
  getFromDb : function()
  {
    alert("här");
    
    $.get("http://janina.couchone.com/", function(data, textStatus){
           
           alert(textStatus + data);
        }
    );
      
   
    /*
    var xhr = new window.XMLHttpRequest();
    
    xhr.open("GET", "http://janina.couchone.com");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        alert(xhr);
        //document.getElementById("calendar").innerHTML = xhr.responseText;
      }
    };
    //xhr.setRequestHeader("Content-type", "text/html");
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

window.onload = CalApp.showView("calendar"); 