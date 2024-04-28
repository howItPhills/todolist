import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, KeyboardEvent, memo, useCallback, useState } from "react";

type AddItemFormPropsType = {
  addItem: (text: string) => void;
  inputLabel?: string;
};

export const AddItemForm = memo(
  ({ addItem, inputLabel }: AddItemFormPropsType) => {
    const [text, setText] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setIsError(false);
      setText(e.target.value);
    }, []);

    const submitAddingItem = useCallback(() => {
      addItem(text.trim());
      setText("");
    }, [addItem, text]);

    const onAddButtonClickHandler = useCallback(() => {
      if (text.trim() === "") {
        setIsError(true);
        return;
      }
      submitAddingItem();
    }, [submitAddingItem, text]);

    const onEnterPressHandler = useCallback(
      ({ key }: KeyboardEvent<HTMLInputElement>) => {
        if (key === "Enter" && text.trim() !== "") {
          submitAddingItem();
        } else if (key === "Enter" && text.trim() === "") {
          setIsError(true);
        }
      },
      [submitAddingItem, text]
    );

    return (
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          color="secondary"
          autoFocus
          value={text}
          onChange={onChangeHandler}
          onKeyDown={onEnterPressHandler}
          error={isError}
          label={isError ? "Incorrect input" : inputLabel}
        />
        <Button
          color="secondary"
          size="medium"
          variant="contained"
          onClick={onAddButtonClickHandler}
        >
          Add
        </Button>
      </Box>
    );
  }
);
