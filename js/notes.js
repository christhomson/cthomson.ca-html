$(document).ready(function() {
  $.ajax({
    url: 'http://noteface.cthomson.ca/documents.json',
    dataType: 'json',
    success: function(documents) {
      for (doc in documents) {
        var $li = $("li#template").clone();
        $li.attr('id', null);
        $li.find("h3").text(documents[doc].name);
        $li.find(".last-modified").text(new Date(documents[doc].timestamp).toLocaleString());
        $li.find(".sha").text(documents[doc].sha.substr(0, 7));
        $("#documents").append($li);
      }
    }
  })
});