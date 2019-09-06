import Ankonnect from "../../index";
import GenericError from "../errors/GenericError";
import GuestError from "../errors/GuestError";

test("createToken should fail", () => {
  const ank = new Ankonnect();
  expect(
    ank.Account.createToken(
      {
        game: 18
      },
      "123"
    )
  ).rejects.toMatchObject(GenericError);
});

test("createGuest should fail", () => {
  const ank = new Ankonnect();
  expect(
    // eslint-disable-next-line @typescript-eslint/camelcase
    ank.Account.createGuest({ game: 18, lang: "fr", captcha_token: "" })
  ).rejects.toMatchObject(GuestError);
});
