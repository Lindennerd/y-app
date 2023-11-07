/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Reference } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Button, Input } from "~/components/base";

export interface ReferenceProps {
  references: Reference[];
  setReferences: (references: Reference[]) => void;
}

export const References = (props: ReferenceProps) => {
  const defaultValue: Reference = {
    id: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    postId: 0,
    display: "",
    url: "",
  };

  const [referenceInput, setReferenceInput] = useState(defaultValue);

  const handleAddReference = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (referenceInput.display && referenceInput.display.length > 0) {
      const newReference = {
        ...defaultValue,
        ...referenceInput,
      };
      props.setReferences([...props.references, newReference]);
      setReferenceInput(defaultValue);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between gap-2">
        <Input
          name="display"
          type="text"
          placeholder="Referência"
          value={referenceInput.display}
          onChange={(e) =>
            setReferenceInput({ ...referenceInput, display: e.target.value })
          }
        />
        <Input
          name="url"
          type="url"
          placeholder="Link"
          value={referenceInput.url}
          onChange={(e) =>
            setReferenceInput({ ...referenceInput, url: e.target.value })
          }
        />
        <Button onClick={handleAddReference}>
          <FaPlus />
        </Button>
      </div>

      <ul className="list-inside list-none">
        {props.references.map((reference, index) => (
          <li key={index} className="flex justify-between border-b p-1">
            {reference.url ? (
              <Link
                className="text-blue-400 hover:underline"
                href={reference.url}
              >
                {index + 1} - {reference.display}
              </Link>
            ) : (
              <p>
                {index + 1} - {reference.display}
              </p>
            )}
            <button
              className="text-red-400 hover:text-red-500"
              onClick={(e) => {
                e.preventDefault();
                props.setReferences(
                  props.references.filter((r, i) => i !== index),
                );
              }}
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
