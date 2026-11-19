type IPageHeaderProps = {
  title: string;
  description?: string;
};

export const PageHeader = ({ title, description }: IPageHeaderProps) => {
  return (
    <header className="space-y-1">
      <h1 className="text-xl font-bold">{title}</h1>
      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : null}
    </header>
  );
};
