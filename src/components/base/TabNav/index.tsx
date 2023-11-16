export interface TabItem {
  label: string;
  element: JSX.Element;
}

export interface TabNavProps {
  tabs: TabItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TabNav = (props: TabNavProps) => {
  return (
    <>
      <div className="flex w-full justify-stretch gap-2">
        {props.tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => props.setActiveTab(tab.label)}
            className={`${
              props.activeTab === tab.label
                ? "bg-primary-500 text-white"
                : "bg-white text-black"
            } w-full rounded-md px-4 py-2`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {props.tabs.map((tab, index) => (
        <div
          key={index}
          className={`${props.activeTab === tab.label ? "block" : "hidden"}`}
        >
          {tab.element}
        </div>
      ))}
    </>
  );
};
