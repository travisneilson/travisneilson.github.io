$(function() {
  
  noClicky();
  
});


function noClicky() {
  $('.poem-target').click(function() {
    return false;
  });
}