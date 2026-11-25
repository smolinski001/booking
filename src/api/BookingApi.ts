import { type APIRequestContext, type APIResponse } from "@playwright/test";

/** Warstwa HTTP. Nie zawiera asercji — wynik weryfikuje test. */
export class BookingApi {
  constructor(
    private readonly request: APIRequestContext,
    private readonly token: string,
  ) {}

  async createBooking(specialistId: string, slotId: string): Promise<APIResponse> {
    return this.request.post("/api/bookings", {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      data: {
        specialistId,
        slotId,
      },
    });
  }
}
