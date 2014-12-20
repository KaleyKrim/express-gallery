$(function() {

  $.get('', function() {
    // get shit
  });

  $.post('', function() {
    // post shit
  });
  // PUT
  $.ajax('',
    {
      type: 'PUT',
      success: function (data) {
        console.log('data', data);
      }
    }
  );

  // http DELETE
  $.ajax('', 
    {
      type: 'DELETE',
      success: function (data) {
        thingtoremove.remove();
        console.log('data',data);
      }
    }
  );

});