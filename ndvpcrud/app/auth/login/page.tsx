"use client";
import * as z from "zod";
import { Wrapper } from "../components/cardstyling";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl,FormField, FormItem, FormLabel, FormMessage  } from "@/components/ui/form";
import { Schema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorStyling } from "../components/errorstyling";
import { SuccessStyling } from "../components/successtyling";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";

export const mainLogin = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof Schema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data) {
          setError(data.error);
          //@ts-ignore
          setSuccess(data.success);
      }})
    });
  }
return (
  <Wrapper headerLabel="Dobrodošli gospodo!">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6">
        <div className="space-y-4">
          <FormField control={form.control} name="email" render={({field}) => (
            <FormItem>
              <FormLabel>
                E-mail
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="sekretar@gmail.com" type="email" disabled={isPending} className="text-black"/>
              </FormControl>
              <FormMessage className="text-red"/>
            </FormItem>
          )}/>
          <FormField control={form.control} name="password" render={({field}) => (
            <FormItem>
              <FormLabel>
                Lozinka
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="******" type="password" disabled={isPending} className="text-black"/>
              </FormControl>
              <FormMessage className="text-red"/>
            </FormItem>
          )}/>
        </div>
        <ErrorStyling message={error}/>
        <SuccessStyling message={success}/>
        <Button type="submit" disabled={isPending} className="w-[100px] mx-auto my-auto flex items-center justify-center uppercase bg-darkIndigo hover:bg-indigo transition duration-300 ease-in-out">
          Prijavi se
        </Button>
      </form>
    </Form>
  </Wrapper>
)
}

export default mainLogin;