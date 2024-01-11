import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/page/:page_number", () => {
    return HttpResponse.json({
      url: "https://placehold.jp/700x500.png",
    });
  }),
];
