import { sendMessage, setError, setSuccess } from "./sendMessage";

export const createAnyEntity = async (
  data: any,
  service: any,
  message?: string
) => {
  sendMessage("showParange");
  try {
    console.log(message);
    const res = await service.createOne(data);
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
export const updateAnyEntity = async (data: any, service: any) => {
  sendMessage("showParange");
  try {
    const res = await service.updateOne(data);
    setSuccess("Updated successfully");
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
  sendMessage("showParange");
  try {
    const res = await service.deleteOne(id);
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
