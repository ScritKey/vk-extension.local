export const getNameWithPrefix = (name: string) => {
  switch (name) {
    case "VKWebAppOpenContacts":
      return ['VKWebAppOpenContactsDone', 'VKWebAppOpenContactsFailed'];
    case "VKWebAppGetAuthToken":
      return ['VKWebAppGetAuthTokenReceived', 'VKWebAppGetAuthTokenFailed'];
    default:
      return [`${name}Result`, `${name}Failed`];
  }
}