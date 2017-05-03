

$(document).ready(()=>{
  chrome.storage.sync.get("username", (usr)=> console.log(usr.username));
  chrome.storage.sync.get("username", (usr)=> {
      if(usr.username){
      $("#welcome").hide();
      $("#signedUp").show();
    } else $("#signedUp").hide();
  })

  //enable submit button if username field is not empty
  $("input:first").change(() =>{
    console.log( $("input:first").val() )
    if($("input:first").val() != "") $("#submit").removeClass("disabled");
  });

  //Send username to background.js which will store it
  $("#submit").click((event) =>{
    chrome.runtime.sendMessage({id: "dashboard", username: $("input:first").val()}, function(response) {
      console.log(response.farewell);
      const username = $("input:first").val();
      //if username was entered and button was pressed hide welcome div and show Viz
      //store username in localstorage
      $("#welcome").hide();
      $(".greeting").text("Welcome back, " + $("input:first").val());
      $("#signedUp").show();
      chrome.storage.sync.get("username", (usr)=> console.log(usr.username));
      chrome.tabs.create({url: `https://docs.google.com/forms/d/e/1FAIpQLSf3SJ5DLSyHPJTyIZUDfUkfJKJlzT0T6Hwh_thkDyNlSnkA7Q/viewform?entry.1676722822=${username}`});
    })

  })
});
