

// function showAlert(
//   title: string,
//   message: string,
//   onConfirm?: Function | null,
//   onCancel?: Function | null,
//   showCancel = false,
// ) {
//   const alert = getAlertElement();
//   alert.classList.add(FLEX_CLASS);
//   alert.classList.remove(HIDDEN_OPACITY);
//   alert.classList.add(VISIBLE_OPACITY);
//   alert.classList.add(DIALOG_LAYER_Z_INDEX);
//   alert.classList.remove(HIDDEN_LAYER_Z_INDEX);

//   safeQuerySelector(
//     alert,
//     "#alert_title",
//     "Alert Title not found",
//   ).textContent = title;
//   safeQuerySelector(
//     alert,
//     "#alert_message",
//     "Alert Message not found",
//   ).textContent = message;

//   const alertInfoActions = safeQuerySelector(
//     alert,
//     "#alert-info-actions",
//     "info alert actions not found",
//   );
//   const alertConfirmActions = safeQuerySelector(
//     alert,
//     "#alert-confirm-actions",
//     "confirm alert actions not found",
//   );

//   if (showCancel) {
//     alertConfirmActions.classList.remove("hidden");
//     alertConfirmActions.classList.add(FLEX_CLASS);

//     alertInfoActions.classList.remove(FLEX_CLASS);
//     alertInfoActions.classList.add(HIDDEN_CLASS);
//   } else {
//     alertInfoActions.classList.remove(HIDDEN_CLASS);
//     alertInfoActions.classList.add(FLEX_CLASS);

//     alertConfirmActions.classList.remove(FLEX_CLASS);
//     alertConfirmActions.classList.add(HIDDEN_CLASS);
//   }

//   alertHandlers.onConfirm = onConfirm || alertHandlers.dummyOnConfirm;
//   alertHandlers.onCancel = onCancel || alertHandlers.dummyOnCancel;
// }




export const useAlert = () => {

  const isVisible = ref(false);
  const message = ref("");
  const type = ref<"info" | "confirm">("info");

  const _onConfirm = ref<null | Function>(null);
  const _onCancel = ref<null | Function>(null);

  function showInfoAlert(
    title: string,
    newMessage: string,
    onConfirm?: Function | null,
  ) {

    message.value = newMessage;
    type.value = "info";
    isVisible.value = true;
    _onConfirm.value = onConfirm;
  }

  function showConfirmAlert(
    title: string,
    newMessage: string,
    onConfirm?: Function | null,
    onCancel?: Function | null,
  ) {
    message.value = newMessage;
    type.value = "info";
    isVisible.value = true;
  }

  function hideAlert() {
    isVisible.value = false;
  }

  return {
    isVisible,
    message,
    type,
    showInfoAlert,
    showConfirmAlert,
  }
}