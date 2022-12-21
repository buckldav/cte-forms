exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  console.log(`Received a submission: ${JSON.stringify(body)}`);
  return { statusCode: 200, body };
};
