import React from "react";

import DOMPurify from "dompurify";

type InnerHTMLDivProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "dangerouslySetInnerHTML"
> & {
  innerHTML?: string;
};

const InnterHTMLDiv = ({
  innerHTML,
  ...props
}: InnerHTMLDivProps): JSX.Element => {
  const sanitizedHTML = innerHTML && DOMPurify.sanitize(innerHTML);
  return (
    <>
      {sanitizedHTML && (
        <div {...props} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
      )}
    </>
  );
};

export default InnterHTMLDiv;
