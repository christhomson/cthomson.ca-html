$(document).ready(function() {
  $.ajax({
    url: 'http://noteface.cthomson.ca/documents.json',
    dataType: 'json',
    success: function(documents) {
      for (doc_name in documents) {
        if (documents.hasOwnProperty(doc_name)) {
          var $li = $('li#template').clone().attr('id', null);
          $li.find('h2').text(documents[doc_name].course.code);
          $li.find('h3').text(documents[doc_name].course.name);
          $li.find('.time').text(new Date(documents[doc_name].timestamp).toLocaleString());
          $li.find('a').attr('href', 'http://noteface.cthomson.ca/dl/latest/' + doc_name + '.pdf');

          $('#documents').append($li);
        }
      }
    }
  })
});