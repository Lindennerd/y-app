import { type Post, type Reference } from "@prisma/client";
import { useState, type FormEvent } from "react";
import { Button, Input } from "~/components/base";
import { MIN_CONTENT_LENGTH } from "~/constants";
import { type CreatePost } from "~/server/api/routers/post/types";
import { api } from "~/utils/api";
import { PostBody } from "./PostBody";
import { References } from "./References";

export interface PostFormProps {
  post?: Post & { references: Reference[] };
  responseTo?: {
    id: number;
    title: string;
  };
}

export interface PostFormValidationErrors {
  title?: string;
  body?: string;
}

export const PostForm = (props: PostFormProps) => {
  const defaultValue: CreatePost = {
    title: "",
    subtitle: "",
    body: "",
    references: [],
    responseTo: props.responseTo?.id,
  };

  const utils = api.useUtils();
  const { mutate: editMutation, isLoading: editLoading } =
    api.post.edit.useMutation();
  const { mutate: createMutation, isLoading: createLoading } =
    api.post.create.useMutation();

  const [post, setPost] = useState<
    CreatePost | (Post & { references: Reference[] })
  >(props.post ?? defaultValue);

  const [validationErrors, setValidationErrors] =
    useState<PostFormValidationErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setValidationErrors({});

    if (post.title === "") {
      setValidationErrors({
        ...validationErrors,
        title: "Título é obrigatório",
      });
    }

    if (post.body === "") {
      setValidationErrors({ ...validationErrors, body: "Corpo é obrigatório" });
    }

    if (post.body.length < MIN_CONTENT_LENGTH) {
      setValidationErrors({
        ...validationErrors,
        body: `Corpo deve ter pelo menos ${MIN_CONTENT_LENGTH} caracteres`,
      });
    }

    if (Object.keys(validationErrors).length > 0) {
      console.error(validationErrors);
      return;
    }

    if (props.post) {
      editMutation(
        { ...post, id: props.post.id },
        {
          onSuccess: () => {
            setPost(defaultValue);
            utils.post
              .invalidate()
              .then(() => utils.post.getLatest.refetch())
              .catch(console.error);
          },
        },
      );
    } else {
      createMutation(post, {
        onSuccess: () => {
          setPost(defaultValue);
          utils.post
            .invalidate()
            .then(() => utils.post.getLatest.refetch())
            .catch(console.error);
        },
      });
    }
  }

  return (
    <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
      {props.responseTo && (
        <h1 className="w-full text-center text-gray-400">
          Respondendo para {props.responseTo.title}
        </h1>
      )}
      <Input
        error={validationErrors.title}
        name="title"
        type="text"
        placeholder="Título"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <Input
        error={validationErrors.title}
        name="subtitle"
        type="text"
        placeholder="Sub Título"
        value={post.subtitle ?? ""}
        onChange={(e) => setPost({ ...post, subtitle: e.target.value })}
      />
      <PostBody
        error={validationErrors.body}
        body={post.body}
        setBody={(body) => setPost({ ...post, body: body })}
      />
      <References
        references={post.references as Reference[]}
        setReferences={(references) =>
          setPost({ ...post, references: references })
        }
      />
      <div className="flex justify-end gap-2">
        <Button>Limpar</Button>
        <Button type="submit" disabled={createLoading || editLoading}>
          {createLoading || editLoading ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </form>
  );
};
