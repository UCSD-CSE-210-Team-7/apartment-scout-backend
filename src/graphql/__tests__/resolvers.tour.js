const resolvers = require("../tour/resolvers");
const dal = require("../../data_access");

describe("Tour queries and mutations test", () => {
  dal.tour.getToursByUser = jest.fn();
  dal.tour.createTour = jest.fn();
  dal.tour.updateTour = jest.fn();

  it("Get Tours by User query: returns all tours of the user", async () => {
    // Arrange
    const mockTours = { tour_id: 1, tour_address: "Gilman Drive" };
    const expectedTours = { tour_id: 1, tour_address: "Gilman Drive" };
    dal.tour.getToursByUser.mockReturnValueOnce([mockTours]);

    // Act
    const args = { type: "scout", user: { name: "abokade@ucsd.edu" } };
    const res = await resolvers.queries.tours(null, args, null, null);
    //Assert
    expect(res).toEqual([expectedTours]);
    expect(dal.tour.getToursByUser).toHaveBeenCalledWith(args);
  });

  it("Create Tour mutation", async () => {
    // Arrange
    dal.tour.createTour.mockReturnValueOnce(true);
    const args = {
      tour_address: "Gilman Drive",
      scouted_by: "Ajinkya",
    };
    const context = {
      identity: "Shanay",
    };
    const expectedArgs = {
      tour_address: "Gilman Drive",
      requested_by: "Shanay",
      scouted_by: "Ajinkya",
    };
    // Act
    const res = await resolvers.mutations.createTour(null, args, {
      identity: "Shanay",
    });
    // Assert
    expect(res).toEqual(true);
    expect(dal.tour.createTour).toHaveBeenCalledWith(expectedArgs);
  });

  it("Update Tour mutation", async () => {
    // Arrange
    const args = {
      tour_address: "Gilman Drive",
      requested_by: "Shanay",
      scouted_by: "Ajinkya",
    };
    const expectedArgs = {
      tour_address: "Gilman Drive",
      requested_by: "Shanay",
      scouted_by: "Ajinkya",
    };
    dal.tour.updateTour.mockReturnValueOnce(true);

    // Act
    const res = await resolvers.mutations.updateTour(null, args);
    // Assert
    expect(res).toEqual(true);
    expect(dal.tour.updateTour).toHaveBeenCalledWith(expectedArgs);
  });
});
