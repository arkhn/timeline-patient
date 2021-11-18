import React, { useEffect } from "react";

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
  resourceFilterListSet,
  resourceFiltersReseted,
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

  // Reset all filters on mount
  useEffect(() => {
    dispatch(resourceFiltersReseted());
  }, [dispatch]);

  const handleSelectAllClick = () => {
    if (removedFilters.length === filters.size) {
      dispatch(resourceFiltersReseted());
    } else {
      dispatch(resourceFilterListSet([...filters]));
    }
  };

  const handleFilterClick = (filter: IResourceList["resourceType"]) => () => {
    dispatch(resourceFilterSet(filter));
  };

  return (
    <Paper className={classes.container}>
      <FormLabel>{t("display")}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={removedFilters.length === 0}
              indeterminate={
                removedFilters.length > 0 &&
                removedFilters.length < filters.size
              }
              onClick={handleSelectAllClick}
            />
          }
          label={t<string>(
            removedFilters.length < filters.size ? "removeAll" : "selectAll"
          )}
        />
        {[...filters].map((filter) => (
          <FormControlLabel
            key={filter}
            control={
              <Checkbox
                checked={!removedFilters.includes(filter)}
                onClick={handleFilterClick(filter)}
              />
            }
            label={t<string>(filter)}
          />
        ))}
      </FormGroup>
    </Paper>
  );
};

export default ResourceFilterSelector;
