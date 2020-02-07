import clientConfig from "../clientConfig";

const useStripe = () => {
  if (window.stripe) return window.stripe;
  window.stripe = window.Stripe(clientConfig.STRIPE_PUBLIC_KEY);
  return window.stripe;
};

export default useStripe;
