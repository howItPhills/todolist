import { TextField, Typography } from "@mui/material";
import { ChangeEvent, KeyboardEvent, memo, useCallback, useState } from "react";

type TextManagerPropsType = {
  text: string;
  editText: (newText: string) => void;
  variant: "body1" | "h5";
};

export const TextManager = memo(
  ({ text, editText, variant }: TextManagerPropsType) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newText, setNewText] = useState<string>("");

    const onChangeHandler = useCallback(
      ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setNewText(value);
      },
      []
    );

    const onTextClickHandler = useCallback(() => {
      setIsEditing(true);
      setNewText(text);
    }, [text]);

    const submitNewText = useCallback(() => {
      editText(newText.trim());
      setIsEditing(false);
    }, [editText, newText]);

    const onEnterPressHandler = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && newText.trim() !== "") {
          submitNewText();
        }
        return;
      },
      [newText, submitNewText]
    );

    const onBlurHandler = useCallback(() => {
      if (newText.trim() === "") return;
      submitNewText();
    }, [newText, submitNewText]);

    return (
      <>
        {isEditing ? (
          <TextField
            variant="outlined"
            color="secondary"
            size="small"
            autoFocus={isEditing}
            value={newText}
            onChange={onChangeHandler}
            onKeyDown={onEnterPressHandler}
            onBlur={onBlurHandler}
            label={"type something.."}
          />
        ) : (
          <Typography
            variant={variant}
            color="GrayText"
            overflow={"hidden"}
            onClick={onTextClickHandler}
          >
            {text}
          </Typography>
        )}
      </>
    );
  }
);
