# Auth App

Este projeto contem todas as telas necessarias para autenticação incluindo:

- Tela de login
- Tela de Cadastro
- Tela de verificação de código de 6 digitos.

O fluxo consiste em uma comunicação com a api de autenticação que por sua vez obrigado a verificação de um codigo tanto no cadastro quanto login tornando assim o acesso mais seguro.

Também conta com um componente de senha adaptivo que permite fazer a verificação de caracteres caso assim desejar. Para isto basta passar a prop "type" com login (para ausencia de verificação) e signup (para forçar regras para a senha).
