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
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <MdNearbyError />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
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
        {errors.title && (
          <Callout.Root color="red" className="mb-5">
            <Callout.Icon>
              <MdNearbyError />
            </Callout.Icon>
            <Callout.Text>{errors.title.message}</Callout.Text>
          </Callout.Root>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        {/* Client-side Validation */}
        {errors.description && (
          <Callout.Root color="red" className="mb-5">
            <Callout.Icon>
              <MdNearbyError />
            </Callout.Icon>
            <Callout.Text>{errors.description.message}</Callout.Text>
          </Callout.Root>
        )}
        <Button type="submit">Submit Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
