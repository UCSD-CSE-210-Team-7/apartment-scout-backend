const resolvers = require("../message/resolvers");
const dal = require("../../data_access");

describe("Region queries, mutations and subscriptions test", () => {
  dal.message.getAllMessages = jest.fn();
  dal.message.createMessage = jest.fn();
  const mockPubsub = {
    publish: jest.fn(),
  };

  it("Get all messages query: returns all messages of the user", async () => {
    // Arrange
    const mockMessage = { msg_id: 13, text: "Hello" };
    const expectedMessage = { msg_id: 13, text: "Hello" };
    dal.message.getAllMessages.mockReturnValueOnce([mockMessage]);

    // Act
    const args = { conversation_id: 23 };
    const res = await resolvers.queries.messages(null, args, null, null);
    //Assert
    expect(res).toEqual([expectedMessage]);
    expect(dal.message.getAllMessages).toHaveBeenCalledWith(23);
  });

  it("Create message mutation", async () => {
    // Arrange
    const expectedMessage = {
      msg_text: "Hello there",
      sender: "Ajinkya",
      conversation: 12,
    };
    const context = {
      identity: "Ajinkya",
    }
    const args = {
      msg_text: "Hello there",
      conversation: 12,
    };
    dal.message.createMessage.mockReturnValueOnce(expectedMessage);

    // Act
    const res = await resolvers.mutations.createMessage(null, args, context);
    //Assert
    expect(res).toEqual(expectedMessage);
    expect(dal.message.createMessage).toHaveBeenCalledWith(expectedMessage);
  });
});
