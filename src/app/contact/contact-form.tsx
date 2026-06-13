"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendInquiry, type InquiryState } from "./actions";

export function ContactForm() {
  // errorKey increments on each error submission so the form remounts with
  // fresh defaultValues (React 19 resets uncontrolled inputs after action).
  const [errorKey, setErrorKey] = useState(0);
  const [state, formAction, pending] = useActionState<InquiryState, FormData>(
    async (prev, formData) => {
      const result = await sendInquiry(prev, formData);
      if (result?.status === "error") {
        setErrorKey((k) => k + 1);
      }
      return result;
    },
    null,
  );

  if (state?.status === "success") {
    return (
      <div className="bg-char rounded-2xl p-8">
        <h2 className="font-display text-2xl">Thank you — message received.</h2>
        <p className="text-ash mt-2">
          We read every inquiry personally and reply within one business day.
        </p>
      </div>
    );
  }

  const values = state?.status === "error" ? state.values : undefined;
  // Key changes on each error submission so React remounts inputs with fresh defaultValues.
  const formKey = state?.status === "error" ? `error-${errorKey}` : "initial";

  return (
    <form key={formKey} action={formAction} className="space-y-5">
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
        <Input
          id="name"
          name="name"
          required
          defaultValue={values?.name}
          className="focus-visible:ring-ember focus-visible:shadow-[0_0_24px_rgba(234,88,12,0.2)]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={values?.email}
          className="focus-visible:ring-ember focus-visible:shadow-[0_0_24px_rgba(234,88,12,0.2)]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget">Budget range (optional)</Label>
        <Input
          id="budget"
          name="budget"
          placeholder="e.g. $5k–15k, or 'no idea yet'"
          defaultValue={values?.budget}
          className="focus-visible:ring-ember focus-visible:shadow-[0_0_24px_rgba(234,88,12,0.2)]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">What are you trying to build or fix?</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={values?.message}
          className="focus-visible:ring-ember focus-visible:shadow-[0_0_24px_rgba(234,88,12,0.2)]"
        />
      </div>
      {state?.status === "error" ? (
        <p role="alert" className="text-ember text-sm">
          {state.message}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={pending}
        className="bg-ember hover:bg-ember/90 active:bg-ember-dark rounded-full px-8"
      >
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
