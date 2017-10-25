# Máscaras - jQuery

[Documentação - mask](https://igorescobar.github.io/jQuery-Mask-Plugin/docs.html)

[Documentação - maskMoney](http://plentz.github.io/jquery-maskmoney/)

[Demo](https://htmlpreview.github.io/?https://github.com/ValterAndrei/mask/blob/master/index.html)


Recebendo parâmetros da maskMoney em Ruby on Rails:

```
params_result[:value] = params_result[:value].gsub(/\./, '').gsub(/,/, '.').to_f
```

Convertendo números decimais em dinheiro (R$):

```
//com R$
var f = atual.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}).replace('R$', 'R$ ');

//sem R$
var f2 = atual.toLocaleString('pt-br', {minimumFractionDigits: 2});
```
