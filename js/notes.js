$(document).ready(function() {

  // Returns a string in the format "September 12, 2013 at 10:57 PM".
  // It's ridiculous that in JS you have to format dates like this.
  var formattedDateString = function(date) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    var hour = date.getHours();
    var timeOfDay = "AM";
    var str = "";

    if (hour > 12) {
      hour -= 12;
      timeOfDay = "PM";
    } else if (hour == 12) {
      timeOfDay = "PM";
    }

    str += monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    str += " at " + hour + ":" + date.getMinutes() + " " + timeOfDay;

    return str;
  };

  $.ajax({
    url: 'http://noteface.cthomson.ca/documents.json',
    dataType: 'json',
    success: function(documents) {
      $("#loading").hide();
      for (doc_name in documents) {
        if (documents.hasOwnProperty(doc_name)) {
          var $tpl = $('li#template').clone().attr('id', null);
          var date = new Date(documents[doc_name].timestamp);
          $tpl.find('h2').text(documents[doc_name].course.code);
          $tpl.find('h3').text(documents[doc_name].course.name);
          $tpl.find('.time').text(formattedDateString(date));
          $tpl.find('a').attr('href', 'http://noteface.cthomson.ca/dl/latest/' + doc_name + '.pdf');

          if ($("#" + doc_name)) {
            $("#" + doc_name).append($tpl.children())
          } else {
            $tpl.attr('id', doc_name);
          }

          $("#" + doc_name).addClass("populated");
        }
      }

      if (document.location.hash) {
        $(document.location.hash).addClass('animate');
      }
    }
  })
});