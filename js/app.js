//twitter button code
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));

//code to begin on click of quote button
$("#quote").click(function(event) {
  event.preventDefault();
  $("#quotePlace").empty();
  $("#authorPlace").empty();
  $("#twitter").empty();
  //get quote from api
  $.get("https://crossorigin.me/http://www.stands4.com/services/v2/quotes.php?uid=4919&tokenid=BiOk346Hd2rGDdL7&searchtype=RANDOM")
    .done(function(data) {
      //seperate quote and author strings
      var quoteText = data.getElementsByTagName("quote")[0].childNodes[0].nodeValue;
      var quoteAuthor = data.getElementsByTagName("author")[0].childNodes[0].nodeValue;
      //place quote and author in divs and animate text 
      $("#quotePlace").delay(200).fadeTo("fast", 0.07, function() {
        $("#quotePlace").append('"' + quoteText + '"');
        $("#quotePlace").animate({
          opacity: 1
        });
      });

      $("#authorPlace").delay(100).fadeTo("fast", 0.07, function() {
        $("#authorPlace").append(" -" + quoteAuthor);
        $("#authorPlace").animate({
          opacity: 1
        });
      });
      //put together variable for twitter button
      var totalTweet = '"' + quoteText + '" -' + quoteAuthor;

      $('#twitter').delay(200).fadeIn("fast", 0.07, function() {
        $('#twitter').append('<a></a>');
        $('#twitter a').attr('id', 'twitterButton');
        $("#twitterButton").attr('href', 'https://twitter.com/share');
        $("#twitterButton").attr('class', 'twitter-share-button');
        $("#twitterButton").attr('data-text', totalTweet);
        $("#twitterButton").attr('data-size', 'large');
        $("#this").animate({
          opacity: 1
        });
        twttr.widgets.load();

      });
    })
    .fail(function() {
      $("#quotePlace").html("OH NO! Something has gone wrong! Please try again!");
    });

});
