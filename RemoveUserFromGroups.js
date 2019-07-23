//User that will be removed from every group
var user_email = "michael@tippett.com";


clientContext = SP.ClientContext.get_current();
var web = clientContext.get_web()
var siteGroups = web.get_siteGroups();
var user = web.get_siteUsers().getByEmail(user_email);
clientContext.load(user);

//Title only included so it can be outputed to console 
clientContext.load(siteGroups, 'Include(Users, Title)');
clientContext.executeQueryAsync(() => {
  var siteGroupEnumerator = siteGroups.getEnumerator();
  while (siteGroupEnumerator.moveNext()){
	  var current = siteGroupEnumerator.get_current();
    try{
      var userEnumerator = current.get_users().getEnumerator();
      let actioned = false;
      while (userEnumerator.moveNext() && !actioned){
        var currentUser = userEnumerator.get_current();
        if (currentUser.get_email() === user_email){
        current.get_users().removeById(user.get_id());
        clientContext.load(current.get_users());
        actioned = true;
      }
    }
  }
  catch(ex){
    console.log("error", ex);
  }
} }, (err,msg) => console.log("error", msg))
