import { sendMessage, setError, setSuccess } from "./sendMessage";

export const createAnyEntity = async (
  data: any,
  service: any,
  message?: string
) => {
  sendMessage("showParange");
  try {
    // console.log(message);
    const res = await service.createOne(data);
    if (service.reloadEvents && service.reloadEvents.delete) {
      sendMessage(service.reloadEvents.delete);
    }
    setSuccess(message || "Created successfully");
  } catch (err: any) {
    console.log(err);
    setError(err.message || "an error occurred");
  } finally {
    sendMessage("hideParange");
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 5000);
  }
};
export const updateAnyEntity = async (
  data: any,
  service: any,
  message?: string
) => {
  sendMessage("showParange");
  try {
    const res = await service.updateOne(data);
    if (service.reloadEvents && service.reloadEvents.delete) {
      sendMessage(service.reloadEvents.delete);
    }
    setSuccess(message || "Updated successfully");
  } catch (err: any) {
    console.log(err);
    setError(err.message || "an error occurred");
  } finally {
    sendMessage("hideParange");
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 5000);
  }
};
export const deleteAnyEntity = async (id: string, service: any) => {
  console.log(service);
  sendMessage("showParange");
  try {
    const res = await service.deleteOne(id);
    if (service.reloadEvents && service.reloadEvents.delete) {
      sendMessage(service.reloadEvents.delete);
    }
    setSuccess("Deleted successfully");
  } catch (err: any) {
    console.log(err);
    setError(err.message || "an error occurred");
  } finally {
    sendMessage("hideParange");
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 5000);
  }
};
