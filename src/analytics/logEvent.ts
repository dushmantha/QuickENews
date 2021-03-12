import analytics from '@react-native-firebase/analytics';

const appOpen = async () => {
  await analytics().logAppOpen();
};

const navigateLogin = async (from: string) => {
  await analytics().logEvent('login', {
    from: from,
  });
};

const navigateJoin = async (from: string) => {
  await analytics().logEvent('join', {
    from: from,
  });
};

const tapBreakingNews = async (title: string) => {
  await analytics().logEvent('tapBreakingNews', {
    title: title,
  });
};

const tapNews = async (title: string, category: string) => {
  await analytics().logEvent('tapNews', {
    title: title,
    category: category,
  });
};

const login = async (method: string) => {
  await analytics().logLogin({
    method: method, //ex: 'email',
  });
};

const signUp = async (method: string) => {
  await analytics().logSignUp({
    method: method, //ex: 'email',
  });
};

export {
  navigateLogin,
  navigateJoin,
  login,
  signUp,
  appOpen,
  tapBreakingNews,
  tapNews,
};
