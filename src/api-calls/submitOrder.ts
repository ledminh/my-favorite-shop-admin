import { OrderToSubmit, SubmitOrderResponse, WithID } from "@/types";
import getStripe from "@/utils/getStripeJS";

export default async function submitOrder(order: OrderToSubmit) {
  const { data, errorMessage } = (await fetch("/api/orders?action=submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  }).then((res) => res.json())) as SubmitOrderResponse;

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  const orderToSubmit = data as WithID<OrderToSubmit>;

  const stripe = await getStripe();

  const res = await stripe!.redirectToCheckout({ sessionId: orderToSubmit.id });

  if (res.error) {
    throw new Error(res.error?.message);
  }
}
