import React, { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { Dialog, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import type { DocumentProps } from "react-pdf";
import { Document, Page } from "react-pdf/dist/umd/entry.webpack";

const useStyles = makeStyles(() => ({
  button: {
    textTransform: "none",
  },
}));

type PDFDialogButtonProps = {
  file: DocumentProps["file"];
};

const PDFDialogButton = ({ file }: PDFDialogButtonProps): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [pageCount, setPageCount] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setPageCount(numPages);
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleOpenDialog = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Button
        variant="outlined"
        className={classes.button}
        startIcon={<VisibilityIcon />}
        onClick={handleOpenDialog}
      >
        {t("viewDocument")}
      </Button>
      <Dialog open={isOpen} onClose={handleCloseDialog}>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(pageCount), (_, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </Dialog>
    </>
  );
};

export default PDFDialogButton;
