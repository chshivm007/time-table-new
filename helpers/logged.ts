/**
 * A composable that returns a reactive state for loading.
 *
 * This composable is used to show or hide the loading indicator.
 *
 * @returns A reactive state for loading.
 */
export const useLoggedIn = () => useState<boolean>("loggedIn", () => false);

/**
 * Shows the loading indicator.
 */
export const logIn = () => {
  useLoggedIn().value = true;
};

/**
 * Hides the loading indicator.
 */
export const logOut = () => {
  useLoggedIn().value = false;
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