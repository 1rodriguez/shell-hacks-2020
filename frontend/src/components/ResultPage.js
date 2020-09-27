import React from "react";
import { Document, Page } from "react-pdf";


const ResultPage = ({ PDF }) => {


    
  return (
    <div style={{ color: "#ffffff" }}>
        {
           PDF ? console.log(PDF) : null
        
        }
      
      {/* <img src={PDF} />
      <Document file="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf">
        <Page pageNumber={1} />
      </Document> */}
    </div>
  );
};
export default ResultPage;
