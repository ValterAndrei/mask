$(document).ready(function(){
  var valid_cnpj =  {
    onComplete: function(cnpj){
      console.log('CNPJ Válido! ', cnpj);
    }
  };

  $('.cnpj').mask('00.000.000/0000-00', valid_cnpj).on('blur', function(){
    if ($(this).val().length < 18){
      $(this).val('').focus();
      console.log('CNPJ Inválido');
    }
  });
});
