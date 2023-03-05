const resolvers = require("../conversation/resolvers");
const dal = require("../../data_access");

describe("Conversation queries and mutations test", () => {
  dal.conversation.createConversation = jest.fn();
  dal.conversation.getConversations = jest.fn();

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
    const args = { user: { email: "abokade@ucsd.edu", id: 1 } };
    const res = await resolvers.queries.conversations(null, args);
    //Assert
    expect(res).toEqual([expectedConversation]);
    expect(dal.conversation.getConversations).toHaveBeenCalledWith({
      email: "abokade@ucsd.edu",
      id: 1,
    });
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
});
