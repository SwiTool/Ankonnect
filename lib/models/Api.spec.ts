import Ankonnect from "../../index";
import LoginError from "../errors/LoginError";
import GenericError from "../errors/GenericError";

test("should fail with FAILED reason", () => {
  const ank = new Ankonnect();
  expect(
    ank.Api.createApiKey({
      login: "test",
      password: "test",
      // eslint-disable-next-line @typescript-eslint/camelcase
      long_life_token: false
    })
  ).rejects.toMatchObject(LoginError);
});

test("should fail", () => {
  const ank = new Ankonnect();
  expect(
    ank.Api.createToken(
      {
        game: 18
      },
      "123"
    )
  ).rejects.toMatchObject(GenericError);
});
