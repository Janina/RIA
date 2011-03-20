function Dialog(text, e) //Konstruktorfunktion
{
  if(e != null)
  {
    this.title = e.getDate();
    this.text = e.getText();  
  }
}

/*
* skapar och skriver ut en vanlig dialogen(meddelande-ruta).
*/
Dialog.prototype.printDialog = function(id)
{
    $("#"+id).dialog();
};

/*
 * skriver ut et dialog med confirm-knappar. 
 */
Dialog.prototype.printConfirm = function(id, name)
{
  $( "#"+id ).dialog({
      resizable: false,
      height:140,
      modal: true,
      buttons: {
        "Delete": function() 
        {
          CalApp.deleteEvent(name);
           $( this ).dialog( "close" );
        },
        Cancel: function() 
        {
          $( this ).dialog( "close" );
        }
      }
    });
};
