const AWS = require('aws-sdk');
const axios = require('axios');

// Configuração do AWS SDK
AWS.config.update({ region: 'us-west-2' });

// Instanciar o cliente Step Functions
const stepfunctions = new AWS.StepFunctions();

// Função para iniciar o fluxo de trabalho do AWS Step Functions
async function iniciarFluxoDeTrabalho() {
  const params = {
    stateMachineArn: 'arn:aws:states:us-west-2:123456789012:stateMachine:SeuFluxoDeTrabalho',
    input: JSON.stringify({ pedidoId: '12345' })
  };

  try {
    const result = await stepfunctions.startExecution(params).promise();
    console.log("Execução iniciada:", result);
  } catch (error) {
    console.error("Erro ao iniciar a execução:", error);
  }
}

// Função para gerar uma resposta personalizada usando Amazon Bedrock
async function gerarRespostaPersonalizada(prompt) {
  const url = 'https://bedrock.amazonaws.com'; // Substitua pelo URL da API Bedrock
  const data = {
    prompt: prompt,
    max_tokens: 100
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer SEU_TOKEN_DE_ACESSO` // Substitua pelo seu token de acesso
      }
    });
    console.log("Resposta do Bedrock:", response.data);
  } catch (error) {
    console.error("Erro ao chamar o Bedrock:", error);
  }
}

// Iniciar o fluxo de trabalho
iniciarFluxoDeTrabalho();

// Gerar uma resposta personalizada
gerarRespostaPersonalizada("Qual é o status do meu pedido?");
