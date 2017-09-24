$(document).ready(function(){
  var valid_cnpj =  {
    onComplete: function(cnpj){
      if (isCNPJ(cnpj)){
        console.log('CNPJ válido.');
      }else {
        console.log('CNPJ inválido.');
      }
    }
  };

  var valid_cpf =  {
    onComplete: function(cpf){
      if (isCPF(cpf)){
        console.log('CPF válido.');
      }else {
        console.log('CPF inválido.');
      }
    },
    reverse: true
  };

  $('.cnpj').mask('00.000.000/0000-00', valid_cnpj).on('blur', function(){
    if ($(this).val().length < 18){
      $(this).val('')
    }
  });

  $('.cpf').mask('000.000.000-00', valid_cpf).on('blur', function(){
    if ($(this).val().length < 14){
      $(this).val('')
    }
  });

  /*****************************
  VALIDA O CNPJ
  *****************************/
  function isCNPJ(cnpj) {
      cnpj = cnpj.replace(/[^\d]+/g, '');

      if (cnpj == '00000000000000' ||
          cnpj == '11111111111111' ||
          cnpj == '22222222222222' ||
          cnpj == '33333333333333' ||
          cnpj == '44444444444444' ||
          cnpj == '55555555555555' ||
          cnpj == '66666666666666' ||
          cnpj == '77777777777777' ||
          cnpj == '88888888888888' ||
          cnpj == '99999999999999')
          return false;

      tamanho = cnpj.length - 2
      numeros = cnpj.substring(0, tamanho);
      digitos = cnpj.substring(tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
              pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0))
          return false;

      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
              pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1))
          return false;

      return true;
  }

  /*****************************
  VALIDA O CPF
  *****************************/
  function isCPF(strCPF) {
      var Soma;
      var Resto;
      var cpf = strCPF.replace(/[^0-9]/g, '').toString();

      Soma = 0;
  	if (cpf == '00000000000' ||
        cpf == '11111111111' ||
        cpf == '22222222222' ||
        cpf == '33333333333' ||
        cpf == '44444444444' ||
        cpf == '55555555555' ||
        cpf == '66666666666' ||
        cpf == '77777777777' ||
        cpf == '88888888888' ||
        cpf == '99999999999'
        ) return false;

  	for (i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
  	Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(cpf.substring(9, 10)) ) return false;

  	Soma = 0;
      for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;
      return true;
  }
});
