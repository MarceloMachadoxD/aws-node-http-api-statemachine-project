const AWS = require("aws-sdk");

const stepFunctions = new AWS.StepFunctions();
const stateMachineArn = process.env.STATE_MACHINE_ARN;

exports.handler = async (event, context) => {
  try {
    const jsonData = JSON.stringify(event); // Converte o evento em JSON

    // Define os parâmetros para iniciar a execução da Step Function
    const params = {
      stateMachineArn: stateMachineArn,
      input: jsonData,
    };

    // Inicia a execução da Step Function
    const response = await stepFunctions.startExecution(params).promise();

    console.log("Step Function execution started:", response.executionArn);

    return {
      statusCode: 200,
      body: "Step Function execution started successfully",
    };
  } catch (error) {
    console.error("Error starting Step Function execution:", error);

    return {
      statusCode: 500,
      body: "Error starting Step Function execution",
    };
  }
};
