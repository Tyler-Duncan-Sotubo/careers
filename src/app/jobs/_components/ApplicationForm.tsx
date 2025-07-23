/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUploader } from "@/components/common/FileUploader";
import FormError from "@/components/ui/form-error";

function generateSchema(fields: any[], questions: any[]) {
  const shape: Record<string, any> = {};

  fields.forEach((field) => {
    if (!field.isVisible) return;

    switch (field.fieldType) {
      case "date":
        shape[field.id] = z.coerce.date().refine((val) => !!val, {
          message: `${field.label} is required`,
        });

        break;
      case "file":
        shape[field.id] = z
          .object({
            name: z.string(),
            type: z.string(),
            base64: z.string(),
          })
          .refine((val) => !!val, { message: `${field.label} is required` });

        break;
      default:
        shape[field.id] = z.string().min(1, `${field.label} is required`);
    }
  });

  questions.forEach((q) => {
    shape[q.id] = z.string().min(1, `${q.question} is required`);
  });

  return z.object(shape);
}

type Props = {
  data: {
    fields: any[];
    questions: any[];
  };
  onSubmit: (values: any) => void;
  error?: string | null;
};

const sectionsOrder = [
  "personal",
  "education",
  "experience",
  "documents",
  "custom",
];

export function ApplicationForm({ data, onSubmit, error }: Props) {
  const schema = generateSchema(data.fields, data.questions);

  const defaultValues: Record<string, any> = {};

  data.fields.forEach((field) => {
    if (field.isVisible) {
      defaultValues[field.id] = field.fieldType === "file" ? null : ""; // default string or null
    }
  });

  data.questions.forEach((q) => {
    defaultValues[q.id] = "";
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues, // ✅ correctly aligned with field/question IDs
  });

  console.log("Form default values:", form.getValues());

  const { handleSubmit, control } = form;

  const renderField = (field: any) => {
    const id = field.id;

    return (
      <FormField
        key={id}
        control={control}
        name={id}
        render={({ field: rhfField }) => (
          <FormItem>
            <FormLabel required>
              {field.label === "Skills"
                ? "Skills (enter multiple skills separated by commas)"
                : field.label === "Resume/CV"
                ? "Resume/CV (PDF only)"
                : field.label === "Cover Letter"
                ? "Cover Letter (PDF only, optional)"
                : field.label}
            </FormLabel>
            <FormControl>
              {field.fieldType === "textarea" ? (
                <Textarea {...rhfField} value={String(rhfField.value ?? "")} />
              ) : field.fieldType === "date" ? (
                <Input
                  type="date"
                  value={
                    rhfField.value instanceof Date
                      ? rhfField.value.toISOString().split("T")[0]
                      : String(rhfField.value ?? "")
                  }
                  onChange={(e) => rhfField.onChange(e.target.value)}
                />
              ) : field.fieldType === "file" ? (
                <FileUploader
                  value={
                    rhfField.value as {
                      name: string;
                      type: string;
                      base64: string;
                    } | null
                  }
                  onChange={rhfField.onChange}
                  accept={
                    field.accept || {
                      "application/pdf": [".pdf"],
                    }
                  }
                />
              ) : (
                <Input {...rhfField} value={String(rhfField.value ?? "")} />
              )}
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderQuestion = (question: any) => {
    const id = question.id;

    return (
      <FormField
        key={id}
        control={control}
        name={id}
        render={({ field: rhfField }) => (
          <FormItem>
            <FormLabel required>{question.question}</FormLabel>
            <FormControl>
              <Input {...rhfField} value={String(rhfField.value ?? "")} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderSection = (section: string) => {
    const fields = data.fields
      .filter((f) => f.section === section && f.isVisible)
      .sort((a, b) => a.order - b.order);

    if (!fields.length) return null;

    return (
      <div key={section} className="space-y-4">
        <h3 className="text-lg font-semibold capitalize">
          {section} Information
        </h3>
        <Separator />
        {fields.map(renderField)}
      </div>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {sectionsOrder.map(renderSection)}

        {data.questions?.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Questions</h3>
            <Separator />
            {data.questions
              .sort((a, b) => a.order - b.order)
              .map(renderQuestion)}
          </div>
        )}

        {error && <FormError message={error} className="mt-4" />}

        <Button type="submit">Submit Application</Button>
      </form>
    </Form>
  );
}
