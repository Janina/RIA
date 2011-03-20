function Event(date, note, uid) //Konstruktorfunktion
{
  var evID;
  
  this.getDate = function()
  {
    return date;
  }
 
  this.setDate = function(d)
  {
    date = d;
  }
  
  this.getText = function()
  {
    return note;
  }
  
  this.setText = function(n)
  {
    note = n;
  }
  
  this.getId = function()
  {
    return this.evID;
  }
  
  this.getUid = function()
  {
    this.userId = uid;  
  }
  
  this.setId = function()
  {
    this.evID = randomString();
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


