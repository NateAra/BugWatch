"use client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdNearbyError } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { issuesSchema } from "@/app/validationSchema";
import ErrorMessage from "@/app/components/ErrorMessage";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issuesSchema),
  });

  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {/* Server-side Validation */}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>

        {/* Client-side Validation */}
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        {/* Client-side Validation */}
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        
        <Button type="submit">Submit Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
