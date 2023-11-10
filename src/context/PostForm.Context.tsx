import { type Post, type Reference } from "@prisma/client";
import React, { createContext, useContext, useState } from "react";
import { Modal } from "~/components/base";
import { PostForm } from "~/components/Post";

export interface PostFormProps {
  openModal: boolean;
  post?: Post & { references: Reference[] };
  responseTo?: {
    id: number;
    title: string;
  };
}

export interface PostFormContextProps {
  postFormProps: PostFormProps;
  setProps: (props: PostFormProps) => void;
}

const PostFormContext = createContext<PostFormContextProps>({
  postFormProps: { openModal: false },
  setProps: (props: PostFormProps) => {
    return props;
  },
});

export const usePostForm = () => {
  const context = useContext(PostFormContext);
  if (!context) {
    throw new Error("usePostForm must be used within a PostFormProvider");
  }

  return context;
};

export const PostFormProvider = (props: { children: React.ReactNode }) => {
  const [formProps, setFormProps] = useState<PostFormProps>({
    openModal: false,
  });

  return (
    <PostFormContext.Provider
      value={{
        postFormProps: formProps,
        setProps: (props: PostFormProps) => {
          setFormProps(props);
        },
      }}
    >
      <Modal
        open={formProps.openModal}
        toggle={(toggle) => setFormProps({ ...formProps, openModal: toggle })}
      >
        <PostForm responseTo={formProps.responseTo} post={formProps.post} />
      </Modal>

      {props.children}
    </PostFormContext.Provider>
  );
};
