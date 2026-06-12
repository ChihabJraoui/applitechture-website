"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendInquiry, type InquiryState } from "./actions";

export function ContactForm() {
  const [state, formAction, pending] = useActionState<InquiryState, FormData>(
    sendInquiry,
    null,
  );

  if (state?.status === "success") {
    return (
      <div className="bg-sand rounded-2xl p-8">
        <h2 className="font-display text-2xl">Thank you — message received.</h2>
        <p className="text-stone mt-2">
          We read every inquiry personally and reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="space-y-2">
        <Label htmlFor="name">Your name</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget">Budget range (optional)</Label>
        <Input
          id="budget"
          name="budget"
          placeholder="e.g. $5k–15k, or 'no idea yet'"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">What are you trying to build or fix?</Label>
        <Textarea id="message" name="message" rows={5} required />
      </div>
      {state?.status === "error" ? (
        <p className="text-terracotta text-sm">{state.message}</p>
      ) : null}
      <Button
        type="submit"
        disabled={pending}
        className="bg-terracotta hover:bg-terracotta-dark rounded-full px-8"
      >
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
