import {
  TextInput as BaseTextInput,
  type TextInput as BaseTextInputType,
  type TextInputProps,
} from "react-native";
import { cn } from "../../styles/utils";

export function TextInput({
  className,
  ...props
}: { ref?: React.Ref<BaseTextInputType> } & TextInputProps) {
  return (
    <BaseTextInput
      className={cn(
        "min-w-0 max-w-full border-primary px-2 py-1 text-base text-primary caret-primary gm",
        className
      )}
      {...props}
    />
  );
}
