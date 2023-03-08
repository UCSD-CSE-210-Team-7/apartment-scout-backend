const resolvers = require("../user/resolvers");
const dal = require("../../data_access");

describe("User queries and mutations test", () => {
  dal.user.getUserDetails = jest.fn();
  dal.user.getAllUsers = jest.fn();
  dal.user.createUser = jest.fn();
  dal.user.updateUser = jest.fn();

  it("Get All Users query: returns empty array if no response", async () => {
    // Arrange
    dal.user.getAllUsers.mockReturnValueOnce([]);

    // Act
    const res = await resolvers.queries.users(null, null, null, null);
    //Assert
    expect(res).toEqual([]);
  });

  it("Get All users query: returns all users", async () => {
    // Arrange
    const mockUser1 = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
    };
    const expectedUser1 = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
    };
    const mockUser2 = { id: 2, name: "Ajinkya", email: "ajinkya@example.com" };
    const expectedUser2 = {
      id: 2,
      name: "Ajinkya",
      email: "ajinkya@example.com",
    };
    dal.user.getAllUsers.mockReturnValueOnce([mockUser1, mockUser2]);

    // Act
    const res = await resolvers.queries.users(null, null, null, null);
    // Assert
    expect(res).toEqual([expectedUser1, expectedUser2]);
  });

  it("Get user Details query: returns user details", async () => {
    // Arrange
    const mockUserDetails = {
      id: 2,
      name: "Ajinkya",
      email: "ajinkya@example.com",
    };
    const expectedUserDetails = {
      id: 2,
      name: "Ajinkya",
      email: "ajinkya@example.com",
    };
    dal.user.getUserDetails.mockReturnValueOnce(mockUserDetails);

    // Act
    const args = { email: "ajinkya@example.com" };
    const res = await resolvers.queries.userDetails(null, args, null, null);
    // Assert
    expect(res).toEqual(expectedUserDetails);
    expect(dal.user.getUserDetails).toHaveBeenCalledWith("ajinkya@example.com");
  });

  it("Create User mutation", async () => {
    // Arrange
    dal.user.createUser.mockReturnValueOnce(true);

    // Act
    const args = { name: "Ajinkya" };
    const res = await resolvers.mutations.createUser(null, args, {identity: 'abokade@ucsd.edu'});
    // Assert
    expect(res).toEqual(true);
    expect(dal.user.createUser).toHaveBeenCalledWith({ email: 'abokade@ucsd.edu', name: "Ajinkya" });
  });

  it("Update User mutation", async () => {
    // Arrange
    const mockUser = {
      id: 2,
      name: "Ajinkya",
      email: "ajinkya@example.com",
    };
    dal.user.updateUser.mockReturnValueOnce(true);

    // Act
    const args = { user: mockUser };
    const res = await resolvers.mutations.updateUser(null, args);
    // Assert
    expect(res).toEqual(true);
    expect(dal.user.updateUser).toHaveBeenCalledWith({ user: mockUser });
  });
});
