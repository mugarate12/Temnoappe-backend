## Temnoappê API
- [Overview](#overview)
- [Requerimentos](#requerimentos)
- [Instalação](#instalação)
- [Executar servidor](#executar-servidor)
- [Testes](#testes)

## Overview

RESTful API para teste técnico no Temnoappê

## Requerimentos

- **[Node.js e NPM](https://www.nodejs.org/)** (suportadas versões: 10.x.x)
- **[MYSQL](https://www.mysql.com/)**
- **[Redis](https://redis.io/)**
- **[PM2](https://pm2.io/docs/plus/overview/)**

## Instalação

### Configuração do Bando de dados

### Env variáveis
1. crie um arquivo `.env` como o arquivo `.env.example`
2. mude essas configurações de acordo com os dados do seu banco de dados

#### Se você pretende rodar a aplicação em modo de homologação
1. Crie um banco com o mesmo nome informado nas respectivas variavéis especificadas dentro do `.env.example` para o banco de dados
2. Todas as outras informações devem estar contidas no `.env` como descritas em `.env.example`

#### Se você pretende rodar a aplicação em modo de produção
1. Crie um banco de dados com o mesmo nome informado no arquivo `.env` dado o exemplo em `.env.example`
2. Todas as outras informações devem estar contidas no .env como descritas em `.env.example`

### Instalar todas as dependências/módulos
```bash
$ npm install 
```

## Executar servidor

Você pode executar todos os comandos manualmente, ou executar um único comando composto

### Manual

#### Desenvolvimento

Por padrão, o servidor de desenvolvimento vai usar o banco com as variaveis listadas no `.env` como descritas em `.env.example` e excluirá todos os dados anteriores, para esse comportamento, execute:
```bash
$ npm run dev
```

Caso queira executar sem excluir as informações já presentes, execute:
```bash
$ npm run dev-without-rollback
```

#### Produção

1. Limpe os logs anteriores
```bash
$ pm2 flush
```

2. Execute a compilação dos arquivos para produção
```bash
$ npm run build
```

3. execute o projeto, ele ficará escutando na porta 3333
```bash
$ npm start
```

### Automático
Caso queria executar todos os processos listados acima com um único comando

#### Desenvolvimento com rollback
Essa rotina vai executar a api em homologação apagando todos os atuais dados no banco local:
```bash
$ npm run development
```

#### Desenvolvimento sem rollback
Para não apagar os atuais dados do banco local:
```bash
$ npm run development-without-rollback
```

#### Produção
```bash
$ npm run production
```

## Logs

Para ver os logs da aplicação, execute:
```bash
$ npm run show-logs
```

#### Parar a execução da API em produção
Para fazer o pm2 para a execução do servidor, execute:
```bash
$ npm run stop-production
```

## Testes

Para rodar os testes, execute:

```bash
$ npm run test
```