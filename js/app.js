$(document).ready(function(){

    //twitter button widget
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
    
//quote creating function
    var quote = function(){
      $.ajax({
        method: "GET",
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
        dataType: "json",
        headers: {
        "X-Mashape-Authorization": "sDqR3afz9omshFut2UI2nrXDzr1Kp1Qu8Gajsnb8XFNqvr8Ftl"
        }
        }).done(function(data){
          console.log(data);
          console.log(data.quote);
          console.log(data.author);
           var quoteText = data.quote;
          var quoteAuthor = data.author;
          //place quote and author in divs and animate text 
          $("#quotePlace").fadeTo("fast", 0.07, function() {
          $("#quotePlace").append('"' + quoteText + '"');
          $("#quotePlace").animate({
            opacity: "1"});
            });
          $("#authorPlace").fadeTo("fast", 0.07, function() {
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
    }
    
    //button for quote
    $("#quote").click(function(event) {
      event.preventDefault();
      $("#quotePlace").empty();
      $("#authorPlace").empty();
      $("#twitter").empty();
        
      quote();
    });

});
    
