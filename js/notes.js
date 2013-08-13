$(document).ready(function() {
  $.ajax({
    url: 'http://noteface.cthomson.ca/documents.json',
    dataType: 'json',
    success: function(documents) {
      for (doc_name in documents) {
        if (documents.hasOwnProperty(doc_name)) {
          var $li = $('li#template').clone().attr('id', null);
          $li.find('h2').text("CS 241");
          $li.find('h3').text('Foundations of Sequential Programs');
          $li.find('.time').text(new Date(documents[doc_name].timestamp).toLocaleString());

          $('#documents').append($li);
        }
      }
    }
  })
});