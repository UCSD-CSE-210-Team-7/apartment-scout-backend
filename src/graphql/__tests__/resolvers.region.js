const resolvers = require("../region/resolvers");
const dal = require("../../data_access");

describe("Region queries and mutations test", () => {
  dal.region.getUsers = jest.fn();

  it("Get Users by region query: returns all users of the region", async () => {
    // Arrange
    const mockPromise = Promise.resolve([{ email: "abokade@ucsd.edu" }]);
    dal.region.getUsers.mockReturnValueOnce(mockPromise);

    // Act
    const args = { zipcode: 92093 };
    const res = await resolvers.queries.usersByRegion(null, args, null, null);
    //Assert
    expect(res).toEqual(["abokade@ucsd.edu"]);
    expect(dal.region.getUsers).toHaveBeenCalledWith(92093);
  });
});
