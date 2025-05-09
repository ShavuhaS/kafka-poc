export const kafkaConfig = (serviceName: string) => ({
  client: {
    clientId: `${serviceName}-service`,
    brokers: [process.env.KAFKA_URL as string],
  },
  consumer: {
    groupId: `${serviceName}-consumer`,
  },
});