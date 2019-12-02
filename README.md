# Máscaras - jQuery

[Demo](https://raw.githack.com/ValterAndrei/mask/master/index.html)


Recebendo parâmetros da maskMoney em Ruby on Rails:

```
params_result[:kit_value] = params_result[:kit_value].gsub('.', '').gsub(',', '.')
```

Convertendo números decimais em dinheiro (R$):

```
//com R$
var f = atual.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}).replace('R$', 'R$ ');

//sem R$
var f2 = atual.toLocaleString('pt-br', {minimumFractionDigits: 2});
```

Removendo máscara:
```
total_value = parseFloat(value.val().replace('.', '').replace(',','.'));
```

# Documentação

[Mask](https://igorescobar.github.io/jQuery-Mask-Plugin/docs.html)

[Mask Money](http://plentz.github.io/jquery-maskmoney/)

[Números válidos](https://www.4devs.com.br/gerador_de_cpf)
