import { type Post, type Reference } from "@prisma/client";
import { useState, type FormEvent } from "react";
import { Button, Input } from "~/components/base";
import { type CreatePost } from "~/server/api/routers/post/types";
import { api } from "~/utils/api";
import { MIN_CONTENT_LENGTH, PostBody } from "./PostBody";
import { References } from "./References";

export interface PostFormProps {
  post?: Post & { references: Reference[] };
}

export interface PostFormValidationErrors {
  title?: string;
  body?: string;
}

export const PostForm = (props: PostFormProps) => {
  const defaultValue: CreatePost = {
    title: "",
    body: "",
    references: [],
  };

  const { mutate: editMutation } = api.post.edit.useMutation();
  const { mutate: createMutation } = api.post.create.useMutation();

  const [post, setPost] = useState<
    CreatePost | (Post & { references: Reference[] })
  >(props.post ?? defaultValue);

  const [validationErrors, setValidationErrors] =
    useState<PostFormValidationErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (post.title === "") {
      setValidationErrors({
        ...validationErrors,
        title: "Título é obrigatório",
      });
    }

    if (post.body === "") {
      setValidationErrors({ ...validationErrors, body: "Corpo é obrigatório" });
    }

    if ((post.body as string).length < MIN_CONTENT_LENGTH) {
      setValidationErrors({
        ...validationErrors,
        body: `Corpo deve ter pelo menos ${MIN_CONTENT_LENGTH} caracteres`,
      });
    }

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (props.post) {
      editMutation(
        { ...post, id: props.post.id },
        {
          onSuccess: () => {
            setPost(defaultValue);
          },
        },
      );
    } else {
      createMutation(post, {
        onSuccess: () => {
          setPost(defaultValue);
        },
      });
    }
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Input
        error={validationErrors.title}
        name="title"
        type="text"
        placeholder="Título"
        value={post.title as string}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <PostBody
        error={validationErrors.body}
        body={post.body as string}
        setBody={(body) => setPost({ ...post, body: body })}
      />
      <References
        references={post.references as Reference[]}
        setReferences={(references) =>
          setPost({ ...post, references: references })
        }
      />
      <Button type="submit">Enviar</Button>
    </form>
  );
};
