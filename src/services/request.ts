import { LSPrefix } from "../appdata.json";
import { createRequestService } from "requestwithrefreshtoken";

const requestService = createRequestService({
  lskey: LSPrefix,
  authheader: "Authorization",
  bearer: true,
});

export const sendRequest: any = requestService.sendRequest;
