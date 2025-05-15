import type { ReactNode } from "react";

interface IContentSection {
  title: string;
  desc?: string;
  children?: ReactNode;
}

function ContentSection({ title, desc, children }: IContentSection) {
  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
      <div className="mt-2" />
      <div>{children}</div>
    </div>
  );
}

export default ContentSection;
