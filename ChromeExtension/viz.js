
$(document).ready(()=>{
  $("#signedUp").hide();
  //enable submit button if username field is not empty
  $("input:first").change(() =>{
    console.log( $("input:first").val() )
    if($("input:first").val() != "") $("#submit").removeClass("disabled");
  }
  );
  $("#submit").click((event) =>{
    chrome.runtime.sendMessage({id: "dashboard", username: $("input:first").val()}, function(response) {
      console.log(response.farewell);
      $("#welcome").hide();
      $("#greeting").text("Hello" + $("input:first").val());
      $("#signedUp").show();
    })
    //if username was entered and button was pressed hide welcome div and show Viz.

  })
});
