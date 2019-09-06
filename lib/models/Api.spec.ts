import Ankonnect from "../../index";
import LoginError from "../errors/LoginError";

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
