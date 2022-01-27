import React, { useEffect, useMemo } from "react";

import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "app/store";
import type { DomainResourceList } from "models/types";

import {
  resourceFilterSet,
  resourceFilterListSet,
  resourceFiltersReseted,
  selectResourceFilters,
} from "./resourceFilterSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    width: 250,
  },
  circularProgress: {
    margin: "auto",
  },
}));

type ResourceFilterSelectorProps = {
  filters: Set<DomainResourceList["resourceType"]>;
  resourceCountDict: Partial<
    Record<DomainResourceList["resourceType"], number>
  >;
  isFetching?: boolean;
};

const ResourceFilterSelector = ({
  filters,
  resourceCountDict,
  isFetching,
}: ResourceFilterSelectorProps): JSX.Element => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const removedFilters = useAppSelector(selectResourceFilters);
  const totalResources = useMemo(
    () =>
      Object.values(resourceCountDict).reduce((acc, count) => acc + count, 0),
    [resourceCountDict]
  );

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

  const handleFilterClick =
    (filter: DomainResourceList["resourceType"]) => () => {
      dispatch(resourceFilterSet(filter));
    };

  return (
    <Paper className={classes.container}>
      <FormLabel>{`${t("display", { count: totalResources })}`}</FormLabel>
      <FormGroup>
        {isFetching ? (
          <CircularProgress className={classes.circularProgress} />
        ) : (
          <>
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
                label={`${t<string>(filter)} (${resourceCountDict[filter]})`}
              />
            ))}
          </>
        )}
      </FormGroup>
    </Paper>
  );
};

export default ResourceFilterSelector;
