import { Text } from "./typography";

type IPageHeaderProps = {
  title: string;
  description?: string;
};

export const PageHeader = ({ title, description }: IPageHeaderProps) => {
  return (
    <div className="space-y-1">
      <Text variant={"h2"}>{title}</Text>
      {description ? <Text tone="muted">{description}</Text> : null}
    </div>
  );
};
