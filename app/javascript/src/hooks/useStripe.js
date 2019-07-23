const useStripe = () => {
  if (window.stripe) return window.stripe;
  window.stripe = window.Stripe(process.env.STRIPE_PUBLIC_KEY);
  return window.stripe;
};

export default useStripe;
