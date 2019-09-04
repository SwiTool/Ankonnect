import Ankonnect from "../../index";

test("should fail with FAILED reason", async () => {
  const ank = new Ankonnect();
  expect(
    await ank.Api.createApiKey({
      login: "test",
      password: "test",
      // eslint-disable-next-line @typescript-eslint/camelcase
      long_life_token: false
    })
  ).toThrow();
});

test("should fail", async () => {
  const ank = new Ankonnect();
  expect(
    await ank.Api.createToken(
      {
        game: 18
      },
      "123"
    )
  ).toThrow();
});
