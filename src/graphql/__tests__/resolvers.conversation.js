const resolvers = require("../conversation/resolvers");
const dal = require("../../data_access");

describe("Conversation queries and mutations test", () => {
  dal.conversation.createConversation = jest.fn();
  dal.conversation.getConversations = jest.fn();
  dal.message.getLastMessage = jest.fn();
  dal.message.getAllMessages = jest.fn();
  dal.user.getUserDetails = jest.fn();

  it("Get Conversations of user query: returns all conversation of users", async () => {
    // Arrange
    const mockConversation = {
      conversation_id: 16,
      person_a: "Ajinkya",
      person_b: "Shanay",
    };
    const expectedConversation = {
      conversation_id: 16,
      person_a: "Ajinkya",
      person_b: "Shanay",
    };
    dal.conversation.getConversations.mockReturnValueOnce([mockConversation]);

    // Act
    const args = { };
    const context = { identity: "abokade@ucsd.edu" }
    const res = await resolvers.queries.conversations(null, args, context);
    //Assert
    expect(res).toEqual([expectedConversation]);
    expect(dal.conversation.getConversations).toHaveBeenCalledWith("abokade@ucsd.edu" );
  });

  it("Create Conversation mutation", async () => {
    // Arrange
    dal.conversation.createConversation.mockReturnValueOnce(true);
    const args = {
      person_a: "Ajinkya",
      person_b: "Shanay",
    };
    const expectedArgs = {
      person_a: "Ajinkya",
      person_b: "Shanay",
    };
    // Act
    const res = await resolvers.mutations.createConversation(null, args);
    //Assert
    expect(res).toEqual(true);
    expect(dal.conversation.createConversation).toHaveBeenCalledWith(
      expectedArgs
    );
  });

  it("Get last message", async () => {
    // Arrange
    dal.message.getLastMessage.mockReturnValueOnce(true);
    const conversation = {
      conversation_id: 123,
    };
    // Act
    const _ = await resolvers.Conversation.last_msg(conversation);
    //Assert
    expect(dal.message.getLastMessage).toHaveBeenCalledWith(123);
  });

  it("Get all messages", async () => {
    // Arrange
    dal.message.getAllMessages.mockReturnValueOnce(true);
    const conversation = {
      conversation_id: 1234,
    };
    // Act
    const _ = await resolvers.Conversation.messages(conversation);
    //Assert
    expect(dal.message.getAllMessages).toHaveBeenCalledWith(1234);
  });

  it("Get sender user details", async () => {
    // Arrange
    dal.user.getUserDetails.mockReturnValueOnce(true);
    const conversation = {
      conversation_id: 1234,
      person_a: "person_a",
      person_b: "person_b",
    };
    // Act
    const _ = await resolvers.Conversation.person_a(conversation);
    //Assert
    expect(dal.user.getUserDetails).toHaveBeenCalledWith("person_a");
  });

  it("Get receiver user details", async () => {
    // Arrange
    dal.user.getUserDetails.mockReturnValueOnce(true);
    const conversation = {
      conversation_id: 1234,
      person_a: "person_a",
      person_b: "person_b",
    };
    // Act
    const _ = await resolvers.Conversation.person_b(conversation);
    //Assert
    expect(dal.user.getUserDetails).toHaveBeenCalledWith("person_b");
  });
});
