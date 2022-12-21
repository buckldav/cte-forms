exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  console.log(`Received a submission: ${body}`);
  return { statusCode: 200, body };
};
