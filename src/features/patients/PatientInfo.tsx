import React, { useMemo } from "react";

import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import upperCase from "lodash/upperCase";
import upperFirst from "lodash/upperFirst";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useApiPatientsListQuery } from "services/api/api";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
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
    height: theme.spacing(6),
    width: theme.spacing(6),
  },
  nameTitle: {
    fontWeight: 600,
  },
}));

const PatientInfo = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { patientId } = useParams();

  const { data: patient } = useApiPatientsListQuery(
    { id: patientId },
    {
      skip: !patientId,
      selectFromResult: (result) => ({ ...result, data: result.data?.[0] }),
    }
  );
  const { name, gender, birthDate } = useMemo(() => {
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
    };
  }, [patient, t]);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.columnContainer}>
        <Avatar classes={{ root: classes.avatar }}>
          <PersonIcon />
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
      </div>
    </div>
  );
};

export default PatientInfo;
