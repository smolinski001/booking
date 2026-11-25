import { test, expect } from "../../src/fixtures/base";

test.describe("API — rezerwacje", () => {
  test("API-BOOK-01 — można utworzyć rezerwację dla dostępnego terminu", async ({ bookingApi }) => {
    const specialistId = process.env.API_SPECIALIST_ID;
    const slotId = process.env.API_SLOT_ID;
    const token = process.env.API_TOKEN;

    test.skip(
      !token || !specialistId || !slotId,
      "Test opcjonalny: uzupełnij API_TOKEN, API_SPECIALIST_ID i API_SLOT_ID w .env.",
    );

    const response = await bookingApi.createBooking(specialistId!, slotId!);

    expect(response.status()).toBe(201);

    const booking: unknown = await response.json();
    expect(booking).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        specialistId,
        slotId,
      }),
    );
  });
});
