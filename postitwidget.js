function Postitwidget(e, divname) //Konstruktorfunktion
{
  this.title = e.getDate();
  this.text = e.getText();
  this.eventid = e.getId();
  this.divname = "postit" + divname;
}

   
/*
* skriver ut postitlappen och dess innehåll med text och knappar.
*/
Postitwidget.prototype.print = function() 
{
	
  var posDiv = document.createElement("div");
  posDiv.setAttribute("id", this.divname);
  
  var deleteB = document.createElement("a");
  deleteB.setAttribute("href", "#");
  deleteB.setAttribute("id", "delete");
  deleteB.setAttribute("name", this.eventid);
  deleteB.textContent = "x";
  
  var heading = document.createElement("p");
  heading.textContent = this.title;
  heading.setAttribute("id", "title");
  var note = document.createElement("p");
  note.setAttribute("id", "note");
  note.textContent = this.text;
  
  var editB = document.createElement("a");
  editB.setAttribute("href", "#");
  editB.setAttribute("id", "edit");
  editB.textContent = "edit";
  
  posDiv.appendChild(deleteB);
  posDiv.appendChild(heading);
  posDiv.appendChild(note);
  posDiv.appendChild(editB);
  
  return posDiv;
};
