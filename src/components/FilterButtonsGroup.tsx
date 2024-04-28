import { Button, ButtonGroup } from "@mui/material";
import { memo, useCallback } from "react";
import { FilterParamsType } from "../context/AppContext";

type FilterButtonsGroupPropsType = {
  filterParam: FilterParamsType;
  changeFilterParam: (newFilter: FilterParamsType) => void;
};

export const FilterButtonsGroup = memo(
  ({ filterParam, changeFilterParam }: FilterButtonsGroupPropsType) => {
    const setActiveButton = (filter: FilterParamsType) => {
      return filterParam === filter ? "contained" : "outlined";
    };

    const changeFilterParamToAll = useCallback(
      () => changeFilterParam("all"),
      [changeFilterParam]
    );
    const changeFilterParamToActive = useCallback(
      () => changeFilterParam("active"),
      [changeFilterParam]
    );
    const changeFilterParamToDone = useCallback(
      () => changeFilterParam("done"),
      [changeFilterParam]
    );

    return (
      <ButtonGroup
        color="secondary"
        sx={{ display: "flex", justifyContent: "center", marginTop: "17px" }}
      >
        <Button
          variant={setActiveButton("all")}
          onClick={changeFilterParamToAll}
        >
          All
        </Button>
        <Button
          variant={setActiveButton("active")}
          onClick={changeFilterParamToActive}
        >
          Active
        </Button>
        <Button
          variant={setActiveButton("done")}
          onClick={changeFilterParamToDone}
        >
          Done
        </Button>
      </ButtonGroup>
    );
  }
);
