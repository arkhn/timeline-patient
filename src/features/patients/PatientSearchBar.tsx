import React, { useState } from "react";

import type { IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  AutocompleteProps,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { useApiPatientsListQuery } from "services/api/api";

type PatientSearchBarProps = {
  onChange?: AutocompleteProps<IPatient, false, false, false>["onChange"];
};

const PatientSearchBar = ({ onChange }: PatientSearchBarProps): JSX.Element => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const { data: patients, isFetching: isPatientsBundleFetching } =
    useApiPatientsListQuery({ name }, { skip: !name });

  return (
    <Autocomplete
      fullWidth
      options={patients ?? []}
      clearOnBlur={false}
      filterOptions={(options) => options}
      noOptionsText={t("noPatientsFound")}
      loadingText={t("loadingPatients")}
      onChange={onChange}
      getOptionLabel={(patient) =>
        `${patient.name?.[0]?.given?.[0]} ${patient.name?.[0]?.family} (${patient.gender}) (${patient.birthDate})`
      }
      isOptionEqualToValue={(option, value) => option.id === value.id}
      loading={isPatientsBundleFetching}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t("searchPatient")}
          onChange={(event) => setName(event.target.value)}
          InputProps={{
            ...params.InputProps,
            startAdornment: <SearchIcon />,
            endAdornment: (
              <React.Fragment>
                {isPatientsBundleFetching ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default PatientSearchBar;
