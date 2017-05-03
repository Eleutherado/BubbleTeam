$(document).ready(()=>{
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

  //Send username to background.js which will store it, hide welcome, show greet and open
  $("#submit").click((event) =>{
    chrome.runtime.sendMessage({id: "dashboard", username: $("input:first").val()}, function(response) {
      const username = $("input:first").val()

      $("#welcome").hide();
      $(".greeting").text("Welcome, " + $("input:first").val());
      $("#signedUp").show();

      chrome.storage.sync.get("username", (usr)=> console.log(usr.username));
      chrome.tabs.create({url: `https://docs.google.com/forms/d/e/1FAIpQLSf3SJ5DLSyHPJTyIZUDfUkfJKJlzT0T6Hwh_thkDyNlSnkA7Q/viewform?entry.1676722822=${username}`});
    })
  })

  $("#postSurvey").click((event) =>
    chrome.storage.sync.get("username", (usr) => {
    chrome.tabs.create({ url: `https://docs.google.com/forms/d/e/1FAIpQLScnCXqfQq814AKCdHJUkL5zRDs5OIMAbmio_ep3HlVj_CG_7w/viewform?usp=pp_url&entry.1676722822=${usr.username}` });
  }));
});
