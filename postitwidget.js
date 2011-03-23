function Postitwidget(e, divname) //Konstruktorfunktion
{
  this.getTitle = function()
  {
    return e.getDate();
  };
  
  this.getText = function()
  {
    return e.getText();
  };
  
  this.getEventId = function()
  {
    return e.getId();
  };
  
  this.getDivname = function()
  {
    return "postit" + divname;
  };
}

   
/*
* skriver ut postitlappen och dess innehåll med text och knappar.
*/
Postitwidget.prototype.print = function() 
{
  var posDiv = document.createElement("div");
  posDiv.setAttribute("id", this.getDivname());
  posDiv.className = "postit";
  
  var deleteB = document.createElement("a");
  deleteB.setAttribute("href", "#");
  deleteB.setAttribute("id", "delete");
  var imgDel = document.createElement("img");
  imgDel.setAttribute("src", "image/delete_small.png");
  imgDel.setAttribute("id", "delete_img");
  imgDel.setAttribute("name", this.getEventId());
  
  
  var heading = document.createElement("p");
  heading.setAttribute("id", "heading");
  heading.textContent = this.getTitle();
  var note = document.createElement("p");
  note.setAttribute("id", "note");
  note.textContent = this.getText();
  
  var editB = document.createElement("a");
  editB.setAttribute("href", "#");
  editB.setAttribute("id", "edit");
  //editB.textContent = "edit";
  
  /*
  var id = document.createElement("p");
  id.setAttribute("id", this.getEventId());
  */

  var imgEdit = document.createElement("img");
  imgEdit.setAttribute("src", "image/Pencil-icon_small.png");
  imgEdit.setAttribute("id", "edit_img");
  imgEdit.setAttribute("name", this.getEventId());
  
  deleteB.appendChild(imgDel);
  editB.appendChild(imgEdit);
  posDiv.appendChild(deleteB);
  posDiv.appendChild(heading);
  posDiv.appendChild(note);
  //posDiv.appendChild(id);
  posDiv.appendChild(editB);
  
  return posDiv;
};
