$(document).ready(function() {
  moment.lang('en', {
    calendar: {
      lastDay: '[Yesterday at] LT',
      sameDay: '[Today at] LT',
      nextDay: '[Tomorrow at] LT',
      lastWeek: '[Last] dddd [at] LT',
      nextWeek: 'dddd [at] LT',
      sameElse: 'L [at ] LT'
    }
  })

  $.ajax({
    url: 'https://notes.cthomson.ca/documents.json',
    dataType: 'json',
    success: function(documents) {
      $("#loading").hide();
      for (doc_name in documents) {
        if (documents.hasOwnProperty(doc_name)) {
          var $tpl = $('li#template').clone().attr('id', null);
          var date = new Date(documents[doc_name].timestamp);
          $tpl.find('h2').text(documents[doc_name].course.code);

          if (documents[doc_name].course.term !== undefined) {
            $tpl.find('h2').append(" (" + documents[doc_name].course.term + ")");
          }

          $tpl.find('h3').text(documents[doc_name].course.name);
          $tpl.find('.time').text(moment(date).calendar());
          $tpl.find('a').attr('href', 'http://notes.cthomson.ca/dl/latest/' + doc_name + '.pdf');

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
