const checkSubscription = (userSubscriptions, categoryId) => {
  for (let i = 0; i < userSubscriptions.length; i++) {
    if (userSubscriptions[i].id === categoryId) return true;
  }

  return false;
};

export default checkSubscription;
