/**
 * A composable that returns a reactive state for loading.
 *
 * This composable is used to show or hide the loading indicator.
 *
 * @returns A reactive state for loading.
 */
export const useLoadingState = () => useState<boolean>("loading", () => false);

/**
 * Shows the loading indicator.
 */
export const showLoader = () => {
  useLoadingState().value = true;
};

/**
 * Hides the loading indicator.
 */
export const hideLoader = () => {
  useLoadingState().value = false;
};

/**
 * We could instead had directly used the `useLoadingState`
 * composable to hide and close the loader, like
 *
 * @example
 * useLoadingState().value = true; // show the loader
 * useLoadingState().value = false; // hide the loader
 *
 * the functions are just there to produce a traditional approach
 *
 */