import React, { useEffect, useState } from 'react';


const ContractPage: React.FC = () => {
    const [html, setHtml] = useState<string>("");

    useEffect(() => {
        //read html file from public folder
        fetch('/CustomerAgreement.html')
            .then((response) => response.text())
            .then((html) => {
                setHtml(html);
            });
    })

    return (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    );
}

export default ContractPage;
