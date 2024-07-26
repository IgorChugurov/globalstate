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
    // this reload event from initdata for this service and was set while servoce was created in the service package
    if (service.reloadEvents && service.reloadEvents.create) {
      sendMessage(service.reloadEvents.create);
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
    if (service.reloadEvents && service.reloadEvents.update) {
      sendMessage(service.reloadEvents.update);
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
export const deleteAnyEntity = async (
  id: string,
  service: any,
  message?: string
) => {
  sendMessage("showParange");
  try {
    const res = await service.deleteOne(id);
    if (service.reloadEvents && service.reloadEvents.delete) {
      sendMessage(service.reloadEvents.delete);
    }
    setSuccess(message || "Deleted successfully");
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
