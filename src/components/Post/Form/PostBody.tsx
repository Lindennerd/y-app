import { TextArea } from "~/components/base";
import { MIN_CONTENT_LENGTH } from "~/constants";

export interface PostBodyProps {
  body: string;
  setBody: (body: string) => void;
  error?: string;
}

export const PostBody = (props: PostBodyProps) => {
  return (
    <>
      <TextArea
        error={props.error}
        name="content"
        placeholder="Conteúdo"
        minLength={MIN_CONTENT_LENGTH}
        rows={10}
        value={props.body}
        onChange={(e) => props.setBody(e.target.value)}
      />
      <p className="text-end text-sm text-gray-400">{`${props.body.length}/${MIN_CONTENT_LENGTH}`}</p>
    </>
  );
};
