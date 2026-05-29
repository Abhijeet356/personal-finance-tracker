import generateToken from "./generateToken.js";

const sendTokenResponse = (res, statusCode, user) => {
  const token = generateToken(user._id);

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      currentBalance: user.currentBalance,
      monthlySalary: user.monthlySalary,
      monthlyBudget: user.monthlyBudget,
      onboardingComplete: user.onboardingComplete,
    },
  });
};

export default sendTokenResponse;
