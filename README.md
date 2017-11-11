# Máscaras - jQuery

[mask](https://igorescobar.github.io/jQuery-Mask-Plugin/docs.html)

[maskMoney](http://plentz.github.io/jquery-maskmoney/)

[Números válidos](https://www.4devs.com.br/gerador_de_cpf)

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
