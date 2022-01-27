import React, { useMemo } from "react";

import PersonIcon from "@mui/icons-material/Person";
import { Avatar, CircularProgress, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import upperCase from "lodash/upperCase";
import upperFirst from "lodash/upperFirst";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import Tag from "common/components/Tag";
import { useApiPatientsListQuery } from "services/api/api";

import { getIdentifiers } from "./utils";

const useStyles = makeStyles((theme) => ({
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(1),
  },
  avatar: {
    height: theme.spacing(8),
    width: theme.spacing(8),
  },
  nameTitle: {
    fontWeight: 600,
  },
}));

const PatientInfo = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { patientId } = useParams();

  const { data: patient, isFetching: isPatientFetching } =
    useApiPatientsListQuery(
      { id: patientId },
      {
        skip: !patientId,
        selectFromResult: (result) => ({ ...result, data: result.data?.[0] }),
      }
    );
  const { name, gender, birthDate, identifier } = useMemo(() => {
    const givenName = patient?.name?.[0]?.given?.[0] ?? t("unknown");
    const familyName = patient?.name?.[0]?.family ?? t("unknown");

    return {
      name: `${upperFirst(givenName)} ${upperCase(familyName)}`,
      gender: upperCase(patient?.gender?.[0] ?? t("unknown")),
      birthDate:
        patient?.birthDate &&
        DateTime.fromISO(patient.birthDate).toLocaleString(undefined, {
          locale: navigator.language,
        }),
      identifier: (
        <div className={classes.flexRow}>
          {getIdentifiers(patient).map(({ code, value }) => (
            <Tag
              key={code}
              value={`${code} - ${value}`}
              color="#CCC"
              size="small"
            />
          ))}
        </div>
      ),
    };
  }, [classes.flexRow, patient, t]);

  return (
    <div className={classes.flexRow}>
      {isPatientFetching ? (
        <CircularProgress />
      ) : (
        <>
          <div className={classes.columnContainer}>
            <Avatar classes={{ root: classes.avatar }}>
              <PersonIcon fontSize="large" />
            </Avatar>
          </div>
          <div className={classes.columnContainer}>
            <Typography
              className={classes.nameTitle}
              variant="h5"
            >{`${name} (${gender})`}</Typography>
            <Typography>
              {t(gender === "M" ? "bornOn_m" : "bornOn_f", { birthDate })}
            </Typography>
            {identifier}
          </div>
        </>
      )}
    </div>
  );
};

export default PatientInfo;
