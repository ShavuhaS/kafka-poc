export const kafkaConfig = (serviceName: string) => ({
  client: {
    clientId: serviceName,
    brokers: [process.env.KAFKA_URL ?? 'localhost:9092'],
  },
  consumer: {
    groupId: 'transcoding',
  },
});