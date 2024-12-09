import { Button } from "../ui/button";

interface HeadingProps {
  title: string;
  description?: string;
  actionButtonLabel?: string;
  actionButtonHandler?: () => void;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  actionButtonLabel = null,
  actionButtonHandler = () => {
    console.log("actionButtonHandler called");
  },
  className=''
}) => {
  return (
    <>
      <div className={`w-full flex items-center justify-between ${className ? className : ''}`}>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {actionButtonLabel && (
          <div>
            <Button
              onClick={actionButtonHandler}
              size={"lg"}
              variant={"primary"}
            >
              {actionButtonLabel}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

// className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
