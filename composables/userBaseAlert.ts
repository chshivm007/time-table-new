export const useBaseAlert = () => {

  const isVisible = useState("alertVisible", () => false);
  const message = useState("alertMessage", () => "");

  const type = useState<"success" |"error">("alertType", () => "success");

  function showSuccess(
    newMessage: string,
  ) {

    message.value = newMessage;
    isVisible.value = true;
  }

  function hideAlert() {
    isVisible.value = false;
  }

  return {
    isVisible,
    message,
    type,
    showSuccess,
    hideAlert
  }
}