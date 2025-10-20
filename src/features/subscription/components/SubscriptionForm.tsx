"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CurrencyEnum, IntervalEnum } from "../subscription.interface";
import {
  SubscriptionSchema,
  SubscriptionSchemaType,
} from "../subscription.schema";

export const SubscriptionForm = () => {
  const form = useForm<SubscriptionSchemaType>({
    resolver: zodResolver(SubscriptionSchema),
    defaultValues: {
      name: "",
      currency: CurrencyEnum.USD,
      description: "",
      interval: IntervalEnum.MONTH,
      price: 0,
      features: [{ name: "", description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const onSubmit = (values: SubscriptionSchemaType) => {
    try {
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Premium Enterprise"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Yearly premium plan with enterprise-level features, security, and support"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="249.99"
                  type="number"
                  step="0.01"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="uppercase">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(CurrencyEnum).map((currency) => (
                    <SelectItem
                      key={currency}
                      value={currency}
                      className="uppercase"
                    >
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interval</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Select Interval" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(IntervalEnum).map((interval) => (
                    <SelectItem
                      key={interval}
                      value={interval}
                      className="capitalize"
                    >
                      {interval}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <FormLabel className="mb-4">Features</FormLabel>
          <div className="border-dashed border border-border rounded-2xl px-4 pt-5 pb-3 flex flex-col gap-2">
            <div className="flex flex-col gap-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4">
                  <div className="grow">
                    <FormField
                      control={form.control}
                      name={`features.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Unlimited Team Members"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grow">
                    <FormField
                      control={form.control}
                      name={`features.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Invite unlimited members"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {fields.length > 1 && (
                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => remove(index)}
                        className="py-[17px]"
                      >
                        <X className="" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="link"
              className="!p-0 !m-0 self-start"
              onClick={() => append({ name: "", description: "" })}
            >
              <Plus /> Add New Feature
            </Button>
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
