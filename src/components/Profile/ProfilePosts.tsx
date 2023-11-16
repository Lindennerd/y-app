import { useState } from "react";
import { type QueryPostOutput } from "~/server/api/routers/post/types";
import { PostsList } from "../Post";
import { TabNav, type TabItem } from "../base/TabNav";

export interface ProfilePostsProps {
  posts: QueryPostOutput[];
}

export const ProfilePosts = (props: ProfilePostsProps) => {
  const [activeTab, setActiveTab] = useState("Posts");

  const tabs: TabItem[] = [
    {
      label: "Posts",
      element: <PostsList posts={props.posts.filter((p) => !p?.draft)} />,
    },
    {
      label: "Rascunhos",
      element: <PostsList posts={props.posts.filter((p) => p?.draft)} />,
    },
  ];

  return (
    <div className="flex w-full flex-col gap-4">
      <TabNav
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
};
