import React from "react";

import type { IResourceList } from "@ahryman40k/ts-fhir-types/lib/R4";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "app/store";

import {
  resourceFilterSet,
  selectResourceFilters,
} from "./resourceFilterSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

type ResourceFilterSelectorProps = {
  filters: Set<IResourceList["resourceType"]>;
};

const ResourceFilterSelector = ({
  filters,
}: ResourceFilterSelectorProps): JSX.Element => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const removedFilters = useAppSelector(selectResourceFilters);

  const handleFilterClick = (filter: IResourceList["resourceType"]) => () => {
    dispatch(resourceFilterSet(filter));
  };

  return (
    <Paper className={classes.container}>
      <FormLabel>{t("display")}</FormLabel>
      <FormGroup>
        {[...filters].map((filter) => (
          <FormControlLabel
            key={filter}
            control={
              <Checkbox
                checked={!removedFilters.includes(filter)}
                onClick={handleFilterClick(filter)}
              />
            }
            label={filter}
          />
        ))}
      </FormGroup>
    </Paper>
  );
};

export default ResourceFilterSelector;
