import { Link } from "gatsby";
import React from "react";

type Props = {
  currentPage: number;
  numPages: number;
  generateSlug: (page: number) => string;
};

const IndexPagination: React.FC<Props> = ({
  currentPage,
  numPages,
  generateSlug,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Array.from({ length: numPages }, (_, i) => (
          <Link
            key={`pagination-number${i + 1}`}
            to={generateSlug(i + 1)}
            style={{
              padding: "0.5rem",
              margin: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
              fontSize: "1.2rem",
              textAlign: "center",
              width: "2rem",
              height: "2rem",
              lineHeight: "2rem",
              backgroundColor: currentPage === i + 1 ? "#ccc" : "white",
            }}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IndexPagination;
