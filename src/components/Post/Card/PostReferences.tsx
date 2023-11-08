import { type Reference } from "@prisma/client";

export interface PostReferencesProps {
  references: Reference[];
}

export const PostReferences = (props: PostReferencesProps) => {
  return (
    <div>
      <div className="flex flex-col gap-1">
        {props.references.map((reference, index) => (
          <div key={reference.id}>
            <a
              href={reference.url}
              target="_blank"
              rel="noreferrer"
              className="text-primary-400 hover:underline"
            >
              {index + 1}. {reference.display}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
