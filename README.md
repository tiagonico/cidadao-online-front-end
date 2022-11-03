# Front End da aplicação Cidadão Online

Front-end da aplicação Cidadão Online, desenvolvido para o projeto de graduação do curso de Engenharia de Computação na UFES.

## 🛠️ Instalação

1️⃣ Primeiramente faça o download do projeto, seja baixando o arquivo .zip pelo navegador ou através do comando git clone.

2️⃣ Instale o NodeJS em sua máquina, caso não tenha instalado. <a href="https://nodejs.org/en/">Site Oficial do Node</a>.

3️⃣ Crie a pasta "src\environments" e adicione os seguintes arquivos:

* src\environments\environment.prod.ts
* src\environments\environment.ts

Contendo o código abaixo com a chave da API do google (<a href="https://maplink.global/blog/como-obter-chave-api-google-maps/">Tutorial de como conseguir a chave</a>).

```
export const environment = {
    googleAPIKey: '',
    production: true
};
```

4️⃣ Rode esse comando abaixo no terminal para instalar os pacotes:

```
npm install
```

5️⃣ Inicie a aplicação:

```
ng serve
```

⚠️ <b>ATENÇÃO:</b>

Para as funcionalidades da aplicação funcionarem é necessário rodar o <a href="https://github.com/tiagonico/cidadao-online-back-end">Back-End</a> da aplicação.
